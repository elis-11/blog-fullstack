import { Router } from "express";
import Post from "../models/Post.js";
import { auth } from "../lib/auth.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import Comment from "../models/Comment.js";

const postRouter = Router();

// get all Posts +
postRouter.get("/", async (req, res, next) => {
  // const postsAll = await Post.find();
  const postsAll = await Post.find(); //.populate("author"); // to schow author avatar
  res.json(postsAll);
});

// get single post
// postRouter.get("/:id", auth, async (req, res, next) => {
//   // const singlePost = await Post.findById(req.params.id);
//   // populate - user details
//   const singlePost = await Post.findById(req.params.id).populate("author");
//   res.json(singlePost);
// });

// get single post + all realted comments +
postRouter.get("/:id", async (req, res, next) => {
  const post = await Post.findById(req.params.id); //.populate("author");
  const comments = await Comment.find({ post: req.params.id });
  // .populate("author");
  res.json({
    ...post.toObject(),
    comments,
  });
});

// GET ALL COMMENTS OF ONE POST
// postRouter.get("/:id/comments", auth, async (req, res, next) => {
//   res.json(postComments);
// });

// create post (protected)
// create new post +
// postRouter.post("/", auth, async (req, res, next) => {
//   const postData = req.body;

//   try {
//     const post = await Post.create(postData);
//     await post.populate("author");

//     if (!post.image) return;

//     // upload image to cloudinary
//     const resCloudinary = await cloudinary.uploader.upload(post.image);
//     console.log(resCloudinary);

//     const avatarUrlCloudinary = resCloudinary.secure_url;
//     const postUpdated = await Post.findByIdAndUpdate(
//       post._id,
//       { image: avatarUrlCloudinary },
//       { new: true }
//     );
//     console.log(postUpdated);
//     res.json(post);
//   } catch (err) {
//     next(err);
//   }
// });

//******************************* */

// create post (protected)
// create new post +
postRouter.post("/", auth, async (req, res, next) => {
  const postData = req.body;
  // const postImageString = postData.image;
  // console.log(postImageString);

  try {
    // store new post in database
    const post = await Post.create(postData);
    // await post.populate("author");

    if (!post.image) return;

    // upload image to cloudinary
    const resCloudinary = await cloudinary.uploader.upload(post.image);
    // console.log(resCloudinary);

    // store resaved URL of image in database => user => avatar
    const imageUrlCloudinary = resCloudinary.secure_url;
    const postUpdated = await Post.findByIdAndUpdate(
      post._id,
      { image: imageUrlCloudinary },
      { new: true }
    );
    console.log(postUpdated);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

//******************************* */

// update post without change image +
// Route: /post/:id
// postRouter.patch("/:id", auth, async (req, res, next) => {
//   const postUpdateData = req.body;
//   const postId = req.params.id;

//   try {
//     const postUpdated = await Post.findByIdAndUpdate(postId, postUpdateData, {
//       new: true,
//     }); //  .populate("author");
//     res.json(postUpdated);
//   } catch (err) {
//     next(err);
//   }
// });

// update post with change image +
// Route: /post/:id
postRouter.patch("/:id", auth, async (req, res, next) => {
  const postUpdateData = req.body;
  const postId = req.params.id;

  // update post in database
  try {
    const postUpdated = await Post.findByIdAndUpdate(postId, postUpdateData, {new: true}); 
    res.json(postUpdated);

    // has user uploaded an image? if not => skip cloudinary upload
    if (!postUpdateData.image) return;

    // upload image to cloudinary
    const resCloudinary = await cloudinary.uploader.upload(postUpdateData.image);

    const avatarUrlCloudinary = resCloudinary.secure_url;
    await Post.findByIdAndUpdate(
      postUpdated._id,
      { image: avatarUrlCloudinary },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
});

//***likes & dislikes*** */
postRouter.patch("/:id/update_likes", auth, async (req, res, next) => {
  const postId = req.params.id;
  const loggedInUserId = req.user._id;

  // increment likes field by one
  try {
    const postToUpdate = await Post.findById(postId);

    // check if logged in user is already in array of likers
    const likedAlready = postToUpdate.likes.find(
      (liker) => liker == loggedInUserId
    );

    //if liked already => remove from array
    if (likedAlready) {
      postToUpdate.likes.pull(loggedInUserId);
    }
    // if not liked so far => add to array
    else {
      postToUpdate.likes.push(loggedInUserId);
    }

    // save update and return
    const postUpdated = await postToUpdate.save();
    res.json(postUpdated);
  } catch (err) {
    next(err);
  }
});

postRouter.patch("/:id/update_dislikes", auth, async (req, res, next) => {
  const postId = req.params.id;
  const loggedInUserId = req.user._id;

  try {
    const postToUpdate = await Post.findById(postId);
    const dislikedAlready = postToUpdate.dislikes.find(
      (disliker) => disliker == loggedInUserId
    );
    if (dislikedAlready) {
      postToUpdate.dislikes.pull(loggedInUserId);
    } else {
      postToUpdate.dislikes.push(loggedInUserId);
    }
    const postUpdated = await postToUpdate.save();
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
