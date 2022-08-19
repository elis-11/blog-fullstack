import { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider"; // --- version 1
import { createPostCommentApi, getPostOneApi } from "../helpers/apiCalls";
import { ICommentCreate, IPost, IComment } from "../types/post.types";

export const PostDetails = () => {
  const { user } = useDataContext(); // --- version 1
  const [post, setPost] = useState<IPost>();
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

  const onCommentSubmit = async () => {
    console.log("Creating new comment...");

    if (!post || !user || !refCommentNew.current) return;

    const commentNew: ICommentCreate = {
      post: post._id,
      author: user._id,
      description: refCommentNew.current.value,
    };
    const commentNewApi = await createPostCommentApi(user.token, commentNew);

    let commentsNew = [...(post.comments || []), commentNewApi];

    setPost({ ...post, comments: commentsNew });
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
        {/* {post.createdAt.slice(0, 10)} by {post.author.name} */}
      </div>
      <div>{post.description}</div>

      {/* create new comment */}
      <div className="comment-action">
        <input ref={refCommentNew} type="text" placeholder="New comment..." />
        <button onClick={onCommentSubmit}>Add</button>
      </div>

      <div className="comments">
        {post.comments?.reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <img src={comment.author.avatar} className="avatar" />
            <span className="name">{comment.author.name}: </span>
            <div className="description"> {comment.description}</div>
            {/* <AiFillLike onClick={() => setLikes((likes) => likes + 1)} /> */}
            {/* <span>{comment.likes}</span> */}
            {/* <AiFillDislike onClick={() => setDislikes((dislikes) => dislikes + 1)} /> */}
            {/* <span>{comment.dislikes}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};
