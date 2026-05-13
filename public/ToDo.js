let task_arr = [obj1={id: 1,    
        text: 'Buy milk',
        completed: false},
        obj2={id: 2,    
        text: 'Close the door',
        completed: false}]
function addTask(){
    // const task_div = document.createElement('div')
    const text_Task = Input_form.value.trim()

    console.log(text_Task)
    if (text_Task === ''){
        console.log('enter text task');
        return;
    }
    // task_div.className = 'task';
    // task_div.innerHTML = `
    //         <div class="task-check">
    //             <input type="checkbox" class="check-complite">
    //             <span id="text">${(text_Task)}</span>
    //         </div>
    //         <div class="button-container">
    //             <button class="delete button">X</button>
    //             <button class="rewrite button">/</button>
    //         </div>
    //     `;
    // taskContainer.appendChild(task_div);
    const newTask = {   
        id: Date.now(),    
        text: text_Task,
        completed: false
    };
    task_arr.push(newTask);
    Input_form.value = ''
    render()
    // button_work(task_div);
}


function button_work(task_btn, Id_task){
    const deletebtn = task_btn.querySelector('.delete')
    const checkboxbnt = task_btn.querySelector('.check-complite')
    const rewritebtn = task_btn.querySelector('.rewrite')
    const task_span = task_btn.querySelector('span')
    deletebtn.addEventListener('click', () => { //task_btn.remove()
        const index = task_arr.findIndex(del_task => del_task.id === Id_task);
        if (index !== -1){
            task_arr.splice(index, 1)
            render();  
        }
         

    })

    checkboxbnt.addEventListener('change', () =>{
        //checkboxbnt.checked == true ?  task_span.style.textDecoration = 'line-through' : task_span.style.textDecoration = 'none'
        // render()
        const task = task_arr.find(box_task => box_task.id === Id_task);
        if (task){
            task.completed = checkboxbnt.checked
            render()
        }
        

    })
    rewritebtn.addEventListener('click', function(){
        const new_task = prompt('Rewrite the task:',task_span.textContent)
        if (new_task && new_task.trim() !==''){
            const task = task_arr.find(rew_task => rew_task.id === Id_task);
            if (task) {
                task.text = new_task.trim()
                render()
            }
        }
    })

}
function filtration(){
    valiu = selection.value
    render()
}    
function render() {
    let filteredTasks = task_arr;
    if (valiu === 'Completed') {
        filteredTasks = task_arr.filter(task => task.completed === true);
    } else if (valiu === 'Incomplete') {
        filteredTasks = task_arr.filter(task => task.completed === false);
    }
    taskContainer.innerHTML = ''
    filteredTasks.forEach(task => {
        const task_div = document.createElement('div')
        task_div.className = 'task'
        task_div.dataset.id = task.id;  
        task_div.innerHTML = `
            <div class="task-check">
                <input type="checkbox" class="check-complite" ${task.completed ? 'checked' : ''}>
                <span style="${task.completed ? 'text-decoration: line-through;' : ''}">${task.text}</span>
            </div>
            <div class="button-container">
                <button class="delete button">X</button>
                <button class="rewrite button">/</button>
            </div>
        `;
    taskContainer.appendChild(task_div);
    button_work(task_div,task.id);

    });
}
let valiu = 'All'
const taskContainer = document.querySelector('.task_container');
const Add_btn = document.getElementById('add')
const Input_form = document.getElementById('add-input')
const all_Tasks = document.querySelectorAll('.task');
const selection = document.querySelector('#Tasks_value')
selection.addEventListener('change', filtration);
Add_btn.addEventListener('click', addTask);
all_Tasks.forEach(task => button_work(task));
render()

