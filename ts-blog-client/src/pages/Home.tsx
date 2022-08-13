import { useDataContext } from "../context/DataProvider"

export const Home = () => {
  const { user } = useDataContext()

  return (
    <div className="homepage">
      <h2>Home</h2>
      {user && (
        <div className="user-details">
          <img style={{ width: "200px" }} src={user.avatar} />
          <div>Hello {user.name}!</div>
          <div>Email: {user.email}</div>
        </div>
      )}
    </div>
  )
}
