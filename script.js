document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const todoDeadline = document.getElementById('todo-deadline');
    const todoPriority = document.getElementById('todo-priority');
    const todoList = document.getElementById('todo-list');

    addBtn.addEventListener('click', () => {
        addTodo();
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        const deadline = todoDeadline.value;
        const priority = todoPriority.value;

        if (todoText === '') return;

        const li = document.createElement('li');
        li.className = `todo-item todo-priority-${priority}`;

        const span = document.createElement('span');
        span.textContent = `${todoText} (Due: ${deadline || 'No deadline'})`;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTodoItem(li, span));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodoItem(li));

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        todoInput.value = '';
        todoDeadline.value = '';
        todoPriority.value = 'low';
        todoInput.focus();
    }

    function deleteTodoItem(item) {
        todoList.removeChild(item);
    }

    function editTodoItem(item, span) {
        const newTodoText = prompt('Edit your task:', span.textContent.split(' (Due:')[0]);
        const newDeadline = prompt('Edit deadline (YYYY-MM-DD):', span.textContent.split('Due: ')[1].slice(0, -1));
        const newPriority = prompt('Edit priority (low, medium, high):', item.className.split('todo-priority-')[1]);

        if (newTodoText !== null && newTodoText.trim() !== '') {
            span.textContent = `${newTodoText.trim()} (Due: ${newDeadline || 'No deadline'})`;
        }
        if (newPriority !== null && ['low', 'medium', 'high'].includes(newPriority)) {
            item.className = `todo-item todo-priority-${newPriority}`;
        }
    }
});
