const todo1 = document.querySelector(".todo-form__todo:nth-child(1)");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2)");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3)");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4)");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5)");

const paintDetailsForm = () => {
  const oldForm = document.getElementById("detailForm");
  if (oldForm) {
    oldForm.remove();
  }
  const div = document.querySelector(".detail-form");
  const newForm = document.createElement("form");
  newForm.id = "detailForm";
  newForm.method = "POST";
  newForm.action = "/details";
  const detail1 = document.createElement("input");
  detail1.placeholder = "1.";
  const detail2 = document.createElement("input");
  detail2.placeholder = "2.";
  const detail3 = document.createElement("input");
  detail3.placeholder = "3.";
  const detail4 = document.createElement("input");
  detail4.placeholder = "4.";
  const detail5 = document.createElement("input");
  detail5.placeholder = "5.";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "저장";
  newForm.appendChild(detail1);
  newForm.appendChild(detail2);
  newForm.appendChild(detail3);
  newForm.appendChild(detail4);
  newForm.appendChild(detail5);
  newForm.appendChild(submit);
  div.appendChild(newForm);
};

const handleClick = (event) => {
  paintDetailsForm();
};

todo1.addEventListener("click", handleClick);
todo2.addEventListener("click", handleClick);
todo3.addEventListener("click", handleClick);
todo4.addEventListener("click", handleClick);
todo5.addEventListener("click", handleClick);
