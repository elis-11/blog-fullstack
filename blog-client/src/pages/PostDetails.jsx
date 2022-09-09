import { NavLink, useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
  updatePostApi,
  updatePostCommentDislikes,
  updatePostCommentLikes,
  updatePostDislikes,
  updatePostLikes,
} from "../helpers/apiCalls";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { MdCancel, MdSaveAlt } from "react-icons/md";
import { BsSkipBackwardFill } from "react-icons/bs";
import { ImagePicker } from "../components/ImagePicker";

export const PostDetails = () => {
  const { user, posts, setPosts } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState();
  const [image, setImage] = useState();
  const [postOriginal, setPostOriginal] = useState();  // Cancel

  const { id } = useParams();

  const refCommentNew = useRef();

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      const postApi = await getPostOneApi(id);
      console.log(postApi.comments);
      setPost(postApi);
      setPostOriginal(postApi);    // Cancel
      setImage(postApi.image);
    };
    fetchPostData();
  }, []);

  //! Post - Update - version-State
  const onPostUpdate = (e) => {
    // if (!user || !post) return;

    // create Copy before state update & update in one step
    const postUpdated = { ...post, [e.target.name]: e.target.value };
    if (image) postUpdated.image = image; //!update image
    setPost(postUpdated);
  };

  const onEditCancel = () => {     // Cancel
    setEditMode(false);
    setPost({...postOriginal})
  };
  
  const submitUpdate = async () => {
    // send updated post (not saved yet) => to API
    const postUpdatedApi = await updatePostApi(user.token, post._id, post);
    console.log(postUpdatedApi);
    setEditMode(false);

    // save in Browser
    const postsCopy = posts.map((_post) => {
      return _post._id === postUpdatedApi._id ? postUpdatedApi : _post;
    });
    setPosts(postsCopy);
  };
  // console.log(onPostUpdate);

  //! *****post-likes-dislikes*****
  const onPostLike = async (postId) => {
    console.log(postId);
    if (!user || !post) return;

    // 1.step => update likes at API
    const postUpdatedLikes = await updatePostLikes(user.token, postId);
    console.log(postUpdatedLikes);
    // 2.step => update likes in state
    const postsUpdatedLikes = posts.map((post) => {
      return post._id === postId ? {...post, ...postUpdatedLikes} : post;
    });
    // overwrite posts in post array
    setPosts(postsUpdatedLikes);
    setPost({ ...post, ...postUpdatedLikes });
    console.log(postsUpdatedLikes);
  };

  const onPostDislike = async (postId) => {
    console.log(postId);
    if (!user || !post) return;

    const postUpdatedDislikes = await updatePostDislikes(user.token, postId);
    console.log(postUpdatedDislikes);
    const postsUpdated = posts.map((post) => {
      // return post._id === postId ? [...post, ...postUpdatedDislikes] : post;
      return post._id === postId ? {...post, ...postUpdatedDislikes} : post;
      // return post._id === postId ? postUpdatedDislikes : post;
    });
    setPosts(postsUpdated);
    setPost({ ...post, ...postUpdatedDislikes });
    console.log(postsUpdated);
  };

  //! create comment
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

  //! Delete comment
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

  //! Comments - Likes
  const onCommentLike = async (commentId) => {
    console.log(commentId);
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
      <div className="detail">
            <div>
              {/* <img src={post.image} /> */}
              {image && (
                <ImagePicker
                  image={image}
                  setImage={setImage}
                  className="post-image"
                />
              )}
            </div>
        {/* //! Update-Post-version-State */}
        {editMode ? (
          <div className="post-edit">
              <input name="title" value={post.title} onChange={onPostUpdate} />
              <textarea
                name="description"
                value={post.description}
                onChange={onPostUpdate}
              ></textarea>
              <div className="edit-icons">
                {/* <MdSaveAlt className="save" onClick={() => setEditMode(!editMode)} /> */}
                <MdSaveAlt className="save" onClick={submitUpdate} />
                <MdCancel
                  className="cancel"
                  onClick={onEditCancel}
                  // onClick={() => setEditMode(false)}
                />
              </div>
          </div>
        ) : (
          <>
            <div className="author">
              <img src={post.author?.avatar} className="avatar" />
              {post.author?.name}: {post.createdAt?.slice(0, 10)}
              {/* <Moment date={post.createdAt} format="HH:mm DD. MM. YYYY" />{" "} */}
            </div>
            <div className="title">{post.title}</div>
            <div>{post.description}</div>
          </>
        )}
        <div className="icons">
          <div className="likes">
            <span>
              <AiFillLike
                className="like"
                onClick={() => onPostLike(post._id)}
              />
              {post.likes?.length || 0}
            </span>
            <span>
              <AiFillDislike
                className="dislike"
                onClick={() => onPostDislike(post._id)}
              />
              {post.dislikes?.length || 0}
            </span>
          </div>
          <FaEdit className="edit" onClick={() => setEditMode(!editMode)} />
          {/* <MdSaveAlt className="save" onClick={submitUpdate} /> */}
          <NavLink to="/posts">
            <BsSkipBackwardFill />
          </NavLink>
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
          {/* {post.comments?.map((comment) => ( */}
          {([...post.comments] || []).reverse().map((comment) => (
            <div key={comment._id} className="comment">
              <span>
                <img src={comment.author?.avatar} className="avatar" />
              </span>
              <span className="name">{comment.author?.name}: </span>
              <span className="description">{comment.description}</span>
              <div className="stats">
                <span>
                  <AiFillLike
                    className="like"
                    onClick={() => onCommentLike(comment._id)}
                  />
                  {comment.likes.length || 0}
                </span>
                <span>
                  <AiFillDislike
                    className="dislike"
                    onClick={() => onCommentDislike(comment._id)}
                  />
                  {comment.dislikes.length || 0}
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
    </div>
  );
};
