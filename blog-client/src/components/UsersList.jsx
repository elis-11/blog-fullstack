import { useDataContext } from "../context/DataProvider";
import { UserItem } from "./UserItem";

export const UsersList = () => {
  const { users } = useDataContext();

  return (
    <div className="users">
      {users.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
};
