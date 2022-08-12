import { useDataContext } from "../context/DataProvider";

export const Posts = () => {
  const { posts } = useDataContext();

  return (
    <div>
        hjkhkhkh
      <div className="Posts">
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
