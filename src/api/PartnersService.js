import axios from "axios";
import { API_URL } from "./config";

export default class PartnersService {
    static async getPartners() {
        const response = await axios.get(`${API_URL}/Partner/GetPartners`)
        return response;
    }
}