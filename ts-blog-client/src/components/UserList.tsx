import { useDataContext } from "../context/DataProvider"
import { UserItem } from "./UserItem"
import { User } from "../types/user.types"

type Props ={ 
  users: User[]
}

export const UserList = ({users}: Props) => {
  // const { users } = useDataContext()
  return (
    <div className="users">
      {users.map((user) =>  
        <UserItem key={ user._id } user={user} /> 
      )}
    </div>
  )
}
