import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserList } from "../components/UserList"
import { useDataContext } from "../context/DataProvider"
import { getUsersApi } from "../helpers/apiCalls"

export const Dashboard = () => {

  const { user, users, setUsers, errors, setErrors } = useDataContext()

  // useEffect
  // fetch me data I dont have so far from backend on LOAD
  // and afterwards store them in context
  useEffect(() => {

    // not logged in?
    // stop here / dont load protected data

    // only fetch data if user is there (=logged in)
    const loadData = async () => {
      // get protected data from backend using token
      const result = await getUsersApi(user.token)

      // if error from backend (e.g. no valid token) => show the error in UI
      if(result.error) {
        return setErrors(result.error)
      }

      // store received users in our central data state
      setErrors("")
      setUsers(result)
    }
    loadData()

  }, [user]) // useEffect should just act if user logged in

  return (
    <div className="users-page">
      <h2>Dashboard</h2>

      {/* DISPLAY LIST OF USERS */}
      <UserList />
      
      {/* SHOW ERRORS */}
      <div className="errors">{errors}</div>
    </div>
  )  
}