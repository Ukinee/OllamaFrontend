import {AxiosInstance} from "axios";
import {dataStorage} from "../../Users/UserData/Providers/DataStorage";
import {GeneralConversationResponse} from "../Models/GeneralConversationResponse";

export class DialogService {
    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }

    public async GetDialogs(): Promise<GeneralConversationResponse[]> {
        
        const response = 
            await this._apiClient.get<GeneralConversationResponse[]>('Conversations/GetGeneralConversations');
        
        return response.data;
    }
}