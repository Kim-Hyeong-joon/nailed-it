import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  nameId: { type: String, required: true },
  disabled: { type: Boolean, required: true },
  details: [{ type: String }],
  detailsDisabled: [{ type: Boolean }],
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
