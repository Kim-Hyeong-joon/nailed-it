const todoForm = document.querySelector(".todo-form");
const submitTodo = document.getElementById("submitTodo");
const todo1 = document.querySelector(
  ".todo-form__todo:nth-child(1) > input:nth-child(2)"
);
const todo2 = document.querySelector(
  ".todo-form__todo:nth-child(2) > input:nth-child(2)"
);
const todo3 = document.querySelector(
  ".todo-form__todo:nth-child(3) > input:nth-child(2)"
);
const todo4 = document.querySelector(
  ".todo-form__todo:nth-child(4) > input:nth-child(2)"
);
const todo5 = document.querySelector(
  ".todo-form__todo:nth-child(5) > input:nth-child(2)"
);
const todo1Trigger = document.querySelector(
  ".todo-form__todo:nth-child(1) > input:nth-child(1)"
);
const todo2Trigger = document.querySelector(
  ".todo-form__todo:nth-child(2) > input:nth-child(1)"
);
const todo3Trigger = document.querySelector(
  ".todo-form__todo:nth-child(3) > input:nth-child(1)"
);
const todo4Trigger = document.querySelector(
  ".todo-form__todo:nth-child(4) > input:nth-child(1)"
);
const todo5Trigger = document.querySelector(
  ".todo-form__todo:nth-child(5) > input:nth-child(1)"
);

const todoArray = [todo1, todo2, todo3, todo4, todo5];
let todoId;
let nameId;

// todo가 update 됐을 때 dataset.id update하는 function
const addTodoDataset = (todoObj, arrayIndex) => {
  if (todoObj) {
    todoArray[arrayIndex].dataset.id = todoObj._id;
  } else {
    delete todoArray[arrayIndex].dataset.id;
  }
};

// detail form title update (있었는데 없어졌을 때, 없었는데 생겼을 때)
const detailFormIdUpdate = (todoObj, arrayIndex, todoNameId) => {
  if (todoObj && nameId === todoNameId && !todoId) {
    const detailForm = document.querySelector(".detail-form");
    detailForm.dataset.id = todoObj._id;
    todoId = todoObj._id;
    todoArray[arrayIndex].click(); // details.js의 todoId update를 위해서 추가.
  }
  if (!todoObj && nameId === todoNameId && todoId) {
    const detailForm = document.querySelector(".detail-form");
    delete detailForm.dataset.id;
    todoId = null;
    todoArray[arrayIndex].click(); // details.js의 todoId update를 위해서 추가.
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
  const todo1TriggerValue = todo1Trigger.value;
  const todo2TriggerValue = todo2Trigger.value;
  const todo3TriggerValue = todo3Trigger.value;
  const todo4TriggerValue = todo4Trigger.value;
  const todo5TriggerValue = todo5Trigger.value;
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
      todo1TriggerValue,
      todo2TriggerValue,
      todo3TriggerValue,
      todo4TriggerValue,
      todo5TriggerValue,
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

    detailFormIdUpdate(todos[0], 0, "todo1");
    detailFormIdUpdate(todos[1], 1, "todo2");
    detailFormIdUpdate(todos[2], 2, "todo3");
    detailFormIdUpdate(todos[3], 3, "todo4");
    detailFormIdUpdate(todos[4], 4, "todo5");
  }

  // detail form title update
  const detailBox = document.querySelector(".detail-form");
  const detailForm = document.querySelector("#detailForm");

  // input value가 없었는데 새로 생긴경우 or 있었는데 지워진 경우
  if (
    (detailBox.dataset.id && !detailForm) ||
    (!detailBox.dataset.id && detailForm)
  ) {
    if (nameId === "todo1") {
      todo1.blur();
      setTimeout(() => {
        todo1.focus();
      }, 10);
    }
    if (nameId === "todo2") {
      todo2.blur();
      setTimeout(() => {
        todo2.focus();
      }, 10);
    }
    if (nameId === "todo3") {
      todo3.blur();
      setTimeout(() => {
        todo3.focus();
      }, 10);
    }
    if (nameId === "todo4") {
      todo4.blur();
      setTimeout(() => {
        todo4.focus();
      }, 10);
    }
    if (nameId === "todo5") {
      todo5.blur();
      setTimeout(() => {
        todo5.focus();
      }, 10);
    }
  } else {
    // value가 존재 했는데 title 이름만 바뀐 경우
    if (detailBox.dataset.id) {
      const titleResponse = await fetch(
        `/api/${detailBox.dataset.id}/details-title`
      );
      if (titleResponse.status === 201) {
        const { title } = await titleResponse.json();
        const span = document.querySelector(".detail-form span");
        span.innerText = `할 일 쪼개기: ${title}`;
      }
    } else {
      const span = document.querySelector(".detail-form span");
      if (span) {
        span.innerText = "할 일 쪼개기:";
      }
    }
  }
};

const handleInputKeydown = (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    submitTodo.click();
  }
};

const handleFocus = (event) => {
  if (event.target.dataset.id) {
    todoId = event.target.dataset.id;
  } else {
    todoId = null;
  }
  nameId = event.target.name;
};

todoForm.addEventListener("submit", handleTodoSubmit);
todo1.addEventListener("keypress", handleInputKeydown);
todo2.addEventListener("keypress", handleInputKeydown);
todo3.addEventListener("keypress", handleInputKeydown);
todo4.addEventListener("keypress", handleInputKeydown);
todo5.addEventListener("keypress", handleInputKeydown);
todo1Trigger.addEventListener("keypress", handleInputKeydown);
todo2Trigger.addEventListener("keypress", handleInputKeydown);
todo3Trigger.addEventListener("keypress", handleInputKeydown);
todo4Trigger.addEventListener("keypress", handleInputKeydown);
todo5Trigger.addEventListener("keypress", handleInputKeydown);

todo1.addEventListener("focus", handleFocus);
todo2.addEventListener("focus", handleFocus);
todo3.addEventListener("focus", handleFocus);
todo4.addEventListener("focus", handleFocus);
todo5.addEventListener("focus", handleFocus);
