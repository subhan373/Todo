const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick");

let editTodo = null;


window.onload = function () {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todoText) => {
    createTodoElement(todoText);
  });
};

function CreateTodoData() {
  if (todoValue.value.trim() === "") {
    alert("Please Enter your ToDo text");
    todoValue.focus();
    return;
  }

  createTodoElement(todoValue.value);
  saveTodos();
  todoValue.value = "";
}

function createTodoElement(text) {
  let li = document.createElement("li");
  li.innerHTML = `
    <div>${text}</div>
    <div class="actions">
      <i class="fa-solid fa-pen" onclick="UpdateToDoItems(this)"></i>
      <i class="fa-solid fa-trash" onclick="DeleteToDoItems(this)"></i>
    </div>
  `;
  listItems.appendChild(li);
}

function DeleteToDoItems(e) {
  e.parentElement.parentElement.remove();
  saveTodos();
  resetToAddMode();
}

function UpdateToDoItems(e) {
  let li = e.parentElement.parentElement;
  editTodo = li;
  todoValue.value = li.querySelector("div").innerText;
  addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
  addUpdateClick.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
}

function UpdateOnSelectionItems() {
  if (editTodo) {
    editTodo.querySelector("div").innerText = todoValue.value;
    editTodo = null;
    saveTodos();
    resetToAddMode();
  }
}

function resetToAddMode() {
  addUpdateClick.setAttribute("onclick", "CreateTodoData()");
  addUpdateClick.innerHTML = '<i class="fa-solid fa-plus"></i>';
  todoValue.value = "";
}


function saveTodos() {
  let todos = [];
  document.querySelectorAll("#list-items li div:first-child").forEach((div) => {
    todos.push(div.innerText);
  });
  localStorage.setItem("name", JSON.stringify(todos));
}
