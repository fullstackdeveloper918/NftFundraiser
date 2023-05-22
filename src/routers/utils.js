export const TOKEN_KEY = sessionStorage.getItem('authToken')


export const logout = () => {
  sessionStorage.removeItem("authToken");
}

export const isLogin = () => {
  return TOKEN_KEY ? true : false
}