// DEFINE UI VARIABLES

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//LOAD ALL EVENT LISTENERS
loadEventListeners();

//LOAD ALL EVENT LISTENERS
function loadEventListeners()
{
    //DOM load events
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task
    form.addEventListener('submit',addTask);
    //remove task
    taskList.addEventListener('click',removeTask);//here we targeted ul as .collection as taskList for event delegation
    //clear tasks
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks
    filter.addEventListener('keyup',filterTasks);
}

//ADD TASK
function addTask(e)
{
    if(taskInput.value==='')
    {
        alert('Please add a task');
    }
    else
    {
        //CREATE LI ELEMENT
        const li=document.createElement('li');
        //GIVE IT A CLASS
        li.className="collection-item";
        //CREATE TEXT NODE AND APPEND IT TO LI
        li.appendChild(document.createTextNode(taskInput.value));
        //CREATE LINK
        const link=document.createElement('a');
        //GIVE IT A CLASS
        link.className="delete-item secondary-content";
        //ADD ICON TO LINK
        link.innerHTML='<i class="fa fa-remove"></i>';
        //APPEND LINK TO LI
        li.appendChild(link);

        //APPEND LI TO UL
        taskList.appendChild(li);

        //ADD TO LOCAL STORAGE
        storeTaskInLocalStorage(taskInput.value);

        //CLEAR INPUT
        taskInput.value='';
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task)
    {
         //CREATE LI ELEMENT
         const li=document.createElement('li');
         //GIVE IT A CLASS
         li.className="collection-item";
         //CREATE TEXT NODE AND APPEND IT TO LI
         li.appendChild(document.createTextNode(task));
         //CREATE LINK
         const link=document.createElement('a');
         //GIVE IT A CLASS
         link.className="delete-item secondary-content";
         //ADD ICON TO LINK
         link.innerHTML='<i class="fa fa-remove"></i>';
         //APPEND LINK TO LI
         li.appendChild(link);
 
         //APPEND LI TO UL
         taskList.appendChild(li);
    })
}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are You Sure ?'))
        {
            e.target.parentElement.parentElement.remove();

            //REMOVE FROM LS
            removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
}

function clearTasks()
{
    // taskList.innerHTML='';//slower method
    while(taskList.firstChild)
    {
        if(confirm('Are You Sure About Deleting All Tasks ?'))
        {
            taskList.removeChild(taskList.firstChild);
        }
    }

    clearTasksFromLocalStorage();
}

function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index)
    {
        if(taskItem.textContent===task)
        {
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

function filterTasks(e)
{
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display='block';
        }
        else
        {
            task.style.display='none';
        }
    })
}