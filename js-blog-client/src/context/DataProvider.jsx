import { useState, createContext, useContext } from "react";
import { loadUserInLocalStorage } from "../helpers/LocallStorage";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  
  const userLs = loadUserInLocalStorage();

  const [user, setUser] = useState(userLs);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState("");
  const [posts, setPosts] = useState([]);

  const sharedData = {
    user,
    setUser,
    users,
    setUsers,
    posts,
    setPosts,
    errors,
    setErrors,
  };
  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  );
};
