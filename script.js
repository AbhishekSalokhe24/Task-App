const date = new Date().toString().slice(0, 16);
let dateInput = document.querySelector(".date #current-date");
dateInput.innerHTML = date.slice(0, 3) + ", " + date.slice(4, 10) + ", " + date.slice(11, 16);
let mainClrBtn = document.querySelector(".clear-all-btn");
let inputTask = document.getElementById("input-task");
let addTskBtn = document.getElementById("add-btn");
let mainUl = document.querySelector(".task-list .list-task");
let taskPending = document.querySelector(".date #task-pending");

let count = 0;

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

taskPending.innerHTML = `Welcome To Task App`;

function controlEmpty() {
    mainClrBtn.classList.add("remove-btn");
}

addTskBtn.addEventListener("click", () => {
    if (inputTask.value.length > 0) {
        let newTask = `<li>
                        <p>${inputTask.value}</p>
                        <i class="fa-solid fa-circle-check" id="clr-btn" onclick="clearTask(this)"></i>
                    </li>`;

        mainUl.insertAdjacentHTML("afterbegin", newTask);
        count++;
        saveTasks(); // Save tasks to localStorage

        let decide = count <= 0 ? 'add' : 'remove';
        mainClrBtn.classList[decide]("remove-btn");

        inputTask.value = "";
        inputTask.placeholder = 'Enter new task here';

        taskPending.innerHTML = count <= 0 ? 'Welcome Task App' : `${count} Task Pending`;
    } else {
        controlEmpty();
        alert("Please Enter Some Task First");
    }
});

let decide = count <= 0 ? 'add' : 'remove';
mainClrBtn.classList[decide]("remove-btn");

function clearTask(e) {
    e.parentElement.remove();
    count--;
    saveTasks(); // Save tasks to localStorage

    taskPending.innerHTML = count <= 0 ? 'Welcome To Task App' : `${count} Task Pending`;
    let decide = count <= 0 ? 'add' : 'remove';
    mainClrBtn.classList[decide]("remove-btn");
}

mainClrBtn.addEventListener("click", () => {
    mainUl.innerHTML = ""; // Clear the task list in the UI
    count = 0;
    localStorage.removeItem("tasks"); // Clear tasks from localStorage
    mainClrBtn.classList.toggle("remove-btn");
    taskPending.innerHTML = 'Welcome To Task App';
    reloadAndClear();
});

function reloadAndClear() {
    location.reload();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-list .list-task li p").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let newTask = `<li>
                        <p>${task}</p>
                        <i class="fa-solid fa-circle-check" id="clr-btn" onclick="clearTask(this)"></i>
                    </li>`;
        mainUl.insertAdjacentHTML("afterbegin", newTask);
    });
    count = tasks.length;
    taskPending.innerHTML = count <= 0 ? 'Welcome To Task App' : `${count} Task Pending`;

    let decide = count <= 0 ? 'add' : 'remove';
    mainClrBtn.classList[decide]("remove-btn");
}
