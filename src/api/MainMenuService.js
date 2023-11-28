import axios from "axios";
import { API_URL } from "./config";

export default class MainMenuService {
    static async getMainMenu() {
        const response = await axios.get(`${API_URL}/MainMenu/GetMainMenu`)
        return response;
    }
}