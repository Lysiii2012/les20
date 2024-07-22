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

    loadTasks();

    $('#todo-list').on('click', '.list-group-item', function() {
        currentTaskItem = $(this);  
        const taskText = $(this).text();
        $('#taskDetailModalBody').text(taskText);
        $('#button-finish').text(currentTaskItem.hasClass('finished') ? 'Відновити' : 'Виконано');
    });

    $('#button-finish').on('click', function() {
        if (currentTaskItem) {
            if (currentTaskItem.hasClass('finished')) {
                currentTaskItem.removeClass('finished');
                $(this).text('Виконано');
            } else {
                currentTaskItem.addClass('finished');
                $(this).text('Відновити');
            }
            saveTasks();  
        }
        $('#taskDetailModal').modal('hide');
    });

    $('#addTaskForm').on('submit', function(e) {
        e.preventDefault();
        const newTask = $('#taskText').val();
        if (newTask) {
            $('#todo-list').append(`<li class="list-group-item" data-toggle="modal" data-target="#taskDetailModal">${newTask}</li>`);
            $('#taskText').val('');
            $('#addTaskModal').modal('hide');
            saveTasks();  
        }
    });

    $('#addTaskModal .btn-primary').on('click', function() {
        $('#addTaskForm').submit();
    });
});
