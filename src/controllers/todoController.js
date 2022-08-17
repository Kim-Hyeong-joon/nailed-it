import Todo from "../models/todo";
import Detail from "../models/detail";

const findTodo = (todo) => {
  return Todo.findOne({ nameId: todo });
};

export const home = async (req, res) => {
  const todo1 = await findTodo("todo1");
  const todo2 = await findTodo("todo2");
  const todo3 = await findTodo("todo3");
  const todo4 = await findTodo("todo4");
  const todo5 = await findTodo("todo5");

  return res.render("home", {
    pageTitle: "Home",
    todo1,
    todo2,
    todo3,
    todo4,
    todo5,
  });
};

const createOrUpdateTodo = async (todo, nameId) => {
  if (todo) {
    // todo form의 value가 들어왔을 경우
    const existTodo = await Todo.exists({ nameId: nameId });
    if (existTodo) {
      // 기존 todo 있는지 확인
      await Todo.findOneAndUpdate(
        // 있으면 update
        { nameId: nameId },
        {
          todo: todo,
        }
      );
    } else {
      await Todo.create({
        // 없으면 새로 Create
        todo: todo,
        nameId: nameId,
      });
    }
  } else {
    // 만약 todo form의 value가 없다면
    const existTodo = await Todo.exists({ nameId: nameId });
    if (existTodo) {
      // 해당 todo 존재 확인
      await Todo.findOneAndUpdate(
        { nameId: nameId },
        {
          todo: todo, // todo 값 ""로 변경
        }
      );
    }
  }
};

export const postTodos = async (req, res) => {
  const { todo1, todo2, todo3, todo4, todo5 } = req.body;
  await createOrUpdateTodo(todo1, "todo1");
  await createOrUpdateTodo(todo2, "todo2");
  await createOrUpdateTodo(todo3, "todo3");
  await createOrUpdateTodo(todo4, "todo4");
  await createOrUpdateTodo(todo5, "todo5");
  return res.redirect("/");
};

export const postDetails = (req, res) => {
  const { detail1, detail2, detail3, detail4, detail5 } = req.body;
  const details = [detail1, detail2, detail3, detail4, detail5];
  console.log(details);
  return res.redirect("/");
};
