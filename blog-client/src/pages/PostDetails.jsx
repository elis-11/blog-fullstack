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
    // copy all old comments (if empty =>take empty array) + add new comment created
    let commentsNew = [...(post.comments || []), commentNewApi];

    // update comments in post
    setPost({ ...post, comments: commentsNew });

    // clear refinput field => value
    refCommentNew.current.value = "";
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
        <input autoFocus ref={refCommentNew} type="text" placeholder="Add comment..." />
        <button onClick={onCommentCreate}>Add</button>
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
