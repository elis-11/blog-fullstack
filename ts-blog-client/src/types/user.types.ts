import {IPost} from "./post.types"

export interface UserCreate {
  name: string;
  email: string
  password: string
  avatar?: string
  role?: string
}

export interface UserUpdate {
  _id: string
  name?: string
  email?: string
  password?: string
  avatar?: string
  role?: string
}

export interface User {
  _id: string,
  name: string,
  email: string,
  avatar?: string
  role: string,
  token: string, 
}

export type ContextData = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  errors: string
  setErrors: React.Dispatch<React.SetStateAction<string>>
  posts: IPost[]
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}

