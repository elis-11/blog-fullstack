import { useDataContext } from "../../context/DataProvider";
import { MemItem } from "./MemItem";

export const MemList = ({ users}) => {
  // const { users } = useDataContext();

  return (
    <div className="users">
      {users.map((user) => (
        <MemItem key={user._id} user={user} />
      ))}
    </div>
  );
};
