import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class MainMenuService {
    static async getMainMenu() {
        const response = await axios.get(`${API_URL}/MainMenu/GetMainMenu`)
        return response;
    }

    static async getMainMenById(id) {
        const response = await axios.get(`${API_URL}/MainMenu/GetMainMenuById`, {
            params: {
                mainMenuId: id
            }
        })
        return response;
    }

    static async getMainMenuHierarchical() {
        const response = await axios.get(`${API_URL}/MainMenu/GetMainMenuHierarchical`)
        return response;
    }

    static async createMainMenu(mainMenu) {
        const response = await axios.post(`${API_URL}/MainMenu/CreateMainMenu`, mainMenu, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async editMainMenu(mainMenu) {
        const response = await axios.post(`${API_URL}/MainMenu/UpdateMainMenu`, mainMenu, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async deleteMainMenu(id) {
        const response = await axios.post(`${API_URL}/MainMenu/DeleteMainMenu?id=${id}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
}