export const TOKEN_KEY = sessionStorage.getItem('authToken')


export const logout = () => {
    sessionStorage.removeItem("authToken");
}

export const isLogin = () => {
    if (TOKEN_KEY) {
        return true;
    }

    return false;
}