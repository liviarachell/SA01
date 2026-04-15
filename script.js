let tasks = [];

function scrollToPlanner() {
    document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const hours = document.getElementById("taskHours").value;

    const hoursNumber = Number(hours);

    if (!name || isNaN(hoursNumber) || hoursNumber <= 0) {
        alert("Digite valores válidos!");
        return;
    }

    tasks.push({ name, hours: hoursNumber });

    document.getElementById("taskName").value = "";
    document.getElementById("taskHours").value = "";

    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const hourValue = Number(document.getElementById("hourValue").value) || 0;

    tasks.forEach(task => {
        const value = task.hours * hourValue;

        const div = document.createElement("div");
        div.classList.add("task-row");

        div.innerHTML = `
            <span>${task.name}</span>
            <span>${task.hours}h</span>
            <span>R$ ${value.toFixed(2)}</span>
        `;

        list.appendChild(div);
    });

    updateTotal();
}

function updateTotal() {
    const hourValue = Number(document.getElementById("hourValue").value) || 0;

    let total = tasks.reduce((acc, task) => acc + (task.hours * hourValue), 0);

    document.getElementById("total").innerText =
        "Custo total do projeto: R$ " + total.toFixed(2);
}

// Atualiza automaticamente ao mudar valor da hora
document.getElementById("hourValue")
    .addEventListener("input", renderTasks);