import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String },
    author: { type: String, required: true },
    description: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    image: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "posts",
  }
);

const Post = model("Post", PostSchema);

export default Post;
