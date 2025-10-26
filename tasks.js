// רשימת מטלות לדוגמה - אפשר להוסיף או לשנות
const tasks = [
  'שטיפת כלים',
  'ניקיון המטבח',
  'פינוי זבל',
  'סידור חדרים',
  'הכנת אוכל',
  'קיפול כביסה',
   ' לפנות בגדים מהאבטיה',
  ' לתלות כביסה',
  ' לפנות מדיח',
];

// בדיקת הרשאה - משתמש מחובר
const user = sessionStorage.getItem('loggedUser');
if (!user) {
  alert('אין לך הרשאה להיכנס. אנא התחבר או הרשם.');
  window.location.href = 'login.html';
}

// key לאחסון מטלות לפי משתמש
const STORAGE_KEY = `tasksStatus_${user}`;

// לטעון מטלות שמורות או ליצור רשימה חדשה ריקה
function loadTasksStatus() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return Array(tasks.length).fill(false);
  try {
    return JSON.parse(saved);
  } catch {
    return Array(tasks.length).fill(false);
  }
}

// לשמור סטטוס מטלות
function saveTasksStatus(statusArr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(statusArr));
}

// פונקציה לבדוק אם יש צורך לאפס את המטלות (כל 24 שעות)
function checkResetTasks() {
  const lastReset = localStorage.getItem('tasksLastReset');
  const now = new Date().getTime();

  if (!lastReset || now - lastReset > 24 * 60 * 60 * 1000) {
    // איפוס המטלות
    localStorage.setItem('tasksLastReset', now);
    localStorage.removeItem(STORAGE_KEY);
  }
}

// הצגת המטלות עם מצב סימון
function renderTasks() {
  const listEl = document.getElementById('tasksList');
  listEl.innerHTML = '';
  const status = loadTasksStatus();

  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.classList.toggle('completed', status[idx]);
    li.addEventListener('click', () => {
      status[idx] = !status[idx];
      saveTasksStatus(status);
      li.classList.toggle('completed');
    });
    listEl.appendChild(li);
  });
}

// איפוס המטלות על לחיצה
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('האם אתה בטוח שברצונך לאפס את כל המטלות ליום חדש?')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('tasksLastReset', new Date().getTime());
    renderTasks();
  }
});

// כפתור חזרה לדף הבית
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'home.html';
});

// פעולות התחלתיות
checkResetTasks();
renderTasks();
