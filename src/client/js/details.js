const todo1 = document.querySelector(".todo-form__todo:nth-child(1)");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2)");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3)");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4)");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5)");

let todoId;
let detailArray;

const handleDetailsSubmit = async (event) => {
  event.preventDefault();
  if (!todoId) {
    return;
  }
  const detail1 = document.querySelector(".detail-form__detail:nth-child(1)");
  const detail2 = document.querySelector(".detail-form__detail:nth-child(2)");
  const detail3 = document.querySelector(".detail-form__detail:nth-child(3)");
  const detail4 = document.querySelector(".detail-form__detail:nth-child(4)");
  const detail5 = document.querySelector(".detail-form__detail:nth-child(5)");
  if (detail1 === "") {
    return;
  }
  const detail1Value = detail1.value;
  const detail2Value = detail2.value;
  const detail3Value = detail3.value;
  const detail4Value = detail4.value;
  const detail5Value = detail5.value;
  const response = await fetch(`/api/${todoId}/details`, {
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
  // detail input 생성하는 함수
  const detail = document.createElement("input");
  detail.placeholder = `${detailNumber}.`;
  detail.name = `detail${detailNumber}`;
  detail.className = "detail-form__detail";
  if (detailContent) {
    detail.value = detailContent;
  }
  return detail;
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
      const { details } = await response.json();
      detailArray = details;
    }
  } else {
    detailArray = []; // todoId가 없을 경우(todo가 비어있을 경우) detailArray 삭제
  }
  const div = document.querySelector(".detail-form");
  const newForm = document.createElement("form");
  newForm.addEventListener("submit", handleDetailsSubmit);
  newForm.id = "detailForm";
  newForm.method = "POST";
  newForm.action = "/details";
  const detail1 = createDetail("1", detailArray[0]);
  const detail2 = createDetail("2", detailArray[1]);
  const detail3 = createDetail("3", detailArray[2]);
  const detail4 = createDetail("4", detailArray[3]);
  const detail5 = createDetail("5", detailArray[4]);
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "저장";
  newForm.appendChild(detail1);
  newForm.appendChild(detail2);
  newForm.appendChild(detail3);
  newForm.appendChild(detail4);
  newForm.appendChild(detail5);
  newForm.appendChild(submit);
  const span = document.createElement("span");
  span.innerText = "할 일 쪼개기";
  span.id = "detail-title";
  div.appendChild(span);
  div.appendChild(newForm);
};

const handleClick = (event) => {
  todoId = event.target.dataset.id;
  console.log(todoId);
  paintDetailsForm();
};

todo1.addEventListener("click", handleClick);
todo2.addEventListener("click", handleClick);
todo3.addEventListener("click", handleClick);
todo4.addEventListener("click", handleClick);
todo5.addEventListener("click", handleClick);
