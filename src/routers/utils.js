export const TOKEN_KEY = localStorage.getItem('auth_token')


export const logout = () => {
    localStorage.removeItem("auth_token");
}

export const isLogin = () => {
  return TOKEN_KEY ? true : false
}