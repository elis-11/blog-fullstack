import { Router } from "express";
import Post from "../models/Post.js";
import { auth } from "../lib/auth.middleware.js";
import { v2 as cloudinary} from "cloudinary"
import Comment from "../models/Comment.js";

const postRouter = Router();

// get all Posts
postRouter.get("/", async (req, res, next) => {
  // const postsAll = await Post.find();
  const postsAll = await Post.find().populate("author"); // to schow author avatar
  res.json(postsAll);
});

// get single post
// postRouter.get("/:id", auth, async (req, res, next) => {
//   // const singlePost = await Post.findById(req.params.id);
//   // populate - user details
//   const singlePost = await Post.findById(req.params.id).populate("author");
//   res.json(singlePost);
// });

// get single post + all realted comments
postRouter.get("/:id", async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("author");
  const comments = await Comment.find({post: req.params.id}).populate("author")
  res.json({
    ...post.toObject(),
    comments
  });
});

// GET ALL COMMENTS OF ONE POST
// postRouter.get("/:id/comments", auth, async (req, res, next) => {
//   res.json(postComments);
// });

// create post (protected)
// create new post
postRouter.post("/", auth, async (req, res, next) => {
  const post = await Post.create(req.body);
  res.json(post);

  if (!post.image) return;

  // upload image to cloudinary
  const resCloudinary = await cloudinary.uploader.upload(post.image);
  console.log(resCloudinary);

  const avatarUrlCloudinary = resCloudinary.secure_url;
  const postUpdated = await Post.findByIdAndUpdate(
    post._id,
    { image: avatarUrlCloudinary },
    { new: true }
  );
  console.log(postUpdated);
});

// update post
// Route: /post/:id
postRouter.patch("/:id", auth, async (req, res, next) => {
  try {
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(postUpdated);
  } catch (err) {
    next(err);
  }
});

// Delete Post
postRouter.delete("/:id", auth, async (req, res, next) => {
  // findByIdAndUpdate can crash server
  // so catch it & prevent crash => just forward to error handler
  try {
    const postDeleted = await Post.findByIdAndDelete(req.params.id);
    res.json(postDeleted);
  } catch (err) {
    next(err);
  }
});

export default postRouter;
