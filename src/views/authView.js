import { auth, db } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { customAlert } from '../utils/dialog.js';

export function renderAuthView(container, onLoginSuccess) {
  let isLoginMode = true;

  function render() {
    container.innerHTML = `
      <div class="fade-in" style="display:flex; justify-content:center; align-items:center; min-height:80vh;">
        <div class="card" style="width:100%; max-width:450px; padding:var(--space-xl);">
          <div style="text-align:center; margin-bottom:var(--space-lg);">
            <h2 style="font-size:1.5rem; margin-bottom:var(--space-xs);">${isLoginMode ? 'CP Manager 로그인' : 'CP Manager 가입 요청'}</h2>
            <p style="color:var(--text-secondary); font-size:0.9rem;">
              ${isLoginMode ? '가입하신 이메일과 비밀번호로 로그인하세요.' : '자율준수무역(CP) 시스템 접근을 위한 계정을 생성합니다.'}
            </p>
          </div>
          
          <form id="auth-form" style="display:flex; flex-direction:column; gap:var(--space-md);">
            <div class="form-group">
              <label class="form-label">이메일 주소</label>
              <input type="email" id="auth-email" class="form-input" required placeholder="name@company.com">
            </div>
            
            ${!isLoginMode ? `
            <div class="form-group">
              <label class="form-label">사번 (Emp ID)</label>
              <input type="text" id="auth-empid" class="form-input" required placeholder="예: 2026001">
            </div>
            <div class="form-group">
              <label class="form-label">이름</label>
              <input type="text" id="auth-name" class="form-input" required placeholder="예: 홍길동">
            </div>
            <div class="form-group">
              <label class="form-label">소속 부서</label>
              <select id="auth-dept" class="form-input" required>
                <option value="해외영업팀">해외영업팀</option>
                <option value="연구개발팀">연구개발팀</option>
                <option value="수출통제팀">수출통제팀</option>
                <option value="물류팀">물류팀</option>
                <option value="경영지원팀">경영지원팀</option>
                <option value="자율수출관리부서">자율수출관리부서</option>
              </select>
            </div>
            ` : ''}
            
            <div class="form-group">
              <label class="form-label">비밀번호</label>
              <input type="password" id="auth-password" class="form-input" required placeholder="••••••••">
            </div>
            <div id="auth-error" style="color:var(--accent-red); font-size:0.85rem; display:none;"></div>
            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding:12px;">
              ${isLoginMode ? '로그인' : '가입 요청하기'}
            </button>
          </form>
          
          <div style="text-align:center; margin-top:var(--space-lg); font-size:0.9rem;">
            ${isLoginMode ? 
              `계정이 없으신가요? <a href="#" id="toggle-mode" style="color:var(--accent-blue);">가입하기</a>` : 
              `이미 가입하셨나요? <a href="#" id="toggle-mode" style="color:var(--accent-blue);">로그인</a>`
            }
          </div>
        </div>
      </div>
    `;

    document.getElementById('toggle-mode').addEventListener('click', (e) => {
      e.preventDefault();
      isLoginMode = !isLoginMode;
      render();
    });

    document.getElementById('auth-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const errorDiv = document.getElementById('auth-error');
      
      errorDiv.style.display = 'none';

      try {
        if (isLoginMode) {
          // Login
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Check role
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'PENDING') {
              await auth.signOut();
              throw new Error("관리자의 승인이 대기 중입니다. 관리자에게 문의하세요.");
            }
            if (!userData.uid) userData.uid = user.uid;
            onLoginSuccess(userData);
          } else {
            // Document doesn't exist
            const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
            if (email === adminEmail) {
              // Auto-recover Admin doc
              const newUserData = { email: email, role: 'Master', name: '최고관리자', empId: 'admin', department: '자율수출관리부서', createdAt: new Date().toISOString() };
              await setDoc(doc(db, 'users', user.uid), newUserData);
              await customAlert("권한 복구", "최고 관리자 권한이 복구되었습니다.", "success");
              onLoginSuccess(newUserData);
            } else {
              await auth.signOut();
              throw new Error("사용자 정보를 찾을 수 없습니다. 다시 가입 요청해주세요.");
            }
          }

        } else {
          // Signup
          const name = document.getElementById('auth-name').value.trim();
          const department = document.getElementById('auth-dept').value;
          const empId = document.getElementById('auth-empid').value.trim();
          
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Determine initial role
          const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
          const role = (email === adminEmail) ? 'Master' : 'PENDING';
          
          // Save to Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email: email,
            role: role,
            name: name,
            department: department,
            empId: empId,
            uid: user.uid,
            createdAt: new Date().toISOString()
          });

          if (role === 'PENDING') {
            await auth.signOut();
            await customAlert("가입 신청 완료", "가입이 완료되었습니다.\\n관리자의 승인을 기다려주세요.", "info");
            isLoginMode = true;
            render();
          } else {
            await customAlert("가입 완료", "최고관리자 계정으로 가입되었습니다!", "success");
            onLoginSuccess({ email, role, name, department, empId, uid: user.uid });
          }
        }
      } catch (err) {
        let msg = "오류가 발생했습니다.";
        if (err.code === 'auth/invalid-credential') msg = "이메일 또는 비밀번호가 올바르지 않습니다.";
        else if (err.code === 'auth/email-already-in-use') msg = "이미 가입된 이메일입니다.";
        else if (err.message) msg = err.message;
        
        errorDiv.textContent = msg;
        errorDiv.style.display = 'block';
      }
    });
  }

  render();
}
