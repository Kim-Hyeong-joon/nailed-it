import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  nameId: { type: String, required: true },
  details: [{ type: String }],
  disabled: { type: Boolean, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
