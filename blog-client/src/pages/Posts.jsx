import { useDataContext } from "../context/DataProvider";

export const Posts = () => {
  const { posts } = useDataContext();

  return (
    <div>
      <div className="Posts">
        <h2>Posts</h2>
        <div className="content">
          {posts.map((post) => (
            <div className="post" key={posts._id}>
              <div className="title">{posts.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
