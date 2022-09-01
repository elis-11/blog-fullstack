import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDataContext } from "../context/DataProvider";
import { deleteUserInLocalStorage } from "../helpers/LocallStorage";

export const Navbar = () => {
  const { user, setUser } = useDataContext();

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    deleteUserInLocalStorage();
    setUser();
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <div className="logo">{user && <NavLink to="/">JS</NavLink>}</div>
      <div className="nav">
        <NavLink to="/"> Home</NavLink>
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/signup">Signup</NavLink>}
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        <NavLink to="/posts">Posts</NavLink>
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        {user && (
          <NavLink to="#" onClick={logout}>
            <MdLogout />
          </NavLink>
        )}
      </div>
      <div className="avatar">
        {user && (
          <NavLink to="/">
            <img src={user.avatar} />
          </NavLink>
        )}
      </div>
    </div>
  );
};
