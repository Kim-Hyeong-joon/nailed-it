import { Chart } from "chart.js";
const todoForm = document.querySelector(".todo-form");
const ctx = document.getElementById("percentChart").getContext("2d");
const btn1 = document.querySelector(".todo-form__todo:nth-child(1) > button");
const btn2 = document.querySelector(".todo-form__todo:nth-child(2) > button");
const btn3 = document.querySelector(".todo-form__todo:nth-child(3) > button");
const btn4 = document.querySelector(".todo-form__todo:nth-child(4) > button");
const btn5 = document.querySelector(".todo-form__todo:nth-child(5) > button");
const todo1 = document.querySelector(".todo-form__todo:nth-child(1) > input");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2) > input");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3) > input");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4) > input");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5) > input");
const spanPercent = document.querySelector(".percentage-box > span");
const chartUpdateBtn = document.getElementById("updateChart");

const todoDisabledArray = [
  // 할 일 체크된 todo 확인
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

let achieveChart = (achieveNumber / totalNumber) * 100; // 초기 차트 셋팅용
let todoChart;
const achievePercent = () => (achieveNumber / totalNumber) * 100;

spanPercent.innerText = `${achieveChart}%`;

// -------- Chart 생성 -----------
todoChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["해낸 일", "해낼 일"],
    datasets: [
      {
        label: "Nailed It",
        data: [parseInt(achieveChart), 100 - parseInt(achieveChart)],
        backgroundColor: ["green", "teal"],
        borderWidth: 0.5,
        borderColor: "black",
      },
    ],
  },
  options: {
    title: { display: true, text: "Nailed It!", fontsize: 20 },
    legend: { display: true, position: "bottom" },
    tooltips: {
      enabled: false,
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 0,
      },
    },
    animation: {
      duration: 1500,
    },
  },
});
// ------------ Chart 생성 --------------

const handleCheckClick = (event) => {
  event.preventDefault();
  const todo = event.target.parentElement.querySelector("input");

  if (todo.disabled) {
    todo.disabled = false;
    achieveNumber -= 1;
  } else {
    todo.disabled = true;
    achieveNumber += 1;
  }

  achieveChart = achievePercent(achieveNumber);
  // HTML에 percentage 추가

  spanPercent.innerText = `${achieveChart}%`;

  todoChart.data.datasets[0].data[0] = parseInt(achieveChart);
  todoChart.data.datasets[0].data[1] = 100 - parseInt(achieveChart);

  todoChart.update();
};

const handleTodoSubmit = () => {
  todoTotalCheckArray = checkTotalArray();
  totalNumber = todoTotalCheckArray.filter((element) =>
    Boolean(element)
  ).length;

  achieveChart = achievePercent();
  spanPercent.innerText = `${achieveChart}%`;
  todoChart.data.datasets[0].data[0] = parseInt(achieveChart);
  todoChart.data.datasets[0].data[1] = 100 - parseInt(achieveChart);

  todoChart.update();
};

btn1.addEventListener("click", handleCheckClick);
btn2.addEventListener("click", handleCheckClick);
btn3.addEventListener("click", handleCheckClick);
btn4.addEventListener("click", handleCheckClick);
btn5.addEventListener("click", handleCheckClick);
chartUpdateBtn.addEventListener("click", handleTodoSubmit);
