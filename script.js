// Bringing elements from DOM
const form = document.getElementById('form');
const input = document.getElementById('input-task');
const todosList = document.getElementById('todos-list');

// Checking for any saved task and adding them back by passing to addTask(), using JSON.parse to convert JSON string back into array with all saved tasks
const todos = JSON.parse(localStorage.getItem('todos'));


if(todos) {
    todos.forEach(task => addTask(task));
}

// Event listener for adding the new task
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    addTask();
})

function addTask(task) {
    let taskText = input.value;

    // Check whenever anything was passed, if not, will take from input
    if(task) {
        taskText = task.text;
    }

    // Check if there is any text (passed or in input) for task, forbids empty tasks
    if(taskText) {
        const todoEl = document.createElement('li');
        // Checking if passed task is completed
        if(task && task.completed) {
            todoEl.classList.add('completed');
        }
        
        todoEl.innerText = taskText;
        
        // Task completion toggle
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });
        
        // Task deletion 
        todoEl.addEventListener('contextmenu', (e) => {
            // Changing right click behaviour, now it won't open context menu when used on task
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        
        // Adding task to the task list
        todosList.appendChild(todoEl);
        
        // Clearing input value after adding new task
        input.value = '';
        
        // Updating localStorage
        updateLS();
    }
}

function updateLS() {
    // Getting every task
    let todosEl = document.querySelectorAll('li');

    // Creating empty array and adding task to it
    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    // Adding task to localStorage, using JSON.stringify to convert array into JSON string
    localStorage.setItem('todos', JSON.stringify(todos));
}
