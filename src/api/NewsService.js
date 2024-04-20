import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class NewsService {
    static async getNews(skip = null, take = null) {
        const response = await axios.get(`${API_URL}/News/GetNews${(skip != null && take != null) ? `?skip=${skip}&take=${take}` : ""}`)
        return response;
    }

    static async getNewsById(newsId) {
        const response = await axios.get(`${API_URL}/News/GetNewsById`, {
            params: {
                newsId: newsId
            }
        })
        return response;
    }

    static async createNews(news) {
        const response = await axios.post(`${API_URL}/News/CreateNews`, news, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async updateNews(news) {
        const response = await axios.post(`${API_URL}/News/UpdateNews`, news, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async deleteNews(newsId) {
        const response = await axios.post(`${API_URL}/News/DeleteNews?id=${newsId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
}