import axios from "axios";
import { API_URL } from "./config";

export default class NewsService {
    static async getAllNews() {
        const response = await axios.get(`${API_URL}/News/GetAllNews`)
        return response;
    }
}