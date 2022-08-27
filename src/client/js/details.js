import {
  chartUpdate,
  paintDetailsChart,
  updateTotalDetails,
  detailChart,
} from "./detailChart";
const todo1 = document.querySelector(".todo-form__todo:nth-child(1) > input");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2) > input");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3) > input");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4) > input");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5) > input");
const destroyBtn = document.getElementById("destroyChart");

let todoId;
let detailArray;
let todoTitle;
let disabledArray;

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

  const details = [
    detail1.value,
    detail2.value,
    detail3.value,
    detail4.value,
    detail5.value,
  ];

  const detailsDisabled = [
    detail1.disabled,
    detail2.disabled,
    detail3.disabled,
    detail4.disabled,
    detail5.disabled,
  ];

  const response = await fetch(`/api/${todoId}/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      details,
      detailsDisabled,
    }),
  });
  if (response.status === 201) {
    updateTotalDetails(details);
  }
};

const createDetail = (detailNumber, detailContent, detailDisabled) => {
  // detail input HTML 생성하는 함수
  const detail = document.createElement("input");
  detail.placeholder = `${detailNumber}.`;
  detail.name = `detail${detailNumber}`;
  detail.autocomplete = "off";
  detail.spellcheck = false;
  if (detailDisabled) {
    detail.disabled = "true";
  }
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
  }
};

const handleDetailCheckClick = (event) => {
  event.preventDefault();
  const detail = event.target.parentElement.querySelector("input");

  if (detail.disabled) {
    detail.disabled = false;
  } else {
    detail.disabled = true;
  }

  chartUpdate(detail);
  const detailSubmit = document.getElementById("detailSubmit");
  detailSubmit.click();
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
      const { details, detailsDisabled, title } = await response.json();
      detailArray = details;
      todoTitle = title;
      disabledArray = detailsDisabled;
    }
  } else {
    detailArray = []; // todoId가 없을 경우(todo가 비어있을 경우) detailArray 삭제
    disabledArray = [];
  }
  const div = document.querySelector(".detail-form");

  if (todoId) {
    div.dataset.id = todoId;
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
  const detail1 = createDetail("1", detailArray[0], disabledArray[0]);
  const detail2 = createDetail("2", detailArray[1], disabledArray[1]);
  const detail3 = createDetail("3", detailArray[2], disabledArray[2]);
  const detail4 = createDetail("4", detailArray[3], disabledArray[3]);
  const detail5 = createDetail("5", detailArray[4], disabledArray[4]);
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  const btn3 = document.createElement("button");
  const btn4 = document.createElement("button");
  const btn5 = document.createElement("button");
  btn1.addEventListener("click", handleDetailCheckClick);
  btn2.addEventListener("click", handleDetailCheckClick);
  btn3.addEventListener("click", handleDetailCheckClick);
  btn4.addEventListener("click", handleDetailCheckClick);
  btn5.addEventListener("click", handleDetailCheckClick);
  btn1.innerText = "✔️";
  btn2.innerText = "✔️";
  btn3.innerText = "✔️";
  btn4.innerText = "✔️";
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

const handleSelect = async (event) => {
  if (event.target.dataset.id) {
    todoId = event.target.dataset.id;
  } else {
    todoId = null;
  }

  console.log("hi");

  if (todoId) {
    await paintDetailsForm();
    paintDetailsChart(disabledArray, detailArray);
  } else {
    const div = document.querySelector(".detail-form");
    delete div.dataset.id;
    const oldForm = document.getElementById("detailForm");
    const oldSpan = document.getElementById("detail-title");
    const chartSpan = document.querySelector(".detail-chart > span");
    if (oldForm) {
      oldSpan.remove();
      oldForm.remove();
    }
    if (detailChart) {
      detailChart.destroy();
      chartSpan.innerText = "";
    }
  }
};

const handleDestroy = () => {
  detailChart.destroy();
};

todo1.addEventListener("focus", handleSelect);
todo2.addEventListener("focus", handleSelect);
todo3.addEventListener("focus", handleSelect);
todo4.addEventListener("focus", handleSelect);
todo5.addEventListener("focus", handleSelect);
destroyBtn.addEventListener("click", handleDestroy);
