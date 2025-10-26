const tasksContainer = document.getElementById("tasksContainer");
const addTaskBtn = document.getElementById("addTaskBtn");
const backHome = document.getElementById("backHome");

const titleInput = document.getElementById("taskTitle");
const descInput = document.getElementById("taskDesc");
const dateInput = document.getElementById("taskDate");
const statusInput = document.getElementById("taskStatus");
const tagsInput = document.getElementById("taskTags");
const assigneeInput = document.getElementById("taskAssignee");

const filterStatus = document.getElementById("filterStatus");
const filterTag = document.getElementById("filterTag");
const clearFilters = document.getElementById("clearFilters");

function loadTasks() {
  return JSON.parse(localStorage.getItem("familyTasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("familyTasks", JSON.stringify(tasks));
}

function renderTasks() {
  const tasks = loadTasks();
  const statusFilter = filterStatus.value;
  const tagFilter = filterTag.value.trim().toLowerCase();

  tasksContainer.innerHTML = "";

  const filtered = tasks.filter(task => {
    const matchStatus = !statusFilter || task.status === statusFilter;
    const matchTag = !tagFilter || task.tags.some(tag => tag.toLowerCase().includes(tagFilter));
    return matchStatus && matchTag;
  });

  filtered.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.setAttribute("data-status", task.status);

    taskEl.innerHTML = `
      <h4>${task.title}</h4>
      ${task.desc ? `<div class="desc">${task.desc}</div>` : ""}
      <div class="meta">
        תאריך יעד: ${task.date} | סטטוס: ${task.status}<br>
        תגיות: ${task.tags.join(", ")} | אחראי: ${task.assignee}
      </div>
    `;

    tasksContainer.appendChild(taskEl);
  });
}

addTaskBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  if (!title) return alert("יש להזין כותרת");

  const newTask = {
    title,
    desc: descInput.value.trim(),
    date: dateInput.value,
    status: statusInput.value,
    tags: tagsInput.value.split(",").map(t => t.trim()).filter(Boolean),
    assignee: assigneeInput.value.trim(),
  };

  const tasks = loadTasks();
  tasks.push(newTask);
  saveTasks(tasks);

  // ניקוי שדות
  titleInput.value = "";
  descInput.value = "";
  dateInput.value = "";
  statusInput.value = "פתוחה";
  tagsInput.value = "";
  assigneeInput.value = "";

  renderTasks();
});

filterStatus.addEventListener("change", renderTasks);
filterTag.addEventListener("input", renderTasks);
clearFilters.addEventListener("click", () => {
  filterStatus.value = "";
  filterTag.value = "";
  renderTasks();
});

backHome.addEventListener("click", () => {
  window.location.href = "home.html";
});

renderTasks();
