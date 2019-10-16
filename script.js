/* Todo List Functions */

let todoList = {
  todos: [],
  /*  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log("Your todo list is empty!");
    } else {
      console.log("My Todos: ");
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          console.log("(x) " + this.todos[i].todoText);
        } else {
          console.log("( ) " + this.todos[i].todoText);
        }
      }
    }
  }, */
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    /* this.displayTodos(); */
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    /* this.displayTodos(); */
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    /* this.displayTodos(); */
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    /* this.displayTodos(); */
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
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
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById(
      "toggleCompletedPositionInput"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
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

    for (let i = 0; i < todoList.todos.length; i++) {
      let todoLi = document.createElement("li");
      let todo = todoList.todos[i];
      let todoTextWithCompletion = "";

      if (todoList.todos[i].completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    let todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      let elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
