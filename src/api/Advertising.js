import axios from "axios";
import { API_URL } from "./config";

export default class AdvertisingService {
    static async getLastAdvertisings() {
        const response = await axios.get(`${API_URL}/Advertising/GetLastAdvertisings`)
        return response;
    }
}