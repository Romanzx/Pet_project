import { Render } from "@nestjs/common";
import { ProxyEnv } from "http";
import { text } from "stream/consumers";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

type FilterValue = 'All'| 'Completed' | 'Incomplete';

const taskContainer = document.querySelector('.task_container') as HTMLDivElement;
const Add_btn = document.getElementById('add') as HTMLButtonElement;
const Input_form = document.getElementById('add-input') as HTMLInputElement;
const selection = document.querySelector('#Tasks_value') as HTMLSelectElement;

if (!taskContainer || !Add_btn || !Input_form || !selection){
    throw new Error("No DOM's elements ");
}

let currentFilter: FilterValue = 'All';
let tasks: Task[] = [];

async function loadTasks() : Promise<void> {
    try{
        const response = await fetch('/products');
        if (!response.ok) throw new Error('Error');
        tasks = await response.json();
        render();
        }catch (error){
            console.error('No load tasks: ', error);
        }    
}

async function addTask() : Promise<void> {
    const text = Input_form.value.trim();
    try{
        const response = await fetch('/products',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text}),
        });
        if (!response.ok) throw new Error('Error');
        await loadTasks();
        Input_form.value = '';
    }catch (error){
        console.error('No add tasks: ', error);
    }
}

async function deleteTask(id: number): Promise<void> {
    try{
        const response = await fetch(`/products/${id}`, {method: 'DELETE'});
        if (!response.ok) throw new Error('Error');
        await loadTasks();
        Input_form.value = '';
    }catch (error){
        console.error('No add tasks: ', error);
    }
}

async function rewritebtn(id: number, newText: string): Promise<void> {
    try{
        const response = await fetch(`/products/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: newText}),
        });
        if (!response.ok) throw new Error('Error');
        await loadTasks();
    }catch (error){
        console.error('No add tasks: ', error);
    }    
}

async function toggleTaskCompleted(id: number, completed: boolean): Promise<void> {
    try{
        const response = await fetch(`/products/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed}),
        }); 
        if (!response.ok) throw new Error('Error');
        await loadTasks();
    }catch (error){
        console.error('No add tasks: ', error);
    }    
}

function filtration(): void {
  currentFilter = selection.value as FilterValue;
  render();
}

function render(): void {
  let filteredTasks = tasks;
  if (currentFilter === 'Completed') {
    filteredTasks = tasks.filter(task => task.completed === true);
  } else if (currentFilter === 'Incomplete') {
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

    // Навешиваем обработчики
    const deleteBtn = taskDiv.querySelector('.delete') as HTMLButtonElement;
    const checkbox = taskDiv.querySelector('.check-complite') as HTMLInputElement;
    const rewriteBtn = taskDiv.querySelector('.rewrite') as HTMLButtonElement;
    const span = taskDiv.querySelector('span') as HTMLSpanElement;

    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    checkbox.addEventListener('change', () => toggleTaskCompleted(task.id, checkbox.checked));
    rewriteBtn.addEventListener('click', async () => {
      const newText = prompt('rename task:', span.textContent ?? '');
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
