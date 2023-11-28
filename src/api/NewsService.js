import axios from "axios";
import { API_URL } from "./config";

export default class NewsService {
    static async getNews() {
        const response = await axios.get(`${API_URL}/News/GetNews`)
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
}