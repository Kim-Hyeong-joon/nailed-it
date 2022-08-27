import Todo from "../models/todo";

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

const createOrUpdateTodo = async (todo, nameId, todoDisabled) => {
  if (todo) {
    // todo form의 value가 들어왔을 경우
    const existTodo = await Todo.exists({ nameId: nameId });
    if (existTodo) {
      // 기존 todo 있는지 확인
      const todoObj = await Todo.findOneAndUpdate(
        { nameId: nameId },
        {
          todo: todo,
          disabled: todoDisabled,
        },
        { new: true }
      );
      return todoObj;
    } else {
      const todoObj = await Todo.create({
        // 없으면 새로 Create
        todo: todo,
        nameId: nameId,
        disabled: todoDisabled,
      });
      return todoObj;
    }
  } else {
    // 만약 todo form의 value가 없다면
    const existTodo = await Todo.exists({ nameId: nameId });
    if (existTodo) {
      // 해당 todo 존재 확인
      await Todo.findOneAndDelete({ nameId: nameId });
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
  } = req.body;

  const todo1 = await createOrUpdateTodo(todo1Value, "todo1", todo1Disabled);
  const todo2 = await createOrUpdateTodo(todo2Value, "todo2", todo2Disabled);
  const todo3 = await createOrUpdateTodo(todo3Value, "todo3", todo3Disabled);
  const todo4 = await createOrUpdateTodo(todo4Value, "todo4", todo4Disabled);
  const todo5 = await createOrUpdateTodo(todo5Value, "todo5", todo5Disabled);

  return res.status(201).json({
    todos: [todo1, todo2, todo3, todo4, todo5],
  });
};

export const postDetails = async (req, res) => {
  const {
    params: { id },
    body: { details, detailsDisabled },
  } = req;

  const todo = await Todo.findByIdAndUpdate(
    id,
    { details, detailsDisabled },
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
  const { details, detailsDisabled } = todo;
  const title = todo.todo;
  return res.status(201).json({ details, detailsDisabled, title });
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
