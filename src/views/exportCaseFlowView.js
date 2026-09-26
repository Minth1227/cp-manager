export function renderExportCaseFlowView(container) {
  const html = `
    <div style="padding: 24px; max-width: 1000px; margin: 0 auto; color: var(--text-primary); animation: fadeIn 0.3s ease;">
      
      <div style="margin-bottom: 32px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--primary-color); display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <span class="material-symbols-rounded" style="font-size: 28px; color: var(--accent-red);">work</span>
          수출 거래(Export Case) 중심 업무 프로세스
        </h1>
        <p style="color: var(--text-secondary); line-height: 1.6;">
          당사의 전략물자 자율수출관리는 <strong>'제품'</strong>과 <strong>'수출 거래'</strong>를 독립된 프로젝트(Export Case)로 묶어 평가하는 유연한 아키텍처를 채택하고 있습니다.<br/>
          아래는 신규 수출 건 발생 시 시스템이 서류를 생성하고 동기화하는 시각적 워크플로우입니다.
        </p>
      </div>

      <!-- Visual Architecture Diagram -->
      <div style="background: white; border-radius: 12px; padding: 40px; border: 1px solid var(--border-color); box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow-x: auto;">
        
        <div style="display: flex; flex-direction: column; align-items: center; min-width: 700px;">
          
          <!-- Top Row: Global & DB -->
          <div style="display: flex; justify-content: center; gap: 60px; width: 100%; margin-bottom: 40px;">
            
            <!-- Global CP System -->
            <div style="flex: 1; max-width: 300px; background: #f8fafc; border: 2px dashed #94a3b8; border-radius: 12px; padding: 20px; text-align: center;">
              <h3 style="color: #475569; font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span class="material-symbols-rounded">corporate_fare</span> 전사 공통 체계
              </h3>
              <div style="font-size: 0.85rem; color: #64748b; line-height: 1.6;">
                사내 규정 (A-01 ~ A-05)<br/>
                기구 조직도 (A-06)<br/>
                대표이사 선언 (B-01)
              </div>
            </div>

            <!-- Product DB -->
            <div style="flex: 1; max-width: 300px; background: #f0fdf4; border: 2px solid #4ade80; border-radius: 12px; padding: 20px; text-align: center; position: relative;">
              <h3 style="color: #166534; font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span class="material-symbols-rounded">database</span> 제품 사양 DB
              </h3>
              <div style="font-size: 0.85rem; color: #15803d; line-height: 1.6;">
                제품 A (기본 스펙)<br/>
                제품 B (기본 스펙)
              </div>
              <div style="position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); color: #4ade80; font-size: 24px;">
                <span class="material-symbols-rounded">arrow_downward</span>
              </div>
            </div>

          </div>

          <!-- Middle Row: Export Case Creation -->
          <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; width: 100%; max-width: 800px; margin-bottom: 40px; position: relative;">
            
            <!-- Link from Global -->
            <div style="position: absolute; top: -30px; left: 150px; border-left: 2px dashed #94a3b8; height: 30px;"></div>
            
            <h2 style="color: #1e3a8a; font-size: 1.2rem; font-weight: 800; margin-bottom: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span class="material-symbols-rounded" style="color: #3b82f6;">rocket_launch</span>
              수출 거래 (Export Case) 중심 평가 영역
            </h2>

            <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
              
              <div style="flex: 1; background: white; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-weight: 700; color: #3b82f6; margin-bottom: 8px;">Step 1. 정보 Pull</div>
                <div style="font-size: 0.85rem; color: #475569;">새 수출건 등록 시<br/>제품 DB 사양 복사</div>
              </div>
              
              <span class="material-symbols-rounded" style="color: #93c5fd; font-size: 32px;">arrow_forward</span>
              
              <div style="flex: 1.5; background: white; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-weight: 700; color: #b45309; margin-bottom: 8px;">Step 2. 거래별 진단 (Z-01)</div>
                <div style="font-size: 0.85rem; color: #475569;">국가, 바이어, 특수사양 등<br/>해당 건에 맞춘 새로운 평가 실시</div>
              </div>

              <span class="material-symbols-rounded" style="color: #93c5fd; font-size: 32px;">arrow_forward</span>

              <div style="flex: 1.5; background: white; border: 2px solid #ef4444; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-weight: 700; color: #b91c1c; margin-bottom: 8px;">Step 3. 자동 필터링</div>
                <div style="font-size: 0.85rem; color: #475569;">G-01, L-05 등 필수 서류만 활성화<br/>(불필요 서류는 N/A 처리 동기화)</div>
              </div>

            </div>
          </div>

          <!-- Bottom Row: Specific Cases -->
          <div style="display: flex; justify-content: center; gap: 40px; width: 100%;">
            
            <div style="flex: 1; max-width: 350px; text-align: center;">
              <div style="color: #94a3b8; margin-bottom: 10px;">
                <span class="material-symbols-rounded" style="font-size: 32px;">arrow_downward</span>
              </div>
              <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="background: #f1f5f9; padding: 12px; border-bottom: 1px solid #cbd5e1; font-weight: 700; color: #334155;">
                  수출건 1: 제품 A ➔ 🇩🇪 독일 납품
                </div>
                <div style="padding: 16px; font-size: 0.85rem; text-align: left; color: #475569;">
                  <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li><strong>Z-01 결과:</strong> '가' 지역, 상황허가 면제</li>
                    <li><strong>생성 서류:</strong> G-01(간이), H-01</li>
                    <li><strong style="color:#94a3b8;">N/A 처리:</strong> L-01(수출허가) 등</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style="flex: 1; max-width: 350px; text-align: center;">
              <div style="color: #94a3b8; margin-bottom: 10px;">
                <span class="material-symbols-rounded" style="font-size: 32px;">arrow_downward</span>
              </div>
              <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="background: #f1f5f9; padding: 12px; border-bottom: 1px solid #cbd5e1; font-weight: 700; color: #334155;">
                  수출건 2: 제품 A ➔ 🇻🇳 베트남 납품
                </div>
                <div style="padding: 16px; font-size: 0.85rem; text-align: left; color: #475569;">
                  <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li><strong>Z-01 결과:</strong> '나의1' 지역</li>
                    <li><strong>생성 서류:</strong> G-01, L-01, L-05</li>
                    <li><strong style="color:#94a3b8;">N/A 처리:</strong> H-01(교차검증) 등</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      
    </div>
  `;
  container.innerHTML = html;
}
