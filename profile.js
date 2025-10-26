// בדיקת משתמש מחובר
const user = sessionStorage.getItem('loggedUser');
if (!user) {
  alert('אין לך הרשאה להיכנס. אנא התחבר או הרשם.');
  window.location.href = 'login.html';
}

// אלמנטים
const profilePic = document.getElementById('profilePic');
const uploadPic = document.getElementById('uploadPic');
const usernameInput = document.getElementById('username');
const ageInput = document.getElementById('age');
const hobbiesInput = document.getElementById('hobbies');
const roleInput = document.getElementById('role');
const profileForm = document.getElementById('profileForm');

// key לאחסון פרופיל לפי משתמש
const STORAGE_KEY = `profile_${user}`;

// טעינת נתוני פרופיל מ־localStorage
function loadProfile() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// שמירת נתוני פרופיל ל־localStorage
function saveProfile(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// הצגת נתוני פרופיל בטופס
function displayProfile(data) {
  if (!data) return;
  if (data.profilePic) profilePic.src = data.profilePic;
  ageInput.value = data.age || '';
  hobbiesInput.value = data.hobbies || '';
  roleInput.value = data.role || '';
}

// העלאת תמונה והמרה ל-Base64 לשמירה
uploadPic.addEventListener('change', () => {
  const file = uploadPic.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    profilePic.src = e.target.result;
    saveCurrentProfilePic(e.target.result);
  };
  reader.readAsDataURL(file);
});

function saveCurrentProfilePic(dataUrl) {
  const currentData = loadProfile() || {};
  currentData.profilePic = dataUrl;
  saveProfile(currentData);
}

// טעינת שם המשתמש בשדה (לא ניתן לעריכה)
usernameInput.value = user;

// טיפול בשמירת הטופס
profileForm.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    profilePic: profilePic.src,
    age: ageInput.value,
    hobbies: hobbiesInput.value,
    role: roleInput.value,
  };

  saveProfile(data);
  alert('הפרופיל נשמר בהצלחה!');
});

// כפתור חזרה לדף הבית
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'home.html';
});

// אתחול
const profileData = loadProfile();
displayProfile(profileData);
