const addTaskBtn = document.getElementById('add-task');
const newTask = document.getElementById('new-task');

document.addEventListener('DOMContentLoaded', () =>{
    addTaskBtn.addEventListener('click', addTaskFromInput);
    loadTasks();
});

function addTaskFromInput(){
    const taskValue = newTask.value;

    if(taskValue){
        addTask(taskValue);
        newTask.value = '';
        saveTasks();
    }
}


function addTask(taskValue, isCompleted = false){
    
    const ul = document.getElementById('task-list');
    const li = document.createElement('li');

    // checkboxes
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', toggleTask);

    // list items
    const text = document.createElement('span');
    text.textContent = taskValue;
    text.style.textDecoration = isCompleted ? 'line-through' : 'none';

    // edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Task';
    editButton.addEventListener('click', editTask);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Task';
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    ul.appendChild(li);

}


function saveTasks(){
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(
        function(taskLi){
            const text = taskLi.querySelector('span').textContent;
            const isCompleted = taskLi.querySelector('input').checked;
            tasks.push({text, isCompleted});
        }
    );
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        addTask(task.text, task.isCompleted);
    });
}

function toggleTask(event){
    const text = event.target.nextElementSibling;
    text.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    saveTasks();
}

function deleteTask(event){
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    saveTasks();
}

function editTask(event){
    const textSpan = event.target.previousElementSibling;
    const newText = prompt("Edit Your Task", textSpan.textContent);
    if(newText !== null){
        textSpan.textContent = newText;
        saveTasks();
    }
}