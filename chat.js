// בדיקת משתמש מחובר
const user = sessionStorage.getItem('loggedUser');
if (!user) {
  alert('אין לך הרשאה להיכנס. אנא התחבר או הרשם.');
  window.location.href = 'login.html';
}

// key לאחסון הודעות
const STORAGE_KEY = 'familyChatMessages';

// בדיקת איפוס הודעות כל 24 שעות
function checkResetChat() {
  const lastReset = localStorage.getItem('chatLastReset');
  const now = Date.now();

  if (!lastReset || now - lastReset > 24 * 60 * 60 * 1000) {
    localStorage.setItem('chatLastReset', now);
    localStorage.removeItem(STORAGE_KEY);
  }
}

// טעינת הודעות מה־localStorage
function loadMessages() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

// שמירת הודעות
function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// הצגת הודעות בצ'אט
function renderMessages() {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message');

    const userEl = document.createElement('div');
    userEl.classList.add('user');
    userEl.textContent = msg.user;

    const textEl = document.createElement('div');
    textEl.classList.add('text');
    textEl.textContent = msg.text;

    div.appendChild(userEl);
    div.appendChild(textEl);

    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// טיפול בשליחת הודעה חדשה
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

let messages = [];

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  const newMsg = {
    user,
    text,
    timestamp: Date.now(),
  };

  messages.push(newMsg);
  saveMessages(messages);
  renderMessages();

  messageInput.value = '';
  messageInput.focus();
});

// כפתור חזרה לדף הבית
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'home.html';
});

// אתחול
checkResetChat();
messages = loadMessages();
renderMessages();

// סנכרון בין טאבסים אחרים (עדכון הודעות בזמן אמת)
window.addEventListener('storage', e => {
  if (e.key === STORAGE_KEY) {
    messages = loadMessages();
    renderMessages();
  }
});
