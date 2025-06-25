// Fade-in animationtodoItemDetails
function fadeIn(element) {
    element.classList.remove('fade-in');
    void element.offsetWidth;
    element.classList.add('fade-in');
}

// References
const filterButtonElements = document.querySelectorAll('.button-group button');
const todoCategoryElements = document.querySelectorAll('.todo-category');

const todoTasksContainerElement = document.getElementById('todo-tasks-container');
const todoDetailsContainerElement = document.getElementById('todo-task-details');

let todoTitleElement = document.getElementById('todo-task-title');
let todoDescriptionElement = document.getElementById('todo-task-description');

const defaultDescriptionText = todoDescriptionElement ? todoDescriptionElement.innerHTML : '';

// Filter
filterButtonElements.forEach(filterButtonElement => {
    filterButtonElement.addEventListener('click', () => {
        filterButtonElements.forEach(button => button.classList.remove('selected'));
        filterButtonElement.classList.add('selected');
        const filter = filterButtonElement.dataset.filter;
        todoCategoryElements.forEach(todoCategoryElement => {
            const categoryType = todoCategoryElement.dataset.category;
            if (filter === 'all' || categoryType === filter) {
                todoCategoryElement.classList.remove('hidden');
            } else {
                todoCategoryElement.classList.add('hidden');
            }
        });
        fadeIn(todoTasksContainerElement);
    });
});

// Display todo info on hover
function addTodosHover() {
    const todoItemElements = document.querySelectorAll('.todo-item');
    todoItemElements.forEach(todoItemElement => {
        todoItemElement.removeEventListener('mouseenter', todoItemElement._mouseenterHandler);
        const mouseenterHandler = () => {
            if (document.getElementById('add-todo-form')) return;
            const todosArray = JSON.parse(localStorage.getItem('vrcafe-todos') || '[]');
            const todoId = todoItemElement.getAttribute('data-id');
            const todoObject = todosArray.find(todo => todo.id === todoId);
            if (todoTitleElement) {
                todoTitleElement.textContent = (todoObject && todoObject.title) ? todoObject.title : 'Item';
            }
            if (todoDescriptionElement) {
                if (todoObject && todoObject.description) {
                    todoDescriptionElement.innerHTML = todoObject.description.replace(/\n/g, '<br>');
                } else {
                    todoDescriptionElement.innerHTML = 'No description provided.';
                }
            }
            const previousActionsElement = todoDetailsContainerElement.querySelector('.todo-actions');
            if (previousActionsElement) previousActionsElement.remove();
            if (todoDetailsContainerElement && todoObject) {
                const actionHtml = `
                    <article class="button-group bottom todo-actions" data-id="${todoObject.id}">
                        <button type="button" class="todo-complete${!todoObject.isComplete ? ' hollow' : ''}">${!todoObject.isComplete ? 'Complete' : 'Completed'}</button>
                        <button type="button" class="todo-delete hollow">Delete</button>
                    </article>
                `;
                todoDescriptionElement.insertAdjacentHTML('afterend', actionHtml);
                const actionsElement = todoDetailsContainerElement.querySelector('.todo-actions');
                if (actionsElement) {
                    const completeButtonElement = actionsElement.querySelector('.todo-complete');
                    const deleteButtonElement = actionsElement.querySelector('.todo-delete');
                    if (completeButtonElement) {
                        completeButtonElement.addEventListener('click', () => {
                            const todosArray = JSON.parse(localStorage.getItem('vrcafe-todos') || '[]');
                            const todoIndex = todosArray.findIndex(todo => todo.id === todoObject.id);
                            if (todoIndex !== -1) {
                                todosArray[todoIndex].isComplete = !todosArray[todoIndex].isComplete;
                                localStorage.setItem('vrcafe-todos', JSON.stringify(todosArray));
                                loadTodos();
                                addTodosHover();
                                const itemElement = document.querySelector(`.todo-item[data-id='${todoObject.id}']`);
                                if (itemElement) itemElement.dispatchEvent(new Event('mouseenter'));
                            }
                        });
                    }
                    if (deleteButtonElement) {
                        deleteButtonElement.addEventListener('click', () => {
                            if (confirm('Are you sure you want to delete this todo?')) {
                                let todosArray = JSON.parse(localStorage.getItem('vrcafe-todos') || '[]');
                                todosArray = todosArray.filter(todo => todo.id !== todoObject.id);
                                localStorage.setItem('vrcafe-todos', JSON.stringify(todosArray));
                                loadTodos();
                                addTodosHover();
                                if (todoTitleElement) todoTitleElement.textContent = 'Item';
                                if (todoDescriptionElement) todoDescriptionElement.innerHTML = 'Hover over a todo item to see its <span class=\'color-accent\'>description</span>...';
                                const previousActionsElement = todoDetailsContainerElement.querySelector('.todo-actions');
                                if (previousActionsElement) previousActionsElement.remove();
                                fadeIn(todoTasksContainerElement);
                            }
                        });
                    }
                }
            }
            fadeIn(todoDetailsContainerElement);
        };
        todoItemElement._mouseenterHandler = mouseenterHandler;
        todoItemElement.addEventListener('mouseenter', mouseenterHandler);
    });
}

