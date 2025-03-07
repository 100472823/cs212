document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    const searchBar = document.getElementById('searchBar');

    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const pendingTasksSpan = document.getElementById('pendingTasks');

    const sortSelect = document.getElementById('sortSelect');

    let editingTaskCard = null;

    // Function to update statistics
    function updateStatistics() {
        const tasks = document.querySelectorAll('.task-card');
        const completedTasks = document.querySelectorAll('.completed-task-card');
        const totalTasks = tasks.length;
        const pendingTasks = totalTasks - completedTasks.length;

        totalTasksSpan.textContent = totalTasks;
        completedTasksSpan.textContent = completedTasks.length;
        pendingTasksSpan.textContent = pendingTasks;
    }

    // Function to add a task to the list
    function addTask(title, description, dueDate, priority) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('col-md-6');
        taskCard.innerHTML = `
            <div class="task-card priority-${priority.toLowerCase()} p-3" data-due-date="${dueDate}" data-priority="${priority}">
                <h5 class="fw-bold">${title}</h5>
                <p>${description}</p>
                <p class="mb-1"><strong>Due Date:</strong> ${dueDate}</p>
                <p class="mb-2"><strong>Priority:</strong> ${priority}</p>
                <a href="#" class="edit-btn text-decoration-none">Edit</a>
                <a href="#" class="delete-btn text-decoration-none">Delete</a>
                <div class="form-check mt-2">
                    <input class="form-check-input complete-box" type="checkbox" />
                    <label class="form-check-label">Completed</label>
                </div>
            </div>`;

        // Delete functionality
        const deleteButton = taskCard.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            taskList.removeChild(taskCard);
            updateStatistics();
        });

        // Complete functionality
        const completeBox = taskCard.querySelector('.complete-box');
        completeBox.addEventListener('change', () => {
            taskCard.classList.toggle('completed-task-card');
            updateStatistics();
        });

        // Add edit functionality
        const editButton = taskCard.querySelector('.edit-btn');
        editButton.addEventListener('click', (e) => {
            e.preventDefault();

             // Get the current task card details
             const currentTitle = taskCard.querySelector('h5').textContent;
             const currentDescription = taskCard.querySelector('p').textContent;
             const currentDueDate = taskCard.querySelector('.mb-1').textContent.replace('Due Date: ', '');
             const currentPriority = taskCard.querySelector('.mb-2').textContent.replace('Priority: ', '');
 
             // Call the editTask function with the current task details
             editTask(taskCard, currentTitle, currentDescription, currentDueDate, currentPriority);
         });
         
        // Append task card
        taskList.appendChild(taskCard);

        // Update statistics
        updateStatistics();
    }

    // Function to edit a task
    function editTask(taskCard, title, description, dueDate, priority) {

        // Populate the form with the current task card details
        document.getElementById('taskTitle').value = title;
        document.getElementById('taskDescription').value = description;
        document.getElementById('taskDueDate').value = dueDate;
        document.getElementById('taskPriority').value = priority;
    
        // Set the current task card to be edited
        editingTaskCard = taskCard;
    
        // Change the submit button text to indicate update
        taskForm.querySelector('button[type="submit"]').textContent = 'Update Task';
    }

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;

        if (editingTaskCard) {
            // If we're editing an existing task, update the task card
            const taskCardDiv = editingTaskCard.querySelector('.task-card');

            // Update the task card's data attributes
            taskCardDiv.setAttribute('data-due-date', dueDate);
            taskCardDiv.setAttribute('data-priority', priority);

            // Remove the old priority class
            taskCardDiv.classList.remove(`priority-${taskCardDiv.querySelector('.mb-2').textContent.replace('Priority: ', '').toLowerCase()}`);
            
            // Add the new priority class
            taskCardDiv.classList.add(`priority-${priority.toLowerCase()}`);

            // Update task content
            editingTaskCard.querySelector('h5').textContent = title;
            editingTaskCard.querySelector('p').textContent = description;
            editingTaskCard.querySelector('.mb-1').innerHTML = `<strong>Due Date:</strong> ${dueDate}`;
            editingTaskCard.querySelector('.mb-2').innerHTML = `<strong>Priority:</strong> ${priority}`;

            // Reset form and button for new task
            taskForm.reset();
            taskForm.querySelector('button[type="submit"]').textContent = 'Add Task';
            editingTaskCard = null;

            //re sort based on edits
            sortTasks(sortSelect.value);
        } 
        else {
            // Add new task if not editing
            addTask(title, description, dueDate, priority);

            // Reset the form after adding a task
            taskForm.reset();
        }
    });

    // Search functionality
    searchBar.addEventListener('input', () => {
        const keyword = searchBar.value.toLowerCase();
        const tasks = document.querySelectorAll('.task-card');

        tasks.forEach((task) => {
            const title = task.querySelector('h5').textContent.toLowerCase();
            const description = task.querySelector('p').textContent.toLowerCase();

            if (title.includes(keyword) || description.includes(keyword)) {
                task.closest('.col-md-6').style.display = 'block';
            } else {
                task.closest('.col-md-6').style.display = 'none';
            }
        });
    });

    // Sort functionality
    function sortTasks(criteria) {
        //create an array to sort
        const tasks = Array.from(document.querySelectorAll('.task-card'));
        console.log(tasks);
        
        // Sorting based on criteria
        if (criteria === 'due-date') {
            tasks.sort((a, b) => {
                const dueDateA = new Date(a.dataset.dueDate);
                const dueDateB = new Date(b.dataset.dueDate);
                return dueDateA - dueDateB;
            });
        }

        if (criteria === 'priority') {
            const priorityOrder = { 'Low': 3, 'Medium': 2, 'High': 1 };
            tasks.sort((a, b) => priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]);
        }
        
        if (criteria === 'due-date-priority'){
            const priorityOrder = { 'Low': 3, 'Medium': 2, 'High': 1 };
            tasks.sort((a, b) => {
                const dueDateA = new Date(a.dataset.dueDate);
                const dueDateB = new Date(b.dataset.dueDate);
                return dueDateA - dueDateB;
            });
            tasks.sort((a, b) => priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]);
        }

        // Reorder the tasks in the DOM based on the sorted order
        tasks.forEach(task => taskList.appendChild(task.closest('.col-md-6')));
    }

    // Add event listeners for sorting options
    sortSelect.addEventListener('change', (e) => {
        sortTasks(e.target.value);
    });
});

