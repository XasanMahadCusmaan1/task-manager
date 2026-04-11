const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const dataContainer = document.querySelector(".app_data");
const filter = document.querySelector("#filter-select");
const clearBtn = document.querySelector("#clearBtn");

function getNextId() {
  if (taskStructure.length === 0) return 1;
  return Math.max(...taskStructure.map((t) => t.id + 1));
}

let taskStructure = [];

function saveLocaleStorage() {
  localStorage.setItem("task", JSON.stringify(taskStructure));
}

function loadLocaleStorage() {
  let storedTasks = localStorage.getItem("task");
  if (storedTasks) {
    taskStructure = JSON.parse(storedTasks);
  }
}

function createTask(task) {
  const isCompleted = task.completedStatus ? "highlight" : "";
  const isChecked = task.completedStatus ? "checked" : "";
  const html = `
      <li class = "${isCompleted}" data-id="${task.id}">${task.description} <small> Date: <strong> ${task.currentDate}</strong>  Time: <strong>${task.currentTime}</strong>  <input id="checkBox" type="checkbox" ${isChecked}/></small></li>
    `;
  dataContainer.insertAdjacentHTML("afterbegin", html);
}

function addTask() {
  if (input.value === "") return;
  const date = new Date();

  let inputValue = input.value;

  let currentTask = {
    id: getNextId(),
    description: inputValue,
    completedStatus: false,
    currentDate: `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`,
    currentTime: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
  };

  taskStructure.push(currentTask);
  saveLocaleStorage();
  displayTaskUi();
  input.value = "";
}

function displayTaskUi() {
  dataContainer.innerHTML = "";
  taskStructure.forEach((task) => createTask(task));
}

function highlighter(el) {
  const taskId = Number(el.closest("li").dataset.id);
  const task = taskStructure.find((task) => task.id === taskId);
  if (!task) return;

  task.completedStatus = el.checked;
  el.closest("li").classList.toggle("highlight", el.checked);
  saveLocaleStorage();
}

dataContainer.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    highlighter(e.target);
  }
});

function renderFilteredTask(filterType) {
  dataContainer.innerHTML = "";
  const filtered =
    filterType === "showCompleted"
      ? taskStructure.filter((t) => t.completedStatus)
      : filterType === "showUnfinished"
        ? taskStructure.filter((t) => !t.completedStatus)
        : taskStructure;
  filtered.forEach((task) => createTask(task));
}

filter.addEventListener("change", (e) => {
  renderFilteredTask(e.target.value);
});

clearBtn.addEventListener("click", (e) => {
  taskStructure = [];
  saveLocaleStorage();
  displayTaskUi();
});

addBtn.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", () => {
  loadLocaleStorage();
  displayTaskUi();
});