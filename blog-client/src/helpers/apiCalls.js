
const API_URL = import.meta.env.VITE_API_URL

console.log( { API_URL } )

export const getUsersApi = async (token) => {
  const response = await fetch(`${API_URL}/user`, {

    // send token to protected route => so API can identify us and allows us access!
    headers: {
      Authorization: token
    }
  })
  return response.json()
}

// signup 
export const signupApi = async (userData) => {

  console.log(userData)

  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // convert object to string that we can send over the wire!
    body: JSON.stringify(userData),
  })

  return response.json()
}

// login
export const loginApi = async (email, password) => {

  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // convert object to string that we can send over the wire!
    body: JSON.stringify({ email, password }),
  })

  return response.json()
}

// update user at API
export const updateUserApi = async (token, userId, updateData) => {

  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token  // needed to send JWT token
    },
    // credentials: 'include',
    body: JSON.stringify(updateData)
  })

  // parse updated user from API
  return response.json()
}

export const deleteUserApi = async (token, userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token, // needed to send JWT token
    },
  })

  // parse updated user from API
  return response.json()
}


export const updateUserApiCookies = async (userId, updateData) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updateData),
  })

  // parse updated user from API
  return response.json()
}

