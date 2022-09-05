import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import {
  deletePostApi,
} from "../../helpers/apiCalls";

export const PostList = ({ posts }) => {
  const { user, setPosts } = useDataContext();


  const onPostDelete = async (postId) => {
    // console.log(onPostDelete);
    if (!user) return;

    // 1.step => delete post at API
    const postDelete = await deletePostApi(user.token, postId);
    // console.log(postDelete);

    // 2.step => delete post in state
    const postsCopy = posts.filter((post) => post._id !== postId);
    console.log(postsCopy);

    setPosts(postsCopy);
  };

  return (
    <div className="content">
      {([...posts] || []).reverse().map((post) => (
        <div key={post._id} className="post">
          <div className="item">
            <div>
              <img src={post.image} />
            </div>
            <div className="author">
              <img src={post.author.avatar} />
              <div> {post.author.name}</div>
              <div> {post.createdAt.slice(0, 10)}</div>
              {/* <div><Moment date={post.createdAt} format="HH:mm DD. MM. YYYY" /> </div> */}
            </div>
            <div className="title">{post.title}</div>
            <div className="description">{post.description}</div>
          </div>
          <div>
            <Link to={`/posts/${post._id}`} state={post}>
              Read more...
            </Link>
          </div>
          <div className="icons">
            <FaTrashAlt
              className="delete"
              role="button"
              onClick={() => onPostDelete(post._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
