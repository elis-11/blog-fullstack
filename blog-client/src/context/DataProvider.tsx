import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { loadUserInLocalStorage } from "../helpers/localStorage"
import { ContextData, User } from "../types/types"

const DataContext = createContext<ContextData>({} as ContextData)

// this here gets me data from central context in any component
export const useDataContext = () => useContext(DataContext)

type Props = {
  children: ReactNode
}

export const DataProvider = ({ children }: Props) => {

  // check if user is already logged in by looking it up from local storage
  const userLs = loadUserInLocalStorage()

  const [user, setUser] = useState<User | undefined>(userLs) // use user from localstorage as default
  const [users, setUsers] = useState<User[]>([])
  const [errors, setErrors] = useState<string>("")

  const sharedData = { 
    user, setUser, 
    users, setUsers,
    errors, setErrors 
  }

  return <DataContext.Provider value={ sharedData }>
    {children}
  </DataContext.Provider>

}