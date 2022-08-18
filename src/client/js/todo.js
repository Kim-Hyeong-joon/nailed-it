const todoForm = document.querySelector(".todo-form");
const todo1 = document.querySelector(".todo-form__todo:nth-child(1) > input");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2) > input");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3) > input");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4) > input");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5) > input");

export const todoArray = [todo1, todo2, todo3, todo4, todo5];
console.log("1: ", todoArray);

const addTodoDataset = (todoObj, arrayIndex) => {
  if (todoObj) {
    todoArray[arrayIndex].dataset.id = todoObj._id;
  } else {
    delete todoArray[arrayIndex].dataset.id;
  }
};

const handleTodoSubmit = async (event) => {
  event.preventDefault();

  const todo1Value = todo1.value;
  const todo2Value = todo2.value;
  const todo3Value = todo3.value;
  const todo4Value = todo4.value;
  const todo5Value = todo5.value;
  const todo1Disabled = todo1.disabled;
  const todo2Disabled = todo2.disabled;
  const todo3Disabled = todo3.disabled;
  const todo4Disabled = todo4.disabled;
  const todo5Disabled = todo5.disabled;
  const response = await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo1Value,
      todo2Value,
      todo3Value,
      todo4Value,
      todo5Value,
      todo1Disabled,
      todo2Disabled,
      todo3Disabled,
      todo4Disabled,
      todo5Disabled,
    }),
  });
  if (response.status === 201) {
    const { todos } = await response.json();
    addTodoDataset(todos[0], 0);
    addTodoDataset(todos[1], 1);
    addTodoDataset(todos[2], 2);
    addTodoDataset(todos[3], 3);
    addTodoDataset(todos[4], 4);
  }
};

todoForm.addEventListener("submit", handleTodoSubmit);
