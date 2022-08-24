import { Router } from "express";
import Comment from "../models/Comment.js";
import { auth } from "../lib/auth.middleware.js";
import { v2 as cloudinary } from "cloudinary";

const commentRouter = Router();

// all comments
commentRouter.get("/", async (req, res, next) => {
  const allComments = await Comment.find().populate("author");
  res.json(allComments);
});

// single comment    Route/comment/:id
commentRouter.get("/:id", async (req, res, next) => {
  const singleComment = await Comment.findById(req.params.id).populate(
    "author"
  );
  res.json(singleComment);
});

// create comment (protected)
commentRouter.post("/", auth, async (req, res, next) => {
  let comment = await Comment.create(req.body);
  comment = await comment.populate("author");
  res.json(comment);

  if (!comment.image) return;

  const resCloudinary = await cloudinary.uploader.upload(comment.image);
  console.log(resCloudinary);

  const avatarUrlCloudinary = resCloudinary.secure_url;
  const commentUpdated = await Comment.findByIdAndUpdate(
    comment.id,
    { image: avatarUrlCloudinary },
    { new: true }
  );
  console.log(commentUpdated);
});

// update comment
commentRouter.patch("/:id", auth, async (req, res, next) => {
  const commentUpdateData = req.body;
  const commentId = req.params.id;

  try {
    const commentUpdated = await Comment.findByIdAndUpdate(
      commentId,
      commentUpdateData,
      {
        new: true,
      }
    ).populate("author");
    res.json(commentUpdated);
  } catch (err) {
    next(err);
  }
});

// delete comment
commentRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const commentDelete = await Comment.findByIdAndDelete(req.params.id);
    res.json(commentDelete);
  } catch (err) {
    next(err);
  }
});

export default commentRouter;
