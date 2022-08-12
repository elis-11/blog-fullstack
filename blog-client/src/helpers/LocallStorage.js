const LOGIN_USER = "LOGIN_USER";

export const storeUserInLocalStorage = (user) => {
  localStorage.setItem(LOGIN_USER, JSON.stringify(user));
};

export const loadUserInLocalStorage = () => {
  const userStr = localStorage.getItem(LOGIN_USER);

  if (!userStr) return;

  const userObj = JSON.parse(userStr);
  //   console.log(userStr.email);
  //   console.log(userObj.email);
  return userObj;
};

export const deleteUserInLocalStorage = () => {
  localStorage.removeItem(LOGIN_USER);
};
