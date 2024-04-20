import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class ContentService {
    static async getContents() {
        const response = await axios.get(`${API_URL}/Content/GetContents`)
        return response;
    }

    static async getContentById(contentId) {
        const response = await axios.get(`${API_URL}/Content/GetContentById?contentId=${contentId}`)
        return response;
    }

    static async createContent(content) {
        const response = await axios.post(`${API_URL}/Content/CreateContent`, content, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async editContent(content) {
        const response = await axios.post(`${API_URL}/Content/UpdateContent`, content, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async deleteContent(contentId) {
        const response = await axios.post(`${API_URL}/Content/DeleteContent?id=${contentId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
}