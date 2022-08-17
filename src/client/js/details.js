const todo1 = document.querySelector(".todo-form__todo:nth-child(1)");
const todo2 = document.querySelector(".todo-form__todo:nth-child(2)");
const todo3 = document.querySelector(".todo-form__todo:nth-child(3)");
const todo4 = document.querySelector(".todo-form__todo:nth-child(4)");
const todo5 = document.querySelector(".todo-form__todo:nth-child(5)");

const paintDetailsForm = () => {
  const newForm = document.createElement("form");
  console.log(newForm);
};

const handleClick = (event) => {
  console.log(event.target);
};

todo1.addEventListener("click", handleClick);
todo2.addEventListener("click", handleClick);
todo3.addEventListener("click", handleClick);
todo4.addEventListener("click", handleClick);
todo5.addEventListener("click", handleClick);
