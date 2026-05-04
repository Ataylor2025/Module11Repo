const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority-input");
const taskList = document.querySelector("#task-list");

const quoteEl = document.querySelector("#quote");
const quoteBtn = document.querySelector("#new-quote");

const timerDisplay = document.querySelector("#timer-display");
const startBtn = document.querySelector("#start-timer");
const pauseBtn = document.querySelector("#pause-timer");
const resetBtn = document.querySelector("#reset-timer");

let secondsLeft = 25 * 60;
let timerId = null;

function renderTimer() {
  const min = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const sec = String(secondsLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${min}:${sec}`;
}

function addTask(text, priority) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.innerHTML = `<span>${text}<span class="priority">(${priority})</span></span>`;

  const doneButton = document.createElement("button");
  doneButton.type = "button";
  doneButton.textContent = "Done";
  doneButton.addEventListener("click", () => li.remove());
  li.appendChild(doneButton);

  taskList.appendChild(li);
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value.trim(), priorityInput.value);
  taskInput.value = "";
  taskInput.focus();
});

quoteBtn.addEventListener("click", async () => {
  quoteEl.textContent = "Loading insight...";
  try {
    const response = await fetch("https://api.quotable.io/random?tags=education|inspirational");
    const data = await response.json();
    quoteEl.textContent = `“${data.content}” — ${data.author}`;
  } catch {
    quoteEl.textContent = "Could not load quote. Check internet connection and try again.";
  }
});

startBtn.addEventListener("click", () => {
  if (timerId) return;
  timerId = setInterval(() => {
    if (secondsLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      return;
    }
    secondsLeft -= 1;
    renderTimer();
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  secondsLeft = 25 * 60;
  renderTimer();
});

renderTimer();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
