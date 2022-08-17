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
            {/* <img alt="avatar" src={`https://source.unsplash.com/150x150/?nature,${index}`} /> */}
            {/* <img alt="avatar" src={`https://source.unsplash.com/150x150/?mountain`} /> */}
          </div>
          <div>{post.title}</div>
          <div>
            {/* {post.createdAt.slice(0, 10)} by {post.author} */}
            {post.createdAt.substring(0, 10)} by {post.author}
          </div>
          <div>{post.description}</div>
          <div>
            {/* <Link to={`/posts/${post._id}`}>Read more...</Link> */}
            <Link to={`/posts/${post._id}`} state={post}>Read more...</Link>
          </div>
        </div>
      ))} 
    </div>
  );
};
