import { useEffect, useRef, useState } from "react";
import { PostList } from "../components/posts/PostList";
import { useDataContext } from "../context/DataProvider";
import { deletePostApi, getPostsApi } from "../helpers/apiCalls";
import "../components/posts/Posts.scss";
import { NavLink } from "react-router-dom";

export const Posts = () => {
  const { posts, setPosts, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");
  const inputRef= useRef();

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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.name.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Posts">
      <div className="header">
        <h3>
          {posts.length} List {posts.length === 1 ? "post" : "posts"}
        </h3>
        <NavLink to="/addpost">Create New Post</NavLink>
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
      <div className="errors">{errors}</div>
    </div>
  );
};
