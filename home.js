// בדיקה אם המשתמש מחובר
const userStr = sessionStorage.getItem('loggedUser');
if (!userStr) {
  alert('אין לך הרשאה להיכנס. אנא התחבר או הרשם.');
  window.location.href = 'login.html';
} else {
  const user = JSON.parse(userStr);

  // הצגת שם המשתמש בברכה
  document.getElementById('welcomeMsg').textContent = `שלום, ${user.username}!`;

  // הצגת תאריך נוכחי בעברית
  function getHebrewDate() {
    const now = new Date();
    return now.toLocaleDateString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  document.getElementById('date').textContent = getHebrewDate();

  // כפתור מנהל מוצג רק אם המשתמש admin
  const adminBtn = document.getElementById('adminBtn');
  if (user.role !== 'admin') {
    adminBtn.style.display = 'none';
  } else {
    adminBtn.addEventListener('click', () => {
      window.location.href = 'admin.html';
    });
  }

  // שאר כפתורי ניווט
  document.getElementById('tasksBtn').addEventListener('click', () => { window.location.href = 'tasks.html'; });
  document.getElementById('chatBtn').addEventListener('click', () => { window.location.href = 'chat.html'; });
  document.getElementById('profileBtn').addEventListener('click', () => { window.location.href = 'profile.html'; });
  document.getElementById('sendBtn').addEventListener('click', () => { window.location.href = 'messages.html'; });
  document.getElementById('reaminderBtn').addEventListener('click', () => { window.location.href = 'calendar.html'; });
  document.getElementById('mesionBtn').addEventListener('click', () => { window.location.href = 'family-tasks.html'; });
  document.getElementById('RecipeBtn').addEventListener('click', () => { window.location.href = 'family-recipes.html'; });
  document.getElementById('guroBtn').addEventListener('click', () => { window.location.href = 'guru.html'; });
  document.getElementById('botBtn').addEventListener('click', () => { window.location.href = 'familybot.html'; });

  // התנתקות
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedUser');
    window.location.href = 'login.html';
  });

  // תפריט המבורגר
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && e.target !== menuBtn) {
      menu.classList.remove('show');
    }
  });
}
