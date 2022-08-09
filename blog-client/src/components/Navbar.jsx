import { NavLink, useNavigate } from "react-router-dom"
import { useDataContext } from "../context/DataProvider"
import { deleteUserInLocalStorage } from "../helpers/localStorage"



export const Navbar = () => {

  const { user, setUser } = useDataContext()

  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault() // prevent react router to bring us to other page
    deleteUserInLocalStorage() // delete user in local storage so we dont get logged in after next refresh
    setUser() // clear logged in user from state
    navigate("/login") // redirect to homepage after logout
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!user && <NavLink to="/login">Login</NavLink>}
      {user && (
        <NavLink to="#" onClick={logout}>
          Logout
        </NavLink>
      )}
      {!user && <NavLink to="/signup">Signup</NavLink>}
      {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      {user?.role === "Admin" && <NavLink to="/admin">Admin</NavLink>}
    </nav>
  ) 
}