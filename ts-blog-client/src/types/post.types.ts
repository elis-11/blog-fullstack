import { User } from "./user.types";

export interface IPostCreate {
  title: string;
  // author: string;
  author: User;
  description?: string;
}

export interface IPost extends IPostCreate {
  _id: string;
  likes: number;
  dislikes: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostDetails extends IPost {
  comments: Array<IComment>;
}

export interface ICommentCreate {
  post: string; // postId
  author: string; // authorId
  description: string;
}

export interface IComment {
  _id: string;
  author: User;
  description: string;
  links: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}
