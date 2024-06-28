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

export class AuthorisedEndpointService {

    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }
    
    // Conversations

    public async GetConversations(): Promise<GeneralConversationResponse[]> {
        const response =
            await this._apiClient.get('Conversations/GetGeneralConversations');

        return response.data.map((element: any) =>
            new GeneralConversationResponse(element.id, element.name, element.context));
    }

    public async GetConcreteConversation(id: string): Promise<ConcreteConversationResponse> {
        const response =
            await this._apiClient.get<ConcreteConversationResponse>(`Conversation/${id}`);

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
            await this._apiClient.post<MessageResponse>('Message/PostMessage', payload);

        return response.data;
    }
    
    public async DeleteMessage(messageId: string) {
        await this._apiClient.delete(`Message/DeleteMessage/${messageId}`);
    }
    
    // Personas
    
    public async GetPersonas() {
        const response = await this._apiClient.get<PersonasResponse>('Personas');
        
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
