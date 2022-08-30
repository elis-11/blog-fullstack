import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},   // import from PostModel
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", autopopulate: true }, // import  from UserModel
    description: { type: String },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    // likes: { type: Number, default: 0 },
    // dislikes: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CommentSchema.plugin(autopopulate)

const Comment = model("Comment", CommentSchema);

export default Comment;
