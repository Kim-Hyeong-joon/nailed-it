import { Chart } from "chart.js";
const todo1 = document.querySelector(".todo-form__todo:nth-child(1) > input");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2) > input");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3) > input");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4) > input");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5) > input");

let todoId;
let detailArray;
let todoTitle;
let detailChart;

const handleDetailsSubmit = async (event) => {
  event.preventDefault();
  if (!todoId) {
    return;
  }
  const detail1 = document.querySelector(
    ".detail-form__detail:nth-child(1) > input"
  );
  const detail2 = document.querySelector(
    ".detail-form__detail:nth-child(2) > input"
  );
  const detail3 = document.querySelector(
    ".detail-form__detail:nth-child(3) > input"
  );
  const detail4 = document.querySelector(
    ".detail-form__detail:nth-child(4) > input"
  );
  const detail5 = document.querySelector(
    ".detail-form__detail:nth-child(5) > input"
  );
  if (detail1.value === "") {
    return;
  }
  const detail1Value = detail1.value;
  const detail2Value = detail2.value;
  const detail3Value = detail3.value;
  const detail4Value = detail4.value;
  const detail5Value = detail5.value;
  await fetch(`/api/${todoId}/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      detail1Value,
      detail2Value,
      detail3Value,
      detail4Value,
      detail5Value,
    }),
  });
};

const createDetail = (detailNumber, detailContent) => {
  // detail input HTML 생성하는 함수
  const detail = document.createElement("input");
  detail.placeholder = `${detailNumber}.`;
  detail.name = `detail${detailNumber}`;
  detail.autocomplete = "off";
  detail.spellcheck = false;
  if (detailContent) {
    detail.value = detailContent;
  }
  return detail;
};

const handleDetailsEnter = (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    const detailSubmit = document.getElementById("detailSubmit");
    detailSubmit.click();
    console.log("?");
  }
};

const paintDetailsForm = async () => {
  const oldForm = document.getElementById("detailForm");
  const oldSpan = document.getElementById("detail-title");
  if (oldForm) {
    oldSpan.remove();
    oldForm.remove();
  }

  // server에서 details 불러오기
  if (todoId) {
    const response = await fetch(`/api/${todoId}/load-details`);
    if (response.status === 201) {
      const { details, title } = await response.json();
      detailArray = details;
      todoTitle = title;
    }
  } else {
    detailArray = []; // todoId가 없을 경우(todo가 비어있을 경우) detailArray 삭제
  }
  const div = document.querySelector(".detail-form");
  if (todoId) {
    div.dataset.id = todoId;
  } else {
    delete div.dataset.id;
  }
  const newForm = document.createElement("form");
  newForm.addEventListener("submit", handleDetailsSubmit);
  newForm.id = "detailForm";
  newForm.method = "POST";
  newForm.action = "/details";
  const div1 = document.createElement("div");
  div1.className = "detail-form__detail";
  const div2 = document.createElement("div");
  div2.className = "detail-form__detail";
  const div3 = document.createElement("div");
  div3.className = "detail-form__detail";
  const div4 = document.createElement("div");
  div4.className = "detail-form__detail";
  const div5 = document.createElement("div");
  div5.className = "detail-form__detail";
  const detail1 = createDetail("1", detailArray[0]);
  const detail2 = createDetail("2", detailArray[1]);
  const detail3 = createDetail("3", detailArray[2]);
  const detail4 = createDetail("4", detailArray[3]);
  const detail5 = createDetail("5", detailArray[4]);
  const btn1 = document.createElement("button");
  btn1.innerText = "✔️";
  const btn2 = document.createElement("button");
  btn2.innerText = "✔️";
  const btn3 = document.createElement("button");
  btn3.innerText = "✔️";
  const btn4 = document.createElement("button");
  btn4.innerText = "✔️";
  const btn5 = document.createElement("button");
  btn5.innerText = "✔️";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "저장";
  submit.id = "detailSubmit";
  div1.appendChild(detail1);
  div1.appendChild(btn1);
  div2.appendChild(detail2);
  div2.appendChild(btn2);
  div3.appendChild(detail3);
  div3.appendChild(btn3);
  div4.appendChild(detail4);
  div4.appendChild(btn4);
  div5.appendChild(detail5);
  div5.appendChild(btn5);
  newForm.appendChild(div1);
  newForm.appendChild(div2);
  newForm.appendChild(div3);
  newForm.appendChild(div4);
  newForm.appendChild(div5);
  newForm.appendChild(submit);
  const span = document.createElement("span");
  if (todoId) {
    span.innerText = `할 일 쪼개기: ${todoTitle}`;
  } else {
    span.innerText = "할 일 쪼개기:";
  }
  span.id = "detail-title";
  div.appendChild(span);
  div.appendChild(newForm);
  detail1.addEventListener("keydown", handleDetailsEnter);
  detail2.addEventListener("keydown", handleDetailsEnter);
  detail3.addEventListener("keydown", handleDetailsEnter);
  detail4.addEventListener("keydown", handleDetailsEnter);
  detail5.addEventListener("keydown", handleDetailsEnter);
};

const paintDetailsChart = () => {
  const ctx = document.getElementById("detailCanvas");
  detailChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["해낸 일", "해낼 일"],
      datasets: [
        {
          label: "Nailed It",
          data: [20, 80],
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

const handleSelect = (event) => {
  if (event.target.dataset.id) {
    todoId = event.target.dataset.id;
  } else {
    todoId = null;
  }
  paintDetailsForm();
  paintDetailsChart();
};

todo1.addEventListener("select", handleSelect);
todo2.addEventListener("select", handleSelect);
todo3.addEventListener("select", handleSelect);
todo4.addEventListener("select", handleSelect);
todo5.addEventListener("select", handleSelect);
todo1.addEventListener("click", handleSelect);
todo2.addEventListener("click", handleSelect);
todo3.addEventListener("click", handleSelect);
todo4.addEventListener("click", handleSelect);
todo5.addEventListener("click", handleSelect);
