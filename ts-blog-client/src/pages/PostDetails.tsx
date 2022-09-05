import { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaTrashAlt} from "react-icons/fa"
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdSaveAlt } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider"; // --- version 1
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
  updatePostApi,
  updatePostCommentDislikes,
  updatePostCommentLikes,
} from "../helpers/apiCalls";
import { ICommentCreate } from "../types/comment.types";
import { IPost, IPostDetails, IPostUpdate } from "../types/post.types";

export const PostDetails = () => {
  const { user, posts, setPosts } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState<IPostDetails>();

  const { id } = useParams();

  const refPostTitle = useRef<HTMLInputElement>(null);
  const refPostDescription = useRef<HTMLTextAreaElement>(null);

  const refCommentNew = useRef<HTMLInputElement>(null);

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
    const commentNew: ICommentCreate = {
      post: post._id,
      author: user._id,
      description: refCommentNew.current.value,
    };
    //send new comment to backend
    const commentNewApi = await createPostCommentApi(user.token, commentNew);

    // create new comment Array
    // copy all old comments and new comment created
    let commentsNew = [...post.comments, commentNewApi];

    // update comments in post
    setPost({ ...post, comments: commentsNew });

    // clear refInput in post
    refCommentNew.current.value = "";
  };

  //! *****postComment-likes-dislikes*****

  const onCommentLike = async (commentId: string) => {
    if (!user || !post) return;

    // 1. step => update at API
    const commentUpdated = await updatePostCommentLikes(user.token, commentId);

    // 2. step => update in state
    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });

    // overwrite comments in post
    setPost({ ...post, comments: commentsUpdated });
  };

  const onCommentDislike = async (commentId: string) => {
    if (!user || !post) return;

    // 1.step => update dislikes at API
    const commentUpdated = await updatePostCommentDislikes(
      user.token,
      commentId
    );

    // 2.step => update dislikes in state
    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });
    setPost({ ...post, comments: commentsUpdated });
  };

  //! update post
  const onPostUpdate = async () => {
    // if neither title or description updated => return
    if (!user || !post || !refPostTitle.current || !refPostDescription.current)
      return;

    // update object for sending to API
    const postUpdate: IPostUpdate = {
      title: refPostTitle.current.value,
      description: refPostDescription.current.value,
    };

    // send update data to API (backend)
    const postUpdated = await updatePostApi(user.token, post._id, postUpdate);
    console.log(postUpdated);

    // update post in list of posts using map!
    const postsUpdated = posts.map((_post) => {
      return _post._id === post._id ? postUpdated : _post;
    });
    setPosts(postsUpdated); // put copy in to state => overwrite posts
    setPost(postUpdated); // update post in current page
    setEditMode(false); //
  };

  // delete comment
  const onCommentDelete = async (commentId: string) => {
    if (!user || !post) return;

    // 1.step => delete comment at API
    const commentDeleted = await deletePostCommentApi(user.token, commentId);
    console.log(commentDeleted);

    // 2. delete comment in nested comment array of post state
    // overwrite old comment array with new one
    const commentsCopy = post.comments.filter(
      (comment) => comment._id !== commentId
    );
    console.log(commentsCopy);

    setPost({ ...post, comments: commentsCopy });
  };

  // if not post loaded => show at least something to the user
  if (!post) return <div>Post loading...</div>;

  return (
    <div className="Details">
      <div className="post-details">
        <div>
          <img src={post.image} />
        </div>

        {editMode ? (
          // show edit files
          <>
            <input defaultValue={post.title} type="text" ref={refPostTitle} />
            <textarea
              defaultValue={post.description}
              ref={refPostDescription}
            ></textarea>
            <div className="edit-icons">
              <MdCancel
                className="edit-icon"
                onClick={() => setEditMode(false)}
              />
              <MdSaveAlt className="edit-icon" onClick={onPostUpdate} />
            </div>
          </>
        ) : (
          // show readonly post info
          <>
            <div className="title">{post.title}</div>
            <div className="author">
              <img src={post.author.avatar} className="avatar" />
              {post.author.name}: {post.createdAt.slice(0, 10)}
              {/* {post.createdAt.slice(0, 10)} by {post.author.name} */}
            </div>
            <div>{post.description}</div>
          </>
        )}
      </div>
      <div className="post-edit">
        <FaEdit onClick={() => setEditMode(!editMode)} />
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
              <img src={comment.author?.avatar} className="icon-avatar" />
            </span>
            <span className="name">{comment.author?.name} </span>
            <span className="description"> {comment.description}</span>
            <div className="stats">
              <span>
                <AiFillLike
                  className="icon"
                  onClick={() => onCommentLike(comment._id)}
                />
                {comment.likes.length}
              </span>
              <span>
                <AiFillDislike onClick={() => onCommentDislike(comment._id)} />
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
