const btn1 = document.querySelector(".todo-form__todo:nth-child(1) > button");
const btn2 = document.querySelector(".todo-form__todo:nth-child(2) > button");
const btn3 = document.querySelector(".todo-form__todo:nth-child(3) > button");
const btn4 = document.querySelector(".todo-form__todo:nth-child(4) > button");
const btn5 = document.querySelector(".todo-form__todo:nth-child(5) > button");
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
const statusChart = document.querySelector(".todo-chart__status-chart");
const statusText = document.querySelector(".todo-chart__status-chart > span");
const chartUpdateBtn = document.getElementById("updateChart");

const todoDisabledArray = [
  // 처음에 rendering 했을 때, 할 일 체크된 todo 확인
  todo1.disabled,
  todo2.disabled,
  todo3.disabled,
  todo4.disabled,
  todo5.disabled,
];

const checkTotalArray = () => {
  const todoTotalCheckArray = [
    todo1.dataset.id,
    todo2.dataset.id,
    todo3.dataset.id,
    todo4.dataset.id,
    todo5.dataset.id,
  ];
  return todoTotalCheckArray;
};

let todoTotalCheckArray = checkTotalArray();

// todo의 total 갯수 ⬇️
let totalNumber = todoTotalCheckArray.filter((element) =>
  Boolean(element)
).length;

// 한 일 갯수 ⬇️
let achieveNumber = todoDisabledArray.filter(
  (element) => element === true
).length;

let achieveChart = Math.ceil((achieveNumber / totalNumber) * 100); // 초기 차트 셋팅용

const achievePercent = () => (achieveNumber / totalNumber) * 100;

if (achieveChart && achieveChart !== Infinity) {
  statusText.innerText = `${achieveChart}%`;
  statusChart.style.opacity = "1";
  statusChart.style.width = `${achieveChart}%`;
}

// -------- check box에 click event가 발생 했을 때
const handleCheckClick = (event) => {
  event.preventDefault();
  const todos = event.target.parentElement.querySelectorAll("input");

  if (todos[1].disabled) {
    todos[0].disabled = false;
    todos[1].disabled = false;
    achieveNumber -= 1;
  } else {
    todos[0].disabled = true;
    todos[1].disabled = true;
    achieveNumber += 1;
  }

  achieveChart = Math.ceil(achievePercent(achieveNumber));

  if (achieveChart && achieveChart !== Infinity) {
    statusText.innerText = `${achieveChart}%`;
    statusChart.style.opacity = "1";
  }

  if (achieveChart === 0) {
    statusText.innerText = "0%";
    statusChart.style.opacity = "0";
  }

  statusChart.style.width = `${achieveChart}%`;

  const todoSubmit = document.getElementById("submitTodo");
  todoSubmit.click();
};

// total todo가 바뀌었을 때 (todo submit후, fetch가 완료 된 후 발생함)
const handleUpdateTotalTodos = () => {
  todoTotalCheckArray = checkTotalArray();
  totalNumber = todoTotalCheckArray.filter((element) =>
    Boolean(element)
  ).length;

  achieveChart = Math.ceil(achievePercent());

  if (achieveChart && achieveChart !== Infinity) {
    statusText.innerText = `${achieveChart}%`;
    statusChart.style.width = `${achieveChart}%`;
  }
};

btn1.addEventListener("click", handleCheckClick);
btn2.addEventListener("click", handleCheckClick);
btn3.addEventListener("click", handleCheckClick);
btn4.addEventListener("click", handleCheckClick);
btn5.addEventListener("click", handleCheckClick);

chartUpdateBtn.addEventListener("click", handleUpdateTotalTodos);
