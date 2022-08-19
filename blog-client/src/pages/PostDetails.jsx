import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { createPostCommentApi, getPostsOneApi } from "../helpers/apiCalls";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

export const PostDetails = () => {
  const { user } = useDataContext();
  const [post, setPost] = useState();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const { id } = useParams();

  const refCommentNew = useRef();

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      const postApi = await getPostsOneApi(id);
      console.log(postApi);
      setPost(postApi);
    };
    fetchPostData();
  }, []);

  const onCommentSubmit = async () => {
    console.log("Creating new comment...");

    if (!post || !user || !refCommentNew.current) return;

    const commentNew = {
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
      </div>
      <div>{post.description}</div>

      {/* create new comment */}
      <div className="comment-action">
        <input ref={refCommentNew} type="text" placeholder="New comment..." />
        <button onClick={onCommentSubmit}>Add</button>
      </div>

      <div className="comments">
        {post.comments.reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <span>
              <img src={comment.author.avatar} className="avatar" />
            </span>
            <span className="name">{comment.author.name}</span>
            <span className="description">{comment.description}</span>
            {/* <AiFillLike onClick={() => setLikes((likes) => likes + 1)} /> */}
            <AiFillLike onClick={() => setLikes((likes) => likes + 1)} />
            <span>{comment.likes}</span>
            <AiFillDislike
              onClick={() => setDislikes((dislikes) => dislikes + 1)}
            />
            <span>{comment.dislikes}</span>
            {/* <button onClick={() => setLikes((likes) => likes + 1)}>
              likes is {likes}
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