// LocalStorage
function saveTodo(todo) {
    const todos = JSON.parse(localStorage.getItem('vrcafe-todos') || '[]');
    todos.push(todo);
    localStorage.setItem('vrcafe-todos', JSON.stringify(todos));
}

function loadTodos() {
    document.querySelectorAll('.todo-category .todo-list').forEach(list => list.innerHTML = '');
    const todos = JSON.parse(localStorage.getItem('vrcafe-todos') || '[]');
    todos.forEach(todo => {
        const todoListCategory = document.querySelector(`.todo-category[data-category='${todo.category}'] .todo-list`);
        if (todoListCategory) {
            const todoItemElement = document.createElement('li');
            todoItemElement.className = 'todo-item';
            if (todo.isComplete) todoItemElement.classList.add('completed');
            if (todo.isImportant) todoItemElement.classList.add('important');
            todoItemElement.setAttribute('data-id', todo.id);
            todoItemElement.innerHTML = `${todo.title} <i class="fa-solid fa-chevron-right"></i>`;
            todoListCategory.appendChild(todoItemElement);
        }
    });
}

// Put the todos there and make em work
loadTodos();
addTodosHover();

// After the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const createTodoButtonElement = document.getElementById('create-todo-button');
    if (createTodoButtonElement) {
        createTodoButtonElement.addEventListener('click', showAddTodoForm);
    }

    function showAddTodoForm() {
        if (createTodoButtonElement) createTodoButtonElement.style.display = 'none';
        if (!todoDetailsContainerElement) return;
        const formHtml = `
        <form id="add-todo-form" class="add-todo-form">
            <h2>New Item</h2>
            <input type="text" id="new-todo-title" placeholder="Title" required></input>
            <select id="new-todo-category" required>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="school">School</option>
            </select>
            <textarea id="new-todo-description" placeholder="Description (optional)"></textarea>
            <article class="button-group">
                <button type="submit">Add</button>
                <button type="button" id="cancel-todo-form" class="hollow">Cancel</button>
            </article>
        </form>
        `;
        todoDetailsContainerElement.innerHTML = formHtml;
        const addTodoFormElement = document.getElementById('add-todo-form');
        if (addTodoFormElement) {
            fadeIn(addTodoFormElement);
            addTodoFormElement.addEventListener('submit', function (event) {
                event.preventDefault();
                const title = document.getElementById('new-todo-title').value.trim();
                let description = document.getElementById('new-todo-description').value;
                // Trim whitespace and newlines at start/end, preserve internal newlines
                description = description.replace(/^[\s\n]+|[\s\n]+$/g, '');
                const category = document.getElementById('new-todo-category').value;
                if (!title) return;
                const id = crypto.randomUUID();
                const newTodo = {
                    id,
                    title,
                    // Store as-is, render as <br> later
                    description: description || 'No description provided.',
                    category,
                    isComplete: false,
                    isImportant: false
                };
                saveTodo(newTodo);
                loadTodos();
                restoreDetails();
                if (createTodoButtonElement) createTodoButtonElement.style.display = '';
                if (todoDescriptionElement) todoDescriptionElement.innerHTML = defaultDescriptionText;
                fadeIn(todoTasksContainerElement);
            });
            document.getElementById('cancel-todo-form').addEventListener('click', () => {
                restoreDetails();
                if (createTodoButtonElement) createTodoButtonElement.style.display = '';
            });
        }
    }

    //
    function restoreDetails() {
        if (!todoDetailsContainerElement) return;
        todoDetailsContainerElement.innerHTML = `
            <h2 id="todo-task-title">Item</h2>
            <p id="todo-task-description">Hover over a todo item to see its <span class='color-accent'>description</span>...</p>
        `;
        todoTitleElement = document.getElementById('todo-task-title');
        todoDescriptionElement = document.getElementById('todo-task-description');
        addTodosHover();
        fadeIn(todoDetailsContainerElement);
    }
});