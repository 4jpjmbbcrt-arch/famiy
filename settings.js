const user = sessionStorage.getItem('loggedUser');
if (!user) {
  alert('אין לך הרשאה להיכנס. אנא התחבר או הרשם.');
  window.location.href = 'login.html';
}

// דומ אלמנטים
const changePasswordForm = document.getElementById('changePasswordForm');
const logoutBtn = document.getElementById('logoutBtn');
const deleteProfileBtn = document.getElementById('deleteProfileBtn');
const themeRadios = document.querySelectorAll('input[name="theme"]');

// -- טעינת סיסמה שמורה --
const passwordKey = `password_${user}`;

function getPassword() {
  return localStorage.getItem(passwordKey);
}

function setPassword(newPass) {
  localStorage.setItem(passwordKey, newPass);
}

// שינוי סיסמה
changePasswordForm.addEventListener('submit', e => {
  e.preventDefault();

  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (current !== getPassword()) {
    alert('הסיסמה הנוכחית לא נכונה');
    return;
  }

  if (newPass.length < 4) {
    alert('הסיסמה החדשה חייבת להכיל לפחות 4 תווים');
    return;
  }

  if (newPass !== confirm) {
    alert('הסיסמה החדשה ואימות הסיסמה לא תואמים');
    return;
  }

  setPassword(newPass);
  alert('הסיסמה שונתה בהצלחה');
  changePasswordForm.reset();
});

// התנתקות
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('loggedUser');
  alert('התנתקת בהצלחה');
  window.location.href = 'login.html';
});

// מחיקת פרופיל (מוחק פרופיל, סיסמה ונתוני משתמש)
deleteProfileBtn.addEventListener('click', () => {
  const confirmDel = confirm('האם אתה בטוח שברצונך למחוק את הפרופיל שלך? פעולה זו לא ניתנת לביטול.');
  if (!confirmDel) return;

  // מחיקת פרופיל
  localStorage.removeItem(`profile_${user}`);
  localStorage.removeItem(passwordKey);

  // התנתקות אוטומטית
  sessionStorage.removeItem('loggedUser');
  alert('הפרופיל נמחק בהצלחה');
  window.location.href = 'login.html';
});

// טעינת ערכת צבעים
function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  themeRadios.forEach(radio => {
    radio.checked = radio.value === theme;
  });
  applyTheme(theme);
}

// שמירת ערכת צבעים ושינוי מיידי
themeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    localStorage.setItem('theme', radio.value);
    applyTheme(radio.value);
  });
});

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#222';
    document.body.style.color = '#eee';
  } else {
    document.body.style.backgroundColor = '#f9f9f9';
    document.body.style.color = '#333';
  }
}

loadTheme();








const backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', () => {
  window.location.href = 'home.html'; // 
});
