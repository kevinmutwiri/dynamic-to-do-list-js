document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask(taskText, save = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function () {
            removeTask(taskText, listItem);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    function removeTask(taskTextToRemove, listItemToRemove) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks = storedTasks.filter(task => task !== taskTextToRemove);

        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        taskList.removeChild(listItemToRemove);
    }

    function loadTasks() {
        taskList.innerHTML = '';
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', function () {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Please enter a task!");
            return;
        }
        addTask(text);
        taskInput.value = "";
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const text = taskInput.value.trim();
            if (text === "") {
                alert("Please enter a task!");
                return;
            }
            addTask(text);
            taskInput.value = "";
        }
    });

    loadTasks();
});