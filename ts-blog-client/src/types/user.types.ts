import {IPost} from "./post.types"

export type UserCreate = {
  name: string;
  email: string
  password: string
  avatar?: string
  role?: string
}

export type UserUpdate = {
  _id: string
  name?: string
  email?: string
  password?: string
  avatar?: string
  role?: string
}

export type User = {
  _id: string,
  name: string,
  email: string,
  password: string,
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

