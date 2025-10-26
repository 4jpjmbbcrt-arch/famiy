// פונקציה להפניה לפי הכרטיסים
function openSection(section) {
  switch (section) {
    case 'users':
      window.location.href = 'users.html';
      break;
    case 'content':
      window.location.href = 'content.html';
      break;
    case 'events':
      window.location.href = 'events.html';
      break;
    case 'design':
      window.location.href = 'design.html';
      break;
    case 'ai':
      window.location.href = 'ai-tools.html';
      break;
    case 'stats':
      window.location.href = 'stats.html';
      break;
       case 'Home':
      window.location.href = 'home.html';
      break;
    default:
      alert('מדור לא נמצא');
  }
}

// פונקציית התנתקות
function logout() {
  localStorage.removeItem('loggedUser'); // מוחק את המשתמש המחובר
  alert('התנתקת בהצלחה!');
  window.location.href = 'login.html'; // חוזר לדף התחברות
}

// בדיקה אם משתמש מחובר
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  if (!user || user.role !== 'admin') {
    alert('גישה נדחתה – דף זה מיועד רק למנהלים');
    window.location.href = 'login.html';
  } else {
    console.log(`ברוך הבא, ${user.username}!`);
  }
});

<script src="firebase.js"></script>
