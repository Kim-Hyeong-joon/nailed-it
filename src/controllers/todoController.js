import Todo from "../models/Todo";
import User from "../models/User";

export const home = async (req, res) => {
  /* const user1 = await User.findById(req.session.user._id);
  user1.todos = [];
  user1.save(); */

  if (!req.session.user) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.session.user._id);

  let todo1;
  let todo2;
  let todo3;
  let todo4;
  let todo5;

  if (user.todos[0]) {
    todo1 = await Todo.findById(user.todos[0]);
  }
  if (user.todos[1]) {
    todo2 = await Todo.findById(user.todos[1]);
  }
  if (user.todos[2]) {
    todo3 = await Todo.findById(user.todos[2]);
  }
  if (user.todos[3]) {
    todo4 = await Todo.findById(user.todos[3]);
  }
  if (user.todos[4]) {
    todo5 = await Todo.findById(user.todos[4]);
  }

  return res.render("home", {
    pageTitle: "Home",
    todo1,
    todo2,
    todo3,
    todo4,
    todo5,
  });
};

const createOrUpdateTodo = async (
  todo,
  name,
  todoDisabled,
  todoTriggerValue,
  req,
  userTodoIndex
) => {
  if (todo) {
    // todo form의 value가 들어왔을 경우
    const user = await User.findById(req.session.user._id);
    const todoId = user.todos[userTodoIndex];
    if (todoId) {
      // 기존 todo 있는지 확인
      const todoObj = await Todo.findByIdAndUpdate(
        todoId,
        {
          todo: todo,
          disabled: todoDisabled,
          todoTriggerValue: todoTriggerValue,
        },
        { new: true }
      );
      return todoObj;
    } else {
      const todoObj = await Todo.create({
        // 없으면 새로 Create
        todo: todo,
        nameId: name,
        disabled: todoDisabled,
        todoTriggerValue: todoTriggerValue,
        owner: req.session.user._id,
      });
      const user = await User.findById(req.session.user._id);
      user.todos[userTodoIndex] = todoObj._id;
      await user.save();
      return todoObj;
    }
  } else {
    // 만약 todo form의 value가 없다면
    const user = await User.findById(req.session.user._id);
    const todoId = user.todos[userTodoIndex];
    if (todoId) {
      // 해당 todo 존재 확인
      user.todos[userTodoIndex] = "";
      await user.save();
      await Todo.findByIdAndDelete(todoId);
    }
    return null;
  }
};

export const postTodos = async (req, res) => {
  const {
    todo1Value,
    todo2Value,
    todo3Value,
    todo4Value,
    todo5Value,
    todo1Disabled,
    todo2Disabled,
    todo3Disabled,
    todo4Disabled,
    todo5Disabled,
    todo1TriggerValue,
    todo2TriggerValue,
    todo3TriggerValue,
    todo4TriggerValue,
    todo5TriggerValue,
  } = req.body;

  const todo1 = await createOrUpdateTodo(
    todo1Value,
    "todo1",
    todo1Disabled,
    todo1TriggerValue,
    req,
    0
  );
  const todo2 = await createOrUpdateTodo(
    todo2Value,
    "todo2",
    todo2Disabled,
    todo2TriggerValue,
    req,
    1
  );
  const todo3 = await createOrUpdateTodo(
    todo3Value,
    "todo3",
    todo3Disabled,
    todo3TriggerValue,
    req,
    2
  );
  const todo4 = await createOrUpdateTodo(
    todo4Value,
    "todo4",
    todo4Disabled,
    todo4TriggerValue,
    req,
    3
  );
  const todo5 = await createOrUpdateTodo(
    todo5Value,
    "todo5",
    todo5Disabled,
    todo5TriggerValue,
    req,
    4
  );
  const todos = [todo1, todo2, todo3, todo4, todo5];

  return res.status(201).json({
    todos,
  });
};

export const postDetails = async (req, res) => {
  const {
    params: { id },
    body: { details, detailsDisabled, detailTriggers },
  } = req;

  const todo = await Todo.findByIdAndUpdate(
    id,
    { details, detailsDisabled, detailTriggers },
    { new: true }
  );

  if (!todo) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);
};

export const loadDetails = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.sendStatus(404);
  }
  const { details, detailsDisabled, detailTriggers } = todo;
  const title = todo.todo;
  return res
    .status(201)
    .json({ details, detailsDisabled, title, detailTriggers });
};

export const loadDetailTitle = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.sendStatus(404);
  }
  const title = todo.todo;
  return res.status(201).json({ title });
};
