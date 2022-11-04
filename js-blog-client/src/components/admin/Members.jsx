import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getUsersApi } from "../../helpers/apiCalls";
import "./Admin.scss";
import { MemList } from "./MemList";

export const Members = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef()

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
    <div className="Members">
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

      <MemList users={filteredUsers} />
      <div className="errors">{errors}</div>
    </div>
  );
};
