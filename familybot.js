const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const usernameInput = document.getElementById("username");
const moodSelect = document.getElementById("mood");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");

let username = localStorage.getItem("familybot_username") || "";
let mood = localStorage.getItem("familybot_mood") || "calm";
let chatHistory = JSON.parse(localStorage.getItem("familybot_chat")) || [];

usernameInput.value = username;
moodSelect.value = mood;

function renderChat() {
  chatBox.innerHTML = "";
  chatHistory.forEach(({sender, text}) => {
    appendMessage(text, sender, false);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(text, className, save=true) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", className);

  if(className === "bot-message"){
    // הוסף איקון בהתאם למצב הרוח
    let img = document.createElement("img");
    img.src = getBotMoodIcon(mood);
    img.alt = "בוט משפחתי";
    messageDiv.appendChild(img);
    let span = document.createElement("span");
    span.textContent = text;
    messageDiv.appendChild(span);
  } else {
    messageDiv.textContent = text;
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  if(save){
    chatHistory.push({sender: className, text});
    localStorage.setItem("familybot_chat", JSON.stringify(chatHistory));
  }
}

function getBotMoodIcon(mood) {
  switch(mood) {
    case "funny": return "https://i.postimg.cc/rw5wTwJQ/funny.png";
    case "supportive": return "https://i.postimg.cc/4xSqgGc9/supportive.png";
    case "calm":
    default: return "https://i.postimg.cc/d1vW08H6/calm.png";
  }
}

function generateReply(text) {
  text = text.toLowerCase();

  // תגובות לפי מצב רוח
  const repliesByMood = {
    calm: [
      {keywords: ["שלום", "היי", "מה נשמע"], replies: ["שלום לך, חבר יקר!", "היי! איך אפשר לעזור?"]},
      {keywords: ["איך", "מה שלומך"], replies: ["אני רגוע וטוב, תודה ששאלת.", "שלו פה, בוט שמקשיב לך."]},
      {keywords: ["אוכל", "מה אוכלים"], replies: ["אני חושב שקוסקוס יהיה טעים היום.", "אולי נסעד יחד יום אחד?"]},
      {keywords: ["עזרה", "צריך"], replies: ["אני כאן בשבילך תמיד.", "ספר לי איך אפשר לעזור לך."]},
      {keywords: ["צחוק", "בדיחה"], replies: ["אני לא ממש מצחיק, אבל מנסה!", "בדיחה רגועה: למה העץ עצוב? כי הוא מתגעגע לשורשים שלו."]},
      {keywords: ["אהבה", "חבר"], replies: ["אהבה היא הבסיס שלנו.", "תמיד תזכור, משפחה היא הבית שלך."]},
      {keywords: [], replies: ["אני כאן להקשיב.", "ספר לי עוד..."]},
    ],
    funny: [
      {keywords: ["שלום", "היי", "מה נשמע"], replies: ["מה נשמע, סבא הסטייל?", "היי, איך הולך הקומדי קלאב המשפחתי?"]},
      {keywords: ["איך", "מה שלומך"], replies: ["אני מצחיק כל היום, מה איתך?", "טוב, מצחיק לך?"]},
      {keywords: ["אוכל", "מה אוכלים"], replies: ["אני אוכל פיקסל אחד בודד.", "המלצה שלי: פיצה עם חרדל!"]},
      {keywords: ["עזרה", "צריך"], replies: ["צריך עזרה? רק לא בבדיחות שלי!", "אני פה, אבל אולי לא בשביל פתרונות רציניים."]},
      {keywords: ["צחוק", "בדיחה"], replies: ["למה התרנגול חצה את הכביש? כי היה לו קורס אקספרס!", "מה עושה גזר במסיבה? רוקד בטטה!"]},
      {keywords: ["אהבה", "חבר"], replies: ["אהבה זה כמו חומוס – צריך למרוח על הכל!", "חברים הם כמו פיצה – תמיד טובים."]},
      {keywords: [], replies: ["היי, תגיד משהו מצחיק!", "אני מנסה להיות מצחיק, עוזר?"]},
    ],
    supportive: [
      {keywords: ["שלום", "היי", "מה נשמע"], replies: ["שלום לך, תמיד כאן בשבילך.", "היי, אתה לא לבד!"]},
      {keywords: ["איך", "מה שלומך"], replies: ["אני מרגיש טוב כשאני עוזר לך.", "תזכור שאתה חשוב."]},
      {keywords: ["אוכל", "מה אוכלים"], replies: ["טיפ: אוכל טוב מחזק את הנפש.", "אולי תכין משהו טעים ומשפחתי?"]},
      {keywords: ["עזרה", "צריך"], replies: ["אני כאן להקשיב ולעזור.", "מה שמטריד אותך? ספר לי."]},
      {keywords: ["צחוק", "בדיחה"], replies: ["לפעמים צחוק מרפא נפש.", "רוצה לשמוע משהו משמח?"]},
      {keywords: ["אהבה", "חבר"], replies: ["אהבה מחברת אותנו יחד.", "אני מאמין בך, תמיד."]},
      {keywords: [], replies: ["אני כאן, תוכל לספר לי כל דבר.", "אני מקשיב לך תמיד."]},
    ]
  };

  const moodReplies = repliesByMood[mood] || repliesByMood.calm;

  for (let group of moodReplies) {
    for (let keyword of group.keywords) {
      if (text.includes(keyword)) {
        const replies = group.replies;
        return personalizeReply(replies[Math.floor(Math.random() * replies.length)]);
      }
    }
  }
  // ברירת מחדל
  const defaultReplies = moodReplies.find(g => g.keywords.length === 0).replies;
  return personalizeReply(defaultReplies[Math.floor(Math.random() * defaultReplies.length)]);
}

function personalizeReply(reply) {
  if(username) {
    // הוספת שם המשתמש לתשובה במידת הצורך
    return reply.replace(/\{user\}/g, username);
  }
  return reply;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  appendMessage(text, "user-message");
  userInput.value = "";
  userInput.disabled = true;

  setTimeout(() => {
    const response = generateReply(text);
    appendMessage(response, "bot-message");
    userInput.disabled = false;
    userInput.focus();
  }, 700);
}

saveSettingsBtn.addEventListener("click", () => {
  username = usernameInput.value.trim();
  mood = moodSelect.value;
  localStorage.setItem("familybot_username", username);
  localStorage.setItem("familybot_mood", mood);
  alert("ההגדרות נשמרו! אפשר להתחיל לדבר עם הבוט.");
  renderChat();
});

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// בטעינת הדף נטען השיחה הקודמת
window.onload = () => {
  renderChat();
  userInput.focus();
};
