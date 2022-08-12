import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    image: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = model("Post", PostSchema);

export default Post;
