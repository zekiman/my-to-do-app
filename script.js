//* DOM ELEMENTS

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



//* SHOWING THE TASK RULES

// variable of category name
let selectedCategory = 'active'

// when clicked to categories..
categories.addEventListener('click', function (e) {

    // if clicked to 'all category'
    if (e.target.className == 'all-div' ||
        e.target.className == 'all-text') {
        
        // set value of selected category name as 'all'
        selectedCategory = 'all'
     
        // run the show function
        show();
    };
    
    // if clicked to 'active category'
    if (e.target.className == 'active-div' ||
        e.target.className == 'active-text') {

        // set value of selected category name as 'active'
        selectedCategory = 'active'

        // run the show function
        show();
    };

    // if clicked to 'active category' 
    if (e.target.className == 'completed-div' ||
        e.target.className == 'completed-text') {

        // set value of selected category name as 'active'
        selectedCategory = 'completed'

        // run the show function
        show();
    };

})


// the function to showing tasks
function show() {

    // if selected categori is 'active'
    if (selectedCategory == 'active') {

        // set the category underline 
        all_border.style.backgroundColor = 'transparent';
        active_border.style.backgroundColor = '#2F80ED';
        completed_border.style.backgroundColor = 'transparent';

        
        let taskDivNew = document.querySelectorAll('.task-section')

        for (let i = 0; i < taskDivNew.length; i++) {
            if (taskDivNew[i].className.includes('done')) {
                taskDivNew[i].style.display = 'none';
            }
            if (!taskDivNew[i].className.includes('done')) {
                taskDivNew[i].style.display = 'block';
            }
        }
    }

    if (selectedCategory == 'completed') {
        all_border.style.backgroundColor = 'transparent';
        active_border.style.backgroundColor = 'transparent';
        completed_border.style.backgroundColor = '#2F80ED';

        let taskDivNew = document.querySelectorAll('.task-section')

        for (let i = 0; i < taskDivNew.length; i++) {
            if (taskDivNew[i].className.includes('done')) {
                taskDivNew[i].style.display = 'block';
            }
            if (!taskDivNew[i].className.includes('done')) {
                taskDivNew[i].style.display = 'none';
            }
        }
    }


    if (selectedCategory == 'all') {
        all_border.style.backgroundColor = '#2F80ED';
        active_border.style.backgroundColor = 'transparent';
        completed_border.style.backgroundColor = 'transparent';

        let taskDivNew = document.querySelectorAll('.task-section')

        for (let i = 0; i < taskDivNew.length; i++) {
            if (taskDivNew[i].className.includes('done')) {
                taskDivNew[i].style.display = 'block'
            }
            if (!taskDivNew[i].className.includes('done')) {
                taskDivNew[i].style.display = 'block'
            }
        }
    }
}

// delete this (test)



// categories.addEventListener('click',function(e){

// })


// while on All category, show all

// while on Active category, show all that dont have checked attribute

// while on Completed category, show all that have checked attribute 






//* ADDING A NEW TASK

addTaskBtn.addEventListener('click', function (e) {

    e.preventDefault();


    // get value from input
    newTask = taskInput.value

    console.log(newTask) // test (delete this later)

    //* create a new task elements

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
    created_taskName.innerHTML = newTask

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

    console.log(created_taskSection) // test (delate later)

    // clear value of input
    taskInput.value = '';

})




//* DELETING A TASK

// add event listener to all section
allTasks.addEventListener('click', function (e) {

    // if you clicked to delete icon...
    if (e.target.className.includes('delete-icon')) {

        // add delete class name of the parent of target
        e.target.parentElement.parentElement.parentElement.remove()
    }

    //* DONE TASK

    // if you clicked to checkbox...
    if (e.target.className == 'checkbox') {

        if (e.target.checked) {
            console.log('checked')
            // e.target.parentElement.parentElement.parentElement.style.textDecoration='line-through'

            e.target.parentElement.parentElement.parentElement.classList.add('done')

        } else {
            // e.target.parentElement.parentElement.parentElement.style.textDecoration=''

            e.target.parentElement.parentElement.parentElement.classList.remove('done')

        }


    }

})





//* DELETING ALL TASKS

console.log(taskDiv.length)
console.log(taskDiv)

// add event listener
deleteAllBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (selectedCategory == 'active') {

        let taskDivNew = document.querySelectorAll('.task-section')

        for (let i = 0; i < taskDivNew.length; i++) {
            if (!taskDivNew[i].className.includes('done')) {
                taskDivNew[i].remove();
            }
        }
    }

    if (selectedCategory == 'completed') {

        let taskDivNew = document.querySelectorAll('.task-section')

        for (let i = 0; i < taskDivNew.length; i++) {
            if (taskDivNew[i].className.includes('done')) {
                taskDivNew[i].remove();
            }
        }
    }


    if (selectedCategory == 'all') {

        let taskDivNew = document.querySelectorAll('.task-section')

        for (let i = 0; i < taskDivNew.length; i++) {
            taskDivNew[i].remove()
        }
    }
})
