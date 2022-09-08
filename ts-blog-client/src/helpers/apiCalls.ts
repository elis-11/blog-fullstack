import { ICommentCreate } from "../types/comment.types";
import { UserCreate, UserUpdate } from "../types/user.types";
import {IPostUpdate, IPostCreate} from "../types/post.types"

const API_URL = import.meta.env.VITE_API_URL;

console.log({ API_URL });

// *******************USERS**************
// All users +
export const getUsersApi = async (token: string) => {
  const response = await fetch(`${API_URL}/user`, {
    // send token to protected route => so API can identify us and allows us access!
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

// signup +
export const signupApi = async (userData: UserCreate) => {
  console.log(userData);

  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // convert object to string that we can send over the wire!
    body: JSON.stringify(userData),
  });

  return response.json();
};

// login +
export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // convert object to string that we can send over the wire!
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

// update user at API +
export const updateUserApi = async (
  token: string,
  userId: string,
  updateData: UserUpdate
) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // needed to send JWT token
    },
    // credentials: 'include',
    body: JSON.stringify(updateData),
  });

  // parse updated user from API
  return response.json();
};

// delete +
export const deleteUserApi = async (token: string, userId: string) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token, // needed to send JWT token
    },
  });

  // parse updated user from API
  return response.json();
};

// *******************POSTS**************
// get all posts +
export const getPostsApi = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};

// single post +
export const getPostOneApi = async (postId: string) => {
  const response = await fetch(`${API_URL}/posts/${postId}`);
  return response.json();
};

// Create post
export const createPostApi=async (token: string, postData: IPostCreate)=>{
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {"Content-Type": "application/json", Authorization: token},
    body: JSON.stringify(postData),
  })
  return response.json();
}

// update post
export const updatePostApi = async (token: string, postId: string, postData: IPostUpdate)=>{
const response = await fetch(`${API_URL}/posts/${postId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json', Authorization: token},
  body: JSON.stringify(postData),
})
return response.json();
}

// post-likes
export const updatePostLikes = async (token: string, postId: string) => {
  const response = await fetch(`${API_URL}/posts/${postId}/update_likes`, {
    method: 'PATCH',
    headers: { Authorization: token}
  })
  return response.json();
}
// post-dislikes
export const updatePostDislikes = async (token: string, postId: string) => {
  const response = await fetch(`${API_URL}/posts/${postId}/update_dislikes`, {
    method: 'PATCH',
    headers: { Authorization: token}
  })
  return response.json();
}

// delete Post
export const deletePostApi= async (token: string, postId: string)=>{
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {Authorization: token}
  })
  return response.json();
}

// *******************COMMENTS**************
// Create Comment +
export const createPostCommentApi = async (
  token: string,
  commentData: ICommentCreate
) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // needed to send JWT token
    },
    // convert object to string that we can send over the wire!
    body: JSON.stringify(commentData),
  });
  return response.json();
};

// delete comment +
export const deletePostCommentApi = async (
  token: string,
  commentId: string
) => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

// likes +
export const updatePostCommentLikes = async (
  token: string,
  commentId: string
) => {
  const response = await fetch(
    `${API_URL}/comments/${commentId}/update_likes`,
    {
      method: "PATCH",
      headers: { Authorization: token },
    }
  );
  return response.json();
};

// dislikes +
export const updatePostCommentDislikes = async (
  token: string,
  commentId: string
) => {
  const response = await fetch(
    `${API_URL}/comments/${commentId}/update_dislikes`,
    {
      method: "PATCH",
      headers: { Authorization: token },
    }
  );
  return response.json();
};
