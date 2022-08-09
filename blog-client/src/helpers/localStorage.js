const LOGIN_USER = "LOGIN_USER"

export const storeUserInLocalStorage = (user) => {
  localStorage.setItem(LOGIN_USER, JSON.stringify(user))
}

export const deleteUserInLocalStorage = () => {
  localStorage.removeItem(LOGIN_USER)
}

export const loadUserInLocalStorage = () => {
  const userStr = localStorage.getItem(LOGIN_USER)

  // if there is no user in local storage => we are not logged in => return empty user
  if(!userStr) return

  const userObj = JSON.parse( userStr )
  return userObj
}