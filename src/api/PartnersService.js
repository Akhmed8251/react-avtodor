import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class PartnersService {
    static async getPartners() {
        const response = await axios.get(`${API_URL}/Partner/GetPartners`)
        return response;
    }

    static async createPartner(formData) {
        const response = await axios.post(`${API_URL}/Partner/CreatePartner?name=${formData.get("name")}&link=${formData.get("link")}`, formData, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async editPartner(formData) {
        const response = await axios.post(`${API_URL}/Partner/UpdatePartner?partnerId=${formData.get("partnerId")}&name=${formData.get("name")}&link=${formData.get("link")}&isDeleteOldFile=${formData.get("isDeleteOldFile")}`, formData, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async deletePartner(partnerId) {
        const response = await axios.post(`${API_URL}/Partner/DeletePartner?id=${partnerId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
}