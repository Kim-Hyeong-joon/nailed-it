const todoForm = document.querySelector(".todo-form");
const submitTodo = document.getElementById("submitTodo");
const todo1 = document.querySelector(".todo-form__todo:nth-child(1) > input");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2) > input");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3) > input");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4) > input");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5) > input");

const chartUpdateBtn = document.getElementById("updateChart");

const todoArray = [todo1, todo2, todo3, todo4, todo5];

let isCommand;
let isKeyS;

// todo가 update 됐을 때 dataset.id update하는 function
const addTodoDataset = (todoObj, arrayIndex) => {
  if (todoObj) {
    todoArray[arrayIndex].dataset.id = todoObj._id;
  } else {
    delete todoArray[arrayIndex].dataset.id;
  }
};

// todo form POST
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

  // server에서 data 받아서 todo에 data.id 추가
  if (response.status === 201) {
    const { todos } = await response.json();
    addTodoDataset(todos[0], 0);
    addTodoDataset(todos[1], 1);
    addTodoDataset(todos[2], 2);
    addTodoDataset(todos[3], 3);
    addTodoDataset(todos[4], 4);
  }
  chartUpdateBtn.click();

  // 할 일 쪼개기 title update
  const div = document.querySelector(".detail-form");
  if (div) {
    const titleResponse = await fetch(`/api/${div.dataset.id}/details-title`);
    if (titleResponse.status === 201) {
      const { title } = await titleResponse.json();
      const span = document.querySelector(".detail-form span");
      span.innerText = `할 일 쪼개기: ${title}`;
    }
  }
};

const handleInputKeydown = (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    submitTodo.click();
    const detailForm = document.getElementById("detailForm");
    if (detailForm) {
      const detailSubmit = document.getElementById("detailSubmit");
      detailSubmit.click();
    }
  }
};

const handleInputDoubleClick = (event) => {
  console.log(event.target);
};

todoForm.addEventListener("submit", handleTodoSubmit);
todo1.addEventListener("keydown", handleInputKeydown);
todo2.addEventListener("keydown", handleInputKeydown);
todo3.addEventListener("keydown", handleInputKeydown);
todo4.addEventListener("keydown", handleInputKeydown);
todo5.addEventListener("keydown", handleInputKeydown);
