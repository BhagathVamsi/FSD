document.addEventListener("DOMContentLoaded", function() {
  const taskContainer = document.getElementById("task-container");

  // Array to store the tasks
  let tasks = [];

  function renderTasks() {
    taskContainer.innerHTML = "";

    tasks.forEach(function(task, index) {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.draggable = true;
      taskItem.setAttribute("data-index", index);
      taskItem.innerHTML = `
        <span class="task-text">${task}</span>
        <button class="editButton">Edit</button>
        <button class="deleteButton">Delete</button>
      `;

      taskContainer.appendChild(taskItem);
    });
  }

  function addTask(task) {
    tasks.push(task);
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  function swapTasks(fromIndex, toIndex) {
    const temp = tasks[fromIndex];
    tasks[fromIndex] = tasks[toIndex];
    tasks[toIndex] = temp;
  }

  taskContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("editButton")) {
      // Edit task
      const taskText = event.target.parentElement.querySelector(".task-text");
      const newText = prompt("Enter new task text", taskText.textContent);
      if (newText !== null) {
        taskText.textContent = newText;
      }
    } else if (event.target.classList.contains("deleteButton")) {
      // Delete task
      const taskIndex = event.target.parentElement.getAttribute("data-index");
      deleteTask(taskIndex);
    }
  });

  taskContainer.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("data-index"));
  });

  taskContainer.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  taskContainer.addEventListener("drop", function(event) {
    const fromIndex = event.dataTransfer.getData("text/plain");
    const toIndex = event.target.getAttribute("data-index");
    swapTasks(fromIndex, toIndex);
    renderTasks();
  });

  document.getElementById("add-task-button").addEventListener("click", function() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();

    if (task !== "") {
      addTask(task);
      taskInput.value = "";
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const taskInput = document.getElementById("task-input");
      const task = taskInput.value.trim();

      if (task !== "") {
        addTask(task);
        taskInput.value = "";
      }
    }
  });
});
