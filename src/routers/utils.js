export const TOKEN_KEY = localStorage.getItem('authToken')


export const logout = () => {
    localStorage.removeItem("authToken");
}

export const isLogin = () => {
    if (TOKEN_KEY) {
        return true;
    }

    return false;
}