import { Router } from "express";
import { auth } from "../lib/auth.middleware.js";
import Post from "../models/Post.js";

const postRouter = Router();

// get all Posts
postRouter.get("/", async (req, res, next) => {
  const postsAll = await Post.find();
  res.json(postsAll);
});

// get single post
postRouter.get("/:id", auth, async (req, res, next) => {
  const singlePost = await Post.findById(req.params.id);
  res.json(singlePost);
});

// postRouter.post("/", async (req, res, next) => {
//   const post = await Post.create(postData);
//   res.json(post);
// });

export default postRouter;
