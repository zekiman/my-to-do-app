//******************* DOM ELEMENTS *******************

// categories
categories = document.querySelector('.category-div');
all_border = document.querySelector('.all-border')
active_border = document.querySelector('.active-border')
completed_border = document.querySelector('.completed-border')

// input
taskInput = document.querySelector('#form-details')

// add task button
addTaskBtn = document.querySelector('#send-btn')

// task element 
taskDiv = document.querySelectorAll('.task-section')

// all tasks
allTasks = document.querySelector('.all-tasks')

// delete all button
deleteAllBtn = document.querySelector('.delete-all-btn-div')
deleteAllBtn2 = document.querySelector('#delete-all-btn')
deleteAllBtn2.addEventListener('click',function(e){
    e.preventDefault();
    console.log('test')
})

// default category
let selectedCategory = 'all'



//********* RULES OF SHOWING THE CATEGORIES ********* 


// the function that showing active tasks
function showActive() {

    // set the category underline 
    all_border.style.backgroundColor = 'transparent';
    active_border.style.backgroundColor = '#2F80ED';
    completed_border.style.backgroundColor = 'transparent';

    // DOM new nodelist for determining new tasks and to affect also them
    let taskDivNew = document.querySelectorAll('.task-section')

    // for each task
    taskDivNew.forEach(function (task) {

        // if task is checked
        if (task.firstElementChild.firstElementChild.firstElementChild.checked) {
            // don't display it!
            task.style.display = 'none'
        } else {
            // display all of them
            task.style.display = 'block'
        }
    })
}

// the function that showing completed tasks
function showCompleted() {

    // set the category underline 
    all_border.style.backgroundColor = 'transparent';
    active_border.style.backgroundColor = 'transparent';
    completed_border.style.backgroundColor = '#2F80ED';

    let taskDivNew = document.querySelectorAll('.task-section')

    taskDivNew.forEach(function (task) {

        if (task.firstElementChild.firstElementChild.firstElementChild.checked) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}

// the function that showing all tasks
function showAll() {

    // set the category underline 
    all_border.style.backgroundColor = '#2F80ED';
    active_border.style.backgroundColor = 'transparent';
    completed_border.style.backgroundColor = 'transparent';

    let taskDivNew = document.querySelectorAll('.task-section')

    taskDivNew.forEach(function (task) {

        task.style.display = 'block'
    })
}
//-------------------------------------------------


//************** ADD EVENT LISTENERS ************** 

document.addEventListener('click',function(e){
    
    // (test) e.target;
    console.log('e.target = ')
    console.log(e.target)

    // When Checkbox is clicked
    if(e.target.className == 'checkbox'){
        taskChecked(e);
    }

    // 1- When 'Add' Button is clicked
    if(e.target==addTaskBtn){
        addingNewTask(e);
    }

    // 2- When Delete Icon is clicked
    if (e.target.className.includes('delete-icon')){
        if(e.target.parentElement.parentElement.parentElement.className.includes('task-section')){
            deletingTask(e);
        }
    }

    // 3- When 'Delete All' button is clicked
    if (e.target==deleteAllBtn){
        deleteAllItems(e);
    }

    // 3.2 - When 'Delete All' buton is clicked (a tag that include btn div)
    if (e.target==deleteAllBtn2){
        deleteAllItems(e);
    }


    //* (!) Categories ----------------
    // When Click to category 'All'
    if (e.target.className == 'all-div' ||
        e.target.className == 'all-text'){
            
            //Set the selectedCategory value as 'all' and run show function  
            selectedCategory = 'all';
            showAll();
    }

    // When Click to category 'Active'
    if (e.target.className == 'active-div' ||
        e.target.className == 'active-text'){
            
            //Set the selectedCategory value as 'all' and run show function  
            selectedCategory = 'active';
            showActive();
    }
    
    // When Click to category 'Completed'
    if (e.target.className == 'completed-div' ||
        e.target.className == 'completed-text'){
            
            //Set the selectedCategory value as 'all' and run show function  
            selectedCategory = 'completed';
            showCompleted();
    } 
    //* (!) Categories End --------------
    




})

// ! FEATURES RELATED TO TASKS (ADDING & DELETING A TASK & DELETING ALL TASKS)

//* 1- ADDING A NEW TASK FUNCTION  ---------------------------------------------

function addingNewTask(e){

    e.preventDefault();

    // when details input is empty, alert
    if(taskInput.value==''){
        alert('Please add the details at first.')
    }else{ 

        // if input isn't empty, run the create item function with input value parameter
        createItem(taskInput.value);

        // and run the setItemToLocalStorage function to saving the value to LS
        setItemToLocalStorage(taskInput.value)
    }

    // clear value of input after adding process
    taskInput.value = '';
}


//* 2- DELETING THE TASK  ----------------------------------------------------

function deletingTask(e){

    // DOM Element (task text)
    let taskText = e.target.parentElement.parentElement.parentElement

    // Delete the task;
    taskText.remove();

    // Delete also from local storage by the function with parameter that text of the task
    deleteFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);

}


// //* 3- DELETING ALL TASKS ----------------------------------------------------

function deleteAllItems(e) {

    //test
    console.log('selected category: '+selectedCategory)

    // DOM (create a new dom element because of to include new tasks)
    taskDivNew = document.querySelectorAll('.task-section')

    // While on Active category
    if(selectedCategory=='active'){
        taskDivNew.forEach(function(task){
            //for all task item; if it has checked, remove it
            if(!task.firstElementChild.firstElementChild.firstElementChild.checked){
                task.remove();
                //delete the active tasks also from local storage
                deleteFromLocalStorage(task.firstElementChild.firstElementChild.nextElementSibling.textContent)
            }
        })
   }

    // While on Completed category
    if(selectedCategory=='completed'){
        taskDivNew.forEach(function(task){
            //for all task item; if it hasnot checked, remove it
            if(task.firstElementChild.firstElementChild.firstElementChild.checked){
                task.remove();
                //delete the completed tasks also from local storage
                deleteFromLocalStorage(task.firstElementChild.firstElementChild.nextElementSibling.textContent)
            }
        })
   }

    // While on ALL category
    if(selectedCategory=='all'){
        taskDivNew.forEach(function(task){
            //remove all tasks
            task.remove();

            //clear all task from local storage
            localStorage.clear();
        })
   }

}


// ! ------------ LOCAL STORAGE ------------ 


//* lOAD ITEMS -----------------------------------------------
loadItems();

function loadItems(){
    items = getItemsFromLocalStorage();

    items.forEach(function(item){
        createItem(item)
    })
}


//* GET ITEMS -----------------------------------------------
function getItemsFromLocalStorage(){

    if(localStorage.getItem('items')===null){
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}


//* SET ITEMS  -----------------------------------------------

function setItemToLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items))
}


