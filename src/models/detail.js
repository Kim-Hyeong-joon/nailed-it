import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  detail: { type: String, required: true },
});

const Detail = mongoose.model("Detail", detailSchema);

export default Detail;
