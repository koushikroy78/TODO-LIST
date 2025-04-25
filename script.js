let todos = [];

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.done ? 'checked' : '';

    if (todo.editing) {
      li.innerHTML = `
        <input type="text" class="edit-input" value="${todo.text}" oninput="editText(${index}, this.value)" />
        <button class="add-btn" onclick="saveEdit(${index})">Save</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
      `;
    } else {
      li.innerHTML = `
        <input type="checkbox" ${todo.done ? 'checked' : ''} onclick="toggleDone(${index})" />
        <span class="todo-text">${todo.text}</span>
        <button class="edit-btn" onclick="startEdit(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
      `;
    }

    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, done: false, editing: false });
    input.value = '';
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function startEdit(index) {
  todos[index].editing = true;
  renderTodos();
}

function editText(index, newText) {
  todos[index].text = newText;
}

function saveEdit(index) {
  todos[index].editing = false;
  renderTodos();
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

// Initial render
renderTodos();
