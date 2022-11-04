import { Router } from "express";
import Comment from "../models/Comment.js";
import { auth } from "../lib/auth.middleware.js";
import { v2 as cloudinary } from "cloudinary";

const commentRouter = Router();

// all comments
commentRouter.get("/", async (req, res, next) => {
  const allComments = await Comment.find() // .populate("author");
  res.json(allComments);
});

// single comment    Route/comment/:id
commentRouter.get("/:id", async (req, res, next) => {
  const singleComment = await Comment.findById(req.params.id) // .populate("author");
  res.json(singleComment);
});

// create comment (protected)
commentRouter.post("/", auth, async (req, res, next) => {
  const commentData = req.body;

  console.log("Author of comment to create: ", req.user);

  // use new ID of logged in user as AUTHOR of comment!
  commentData.author = req.user._id;

  const comment = await Comment.create(commentData);
  await comment.populate("author");
  res.json(comment);
});

// update comment
commentRouter.patch("/:id", auth, async (req, res, next) => {
  const commentUpdateData = req.body;
  const commentId = req.params.id;

  // update user to be the logged in user
  // commentUpdateData.author= req.user._id

  try {
    const commentUpdated = await Comment.findByIdAndUpdate(
      commentId,
      commentUpdateData,
      {
        new: true,
      }) //.populate("author");
    res.json(commentUpdated);
  } catch (err) {
    next(err);
  }
});

// update / increment likes!
commentRouter.patch("/:id/update_likes", auth, async (req, res, next) => {
  const commentId = req.params.id;
  const loggedInUserId = req.user._id;

  // increment likes field by one
  try {
    const commentToUpdate = await Comment.findById(commentId);

    // check if logged in user is already in array of likers
    const likedAlready = commentToUpdate.likes.find(
      (liker) => liker == loggedInUserId
    );

    // if liked already => remove from array
    if (likedAlready) {
      commentToUpdate.likes.pull(loggedInUserId);
    }
    // if not liked so far => add to array
    else {
      commentToUpdate.likes.push(loggedInUserId);
    }

    // save update and return
    const commentUpdated = await commentToUpdate.save();
    res.json(commentUpdated);
  } catch (err) {
    next(err);
  }
});

// // update / increment likes
// commentRouter.patch("/:id/update_likes", auth, async (req, res, next) => {
//   const commentId = req.params.id;

//   // increment likes field by one
//   try {
//     const commentUpdated = await Comment.findByIdAndUpdate(
//       commentId,
//       { $inc: { likes: 1 } },
//       { new: true }
//     ).populate("author");
//     res.json(commentUpdated);
//   } catch (err) {
//     next(err);
//   }
// });

// update / increment dislikes
commentRouter.patch("/:id/update_dislikes", auth, async (req, res, next) => {
  const commentId = req.params.id;
  const loggedInUserId = req.user._id;

  // increment dislikes field by one
  try {
    const commentToUpdate = await Comment.findById(commentId);

    // check if logged in user is already in array of dislikes
    const dislikedAlready = commentToUpdate.dislikes.find(
      (disliker) => disliker == loggedInUserId
    );

      // if disliked already => remove from array
      if (dislikedAlready) {
        commentToUpdate.dislikes.pull(loggedInUserId)
      }
      // if not disliked so far => add to array
      else {
        commentToUpdate.dislikes.push(loggedInUserId)
      }

      // save update and return
      const commentUpdated = await commentToUpdate.save()
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
