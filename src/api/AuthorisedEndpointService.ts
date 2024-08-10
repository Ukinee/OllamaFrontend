import {AxiosInstance} from "axios";
import {PutConversationRequest} from "../Models/Dialogs/Models/PutConversationRequest";
import {GeneralConversationResponse} from "../Models/Dialogs/Models/GeneralConversationResponse";
import {ConcreteConversationResponse} from "../Models/Dialogs/Models/ConcreteConversationResponse";
import {PostConversationRequest} from "../Models/Dialogs/Models/PostConversationRequest";
import {PostMessageRequest} from "../Models/Messages/Models/PostMessageRequest";
import {MessageResponse} from "../Models/Messages/Models/MessageResponse";
import {PersonasResponse} from "../Models/Personas/Models/PersonasResponse";
import {PostPersonaRequest} from "../Models/Personas/Models/PostPersonaRequest";
import {PersonaResponse} from "../Models/Personas/Models/PersonaResponse";
import {PutPersonaRequest} from "../Models/Personas/Models/PutPersonaRequest";
import {UUID} from "node:crypto";
import {userDataProvider} from "../Models/Users/UserData/Providers/UserDataProvider";

export class AuthorisedEndpointService {

    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }
    
    // Conversations

    public async GetConversations(personaId: UUID): Promise<GeneralConversationResponse[]> {
        const response =
            await this._apiClient.get<GeneralConversationResponse[]>(`Conversations/GetGeneralConversations/${personaId}`);

        return response.data;
    }

    public async GetConcreteConversation(id: string, page: number): Promise<ConcreteConversationResponse> {
        const response = await this._apiClient.get<ConcreteConversationResponse>(`Conversation/${id}/messages/page/${page}`);
        
        return response.data;
    }
    
    public async PostConversation(payload: PostConversationRequest): Promise<GeneralConversationResponse> {
        const response =
            await this._apiClient.post<GeneralConversationResponse>('Conversation', payload);

        return response.data;
    }

    public async PutConversation(payload: PutConversationRequest) : Promise<GeneralConversationResponse> {
        const response = 
            await this._apiClient.put<GeneralConversationResponse>(`Conversation`, payload);

        return response.data;
    }
    
    // Messages

    public async PostMessage(payload : PostMessageRequest) : Promise<MessageResponse> {
        const response =
            await this._apiClient.post<MessageResponse>('Message', payload);

        return response.data;
    }
    
    public async DeleteMessage(messageId: string) {
        await this._apiClient.delete(`Message/DeleteMessage/${messageId}`);
    }
    
    // Personas
    
    public async GetPersonas() {
        let userId = userDataProvider.UserData.Id;
        
        const response = await this._apiClient.get<PersonasResponse>(`Personas/${userId}`);
        
        return response.data;
    }
    
    public async PostPersona(payload: PostPersonaRequest) {
        const response = await this._apiClient.post<PersonaResponse>('Persona', payload);
        
        return response.data;
    }
    
    public async PutPersona(payload: PutPersonaRequest) {
        const response = await this._apiClient.put<PersonaResponse>('Persona', payload);
        
        return response.data;
    }
    
    public async DeletePersona(personaId: string) {
        await this._apiClient.delete(`Persona/${personaId}`);
    } 
}
