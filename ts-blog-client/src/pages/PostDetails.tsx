import { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike, AiFillDelete } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider"; // --- version 1
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
} from "../helpers/apiCalls";
import {
  ICommentCreate,
  IPost,
  IComment,
  IPostDetails,
} from "../types/post.types";
// import "../components/posts/Post.scss";

export const PostDetails = () => {
  const { user } = useDataContext(); // --- version 1
  const [post, setPost] = useState<IPostDetails>();
  // const [likes, setLikes] = useState<IComment>(0);
  // const [dislikes, setDislikes] = useState<IComment>(0)>

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
      console.log(postApi);
      setPost(postApi);
    };
    fetchPostData();
  }, []);

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
        {post.comments?.reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <span>
              <img src={comment.author.avatar} className="icon-avatar" />
            </span>
            <span className="name">{comment.author.name}: </span>
            <span className="description"> {comment.description}</span>
            {/* <span><AiFillLike onClick={() => onCommentLike(comment._id)} />{comment.likes}</span> */}
            {/* <span><AiFillDislike onClick={() => onCommentDislike(comment._id)} />{comment.dislikes}</span> */}
            <AiFillDelete onClick={() => onCommentDelete(comment._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};
