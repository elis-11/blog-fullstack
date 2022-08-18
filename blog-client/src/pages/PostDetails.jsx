import { useLocation, useParams } from "react-router-dom";
// import { useDataContext } from "../context/DataProvider";

export const PostDetails = () => {
  // const { posts } = useDataContext();

  // const { id } = useParams();
  // console.log(id);
  // // filter out post with given id
  // const post = posts.find((post) => post._id === id);

  const location = useLocation();
  const post = location.state;
  console.log(location.state);

  if (!post) return <div>Post doesn't exist!</div>;

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
    </div>
  );
};
