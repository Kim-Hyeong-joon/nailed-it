let test;
const todo1 = document.querySelector(".todo-form__todo:nth-child(1) > input");

const handleClick = () => {
  console.log(test);
};

todo1.addEventListener("click", handleClick);
