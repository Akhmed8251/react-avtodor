//export const API_URL = "/api"
export const API_URL = "https://localhost:44355"
export const FILES_URL = "http://127.0.0.1:5500/src/assets/Files"
export const getAuthToken = () => {
    return localStorage.getItem("access_token")
}