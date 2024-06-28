import {AxiosInstance} from "axios";
import {GeneralConversationResponse} from "../Models/GeneralConversationResponse";
import {PostConversationRequest} from "../Models/PostConversationRequest";
import {ConcreteConversationResponse} from "../Models/ConcreteConversationResponse";
import {PutConversationRequest} from "../Models/PutConversationRequest";

export class ConversationService {
    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }

    public async CreateConversation(): Promise<GeneralConversationResponse> {

        const payload = new PostConversationRequest(`new dialog`, ``);

        const response =
            await this._apiClient.post<GeneralConversationResponse>('Conversation', payload);

        return response.data;
    }

    public async GetConcreteConversation(id: string): Promise<ConcreteConversationResponse> {
        const response =
            await this._apiClient.get<ConcreteConversationResponse>(`Conversation/${id}`);
        
        return response.data;
    }

    public async GetConversations(): Promise<GeneralConversationResponse[]> {

        const response =
            await this._apiClient.get('Conversations/GetGeneralConversations');

        return response.data.map((element: any) =>
            new GeneralConversationResponse(element.id, element.name, element.context));
    }

    public async UpdateConversation(updateConversationRequest: PutConversationRequest)
        : Promise<GeneralConversationResponse> {
        console.log(updateConversationRequest);

        const response = await this._apiClient.put(`Conversation`, updateConversationRequest);

        return new GeneralConversationResponse(response.data.id, response.data.name, response.data.globalContext);
    }
}