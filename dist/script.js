"use strict";

$(document).ready(function () {
  var currentTaskItem;
  var loadTasks = function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    $('#todo-list').empty();
    tasks.forEach(function (task) {
      var taskClass = task.finished ? 'finished' : '';
      $('#todo-list').append("<li class=\"list-group-item ".concat(taskClass, "\" data-toggle=\"modal\" data-target=\"#taskDetailModal\">").concat(task.text, "</li>"));
    });
  };
  var saveTasks = function saveTasks() {
    var tasks = [];
    $('#todo-list .list-group-item').each(function () {
      var text = $(this).text();
      var finished = $(this).hasClass('finished');
      tasks.push({
        text: text,
        finished: finished
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  var updateTaskDetailModal = function updateTaskDetailModal() {
    var taskText = currentTaskItem.text();
    $('#taskDetailModalBody').text(taskText);
    $('#button-finish').text(currentTaskItem.hasClass('finished') ? 'Відновити' : 'Виконано');
  };
  var toggleTaskStatus = function toggleTaskStatus() {
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
  var addTask = function addTask(taskText) {
    if (taskText) {
      $('#todo-list').append("<li class=\"list-group-item\" data-toggle=\"modal\" data-target=\"#taskDetailModal\">".concat(taskText, "</li>"));
      $('#taskText').val('');
      $('#addTaskModal').modal('hide');
      saveTasks();
    }
  };
  var setupEventListeners = function setupEventListeners() {
    $('#todo-list').on('click', '.list-group-item', function () {
      currentTaskItem = $(this);
      updateTaskDetailModal();
    });
    $('#button-finish').on('click', function () {
      toggleTaskStatus();
    });
    $('#addTaskForm').on('submit', function (e) {
      e.preventDefault();
      var newTask = $('#taskText').val();
      addTask(newTask);
    });
    $('#addTaskModal .btn-primary').on('click', function () {
      $('#addTaskForm').submit();
    });
  };
  loadTasks();
  setupEventListeners();
});
