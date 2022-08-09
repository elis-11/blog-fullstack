export interface PostInput {
    title: string
    description: string
    author: string
    image: string
  }
  
  export interface Post extends PostInput {
    _id: string
    createdAt: string
    updatedAt: string
    likes: number
    dislikes: number
  }
  
  export interface CommentInput {
    text: string
    author: string
  }
  
  export interface Comment extends CommentInput {
    _id: string
    createdAt: string
    updatedAt: string
    likes: number
    dislikes: number
  }
  export type ContextData = {
    errors: string
    setErrors: React.Dispatch<React.SetStateAction<string>>
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  }
  
  