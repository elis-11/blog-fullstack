import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { deletePostApi, updatePostApi } from "../../helpers/apiCalls";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";

export const PostList = ({posts}) => {
  const { user, setPosts } = useDataContext();
  const [post, setPost] = useState();
  const [editMode, setEditMode] = useState(false);
  const [postCopy, setPostCopy] = useState(post);

  // console.log(posts);

  const onEditPost = (e) => {
    // create Copy before state update & update in one step
    const updated = { ...postCopy, [e.target.name]: e.target.value };
    setPostCopy(updated);
  };

  const submitUpdate = async () => {
    // send updated post (not saved yet) => to API
    const postUpdatedApi = await updatePostApi(
      user.token,
      postCopy._id,
      postCopy
    );
    console.log(postUpdatedApi);
    setEditMode(false);

    // save in Browser
    const postsCopy = posts.map((_post) => {
      return _post._id === postUpdatedApi._id ? postUpdatedApi : _post;
    });
    setPosts(postsCopy);
  };

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
          {editMode ? (
            <div className="edit">
              <div className="image">
                <img src={postCopy.image} />
              </div>
              <input
                name="title"
                value={postCopy.title}
                onChange={onEditPost}
              />
              <input
                name="description"
                value={postCopy.description}
                onChange={onEditPost}
              />
              <MdSaveAlt className="save" onClick={submitUpdate} />
            </div>
          ) : (
            <div className="item">
              <div>
                <img src={post.image} />
              </div>
              <div>{post.title}</div>
              <div className="author">
                <img src={post.author.avatar} />
                <div> {post.author.name}</div>
                <div> {post.createdAt.slice(0, 10)}</div>
              </div>
              <div>{post.description}</div>
            </div>
          )}
          <div>
            <Link to={`/posts/${post._id}`} state={post}>
              Read more...
            </Link>
          </div>
          <div className="icons">
            <div className="likes">
              <AiFillLike className="like" />
              <AiFillDislike className="dislike" />
            </div>
            <FaEdit className="edit"
            onClick={() =>setEditMode(!editMode)}
            />
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
