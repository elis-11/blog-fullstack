import { useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { IPost } from "../types/post.types";

export const PostDetails = () => {
  const { posts } = useDataContext();

  const location = useLocation(); // --- version 2
  const post = location.state as IPost    // as IPost for TS
  console.log(location.state);

  // const { id } = useParams();   //--- version 1
  // console.log(id);

  // filter out post with given id
  // const post = posts.find((post) => post._id === id);   // --- version 1

  if (!post) return <div>Post does not exist</div>;

  return (
    <div className="Details">
      <div>
        <img src={post.image} />
      </div>
      <div className="title">{post.title}</div>
      <div className="author">
        {post.createdAt.slice(0, 10)} by {post.author}
      </div>
      <div>{post.description}</div>
    </div>
  );
};
