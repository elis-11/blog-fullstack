import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    // author: { type: String, required: true },
    // ref - relationship between two models: Post & User 
    // ref search -> 'User'-model
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
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
