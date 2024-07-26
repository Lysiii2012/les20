$(document).ready(function() {
    let currentTaskItem;

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        $('#todo-list').empty();  
        tasks.forEach(task => {
            const taskClass = task.finished ? 'finished' : '';
            $('#todo-list').append(`<li class="list-group-item ${taskClass}" data-toggle="modal" data-target="#taskDetailModal">${task.text}</li>`);
        });
    };

    const saveTasks = () => {
        const tasks = [];
        $('#todo-list .list-group-item').each(function() {
            const text = $(this).text();
            const finished = $(this).hasClass('finished');
            tasks.push({ text, finished });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const updateTaskDetailModal = () => {
        const taskText = currentTaskItem.text();
        $('#taskDetailModalBody').text(taskText);
        $('#button-finish').text(currentTaskItem.hasClass('finished') ? 'Відновити' : 'Виконано');
    };

    const toggleTaskStatus = () => {
        if (currentTaskItem) {
            if (currentTaskItem.hasClass('finished')) {
                currentTaskItem.removeClass('finished');
                $('#button-finish').text('Виконано');
            } else {
                currentTaskItem.addClass('finished');
                $('#button-finish').text('Відновити');
            }
            saveTasks();  
        }
        $('#taskDetailModal').modal('hide');
    };

    const addTask = (taskText) => {
        if (taskText) {
            $('#todo-list').append(`<li class="list-group-item" data-toggle="modal" data-target="#taskDetailModal">${taskText}</li>`);
            $('#taskText').val('');
            $('#addTaskModal').modal('hide');
            saveTasks();  
        }
    };

    const setupEventListeners = () => {
        $('#todo-list').on('click', '.list-group-item', function() {
            currentTaskItem = $(this);
            updateTaskDetailModal();
        });

        $('#button-finish').on('click', function() {
            toggleTaskStatus();
        });

        $('#addTaskForm').on('submit', function(e) {
            e.preventDefault();
            const newTask = $('#taskText').val();
            addTask(newTask);
        });

        $('#addTaskModal .btn-primary').on('click', function() {
            $('#addTaskForm').submit();
        });
    };

    loadTasks();
    setupEventListeners();
});