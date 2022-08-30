import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    // author: { type: String, required: true },
    // ref - relationship between two models: Post & User
    // ref search -> 'User'-model
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", autopopulate: true },
    description: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    // image: { type: String, default: "default-post.png" },
    image: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

PostSchema.plugin(autopopulate)

const Post = model("Post", PostSchema);

export default Post;
