import { User } from "./user.types";

export interface ICommentCreate {
    post: string; // postId
    author: string; // authorId
    description: string;
  }
  
  export interface IComment {
    _id: string;
    author: User;
    description: string;
    likes: Array<string>; 
    dislikes: Array<string>; 
    createdAt: string;
    updatedAt: string;
  }
  