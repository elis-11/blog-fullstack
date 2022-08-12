const API_URL = import.meta.env.VITE_API_URL;

console.log({ API_URL });

// ALL USERS
export const getUsersApi = async (token) => {
  const response = await fetch(`${API_URL}/user`, {
    headers: { Authorization: token },
  });
  return response.json();
};

export const getPostsApi = async (token) => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: { Authorization: token },
  })
  return response.json()
}

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

export const deleteUserApi = async (token, userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    }, // for JWT
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
