import { Navigate } from "react-router-dom"
import { useDataContext } from "../context/DataProvider"

export const ProtectedPage = ({ children, admin }) => {

  const { user } = useDataContext()

  // user not exists? we are not logged in! redurect
  if (!user) {
    return <Navigate to={"/login"} /> 
  }

  // this route has admin protection! is user admin?
  // if not => kick out! 
  if(admin && user.role !== "Admin") {
    return <Navigate to={"/login"} /> 
  }

  // allow user to pass forward to secured component
  return children
}