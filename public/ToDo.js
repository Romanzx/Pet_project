"use strict";
const taskContainer = document.querySelector('.task_container');
const Add_btn = document.getElementById('add');
const Input_form = document.getElementById('add-input');
const selection = document.querySelector('#Tasks_value');
if (!taskContainer || !Add_btn || !Input_form || !selection) {
    throw new Error("No DOM's elements ");
}
let currentFilter = 'All';
let tasks = [];
async function loadTasks() {
    try {
        const response = await fetch('/products');
        if (!response.ok)
            throw new Error('Error');
        tasks = await response.json();
        render();
    }
    catch (error) {
        console.error('No load tasks: ', error);
    }
}
async function addTask() {
    const text = Input_form.value.trim();
    try {
        const response = await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        if (!response.ok)
            throw new Error('Error');
        await loadTasks();
        Input_form.value = '';
    }
    catch (error) {
        console.error('No add tasks: ', error);
    }
}
async function deleteTask(id) {
    try {
        const response = await fetch(`/products/${id}`, { method: 'DELETE' });
        if (!response.ok)
            throw new Error('Error');
        await loadTasks();
        Input_form.value = '';
    }
    catch (error) {
        console.error('No add tasks: ', error);
    }
}
async function rewritebtn(id, newText) {
    try {
        const response = await fetch(`/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText }),
        });
        if (!response.ok)
            throw new Error('Error');
        await loadTasks();
    }
    catch (error) {
        console.error('No add tasks: ', error);
    }
}
async function toggleTaskCompleted(id, completed) {
    try {
        const response = await fetch(`/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok)
            throw new Error('Error');
        await loadTasks();
    }
    catch (error) {
        console.error('No add tasks: ', error);
    }
}
function filtration() {
    currentFilter = selection.value;
    render();
}
function render() {
    let filteredTasks = tasks;
    if (currentFilter === 'Completed') {
        filteredTasks = tasks.filter(task => task.completed === true);
    }
    else if (currentFilter === 'Incomplete') {
        filteredTasks = tasks.filter(task => task.completed === false);
    }
    taskContainer.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.dataset.id = String(task.id);
        taskDiv.innerHTML = `
      <div class="task-check">
        <input type="checkbox" class="check-complite" ${task.completed ? 'checked' : ''}>
        <span style="${task.completed ? 'text-decoration: line-through;' : ''}">${(task.text)}</span>
      </div>
      <div class="button-container">
        <button class="delete button">X</button>
        <button class="rewrite button">/</button>
      </div>
    `;
        const deleteBtn = taskDiv.querySelector('.delete');
        const checkbox = taskDiv.querySelector('.check-complite');
        const rewriteBtn = taskDiv.querySelector('.rewrite');
        const span = taskDiv.querySelector('span');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        checkbox.addEventListener('change', () => toggleTaskCompleted(task.id, checkbox.checked));
        rewriteBtn.addEventListener('click', async () => {
            const newText = prompt('Rewrite the task:', span.textContent ?? '');
            if (newText && newText.trim() !== '') {
                await rewritebtn(task.id, newText.trim());
            }
        });
        taskContainer.appendChild(taskDiv);
    });
}
selection.addEventListener('change', filtration);
Add_btn.addEventListener('click', addTask);
loadTasks();
//# sourceMappingURL=ToDo.js.map