const popup = document.getElementById("popup");
const addTaskBtn = document.getElementById("addTaskBtn");
const closePopup = document.getElementById("closePopup");
const saveTask = document.getElementById("saveTask");

const taskInput = document.getElementById("taskInput");
const daySelect = document.getElementById("daySelect");
const prioritySelect = document.getElementById("prioritySelect");

/* Open Popup */

addTaskBtn.onclick = () => {
  popup.style.display = "flex";
};

/* Close Popup */

closePopup.onclick = () => {
  popup.style.display = "none";
};

/* Save Task */

saveTask.onclick = () => {

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Please enter a task");
    return;
  }

  createTask(
    text,
    daySelect.value,
    prioritySelect.value
  );

  saveToLocalStorage();

  popup.style.display = "none";

  taskInput.value = "";

};

/* Create Task */

function createTask(text, day, priority, completed = false){

  const task = document.createElement("div");

  task.classList.add("task");

  if(completed){
    task.classList.add("completed");
  }

  task.innerHTML = `

    <p>${text}</p>

    <span class="tag ${priority}">
      ${priority} priority
    </span>

    <div class="task-buttons">

      <button class="complete-btn">✔</button>

      <button class="delete-btn">🗑</button>

    </div>

  `;

  /* Complete */

  task.querySelector(".complete-btn")
  .addEventListener("click",()=>{

    task.classList.toggle("completed");

    saveToLocalStorage();

  });

  /* Delete */

  task.querySelector(".delete-btn")
  .addEventListener("click",()=>{

    task.remove();

    saveToLocalStorage();

  });

  document.getElementById(day).appendChild(task);

}

/* Save Local Storage */

function saveToLocalStorage(){

  const tasks = [];

  document.querySelectorAll(".task").forEach(task=>{

    tasks.push({

      text: task.querySelector("p").innerText,

      priority: task.querySelector(".tag")
      .classList[1],

      completed: task.classList.contains("completed"),

      day: task.parentElement.id

    });

  });

  localStorage.setItem(
    "taskBloomTasks",
    JSON.stringify(tasks)
  );

}

/* Load Tasks */

window.onload = ()=>{

  const savedTasks =
  JSON.parse(localStorage.getItem("taskBloomTasks")) || [];

  savedTasks.forEach(task=>{

    createTask(
      task.text,
      task.day,
      task.priority,
      task.completed
    );

  });

};