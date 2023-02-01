const todoInput = document.querySelector(".todo-input");
const todoAdd = document.querySelector(".todo-add");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");
const success = document.querySelector(".success");
const warning = document.querySelector(".warning");

//*events
todoAdd.addEventListener("click", addTodo);
todoList.addEventListener("click", checkList);
todoFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

function addTodo(e) {
  e.preventDefault();

  //*gap check
  const isEmpty = (str) => !str.trim().length;

  if (isEmpty(todoInput.value)) {
    warning.style.display = "block";
    setTimeout(() => {
      warning.style.display = "none";
    }, 3000);
    todoInput.value = "";
  } else {
    success.style.display = "block";
    setTimeout(() => {
      success.style.display = "none";
    }, 3000);

    saveLocalStorage(todoInput.value);

    //* create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //* create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //*create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //* create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = ` <i class="fas fa-minus-circle"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //*append to list
    todoList.appendChild(todoDiv);

    //*clear input value
    todoInput.value = "";
  }
}

function checkList(e) {
  const item = e.target;

  //*delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("trash");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //*check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (item) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

//*local storage
function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //push etmek için javascripte döndürüyor
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); //tekrardan JSONa döndürüyor
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //* create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //* create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //*create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //* create trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = ` <i class="fas fa-minus-circle"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //*append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
