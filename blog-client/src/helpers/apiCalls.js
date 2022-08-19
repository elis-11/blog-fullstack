const API_URL = import.meta.env.VITE_API_URL;

console.log({ API_URL });

// ALL USERS
export const getUsersApi = async (token) => {
  const response = await fetch(`${API_URL}/user`, {
    headers: { Authorization: token },
  });
  return response.json();
};

// SIGNUP
// export const signupApi = async (name, email, password) => {  // without AVATAR
export const signupApi = async (name, email, password, avatar) => {
  // without AVATAR
  // export const signupApi = async (userData) => {  // with AVATAR
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, avatar }), // without AVATAR
    // body: JSON.stringify({ userData }),   // with AVATAR
  });
  return response.json();
};

// LOGIN
export const loginApi = async (email, password) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// UPDATE
export const updateUserApi = async (token, userId, updateData) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }, // for JWT
    //  credentials: include  <-wenn ohne JWT
    body: JSON.stringify(updateData),
  });
  return response.json();
};

// export const updateUserApiCookies = async (userId, updateData) => {
//   const response = await fetch(`${API_URL}/user/${userId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(updateData),
//   })
//   // parse updated user from API
//   return response.json()
// }

export const deleteUserApi = async (token, userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    }, // for JWT
  });
  return response.json();
};

// POSTS
export const getPostsApi = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};

export const getPostsOneApi= async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}`)
  return response.json()
}

// export const createPostCommentApi = async (token, avatar, title, author, description) => {
export const createPostCommentApi = async (token, commentData) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
  Authorization: token,
  },
    // body: JSON.stringify({ avatar, title, author, description }),
    body: JSON.stringify(commentData),
  });
  return response.json();
};

// UPDATE
export const updatePostApi = async (token, postId, updateData) => {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }, // for JWT
    //  credentials: include  <-wenn ohne JWT
    body: JSON.stringify(updateData),
  });
  return response.json();
};

export const deletePostApi = async (token, postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return response.json();
};

// COMMENTS
export const getCommentsApi = async () => {
  const response = await fetch(`${API_URL}/comments`);
  return response.json();
};

export const createCommentApi = async (text, author) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, author }),
  });
  return response.json();
};

// UPDATE
export const updateCommentApi = async (token, commentId, updateData) => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }, // for JWT
    //  credentials: include  <-wenn ohne JWT
    body: JSON.stringify(updateData),
  });
  return response.json();
};

export const deleteCommentApi = async (token, commentId) => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return response.json();
};
