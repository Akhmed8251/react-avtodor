 export const API_URL = "/api"
export const FILES_URL = "/Files"
export const getAuthToken = () => {
    return localStorage.getItem("access_token")
}