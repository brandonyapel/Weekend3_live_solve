console.log('client.js')

$(document).ready(readyNow);

function readyNow() {
    console.log('jq')
    getTasks();

    $('#newTaskButton').on('click',postTask);
    $('#taskList').on('click','.completeButton',completeTask);
};

function appendTasksToDOM (taskObject){
    var $newListItem = $('<li></li>');
    $newListItem.append(taskObject.name);
    if (taskObject.is_complete) {
        $newListItem.addClass('completed');
    }else{
    $newListItem.append('<button class="completeButton" data-id="'+taskObject.id+'">Complete</button>');
    }
    $('#taskList').append($newListItem);
};

function completeTask (){
    console.log($(this).data());
    var taskToComplete = $(this).data().id;
    console.log('id was', taskToComplete);
    $.ajax({
        method: 'PUT',
        url: '/tasks/complete/' + taskToComplete,
        success: function (response) {
            getTasks();
        }
    })

};

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(response) {
            console.log('response', response);
            $('#taskList').empty();
            response.forEach(appendTasksToDOM);
        }
    });
};

function postTask(){
    var newTaskName = $('#newTaskName').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            name: newTaskName
        },
        success: function (response) {
            console.log('response', response);
            $('#newTaskName').val('');
            getTasks();
        }
    });
}
