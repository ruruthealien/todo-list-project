document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-img');
    const todosContainer = document.querySelector('.todos-container');

    // this function checks the current state of the task list and shows/hides the empty image accordingly
    const emptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';

        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };


    // text is added to the task list and the input field is cleared
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            return;
        }
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="checkbox">
        <span> ${taskText} </span>
        <div class= "task-button">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        // for edit button
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                emptyState();
            }
        })

        // for delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            emptyState(); // check if the empty image should be displayed
        });


        taskList.appendChild(li);
        taskInput.value = '';
        emptyState(); // check if the empty image should be displayed
    };


    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    })
});