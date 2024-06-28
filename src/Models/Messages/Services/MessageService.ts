import {AxiosInstance} from "axios";

export class MessageService {
    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }
}