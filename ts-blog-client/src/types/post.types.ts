import { IComment } from "./comment.types";
import { User } from "./user.types";

export interface IPostCreate {
  title: string;
  // author: string;
  author: User;
  description?: string;
  image?: string;
}

export interface IPostUpdate {
  title?: string;
  description?: string;
  image?: string;
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
