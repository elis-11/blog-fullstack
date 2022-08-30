import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
  updatePostCommentDislikes,
  updatePostCommentLikes,
} from "../helpers/apiCalls";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export const PostDetails = () => {
  const { user } = useDataContext();
  const [post, setPost] = useState();

  const { id } = useParams();

  const refCommentNew = useRef();

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      const postApi = await getPostOneApi(id);
      console.log(postApi.comments);
      setPost(postApi);
    };
    fetchPostData();
  }, []);

  const onCommentCreate = async () => {
    console.log("Creating new comment...");

    if (!post || !user || !refCommentNew.current) return;

    // create new comment
    const commentNew = {
      post: post._id,
      author: user._id,
      description: refCommentNew.current.value,
    };

    // send new comment to backend
    const commentNewApi = await createPostCommentApi(user.token, commentNew);

    // create new comments array
    // copy all old comments (if empty => take empty array) + add new comment created
    let commentsNew = [...(post.comments || []), commentNewApi];

    // update comments in post
    setPost({ ...post, comments: commentsNew });

    // clear refinput field => value
    refCommentNew.current.value = "";
  };

  const onCommentDelete = async (commentId) => {
    if (!user || !post) return;

    // 1.step => delete comment at API
    const commentDelete = await deletePostCommentApi(user.token, commentId);
    console.log(commentDelete);

    //2.step => delete comment in state
    // overwrite old comment array with new one
    const commentsCopy = post.comments.filter(
      (comment) => comment._id !== commentId
    );
    console.log(commentsCopy);

    setPost({ ...post, comments: commentsCopy });
  };

  const onCommentLike = async (commentId) => {
    if (!user || !post) return;

    // 1.step => update likes at API
    const commentUpdated = await updatePostCommentLikes(user.token, commentId);

    // 2.step => update likes at state
    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });
    // overwrite comments in post
    setPost({ ...post, comments: commentsUpdated });
  };

  const onCommentDislike = async (commentId) => {
    if (!user || !post) return;

    const commentUpdated= await updatePostCommentDislikes(user.token, commentId)

    const commentsUpdated= post.comments.map(comment =>{
      return comment._id === commentId ? commentUpdated : comment;
    })
    setPost({ ...post, comments: commentsUpdated });
  };

  if (!post) return <div>Post loading...</div>;

  return (
    <div className="Details">
      <div>
        <img src={post.image} />
      </div>
      <div className="title">{post.title}</div>
      <div className="author">
        <img src={post.author.avatar} className="avatar" />
        {post.author.name}: {post.createdAt.slice(0, 10)}
      </div>
      <div>{post.description}</div>

      {/* create new comment */}
      <div className="add-comment">
        <input
          autoFocus
          ref={refCommentNew}
          type="text"
          placeholder="Add comment..."
        />
        <button onClick={onCommentCreate}>Add</button>
      </div>

      <div className="comments">
        {([...post.comments] || []).reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <span>
              <img src={comment.author.avatar} className="avatar" />
            </span>
            <span className="name">{comment.author.name}</span>
            <span className="description">{comment.description}</span>
            <div className="stats">
              <span>
                <AiFillLike
                  className="icon"
                  onClick={() => onCommentLike(comment._id)}
                />
                {comment.likes.length}
              </span>
              <span>
                <AiFillDislike
                  className="icon"
                  onClick={() => onCommentDislike(comment._id)}
                />
                {comment.dislikes.length}
              </span>
            </div>
            <FaTrashAlt
              className="delete"
              onClick={() => onCommentDelete(comment._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
