
export interface IPostCreate {
  title: string;
  author: string;
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
