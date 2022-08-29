import { MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { deleteUserInLocalStorage } from "../helpers/localStorage";

export const Navbar = () => {
  const { user, setUser } = useDataContext();

  const navigate = useNavigate();

  const logout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault(); // prevent react router to bring us to other page
    deleteUserInLocalStorage(); // delete user in local storage so we dont get logged in after next refresh
    setUser(undefined); // clear logged in user from state
    navigate("/login"); // redirect to homepage after logout
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
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
      {user && (
        <NavLink to="/">
          <img src={user.avatar} />
        </NavLink>
      )}
    </nav>
  );
};
