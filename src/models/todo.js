import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  nameId: { type: String, required: true, unique: true },
  disabled: { type: Boolean, required: true },
  todoTriggerValue: { type: String },
  details: [{ type: String }],
  detailsDisabled: [{ type: Boolean }],
  detailTriggers: [{ type: String }],
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
