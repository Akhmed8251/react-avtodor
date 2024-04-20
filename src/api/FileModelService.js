import axios from "axios";
import { API_URL, getAuthToken } from "./config";

export default class FileModelService {
    static async createFileModel(creatingFileModel) {
        const response = await axios.post(`${API_URL}/FileModel/CreateFileModel?contentId=${creatingFileModel.get("contentId")}`, creatingFileModel, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }

    static async deleteFileModel(fileModelId) {
        const response = await axios.post(`${API_URL}/FileModel/DeleteFileModel?id=${fileModelId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
    
    static async deleteFileOnServer(fileModelId) {
        const response = await axios.post(`${API_URL}/FileModel/DeleteFileOnServer?id=${fileModelId}`, null, {
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        }).catch((error) => {
            return error.response
        })
        return response;
    }
}