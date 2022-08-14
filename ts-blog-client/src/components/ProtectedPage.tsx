import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useDataContext } from "../context/DataProvider"

type Props = {
  children: JSX.Element,
  admin?: boolean
}

export const ProtectedPage = ({ children, admin = false }: Props) => {

  const { user } = useDataContext()

  // user not exists? we are not logged in! redurect
  if (!user) {
    return <Navigate to={"/login"} /> 
  }

  // this route has admin protection! is user admin?
  // if not => kick out! 
  if(admin && user.role !== "admin") {
    return <Navigate to={"/login"} /> 
  }

  // allow user to pass forward to secured component
  return children
}