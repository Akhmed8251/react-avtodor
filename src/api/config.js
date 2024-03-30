// export const API_URL = "/api"
export const API_URL = "https://localhost:7275"
export const FILES_URL = "/Files"
export const getAuthToken = () => {
    return localStorage.getItem("access_token")
}