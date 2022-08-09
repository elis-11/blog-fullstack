import { useDataContext } from "../context/DataProvider"

export const Home = () => {
  const { user } = useDataContext()

  return (
    <div className="homepage">
      <h2>Home</h2>
      {user && (
        <div className="user-details">
          <div>Name: {user.username}</div>
          <div>Email: {user.email}</div>
          <img style={{ width: "200px" }} src={user.avatar} />
        </div>
      )}
    </div>
  )
}
