export const TOKEN_KEY = localStorage.getItem('authToken')


export const logout = () => {
  localStorage.removeItem("authToken");
}

export const isLogin = () => {
  return TOKEN_KEY ? true : false
}