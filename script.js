/* Todo List Functions */

let todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    if (completedTodos === totalTodos) {
      this.todos.forEach(function(todo) {
        todo.completed = false;
      });
    } else {
      this.todos.forEach(function(todo) {
        todo.completed = true;
      });
    }
  }
};

/* Event Handlers */
let handlers = {
  addTodo: function() {
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    let changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

/* UI Functions */
let view = {
  displayTodos: function() {
    let todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    todoList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement("li");
      let todoTextWithCompletion = this.createTextDiv("");
      if (todo.completed === true) {
        todoTextWithCompletion.innerHTML = todo.todoText;
        todoTextWithCompletion.classList.add("strikeThrough");
      } else {
        todoTextWithCompletion.innerHTML = todo.todoText;
        todoTextWithCompletion.classList.remove("strikeThrough");
      }
      todoLi.id = position;
      todoLi.appendChild(this.createCheckButton(todo.completed));
      todoLi.appendChild(todoTextWithCompletion);
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      this.addDoubleClick();
    }, this);
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `X`;
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createCheckButton: function(completed) {
    let checkButton = document.createElement("button");
    let checkMark = document.createElement("i");
    checkMark.classList.add("checkMark");
    if (completed === true) {
      checkMark.classList.add("fas");
      checkMark.classList.add("fa-check");
    } else {
      checkMark.classList.remove("fas");
      checkMark.classList.remove("fa-check");
    }
    checkButton.appendChild(checkMark);
    checkButton.className = "checkButton";
    return checkButton;
  },
  createTextDiv: function(todoText) {
    let textDiv = document.createElement("div");

    textDiv.className = "todoText";
    textDiv.innerHTML = todoText;
    return textDiv;
  },
  createTextInput: function(todoText) {
    let textInput = document.createElement("input");
    textInput.className = "edit";
    textInput.value = todoText;
    return textInput;
  },
  /*  addChangeTodoTextInput: function() {
    let changeTodoTextInput = document.createElement("input");
    changeTodoTextInput.className = "changeTodoTextInput";
    console.log(changeTodoTextInput);
  }, */
  addDoubleClick: function() {
    let todoText = document.querySelector("li");
    todoText.addEventListener("dblclick", function() {
      this.childNodes[1].style.display = "none";
      this.childNodes[2].style.display = "block";
    });
  },
  /*   createChangeTodoTextInput: function() {
    let changeTodoTextInput = document.createElement("input");
    return changeTodoTextInput;
  }, */

  setUpEventListeners: function() {
    let todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function(event) {
      let elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      if (elementClicked.className === "checkButton") {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });

    let addTodoTextInput = document.getElementById("addTodoTextInput");
    addTodoTextInput.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) {
        handlers.addTodo();
      }
    });
  }
};

view.setUpEventListeners();
