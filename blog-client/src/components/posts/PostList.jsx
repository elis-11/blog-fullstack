import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";

export const PostList = () => {
  const { posts } = useDataContext();

  return (
    <div className="content">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div>
            <div>
              <img src={post.image} />
            </div>
            <div>{post.title}</div>
            <div>
              {post.createdAt.slice(0, 10)} by {post.author}
            </div>
            <div>{post.description}</div>
            <div>
              <Link to={`/posts/${post._id}`}>Read more...</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
