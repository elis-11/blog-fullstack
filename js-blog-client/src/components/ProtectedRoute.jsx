import { Navigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";

export const ProtectedRoute = ({ children, admin }) => {
  console.log(children);

  const { user } = useDataContext();

  if (!user) {
    console.log("Not logged in!");
    return <Navigate to={"/login"} />;
  }
  if (admin && user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }
  return children;
};
