import { useEffect } from "react";
import { PostList } from "../components/posts/PostList";
import { useDataContext } from "../context/DataProvider";
import { getPostsApi } from "../helpers/apiCalls";
import '../components/posts/Posts.scss'

export const Posts = () => {
  const { posts, setPosts, errors, setErrors } = useDataContext();

  useEffect(() => {
    const loadData = async () => {
      const result = await getPostsApi();
      if (result.error) {
        return setErrors(result.error);
      }
      setErrors("");
      setPosts(result);
    };
    loadData();
  }, []);

  return (
    <div className="Posts">
      <h2>Posts</h2>
      <PostList />
      <div className="errors">{errors}</div>
    </div>
  );
};
