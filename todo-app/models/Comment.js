import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    todo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
