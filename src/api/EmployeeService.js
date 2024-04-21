import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class EmployeeService {
    static async getUsers() {
        const response = await axios.get(`${API_URL}/Employee/GetEmployees`, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async createUser(user) {
        const response = await axios.post(`${API_URL}/Employee/CreateUser`, user, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async editUser(user) {
        const response = await axios.post(`${API_URL}/Employee/EditUser`, user, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async deleteUser(userId) {
        const response = await axios.post(`${API_URL}/Employee/DeleteUser?id=${userId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
}