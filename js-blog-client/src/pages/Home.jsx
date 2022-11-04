import { useDataContext } from "../context/DataProvider";
import "../styles/App.scss";

export const Home = () => {
  const { user } = useDataContext();

  return (
    <div className="Home">
      <h2>Blog - Fullstack</h2>
      <h3>Home</h3>
      {user && (
        <div className="user">
          <img style={{ width: "200px" }} src={user.avatar} />
          <div>Hello {user.name} !</div>
          <div>{user.email}</div>
        </div>
      )}
    </div>
  );
};
