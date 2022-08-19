import { handleTodoSubmit } from "./handler";
const todoForm = document.querySelector(".todo-form");

todoForm.addEventListener("submit", handleTodoSubmit);

console.log("todo");
