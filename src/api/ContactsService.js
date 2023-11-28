import axios from "axios";
import { API_URL } from "./config";

export default class ContactsService {
    static async getContacts() {
        const response = await axios.get(`${API_URL}/Contact/GetContacts`)
        return response;
    }
}