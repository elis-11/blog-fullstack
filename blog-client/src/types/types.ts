export type UserCreate = {
  name: string;
  email: string
  password: string
  role?: string
  avatar?: string
}

export type UserUpdate = {
  _id: string
  email?: string
  password?: string
  role?: string
}


export type User = {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  token: string, 
  avatar: string,
}

export type ContextData = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  errors: string
  setErrors: React.Dispatch<React.SetStateAction<string>>
}

