import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},   // import from PostModel
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // import  from UserModel
    description: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
