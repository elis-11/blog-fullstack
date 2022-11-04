import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersList } from "../components/users/UsersList";
import { useDataContext } from "../context/DataProvider";
import { getUsersApi } from "../helpers/apiCalls";
import "../components/users/Users.scss";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();

  const { user, users, setUsers, errors, setErrors } = useDataContext();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    const loadData = async () => {
      console.log(user);
      const result = await getUsersApi(user.token);

      if (result.error) {
        return setErrors(result.error);
      }
      setErrors("");
      setUsers(result);
    };
    console.log(user);

    loadData();
  }, [user]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Dashboard">
      <h2 style={{ color: "white" }}>
        {users.length} List {users.length === 1 ? "User" : "Users"}
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
          />
        </form>
      </div>
      {users.length ? (
        <UsersList users={filteredUsers} />
      ) : (
        <p style={{ marginTop: "2rem", textAlign: "center" }}></p>
      )}
      <div className="errors">{errors}</div>
    </div>
  );
};
