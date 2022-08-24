import { useEffect } from "react";
import { PostList } from "../components/posts/PostList";
import { useDataContext } from "../context/DataProvider";
import { getPostsApi } from "../helpers/apiCalls";
import "../components/posts/Posts.scss";

export const Posts = () => {
  const { posts, setPosts, errors, setErrors } = useDataContext();

  // useEffect
  // fetch me data I dont have so far from backend on LOAD
  // and afterwards store them in context
  useEffect(() => {
    // only fetch data if user is there (=logged in)
    const loadData = async () => {
      // get protected data from backend using token
      const result = await getPostsApi();
      console.log(result);
      

      // if error from backend (e.g. no valid token) => show the error in UI
      if (result.error) {
        return setErrors(result.error);
      }

      // store received users in our central data state
      setErrors("");
      setPosts(result);
    };
    loadData();
  }, []); // useEffect should just act if user logged in

  return (
    <div className="Posts">
      <h2>Posts</h2>
      <PostList />
      {/* SHOW ERRORS */}
      <div className="errors">{errors}</div>
    </div>
  );
};
