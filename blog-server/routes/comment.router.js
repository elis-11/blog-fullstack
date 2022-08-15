import { Router } from "express";
import { auth } from "../lib/auth.middleware.js";
import Comment from "../models/Comment.js";

const commentRouter = Router();

// all comments
commentRouter.get("/", async (req, res, next) => {
  const allComments = await Comment.find();
  res.json(allComments);
});

// single comment
commentRouter.get("/:id", async (req, res, next) => {
  const singleComment = await Comment.findById(req.params.id);
  res.json(singleComment);
});

// create comment
commentRouter.post("/", auth, async (req, res, next) => {
  const comment = await Comment.create(req.body);
  res.json(comment);

  const commentUpdated = await Comment.findByIdAndUpdate(comment._id, {
    new: true,
  });
});

// update comment
commentRouter.patch("/:id", auth, async (req, res, next) => {
  try {
    const commentUpdated = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
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
