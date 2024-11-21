const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
let todos = [];

// Ініціалізація додатку: завантажуємо задачі з пам'яті та відображаємо їх
function init() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    render();
    updateCounter();
}

// Зберігаємо задачі в пам'ять браузера
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Додаємо нову задачу через prompt
function newTodo() {
    const text = prompt('Enter the new task:');
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTask);
        saveTodos();
        render();
        updateCounter();
    }
}

// Шаблон для створення розмітки задачі
function renderTodo(todo) {
    const { id, text, completed } = todo;
    return `
        <li class="list-group-item">
            <input type="checkbox" class="form-check-input me-2" id="todo-${id}" ${completed ? 'checked' : ''} onclick="checkTodo(${id})">
            <label for="todo-${id}">
                <span class="${completed ? 'text-success text-decoration-line-through' : ''}">${text}</span>
            </label>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${id})">delete</button>
        </li>
    `;
}

// Відображення всіх задач у списку
function render() {
    list.innerHTML = '';
    todos.forEach(todo => {
        list.insertAdjacentHTML('beforeend', renderTodo(todo));
    });
}

// Оновлюємо лічильники задач
function updateCounter() {
    const total = todos.length;
    const uncheckedCount = todos.filter(todo => !todo.completed).length;
    
    itemCountSpan.textContent = total;
    uncheckedCountSpan.textContent = uncheckedCount;
}

// Видаляємо задачу за її id
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    render();
    updateCounter();
}

// Змінюємо статус виконання задачі
function checkTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    render();
    updateCounter();
}

// Викликаємо init при завантаженні сторінки
init();
