import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";

export const PostList = () => {
  const { posts } = useDataContext();

  return (
    <div className="content">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div>
            <img src={post.image} />
            {/* <img alt="avatar" src={`https://source.unsplash.com/150x150/?mountain`} /> */}
          </div>
          <div>{post.title}</div>
          <div className="data">
            <img src={post.author.avatar} className="post-avatar" />
            <span>{post.author.name}</span>
            <span>{post.createdAt.substring(0, 10)}</span>
          </div>
          <div>{post.description}</div>
          <div>
            {/* <Link to={`/posts/${post._id}`}>Read more...</Link> */}
            <Link to={`/posts/${post._id}`} state={post}>
              Read more...
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
