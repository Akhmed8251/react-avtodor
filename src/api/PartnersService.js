import axios from "axios";
import { API_URL } from "./config";

export default class PartnersService {
    static async getAllPartners() {
        const response = await axios.get(`${API_URL}/Partner/GetAllPartners`)
        return response;
    }
}