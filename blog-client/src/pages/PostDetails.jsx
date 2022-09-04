import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
  updatePostApi,
  updatePostCommentDislikes,
  updatePostCommentLikes,
} from "../helpers/apiCalls";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { MdSaveAlt } from "react-icons/md";

export const PostDetails = () => {
  const { user, posts, setPosts } = useDataContext();
  const [editMode, setEditMode] = useState(false);
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

  // //!  update-version-state
    const onPostUpdate = (e) => {
      // if (!user || !post) return;
  
      // create Copy before state update & update in one step
      const postUpdated = { ...post, [e.target.name]: e.target.value };
      setPost(postUpdated);
    }
      const submitUpdate = async () => { 
        // send updated post (not saved yet) => to API
        const postUpdatedApi = await updatePostApi(
          user.token,
          post._id,
          post
        );
        console.log(postUpdatedApi);
        setEditMode(false);
      
      // save in Browser
      const postsCopy = posts.map((_post) => {
        return _post._id === postUpdatedApi._id ? postUpdatedApi : _post;
      });
      setPosts(postsCopy);
    };
  

  // create comment
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

    const commentUpdated = await updatePostCommentDislikes(
      user.token,
      commentId
    );

    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });
    setPost({ ...post, comments: commentsUpdated });
  };

  if (!post) return <div>Post loading...</div>;

  return (
    <div className="Details">
      <div>
        <img src={post.image} />
      </div>
      {/* //! update-version-state */}
      {editMode ? (
        <div className="edit">
          <input name="title" value={post.title} onChange={onPostUpdate} />
          <input
            name="description"
            value={post.description}
            onChange={onPostUpdate}
          />
          {/* <MdSaveAlt className="save" onClick={() => setEditMode(!editMode)} /> */}
          <MdSaveAlt className="save" onClick={submitUpdate} />
        </div>
      ) : (
        <>
          <div className="author">
            <img src={post.author.avatar} className="avatar" />
            {post.author.name}: {post.createdAt.slice(0, 10)}
          </div>
          <div className="title">{post.title}</div>
          <div>{post.description}</div>
        </>
      )}
      <div className="post-edit">
        <FaEdit className="edit" onClick={() => setEditMode(!editMode)} />
      </div>
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
        {/* {([...post.comments] || []).reverse().map((comment) => ( */}
        {post.comments?.map((comment) => (
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
