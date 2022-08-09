export type User = {
  _id: string,
  email: string,
  name: string
  age?: number
} 

export type ContextData = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  errors: string
  setErrors: React.Dispatch<React.SetStateAction<string>>
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

