import { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike, AiFillDelete } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider"; // --- version 1
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
  updatePostCommentDislikes,
  updatePostCommentLikes,
} from "../helpers/apiCalls";
import { ICommentCreate } from "../types/comment.types";
import {
  IPost,
  IPostDetails,
} from "../types/post.types";

export const PostDetails = () => {
  const { user } = useDataContext(); // --- version 1
  const [post, setPost] = useState<IPostDetails>();
  // const [comment, setComment] = useState<IPostDetails>();

  // const location = useLocation(); // --- version 2
  // const post = location.state as IPost; // as IPost for TS
  // console.log(location.state);

  const { id } = useParams(); //--- version 1
  // // filter out post with given id
  // const post = posts.find((post) => post._id === id);   // --- version 1
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

  // LIKES
  const onCommentLike = async (commentId: string) => {
    if (!user || !post) return;

    // 1. step => update s at API
    const commentUpdated = await updatePostCommentLikes(user.token, commentId);

    // 2. step => update s in state
    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });

    // overwrite comments in post
    setPost({ ...post, comments: commentsUpdated });
  };

  // DISLIKES
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

      // 1. delete comment at API
  // 2. delete comment in nested comment array of post state 
  const onCommentDelete = async (commentId: string) => {
    if (!user || !post) return;

    // 1.step => delete comment at API
    const commentDeleted = await deletePostCommentApi(user.token, commentId);
    console.log(commentDeleted);

    // 2.step => delete comment in state
    // overwrite old comment array with new one
    const commentsCopy = post.comments.filter(
      (comment) => comment._id !== commentId
    );
    console.log(commentsCopy);

    setPost({ ...post, comments: commentsCopy });
  };

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


  // if not post loaded => show at least something to the user
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
        {/* {post.createdAt.slice(0, 10)} by {post.author.name} */}
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
              <img src={comment.author?.avatar} className="icon-avatar" />
            </span>
            <span className="name">{comment.author?.name} </span>
            <span className="description"> {comment.description}</span>
            <div className="stats">
              <span>
                <AiFillLike className="icon"
                 onClick={() => onCommentLike(comment._id)} />
                {comment.likes.length}
              </span>
              <span>
                <AiFillDislike onClick={() => onCommentDislike(comment._id)} />
                {comment.dislikes.length}
              </span>
            </div>
            <AiFillDelete
              className="delete"
              onClick={() => onCommentDelete(comment._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
