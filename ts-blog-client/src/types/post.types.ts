import { IComment } from "./comment.types";
import { User } from "./user.types";

export interface IPost {
  _id: string;
  title: string;
  author: User;
  description?: string;
  likes: Array<string>;
  dislikes: Array<string>;
  //  likes: number;
  //  dislikes: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostCreate {
  title: string;
  author: string;
  // author: User;
  description?: string;
  image?: string;
}

export interface IPostUpdate {
  title?: string;
  description?: string;
  image?: string;
}

export interface IPostDetails extends IPost {
  comments: Array<IComment>;
}
