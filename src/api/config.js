//export const API_URL = "/api"
export const API_URL = "https://localhost:7275"
export const FILES_URL = "http://127.0.0.1:5501/src/assets/Files"
export const getAuthToken = () => {
    return localStorage.getItem("access_token")
}