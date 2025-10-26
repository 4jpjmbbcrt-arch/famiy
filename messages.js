const user = sessionStorage.getItem('loggedUser');
if (!user) {
  alert('אין לך הרשאה להיכנס. אנא התחבר או הרשם.');
  window.location.href = 'login.html';
}

const messageText = document.getElementById('messageText');
const sendBtn = document.getElementById('sendBtn');
const messagesList = document.getElementById('messagesList');
const backBtn = document.getElementById('backBtn');

// ניהול הודעות ב-localStorage תחת מפתח כללי
const storageKey = 'familyMessages';

// טען הודעות מהאחסון
function loadMessages() {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
}

// שמור הודעות לאחסון
function saveMessages(messages) {
  localStorage.setItem(storageKey, JSON.stringify(messages));
}

// הוסף הודעה חדשה
function addMessage(text) {
  const messages = loadMessages();
  const now = new Date();
  const newMsg = {
    id: Date.now(),
    user,
    text,
    time: now.toISOString(),
  };
  messages.push(newMsg);
  saveMessages(messages);
  renderMessages();
}

// מחק הודעה לפי מזהה
function deleteMessage(id) {
  let messages = loadMessages();
  messages = messages.filter(m => m.id !== id);
  saveMessages(messages);
  renderMessages();
}

// יצירת אלמנט HTML להודעה
function createMessageElement(msg) {
  const div = document.createElement('div');
  div.classList.add('message-item');

  const textDiv = document.createElement('div');
  textDiv.classList.add('message-text');
  textDiv.textContent = `${msg.user}: ${msg.text}`;

  const metaDiv = document.createElement('div');
  metaDiv.classList.add('message-meta');
  const time = new Date(msg.time);
  metaDiv.textContent = time.toLocaleString('he-IL', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  const delBtn = document.createElement('button');
  delBtn.classList.add('delete-btn');
  delBtn.textContent = '×';
  delBtn.title = 'מחק הודעה';
  delBtn.addEventListener('click', () => {
    if (confirm('האם למחוק הודעה זו?')) {
      deleteMessage(msg.id);
    }
  });

  div.appendChild(textDiv);
  div.appendChild(metaDiv);
  div.appendChild(delBtn);

  return div;
}

// הצג את כל ההודעות ברשימה
function renderMessages() {
  const messages = loadMessages();
  messagesList.innerHTML = '';
  messages.forEach(msg => {
    messagesList.appendChild(createMessageElement(msg));
  });
}

// טיפול בלחיצה על שלח הודעה
sendBtn.addEventListener('click', () => {
  const text = messageText.value.trim();
  if (text.length === 0) {
    alert('אנא כתוב הודעה לפני השליחה.');
    return;
  }
  addMessage(text);
  messageText.value = '';
  messageText.focus();
});

// לחצן חזור לדף הבית
backBtn.addEventListener('click', () => {
  window.location.href = 'home.html';
});

// אתחול ההודעות בתצוגה
renderMessages();
