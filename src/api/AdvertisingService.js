import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class AdvertisingService {
    static async getLastAdvertisings() {
        const response = await axios.get(`${API_URL}/Advertising/GetLastAdvertisings`)
        return response;
    }

    static async getAdvertisings() {
        const response = await axios.get(`${API_URL}/Advertising/GetAdvertisings`)
        return response;
    }

    static async getMainPageDownAdvertising() {
        const response = await axios.get(`${API_URL}/Advertising/GetMainPageDownAdvertising`)
        return response
    }

    static async createAdvertising(advertising) {
        const response = await axios.post(`${API_URL}/Advertising/CreateAdvertising`, advertising, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async editAdvertising(advertising) {
        const response = await axios.post(`${API_URL}/Advertising/UpdateAdvertising`, advertising, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async deleteAdvertising(advertisingId) {
        const response = await axios.post(`${API_URL}/Advertising/DeleteAdvertising?id=${advertisingId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async addFileToAdvertising(formData) {
        const response = await axios.post(`${API_URL}/Advertising/AddFileToAdvertising?advertisingId=${formData.get("advertisingId")}`, formData, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }
}