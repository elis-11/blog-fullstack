import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../components/UserList";
import { useDataContext } from "../context/DataProvider";
import { getUsersApi } from "../helpers/apiCalls";
import '../styles/App.scss';

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { user, users, setUsers, errors, setErrors } = useDataContext();

  // fetch me data I dont have so far from backend on LOAD
  // and afterwards store them in context
  useEffect(() => {
    // not logged in?
    // stop here / dont load protected data
    if(!user){
      return navigate("/login")
    }

    // only fetch data if user is there (=logged in)
    const loadData = async () => {
      // if (!user) return;
      // get protected data from backend using token
      const result = await getUsersApi(user.token);

      // if error from backend (e.g. no valid token) => show the error in UI
      if (result.error) {
        return setErrors(result.error);
      }
      // store received users in our central data state
      setErrors("");
      setUsers(result);
    };
    console.log(user);
    
    loadData();
  }, [user]); // useEffect should just act if user logged in

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Dashboard">
      <h2>
        {users.length} {users.length === 1 ? "Member" : "Members"}
      </h2>

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
          />{" "}
        </form>
      </div>

      {/* DISPLAY LIST OF USERS */}
      {/* <UserList /> */}
      <UserList users={filteredUsers}/>

      {/* SHOW ERRORS */}
      <div className="errors">{errors}</div>
    </div>
  );
};
