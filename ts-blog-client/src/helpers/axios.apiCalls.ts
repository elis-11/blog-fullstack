import { ICommentCreate } from "../types/comment.types";
import { UserCreate, UserUpdate } from "../types/user.types";
import { IPostUpdate } from "../types/post.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log({ API_URL });

axios.defaults.baseURL = API_URL;

// *******************USERS**************
// All users +
export const getUsersApi = async (token: string) => {
  const response = await axios.get("/user", {
    // send token to protected route => so API can identify us and allows us access!
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// signup +
export const signupApi = async (userData: UserCreate) => {
  console.log(userData);

  const response = await axios.post("/user", { userData });

  return response.data;
};

// login +
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });

  return response.data;
};

// update user at API +
export const updateUserApi = async (
  token: string,
  userId: string,
  updateData: UserUpdate
) => {
  const response = await axios.patch(`/user/${userId}`, updateData, {
    headers: {
      Authorization: token, // needed to send JWT token
    },
  });

  // parse updated user from API
  return response.data;
};

// delete +
export const deleteUserApi = async (token: string, userId: string) => {
  const response = await axios.delete(`/user/${userId}`, {
    headers: {
      Authorization: token, // needed to send JWT token
    },
  });

  // parse updated user from API
  return response.data;
};

// *******************POSTS**************
// get all posts +
export const getPostsApi = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

// single post +
export const getPostOneApi = async (postId: string) => {
  const response = await axios.get(`/posts/${postId}`);
  return response.data;
};

// update post
export const updatePostApi = async (
  token: string,
  postId: string,
  postData: IPostUpdate
) => {
  const response = await axios.patch(`/posts/${postId}`, postData, {
    headers: { Authorization: token },
  });
  return response.data;
};

// *******************COMMENTS**************
// Create Comment +
export const createPostCommentApi = async (
  token: string,
  commentData: ICommentCreate
) => {
  const response = await axios.post(`/comments`, commentData, {
    headers: {
      Authorization: token, // needed to send JWT token
    },
  });
  return response.data;
};

// delete comment +
export const deletePostCommentApi = async (
  token: string,
  commentId: string
) => {
  const response = await axios.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// likes +
export const updatePostCommentLikes = async (
  token: string,
  commentId: string
) => {
  const response = await axios.patch(`/comments/${commentId}/update_likes`, null, {
    headers: { Authorization: token },
  });
  return response.data;
};

// dislikes +
export const updatePostCommentDislikes = async (
  token: string,
  commentId: string
) => {
  const response = await axios.patch("/comments/${commentId}/update_dislikes", null, {
    headers: { Authorization: token },
  });
  return response.data;
};
