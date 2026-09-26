// Slack App의 "Interactivity & Shortcuts > Request URL"이 가리키는 엔드포인트.
// 결재 DM의 승인/반려 버튼 클릭(block_actions)과 반려 사유 모달 제출(view_submission)을
// 여기서 받아 처리한다. 로그인 세션이 없는 서버 요청이므로 Firebase Admin SDK로 직접
// Firestore/Storage에 접근하고, 문서는 pdf-lib로 서버에서 즉시 서명 PDF를 생성한다.
import { verifySlackSignature } from './lib/slackSignature.js';
import { getAdminDb, getAdminBucket } from './lib/firebaseAdmin.js';
import { generateSignedDocumentPdf } from './lib/signedPdf.js';
import { buildPdfFieldsForForm } from './lib/formPdfFields.js';
import { shareSlackFile } from './lib/slackFileShare.js';
import crypto from 'crypto';

function slackApi(token) {
  return async (method, body) => {
    const res = await fetch(`https://slack.com/api/${method}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body)
    });
    return res.json();
  };
}

function parseSlackBody(event) {
  const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : (event.body || '');
  const params = new URLSearchParams(raw);
  const payloadStr = params.get('payload');
  return { raw, payload: payloadStr ? JSON.parse(payloadStr) : null };
}

// A-01의 신·구조문 대비표를 현재 규정 조항 배열에 반영한다.
// (store.js의 updateRegulation()과 동일한 로직 — 클라이언트 SDK 전용 모듈이라 여기서는
//  Admin SDK 버전으로 그대로 재구현한다. 로직을 바꿀 경우 두 곳 모두 함께 수정할 것.)
function applyRevisionsToClauses(currentClauses, revisions) {
  let clauses = [...(currentClauses || [])];
  (revisions || []).forEach(rev => {
    const targetIdx = clauses.findIndex(c => c.clauseId === rev.before);
    const match = (rev.after || '').match(/^(제\d+조[^\n]*)/);
    const newClauseId = match ? match[1].trim() : rev.before || '신설 조항';
    if (targetIdx !== -1) {
      if ((rev.after || '').trim() === '') {
        clauses.splice(targetIdx, 1);
      } else {
        clauses[targetIdx] = { clauseId: newClauseId, text: rev.after };
      }
    } else if ((rev.after || '').trim() !== '') {
      clauses.push({ clauseId: newClauseId, text: rev.after });
    }
  });
  return clauses;
}

function sha256(bytes) {
  return crypto.createHash('sha256').update(Buffer.from(bytes)).digest('hex');
}

// 문서번호는 승인 완료 시점에만 발급한다 (store.js의 generateDocNumber와 동일한 규칙 —
// "기안자 부서-연도-일련번호", 부서+연도 조합별 매년 1부터 재시작). 클라이언트는 브라우저
// Firestore SDK를 쓰므로 서버(Admin SDK) 쪽에 별도로 동일 로직을 둔다.
function computeNextDocNumber(docNumberCounters, department) {
  const dept = (department || '미지정부서').trim();
  const year = new Date().getFullYear();
  const seqKey = `${dept}-${year}`;
  const next = ((docNumberCounters || {})[seqKey] || 0) + 1;
  return { docNumber: `${dept}-${year}-${String(next).padStart(3, '0')}`, seqKey, next };
}

async function uploadPdfToStorage(bucket, path, bytes) {
  const file = bucket.file(path);
  await file.save(Buffer.from(bytes), { contentType: 'application/pdf', resumable: false });
  const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2124' }); // 사실상 영구
  return { path, url };
}

async function respondEphemeral(responseUrl, text) {
  if (!responseUrl) return;
  try {
    await fetch(responseUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response_type: 'ephemeral', replace_original: false, text })
    });
  } catch (e) { /* best-effort */ }
}

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  const timestamp = event.headers['x-slack-request-timestamp'];
  const signature = event.headers['x-slack-signature'];
  const { raw, payload } = parseSlackBody(event);

  const verify = verifySlackSignature({ signingSecret, timestamp, signature, rawBody: raw });
  if (!verify.ok) {
    console.error('[slack_interactions] 서명 검증 실패:', verify.reason);
    // 여기서 막히면 이후 코드의 에러 알림도 못 타므로, 이 단계에서도 직접 알려준다.
    if (payload?.response_url) {
      await respondEphemeral(payload.response_url, `⚠️ Slack 서명 검증 실패: ${verify.reason}\n(관리자에게 SLACK_SIGNING_SECRET 환경변수 설정을 확인해달라고 전달해주세요)`);
    }
    return { statusCode: 401, body: 'Invalid signature' };
  }
  if (!payload) return { statusCode: 400, body: 'Missing payload' };

  // Slack은 3초 안에 응답을 못 받으면 같은 요청을 최대 몇 차례 재전송한다(X-Slack-Retry-Num 헤더로 구분).
  // PDF 생성+업로드가 그보다 오래 걸릴 수 있으므로, 재전송분은 중복 처리(PDF/A-05 행 중복 생성)를
  // 막기 위해 즉시 무시한다 — 최초 요청이 백그라운드로 계속 처리되어 결과는 정상 반영된다.
  if (event.headers['x-slack-retry-num']) {
    console.log('[slack_interactions] Slack 재전송 요청 무시:', event.headers['x-slack-retry-num'], event.headers['x-slack-retry-reason']);
    return { statusCode: 200, body: '' };
  }

  try {
    const db = getAdminDb();
    const globalRef = db.collection('system').doc('globalState');
    const globalSnap = await globalRef.get();
    const globalData = globalSnap.exists ? globalSnap.data() : {};
    const integrations = globalData.integrations || {};
    const approverIds = integrations.slackApproverIds || {};
    const botToken = integrations.slackBotToken || '';
    const api = slackApi(botToken);

    // ── 1) 버튼 클릭 (승인/반려) ──
    if (payload.type === 'block_actions') {
      const action = payload.actions && payload.actions[0];
      if (!action) return { statusCode: 200, body: '' };

      const value = JSON.parse(action.value || '{}');
      const { formId, storageKey, approverRoleLabel, link, visibilityScope } = value;
      const clickerId = payload.user.id;

      // ── 신원 검증: 지정된 결재자 본인만 승인/반려할 수 있다 ──
      const expectedId = approverIds[approverRoleLabel];
      if (expectedId && expectedId !== clickerId) {
        await respondEphemeral(
          payload.response_url,
          `⚠️ 이 문서는 "${approverRoleLabel}"만 승인/반려할 수 있습니다. 관리자 설정에 등록된 결재자 본인 Slack 계정으로 다시 시도해주세요.`
        );
        return { statusCode: 200, body: '' };
      }

      if (action.action_id === 'reject_doc') {
        if (!botToken) {
          await respondEphemeral(payload.response_url, '반려 사유 입력 창을 열려면 관리자 설정에서 Slack Bot Token을 먼저 등록해야 합니다.');
          return { statusCode: 200, body: '' };
        }
        const metadata = JSON.stringify({ ...value, channel: payload.channel.id, messageTs: payload.message.ts });
        await api('views.open', {
          trigger_id: payload.trigger_id,
          view: {
            type: 'modal',
            callback_id: 'reject_reason_modal',
            private_metadata: metadata,
            title: { type: 'plain_text', text: '반려 사유 입력' },
            submit: { type: 'plain_text', text: '반려 확정' },
            close: { type: 'plain_text', text: '취소' },
            blocks: [
              {
                type: 'input', block_id: 'reason_block',
                label: { type: 'plain_text', text: `[${formId}] 반려 사유` },
                element: { type: 'plain_text_input', action_id: 'reason_input', multiline: true }
              }
            ]
          }
        });
        return { statusCode: 200, body: '' };
      }

      if (action.action_id !== 'approve_doc') {
        return { statusCode: 200, body: '' };
      }

      // ── 승인 처리 ──
      const userInfo = botToken ? await api('users.info', { user: clickerId }) : { ok: false };
      const slackUserName = payload.user.name || userInfo?.user?.name || clickerId;
      const approverRealName = userInfo?.ok ? (userInfo.user.real_name || userInfo.user.name) : (payload.user.name || clickerId);
      const nowIso = new Date().toISOString();
      const nowReadable = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      const stamp = { verb: '승인', approverName: approverRealName, roleLabel: approverRoleLabel, slackUserId: clickerId, slackUserName, timestamp: nowReadable };

      const bucket = getAdminBucket();
      const formDataRef = db.collection('formData').doc(storageKey);
      const formSnap = await formDataRef.get();
      const formData = formSnap.exists ? formSnap.data() : {};

      // 문서번호는 승인 완료(=지금)에만 발급한다. 기안자 부서(_createdByDept, 문서 생성 시점에
      // 기록됨) 기준으로 매기며, 이미 발급되어 있으면(재승인 등) 다시 발급하지 않는다.
      let docNumberCounters = globalData.docNumberCounters || {};
      if (!formData.docNumber) {
        const { docNumber, seqKey, next } = computeNextDocNumber(docNumberCounters, formData._createdByDept);
        formData.docNumber = docNumber;
        docNumberCounters = { ...docNumberCounters, [seqKey]: next };
      }

      let updatePatch = { docNumberCounters };
      let pdfButtons = [];
      const filesToShare = []; // { filename, bytes }
      const ledgerEntries = []; // "서명 문서함"에 쌓일 항목들 (getSignedDocuments()가 읽음)

      if (formId === 'A-01') {
        // ── A-01 전용: 차수 자동 부여 + 규정 반영 + 기안문/규정 전문 PDF 이원 생성 ──
        const a05Ref = db.collection('formData').doc('A-05');
        const a05Snap = await a05Ref.get();
        const a05Data = a05Snap.exists ? a05Snap.data() : {};
        const a05Rows = (a05Data.rows || []).filter(r => r && Object.keys(r).length > 0);
        const isNoRevision = !!formData.noRevision;
        const priorRevisions = a05Rows.filter(r => r.type !== '정기검토').length;
        const revisionLabel = isNoRevision ? `현행 유지 (v${priorRevisions} 재확인)` : `v${priorRevisions + 1}`;

        const revisionTable = (formData.tables && formData.tables.revisionTable) || [];
        const { formTitle: a01Title, subtitle: a01Subtitle, fields: a01Fields } = buildPdfFieldsForForm('A-01', formData);

        const draftPdfBytes = await generateSignedDocumentPdf({
          formId: 'A-01', formTitle: a01Title, subtitle: a01Subtitle, fields: a01Fields, stamp
        });
        filesToShare.push({ filename: `A-01_기안문_${revisionLabel}.pdf`, bytes: draftPdfBytes });

        let regulationPdfBytes = null;
        let updatedClauses = globalData.currentRegulation || [];
        if (!isNoRevision && revisionTable.length > 0) {
          updatedClauses = applyRevisionsToClauses(globalData.currentRegulation, revisionTable);
          regulationPdfBytes = await generateSignedDocumentPdf({
            formId: 'REGULATION',
            formTitle: `${globalData.companyInfo?.name || '(주)팝콘사'} 자율수출관리규정 전문`,
            subtitle: `확정 차수: ${revisionLabel}`,
            fields: updatedClauses.map(c => ({ label: c.clauseId, value: c.text })),
            stamp
          });
          filesToShare.push({ filename: `규정전문_${revisionLabel}.pdf`, bytes: regulationPdfBytes });
        }

        const ts = Date.now();
        const draftUpload = await uploadPdfToStorage(bucket, `signed_documents/A-01/${revisionLabel}_${ts}_기안문.pdf`, draftPdfBytes);
        const regUpload = regulationPdfBytes
          ? await uploadPdfToStorage(bucket, `signed_documents/REGULATION/${revisionLabel}_${ts}_규정전문.pdf`, regulationPdfBytes)
          : null;

        const newA05Row = {
          type: isNoRevision ? '정기검토' : (formData.subject || '').includes('개정') ? '개정' : '제정',
          revision: revisionLabel,
          effectiveDate: formData.effectiveDate || new Date().toISOString().split('T')[0],
          reason: formData.subject || '',
          approver: approverRealName,
          handler: formData.drafter || '',
          approvedVia: 'slack',
          approvedBy: { name: approverRealName, slackUserId: clickerId, slackUserName },
          approvedAt: nowIso,
          signedPdfs: {
            draftPdfUrl: draftUpload.url, draftPdfPath: draftUpload.path,
            regulationPdfUrl: regUpload?.url || null, regulationPdfPath: regUpload?.path || null
          }
        };
        const newA05Rows = [...a05Rows, newA05Row];
        await a05Ref.set({ ...a05Data, rows: newA05Rows }, { merge: true });

        ledgerEntries.push({
          formId: 'A-01', storageKey, formTitle: a01Title, revision: revisionLabel,
          docNumber: formData.docNumber || '',
          drafter: formData.drafter || '', approver: approverRealName, approverRoleLabel,
          draftDate: formData.draftDate || '', approvedAt: nowIso, signedVia: 'slack',
          visibilityScope: formData.visibilityScope || 'public', createdByUid: formData._createdByUid || '', approverSlackUserId: clickerId,
          pdfUrl: draftUpload.url, pdfPath: draftUpload.path, sha256: sha256(draftPdfBytes)
        });
        if (regUpload) {
          ledgerEntries.push({
            formId: 'REGULATION', storageKey: 'REGULATION', formTitle: '자율수출관리규정 전문', revision: revisionLabel,
            docNumber: formData.docNumber || '',
            drafter: formData.drafter || '', approver: approverRealName, approverRoleLabel,
            draftDate: formData.draftDate || '', approvedAt: nowIso, signedVia: 'slack',
            visibilityScope: formData.visibilityScope || 'public', createdByUid: formData._createdByUid || '', approverSlackUserId: clickerId,
            pdfUrl: regUpload.url, pdfPath: regUpload.path, sha256: sha256(regulationPdfBytes)
          });
        }

        const a01Update = {
          ...formData,
          signatureInfo: { name: approverRealName, department: approverRoleLabel, slackUserId: clickerId, slackUserName, timestamp: nowReadable, timestampISO: nowIso, signedVia: 'slack' },
          signedPdfMeta: { storagePath: draftUpload.path, downloadURL: draftUpload.url, sha256: sha256(draftPdfBytes), generatedAt: nowIso }
        };
        await formDataRef.set(a01Update);

        updatePatch = {
          ...updatePatch,
          [`formData.${storageKey}`]: a01Update,
          ['formData.A-05']: { ...a05Data, rows: newA05Rows },
          ...(regulationPdfBytes ? { currentRegulation: updatedClauses } : {})
        };

        pdfButtons = [
          { type: 'button', action_id: 'view_signed_pdf', text: { type: 'plain_text', text: '📄 기안문 서명본 확인' }, url: draftUpload.url },
          ...(regUpload ? [{ type: 'button', action_id: 'view_regulation_pdf', text: { type: 'plain_text', text: '📖 규정 전문 확인' }, url: regUpload.url }] : [])
        ];
      } else {
        // ── 일반 서식: 단일 PDF 생성 후 서명 처리 ──
        const { formTitle, subtitle, fields } = buildPdfFieldsForForm(formId, formData);
        const pdfBytes = await generateSignedDocumentPdf({ formId, formTitle, subtitle, fields, stamp });
        filesToShare.push({ filename: `${formId}_서명본.pdf`, bytes: pdfBytes });

        const ts = Date.now();
        const upload = await uploadPdfToStorage(bucket, `signed_documents/${formId}/${storageKey}_${ts}.pdf`, pdfBytes);

        const updated = {
          ...formData,
          signatureInfo: { name: approverRealName, department: approverRoleLabel, slackUserId: clickerId, slackUserName, timestamp: nowReadable, timestampISO: nowIso, signedVia: 'slack' },
          signedPdfMeta: { storagePath: upload.path, downloadURL: upload.url, sha256: sha256(pdfBytes), generatedAt: nowIso }
        };
        await formDataRef.set(updated);
        updatePatch = { ...updatePatch, [`formData.${storageKey}`]: updated };
        pdfButtons = [{ type: 'button', action_id: 'view_signed_pdf', text: { type: 'plain_text', text: '📄 서명본 PDF 확인' }, url: upload.url }];

        ledgerEntries.push({
          formId, storageKey, formTitle,
          docNumber: formData.docNumber || '',
          drafter: formData._createdBy || '', approver: approverRealName, approverRoleLabel,
          approvedAt: nowIso, signedVia: 'slack',
          visibilityScope: formData.visibilityScope || 'public', createdByUid: formData._createdByUid || '', approverSlackUserId: clickerId,
          pdfUrl: upload.url, pdfPath: upload.path, sha256: sha256(pdfBytes)
        });
      }

      if (ledgerEntries.length > 0) {
        updatePatch.signedDocuments = [...(globalData.signedDocuments || []), ...ledgerEntries];
      }
      await globalRef.set(updatePatch, { merge: true });

      if (botToken) {
        await api('chat.update', {
          channel: payload.channel.id,
          ts: payload.message.ts,
          text: `✅ [${formId}] 승인 완료`,
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: `✅ *[${formId}] 승인 완료*\n승인자: ${approverRealName} (${approverRoleLabel}) · ${nowReadable}` } },
            { type: 'actions', elements: [...pdfButtons, ...(link ? [{ type: 'button', action_id: 'open_in_app', text: { type: 'plain_text', text: '앱에서 보기' }, url: link }] : [])] }
          ]
        });

        // Slack 채널 안에서 바로 미리보기가 되도록 실제 파일도 첨부
        for (const f of filesToShare) {
          await shareSlackFile(botToken, payload.channel.id, f.filename, f.bytes, `[${formId}] 승인 완료 — ${nowReadable}`);
        }

        // [공개범위별 추가 게시] private은 이미 위에서 결재자(+기안자) DM으로 충분하므로 추가 동작 없음.
        //  - department: 자율수출관리기구 전용 채널(slackOrgChannelId)
        //  - public: 전사 공지 채널(slackAnnounceChannelId)
        const broadcastTargets = {
          department: { channelId: integrations.slackOrgChannelId, label: '기구 공개' },
          public: { channelId: integrations.slackAnnounceChannelId, label: '전 직원 공지' }
        };
        const target = broadcastTargets[visibilityScope];
        if (target) {
          if (target.channelId) {
            for (const f of filesToShare) {
              await shareSlackFile(botToken, target.channelId, f.filename, f.bytes, `📢 [${formId}] ${formData.docNumber ? formData.docNumber + ' ' : ''}승인 완료 (${target.label}) — 승인자: ${approverRealName} (${approverRoleLabel}) · ${nowReadable}`);
            }
          } else {
            console.warn(`[slack_interactions] visibilityScope=${visibilityScope}이지만 해당 채널 ID가 설정되지 않아 게시를 건너뜀`);
          }
        }
      }

      return { statusCode: 200, body: '' };
    }

    // ── 2) 반려 사유 모달 제출 ──
    if (payload.type === 'view_submission' && payload.view.callback_id === 'reject_reason_modal') {
      const meta = JSON.parse(payload.view.private_metadata || '{}');
      const { formId, storageKey, approverRoleLabel, channel, messageTs } = meta;
      const reason = payload.view.state.values.reason_block.reason_input.value || '(사유 미기재)';
      const clickerId = payload.user.id;

      const expectedId = approverIds[approverRoleLabel];
      if (expectedId && expectedId !== clickerId) {
        return { statusCode: 200, body: '' }; // 신원 불일치 — 버튼 단계에서 이미 걸러졌어야 하므로 조용히 무시
      }

      const userInfo = botToken ? await api('users.info', { user: clickerId }) : { ok: false };
      const slackUserName = payload.user.name || userInfo?.user?.name || clickerId;
      const approverRealName = userInfo?.ok ? (userInfo.user.real_name || userInfo.user.name) : (payload.user.name || clickerId);
      const nowIso = new Date().toISOString();
      const nowReadable = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

      const formDataRef = db.collection('formData').doc(storageKey);
      const formSnap = await formDataRef.get();
      const formData = formSnap.exists ? formSnap.data() : {};
      const updated = {
        ...formData,
        rejectionInfo: { name: approverRealName, roleLabel: approverRoleLabel, slackUserId: clickerId, slackUserName, reason, timestamp: nowReadable, timestampISO: nowIso }
      };
      await formDataRef.set(updated);
      await globalRef.set({ [`formData.${storageKey}`]: updated }, { merge: true });

      if (botToken && channel && messageTs) {
        await api('chat.update', {
          channel, ts: messageTs,
          text: `❌ [${formId}] 반려됨`,
          blocks: [
            { type: 'section', text: { type: 'mrkdwn', text: `❌ *[${formId}] 반려됨*\n반려자: ${approverRealName} (${approverRoleLabel}) · ${nowReadable}\n사유: ${reason}` } }
          ]
        });
      }

      return { statusCode: 200, body: '' };
    }

    return { statusCode: 200, body: '' };
  } catch (error) {
    console.error('[slack_interactions] 처리 중 오류:', error);
    // Slack에는 항상 200을 줘서 재시도 폭주를 막되, 실패 자체는 클릭한 사람에게 바로 보여준다
    // (본인에게만 보이는 ephemeral 메시지) — 로그를 따로 뒤져야만 실패를 알 수 있던 문제를 해결.
    try {
      if (payload?.response_url) {
        await respondEphemeral(
          payload.response_url,
          `⚠️ 처리 중 오류가 발생해 승인/반려가 완료되지 못했습니다.\n\`\`\`${String(error?.message || error).slice(0, 500)}\`\`\`\n관리자에게 이 메시지를 전달해주세요.`
        );
      }
    } catch (e2) { /* 에러 보고 자체가 실패해도 무시 */ }
    return { statusCode: 200, body: '' };
  }
};
