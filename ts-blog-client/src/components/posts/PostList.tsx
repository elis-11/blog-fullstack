import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { deletePostApi } from "../../helpers/apiCalls";
import { IPost } from "../../types/post.types";

type Props = {
  posts: IPost[]
}

export const PostList = ({posts}: Props) => {
  const { user, setPosts } = useDataContext();

  const onPostDelete = async (postId: string) => {
    if (!user) return;

    // 1.step => delete post at API
    const postDelete = await deletePostApi(user.token, postId);

    // 2.step => delete post in state
    const postsCopy = posts.filter((post) => post._id !== postId);
    console.log(postsCopy);

    setPosts(postsCopy);
  };

  return (
    <div className="content">
      {/* {posts.map((post) => ( */}
      {([...posts] || []).reverse().map((post) => (
        <div key={post._id} className="post">
          <div>
            <Link to={`/posts/${post._id}`} state={post}>
              <img src={post.image} className="post-image" />
            </Link>
            {/* <img alt="avatar" src={`https://source.unsplash.com/150x150/?mountain`} /> */}
          </div>
          <div className="data">
            <img src={post.author.avatar} className="post-avatar" />
            <span>{post.author.name}</span>
            <span>{post.createdAt.substring(0, 10)}</span>
          </div>
          <div className="title">{post.title}</div>
          <div className="description">{post.description}</div>
          <div className="link">
            {/* <Link to={`/posts/${post._id}`}>Read more...</Link> */}
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
