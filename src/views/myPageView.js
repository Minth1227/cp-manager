import { getCurrentUser } from '../store.js';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import { customAlert } from '../utils/dialog.js';

export function renderMyPageView(container) {
  const user = getCurrentUser();
  
  if (!user) {
    container.innerHTML = `<div style="padding:20px;">로그인이 필요합니다.</div>`;
    return;
  }

  let roleDesc = '';
  if (user.role === 'Master' || user.role === 'ADMIN') roleDesc = '최고관리자 (전체 권한 및 사용자 승인 가능)';
  else if (user.role === 'Reviewer' || user.role === 'EDITOR') roleDesc = '심사자 (수출통제 심사 및 승인 가능)';
  else roleDesc = '일반 (수출 서류 작성 및 조회 가능)';

  const empId = user.empId || '';
  const name = user.name || '';
  const department = user.department || '해외영업팀';

  const isMissingInfo = (!empId || !name);

  container.innerHTML = `
    <div class="fade-in" style="max-width:800px; margin:0 auto; padding:var(--space-xl) 0;">
      <div class="page-header" style="margin-bottom:var(--space-xl);">
        <h2 style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded" style="color:var(--primary-color); font-size:2rem;">person</span>
          마이페이지 (프로필 및 권한)
        </h2>
        <p>본인의 기본 정보와 부여된 CP 권한을 확인하고 수정할 수 있습니다.</p>
      </div>
      
      ${isMissingInfo ? `
      <div style="background:var(--accent-red); color:white; padding:16px; border-radius:8px; margin-bottom:20px; display:flex; align-items:center; gap:8px; font-weight:600;">
        <span class="material-symbols-rounded">warning</span>
        사번과 이름을 필수로 입력해 주셔야 시스템을 이용할 수 있습니다.
      </div>
      ` : ''}

      <div class="card" style="padding:var(--space-xl);">
        <form id="mypage-form" style="display:flex; flex-direction:column; gap:var(--space-lg);">
          
          <div style="background:var(--bg-secondary); padding:var(--space-md); border-radius:8px; display:flex; align-items:center; gap:16px;">
            <div style="background:var(--primary-color); color:white; width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold;">
              ${name ? name.charAt(0) : 'U'}
            </div>
            <div>
              <div style="font-weight:600; font-size:1.1rem; color:var(--text-primary);">${name || '이름 미설정'} <span style="font-size:0.85rem; color:var(--text-secondary); font-weight:normal;">(${empId || '사번 미설정'})</span></div>
              <div style="color:var(--text-secondary); font-size:0.9rem; margin-top:4px;">${department} / <span style="color:var(--accent-purple); font-weight:600;">${user.role}</span></div>
              <div style="color:var(--text-tertiary); font-size:0.8rem; margin-top:2px;">이메일: ${user.email}</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg);">
            <div class="form-group">
              <label class="form-label">사번 (Emp ID)</label>
              <input type="text" id="mypage-empid" class="form-input" value="${empId}" ${empId ? 'readonly style="background:var(--bg-secondary); color:var(--text-tertiary);"' : 'required placeholder="예: 2026001"'}>
              ${empId ? '<div style="font-size:0.8rem; color:var(--text-tertiary); margin-top:4px;">사번은 수정할 수 없습니다.</div>' : ''}
            </div>
            
            <div class="form-group">
              <label class="form-label">현재 CP 권한 (수정 불가)</label>
              <input type="text" class="form-input" value="${roleDesc}" readonly style="background:var(--bg-secondary); color:var(--text-tertiary);">
              <div style="font-size:0.8rem; color:var(--text-tertiary); margin-top:4px;">권한 변경은 CP 마스터에게 문의하세요.</div>
            </div>
          </div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg);">
            <div class="form-group">
              <label class="form-label">이름</label>
              <input type="text" id="mypage-name" class="form-input" value="${name}" required placeholder="예: 홍길동">
            </div>
            
            <div class="form-group">
              <label class="form-label">소속 부서</label>
              <select id="mypage-dept" class="form-input" required>
                <option value="해외영업팀" ${department === '해외영업팀' ? 'selected' : ''}>해외영업팀</option>
                <option value="연구개발팀" ${department === '연구개발팀' ? 'selected' : ''}>연구개발팀</option>
                <option value="수출통제팀" ${department === '수출통제팀' ? 'selected' : ''}>수출통제팀</option>
                <option value="물류팀" ${department === '물류팀' ? 'selected' : ''}>물류팀</option>
                <option value="경영지원팀" ${department === '경영지원팀' ? 'selected' : ''}>경영지원팀</option>
                <option value="자율수출관리부서" ${department === '자율수출관리부서' ? 'selected' : ''}>자율수출관리부서</option>
              </select>
            </div>
          </div>
          
          <div class="form-group" style="margin-top:var(--space-md); border-top:1px solid var(--border-color); padding-top:var(--space-md);">
            <button type="submit" class="btn btn-primary" id="btn-save-mypage" style="align-self:flex-start; padding:10px 24px;">변경사항 저장</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('mypage-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-save-mypage');
    btn.textContent = '저장 중...';
    btn.disabled = true;

    try {
      const newName = document.getElementById('mypage-name').value.trim();
      const newDept = document.getElementById('mypage-dept').value;
      const newEmpId = document.getElementById('mypage-empid').value.trim();
      
      const updateData = {
        name: newName,
        department: newDept
      };

      if (!empId) {
        updateData.empId = newEmpId;
      }

      await updateDoc(doc(db, 'users', user.uid), updateData);
      
      // Update local memory user reference to avoid re-login requirement
      user.name = newName;
      user.department = newDept;
      if (!user.empId) user.empId = newEmpId;

      await customAlert('저장 완료', '개인정보가 성공적으로 업데이트되었습니다.', 'success');
      
      if (window.appRouter && window.appRouter.navigate) {
        window.appRouter.navigate('myPage');
      }
    } catch (err) {
      console.error(err);
      await customAlert('오류 발생', '정보 저장 중 오류가 발생했습니다: ' + err.message, 'error');
    } finally {
      btn.textContent = '변경사항 저장';
      btn.disabled = false;
    }
  });
}
