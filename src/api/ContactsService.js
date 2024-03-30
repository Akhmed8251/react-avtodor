import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class ContactsService {
    static async getContacts() {
        const response = await axios.get(`${API_URL}/Contact/GetContacts`)
        return response;
    }

    static async createContact(contact) {
        const response = await axios.post(`${API_URL}/Contact/CreateContact`, contact, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async editContact(contact) {
        const response = await axios.post(`${API_URL}/Contact/UpdateContact`, contact, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }

    static async deleteContact(contactId) {
        const response = await axios.post(`${API_URL}/Contact/DeleteContact?id=${contactId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        })
        return response;
    }
}