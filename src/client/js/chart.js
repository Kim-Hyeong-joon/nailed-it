import { Chart } from "chart.js";
const ctx = document.getElementById("percentChart").getContext("2d");
const btn1 = document.querySelector(".todo-form__todo:nth-child(1) > button");
const btn2 = document.querySelector(".todo-form__todo:nth-child(2) > button");
const btn3 = document.querySelector(".todo-form__todo:nth-child(3) > button");
const btn4 = document.querySelector(".todo-form__todo:nth-child(4) > button");
const btn5 = document.querySelector(".todo-form__todo:nth-child(5) > button");

let achieveNumber = 0;
let remainNumber = 5;
let achieveChart = 0;
let todoChart;
const achievePercent = (achieveNumber) => (achieveNumber / remainNumber) * 100;

const paintChart = () => {
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
};

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
  const span = document.querySelector(".percentage-box > span");
  span.innerText = `${achieveChart}%`;

  todoChart.data.datasets[0].data[0] = parseInt(achieveChart);
  todoChart.data.datasets[0].data[1] = 100 - parseInt(achieveChart);

  todoChart.update();
};

paintChart();
btn1.addEventListener("click", handleCheckClick);
btn2.addEventListener("click", handleCheckClick);
btn3.addEventListener("click", handleCheckClick);
btn4.addEventListener("click", handleCheckClick);
btn5.addEventListener("click", handleCheckClick);
