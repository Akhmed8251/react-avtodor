import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class MenuService {
    static async getMenu() {
        const response = await axios.get(`${API_URL}/Menu/GetMenu`)
        return response;
    }

    static async createMenu(menu) {
        const response = await axios.post(`${API_URL}/Menu/CreateMenu`, menu, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async editMenu(menu) {
        const response = await axios.post(`${API_URL}/Menu/UpdateMenu`, menu, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async deleteMenu(id) {
        const response = await axios.post(`${API_URL}/Menu/DeleteMenu?id=${id}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }
}