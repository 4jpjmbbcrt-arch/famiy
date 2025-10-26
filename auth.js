// שמירת משתמשים ב־localStorage (להדגמה בלבד, לא לאבטחה אמיתית!)
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// סיסמא למנהל
const ADMIN_SECRET = "1209";

// הרשמה
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const roleSelect = document.getElementById('role');
    const role = roleSelect ? roleSelect.value : "child";
    const adminCodeInput = document.getElementById('adminCode');
    const adminCode = adminCodeInput ? adminCodeInput.value.trim() : "";

    if (!username || !password) {
      showMessage('אנא מלא את כל השדות', 'error');
      return;
    }

    const users = getUsers();
    if (users[username]) {
      showMessage('שם המשתמש כבר קיים', 'error');
      return;
    }

    // אם נבחר מנהל, נבדוק את סיסמא המנהל
    let finalRole = role;
    if (role === 'admin') {
      if (adminCode !== ADMIN_SECRET) {
        showMessage('סיסמא למנהל שגויה! אינך יכול להירשם כמנהל.', 'error');
        return;
      }
    }

    users[username] = { password, role: finalRole };
    saveUsers(users);

    showMessage('הרשמה הצליחה! ניתן להתחבר כעת.', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
}

// כניסה
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      showMessage('אנא מלא את כל השדות', 'error');
      return;
    }

    const users = getUsers();
    if (!users[username] || users[username].password !== password) {
      showMessage('שם משתמש או סיסמה שגויים', 'error');
      return;
    }

    // שמירת המידע המלא של המשתמש המחובר ב-sessionStorage
    sessionStorage.setItem('loggedUser', JSON.stringify({ username, role: users[username].role }));

    // הפנייה לפי תפקיד
    const role = users[username].role;
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'home.html';
    }
  });
}

// פונקציית הצגת הודעות
function showMessage(msg, type) {
  const msgDiv = document.getElementById('message');
  if (!msgDiv) return;
  msgDiv.textContent = msg;
  msgDiv.className = 'message ' + (type === 'error' ? 'error' : 'success');
}

// הצגת שדה קוד סודי רק אם נבחר מנהל
const roleSelect = document.getElementById("role");
const adminCodeContainer = document.getElementById("adminCodeContainer");
if (roleSelect && adminCodeContainer) {
  roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "admin") {
      adminCodeContainer.style.display = "block";
    } else {
      adminCodeContainer.style.display = "none";
    }
  });
}
