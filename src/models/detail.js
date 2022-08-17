import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  detail: [{ type: String, required: true }],
  todo: { type: mongoose.Schema.Types.ObjectId, ref: "Detail" },
});

const Detail = mongoose.model("Detail", detailSchema);

export default Detail;
