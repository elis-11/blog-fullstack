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
    <div>
      <nav>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? "active" : "none")}
          end
        >
          {" "}
          Home
        </NavLink>
        {!user && (
          <NavLink
            to="/login"
            className={(navData) => (navData.isActive ? "active" : "none")}
          >
            Login
          </NavLink>
        )}
        {!user && (
          <NavLink
            to="/signup"
            className={(navData) => (navData.isActive ? "active" : "none")}
          >
            Signup
          </NavLink>
        )}
        {user && (
          <NavLink
            to="/dashboard"
            className={(navData) => (navData.isActive ? "active" : "none")}
          >
            Dashboard
          </NavLink>
        )}
          <NavLink
            to="/posts"
            className={(navData) => (navData.isActive ? "active" : "none")}
          >
            Posts
          </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={(navData) => (navData.isActive ? "active" : "none")}
          >
            Admin
          </NavLink>
        )}
        {user && (
          <NavLink to="#" onClick={logout}>
          <MdLogout/>
          </NavLink>
        )}
      </nav>
    </div>
  );
};
