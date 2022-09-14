import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  todos: [{ type: String }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
