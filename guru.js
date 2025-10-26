const answers = [
  "בוודאי! אבל תחשוב פעמיים.",
  "היקום לא בטוח בזה עדיין.",
  "תשאל שוב אחרי שתשתה מים.",
  "לגמרי כן!",
  "לאאאאאאאאאאא.",
  "רק אם תבקש יפה.",
  "אני הגורו. ואני עייף עכשיו.",
  "שאלה טובה... תשובה בהמשך.",
  "זה סוד משפחתי עתיק.",
  "עזוב, פשוט תעשה מה שבלב שלך.",
  "המשפחה תחליט על זה יחד.",
  "...כדאי שתשאל את ענבל." ,
   "שאלה טובה..אבל לא יודע" ,
    "נועה וגאיה ידעו , אני בטוח בזה" ,
     "למה הוודג?" ,
      "מתוקהההההההההההה, רק הגעת תנחתי." ,
];

function askGuru() {
  const input = document.getElementById("question").value.trim();
  const output = document.getElementById("answer");
  
  if (input === "") {
    output.innerText = "שאל שאלה קודם!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * answers.length);
  output.innerText = answers[randomIndex];
}
