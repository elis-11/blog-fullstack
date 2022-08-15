import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
