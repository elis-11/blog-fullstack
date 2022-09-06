import { useEffect, useRef, useState } from "react";
import { PostList } from "../components/posts/PostList";
import { useDataContext } from "../context/DataProvider";
import { getPostsApi } from "../helpers/apiCalls";
import "../components/posts/Posts.scss";
import { NavLink } from "react-router-dom";

export const Posts = () => {
  const { posts, setPosts, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.name.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Posts">
      <div className="header">
        <h2>
          Total: {posts.length} {posts.length === 1 ? "Post" : "Posts"}
        </h2>
        <NavLink to="/addpost">Create new post</NavLink>
        <div className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              autoFocus
              ref={inputRef}
              id="search"
              type="text"
              role="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
      <PostList posts={filteredPosts} />
      {/* SHOW ERRORS */}
      <div className="errors">{errors}</div>
    </div>
  );
};
