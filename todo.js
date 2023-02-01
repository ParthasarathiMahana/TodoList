const todo = (function(){
    let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

async function fetchTasks()
{
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function(data){
    //     return data.json();})
    //     .then(function(response){
    //         tasks = response.slice(0, 10);
    //         renderList();
    //     })
    //     .catch(function(error)
    //     {
    //         console.log("error", error);
    //     })

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0, 10);
        renderList();
    }
    catch(error){
        console.log(error);
    }
    
}

function addTasksToDom(task)
{
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done?"checked":""} data-id="12" class="custom-checkbox"><label for="${task.id}">${task.title}</label><img src="bin.svg" class="delete" data-id="${task.id}" />`;
    taskList.append(li);
}

function renderList () 
{
    taskList.innerHTML = '';
    for(var i=0; i<tasks.length; i++)
    {
        addTasksToDom(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete (taskId) 
{
    let newTasks = tasks.filter(function(task)
    {
        if(task.id == taskId)
        {
            task.completed = !task.completed;
        }
        return task.id;
    });
    tasks = newTasks;
    renderList();
    if(newTasks.length > 0)
    {
        showNotification("Task marked Completed.");
    }
}

function deleteTask (taskId) 
{
    let newTasks = tasks.filter(function(task)
    {
        return task.id != taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted Successfully.");
}

function addTask (task) 
{
    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification("Task Added Successfully");
        return;
    }
    showNotification("Task Can't be added");
}

function showNotification(text) 
{
    window.alert(text);
}

function handleInputKeypress(e)
{
    if(e.key === "Enter")
    {
        const text = e.target.value;
        console.log(text);
        if(!text)
        {
            showNotification("Add Task, text field can not be empty.");
            return;
        }

        const task ={
            title: text,
            id: Date.now().toString(),
            completed: false
        }
        e.target.value="";
        addTask(task);
    }
}

function handleClickEvent(e)
{
    const target = e.target;
    if(target.className == "custom-checkbox")
    {
        markTaskAsComplete(target.id);
    }
    else if(target.className == "delete")
    {
        deleteTask(target.dataset.id);
    }
}

function initializeApp(){
    fetchTasks();
    addTaskInput.addEventListener("keyup", handleInputKeypress);
    document.addEventListener('click', handleClickEvent);
}

return {
    initialize: initializeApp
}
})();