//* DELETE ALSO FROM LOCAL STORAGE ----------------------------

function deleteFromLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1)
        }
    })
    localStorage.setItem('items',JSON.stringify(items))
}





// ! CREATING ITEM (APPENDCHILD) ------------------------------------------

//* CREATE ITEM FUNCTION THAT GENERATE NEW TASKS --------------------------

function createItem(text){
     
    //create div
    created_taskSection = document.createElement('div')
    created_taskSection.className = 'task-section'

    created_taskDiv = document.createElement('div')
    created_taskDiv.className = 'task'

    // create checkbox
    created_checkbox = document.createElement('input')
    created_checkbox.className = 'checkbox'
    created_checkbox.setAttribute('type', 'checkbox')

    // create form
    created_form = document.createElement('form')

    // create p
    created_taskName = document.createElement('p')
    created_taskName.className = 'task-name-text'
    created_taskName.innerHTML = text

    // create icon
    created_iconDiv = document.createElement('div')
    created_iconDiv.className = 'icon-div'

    // create span
    created_spanIcon = document.createElement('span')
    created_spanIcon.classList.add('material-icons', 'delete-icon')
    created_spanIcon.innerHTML = 'delete_outline'

    // append child
    allTasks.appendChild(created_taskSection)
    created_taskSection.appendChild(created_taskDiv)

    created_taskDiv.appendChild(created_form)
    created_taskDiv.appendChild(created_taskName)
    created_taskDiv.appendChild(created_iconDiv)

    created_form.appendChild(created_checkbox)
    created_iconDiv.appendChild(created_spanIcon)
}



//* CHECKING THE CHECKBOXES ----------------------------------------------------

function taskChecked(e){

    // DOM Element (task text)
    let taskText = e.target.parentElement.parentElement.parentElement

    if(e.target.checked){
       //if checkbox is checked, make the task lined
       taskText.style.textDecoration='line-through'

   }else{
        //if checkbox isn't checked, make the task text without lined
        taskText.style.textDecoration=''   
   }
}