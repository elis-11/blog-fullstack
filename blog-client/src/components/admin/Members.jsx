import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getUsersApi } from "../../helpers/apiCalls";
import "./Admin.scss";
import { MemList } from "./MemList";

export const Members = () => {
  const navigate = useNavigate();

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

  return (
    <div className="Members">
      <h2>Members</h2>
      <MemList />
      <div className="errors">{errors}</div>
    </div>
  );
};
