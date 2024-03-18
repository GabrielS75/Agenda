// Inicializa o objeto tasks com os valores armazenados no localStorage, se houver
var tasks = JSON.parse(localStorage.getItem("tasks")) || {
    Segunda: [],
    Terca: [],
    Quarta: [],
    Quinta: [],
    Sexta: [],
    Sabado: [],
    Domingo: []
};

function addTask() {
    var daySelect = document.getElementById("daySelect");
    var taskInput = document.getElementById("taskInput");
    var day = daySelect.value;
    var taskText = taskInput.value;

    if (taskText.trim() === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    // Adiciona a tarefa ao array de tarefas do dia selecionado
    tasks[day].push({ text: taskText, completed: false });

    // Salva as tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Atualiza a lista de tarefas na tela
    displayTasks();
    taskInput.value = "";
}

function deleteTask(dayIndex, taskIndex) {
    // Remove a tarefa do array de tarefas do dia selecionado
    tasks[dayIndex].splice(taskIndex, 1);

    // Salva as tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Atualiza a lista de tarefas na tela
    displayTasks();
}

function toggleTask(dayIndex, taskIndex) {
    // Alterna o status da tarefa entre concluída e não concluída
    tasks[dayIndex][taskIndex].completed = !tasks[dayIndex][taskIndex].completed;

    // Salva as tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Atualiza a lista de tarefas na tela
    displayTasks();
}

function displayTasks() {
    var taskListContainer = document.getElementById("taskListContainer");
    taskListContainer.innerHTML = ""; // Limpa o conteúdo anterior

    // Percorre os dias da semana
    Object.keys(tasks).forEach(function (day) {
        var tasksOfDay = tasks[day];
        var dayHeader = document.createElement("h2");
        dayHeader.textContent = day;

        // Adiciona um evento de clique ao cabeçalho do dia para alternar a visibilidade das tarefas
        dayHeader.addEventListener("click", function () {
            var ul = this.nextElementSibling;
            if (ul.style.display === "none") {
                ul.style.display = "block";
            } else {
                ul.style.display = "none";
            }
        });
        // Adiciona um evento de clique ao cabeçalho do dia para alternar a visibilidade das tarefas
dayHeader.addEventListener("click", function () {
    var ul = this.nextElementSibling;
    if (ul.classList.contains("hide")) {
        ul.classList.remove("hide"); // Remove a classe hide para exibir as tarefas
    } else {
        ul.classList.add("hide"); // Adiciona a classe hide para ocultar as tarefas
    }
});


        taskListContainer.appendChild(dayHeader);

        // Cria uma lista de tarefas para o dia atual
        var ul = document.createElement("ul");
        ul.style.display = "none"; // Oculta a lista de tarefas por padrão

        // Percorre as tarefas do dia
        tasksOfDay.forEach(function (task, index) {
            var li = document.createElement("li");
            li.textContent = task.text;
            
            // Adiciona uma classe CSS se a tarefa estiver concluída
            if (task.completed) {
                li.classList.add("completed");
            }
            
            // Adiciona um botão de exclusão para cada tarefa
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.addEventListener("click", function () {
                deleteTask(day, index);
            });
            li.appendChild(deleteButton);

            // Adiciona um evento de clique para marcar a tarefa como concluída
            li.addEventListener("click", function () {
                toggleTask(day, index);
            });

            ul.appendChild(li);
        });

        taskListContainer.appendChild(ul);
    });
}

// Chama a função displayTasks para exibir as tarefas iniciais
displayTasks();
