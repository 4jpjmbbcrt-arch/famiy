const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const addEventBtn = document.getElementById("addEventBtn");
const eventDate = document.getElementById("eventDate");
const eventTitle = document.getElementById("eventTitle");
const homeBtn = document.getElementById("homeBtn");

let currentDate = new Date();

function loadEvents() {
  return JSON.parse(localStorage.getItem("familyCalendarEvents") || "[]");
}

function saveEvents(events) {
  localStorage.setItem("familyCalendarEvents", JSON.stringify(events));
}

function getMonthData(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return { start, end, year, month };
}

function renderCalendar() {
  const events = loadEvents();
  const { start, end, year, month } = getMonthData(currentDate);

  monthYearEl.textContent = start.toLocaleString("he-IL", {
    month: "long",
    year: "numeric",
  });

  calendarEl.innerHTML = "";

  const startDay = start.getDay(); // Sunday=0
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= end.getDate(); day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");

    const date = new Date(year, month, day);
    const iso = date.toISOString().split("T")[0];

    const dateEl = document.createElement("div");
    dateEl.classList.add("date");
    dateEl.textContent = day;
    cell.appendChild(dateEl);

    const dayEvents = events.filter(e => e.date === iso);
    dayEvents.forEach(e => {
      const eventEl = document.createElement("div");
      eventEl.classList.add("event");
      eventEl.textContent = e.title;
      cell.appendChild(eventEl);
    });

    calendarEl.appendChild(cell);
  }
}

addEventBtn.addEventListener("click", () => {
  const date = eventDate.value;
  const title = eventTitle.value.trim();

  if (!date || !title) {
    alert("יש להזין תאריך ותיאור.");
    return;
  }

  const events = loadEvents();
  events.push({ date, title });
  saveEvents(events);

  eventDate.value = "";
  eventTitle.value = "";

  renderCalendar();
});

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

homeBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});

renderCalendar();
