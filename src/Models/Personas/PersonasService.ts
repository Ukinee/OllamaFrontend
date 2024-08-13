import {AuthorisedEndpointService} from "../../api/AuthorisedEndpointService";
import {AxiosInstance} from "axios";
import {CreateAuthorisedApiClient} from "../../api/AuthorisedAxiosClient";
import {userDataProvider} from "../Users/UserData/Providers/UserDataProvider";
import {PersonasResponse} from "./Models/PersonasResponse";
import {PostPersonaRequest} from "./Models/PostPersonaRequest";
import {PersonaResponse} from "./Models/PersonaResponse";
import {PutPersonaRequest} from "./Models/PutPersonaRequest";
import {UUID} from "node:crypto";

export class PersonasService {
    private _endpointService: AuthorisedEndpointService;

    constructor() {
        const apiClient: AxiosInstance = CreateAuthorisedApiClient(userDataProvider);

        this._endpointService = new AuthorisedEndpointService(apiClient);
    }

    public async GetUserPersonas(): Promise<PersonaResponse[]> {
        const response = await this._endpointService.GetUserPersonas();

        return response.personas;
    }

    public async GetConversationPersonas(conversationId: string): Promise<PersonaResponse[]> {
        const response = await this._endpointService.GetConversationPersonas(conversationId);

        return response.personas;
    }

    public async PostPersona(name: string): Promise<PersonaResponse> {

        const userId = userDataProvider.UserData.Id;
        const payload: PostPersonaRequest = new PostPersonaRequest(name, userId);

        const response = await this._endpointService.PostPersona(payload);

        return response;
    }

    public async GetPersonasByUserName(name: string): Promise<PersonaResponse[]> {
        const response = await this._endpointService.GetPersonasByUserName(name);

        return response.personas;
    }

    public async AddPersonaToConversation(conversationId: string, personaId: string): Promise<void> {
        await this._endpointService.AddPersonaToConversation(conversationId, personaId);
    }

    public async RemovePersonaFromConversation(conversationId: string, personaId: string) {
        await this._endpointService.RemovePersonaFromConversation(conversationId, personaId);
    }

    public async PutPersona(id: string, name: string, role: string, description: string): Promise<PersonaResponse> {
        const payload: PutPersonaRequest = new PutPersonaRequest(id, name, role, description);

        const response = await this._endpointService.PutPersona(payload);

        return response;
    }

    public async DeletePersona(id: string): Promise<void> {
        await this._endpointService.DeletePersona(id);
    }
} 