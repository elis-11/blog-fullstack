import { createContext, useContext, useEffect, useState } from "react"
import { loadUserInLocalStorage } from "../helpers/localStorage"

const DataContext = createContext()

// this here gets me data from central context in any component
export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({ children }) => {

  // check if user is already logged in by looking it up from local storage
  const userLs = loadUserInLocalStorage()

  const [user, setUser] = useState(userLs) // use user from localstorage as default
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState("")

  const sharedData = { 
    user, setUser, 
    users, setUsers,
    errors, setErrors 
  }

  return <DataContext.Provider value={ sharedData }>
    {children}
  </DataContext.Provider>

}