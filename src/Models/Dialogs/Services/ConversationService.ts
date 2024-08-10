import {AxiosInstance} from "axios";
import {GeneralConversationResponse} from "../Models/GeneralConversationResponse";
import {PostConversationRequest} from "../Models/PostConversationRequest";
import {PutConversationRequest} from "../Models/PutConversationRequest";
import {AuthorisedEndpointService} from "../../../api/AuthorisedEndpointService";
import {CreateAuthorisedApiClient} from "../../../api/AuthorisedAxiosClient";
import {userDataProvider} from "../../Users/UserData/Providers/UserDataProvider";
import {UUID} from "node:crypto";
import ConversationModel from "../Models/ConversationModel";
import {MessageModel} from "../../Messages/Models/MessageModel";

export class ConversationService {
    private _endpointService: AuthorisedEndpointService;

    constructor() {
        const apiClient: AxiosInstance = CreateAuthorisedApiClient(userDataProvider);

        this._endpointService = new AuthorisedEndpointService(apiClient);
    }

    public async CreateConversation(): Promise<GeneralConversationResponse> {
        let personaId : UUID = userDataProvider.UserData.CurrentPersonaId;
        const payload = new PostConversationRequest(`new dialog`, ``, personaId);

        const response = await this._endpointService.PostConversation(payload);

        return response;
    }

    public async GetConcreteConversation(id: string, page: number): Promise<ConversationModel> {
        const response = await this._endpointService.GetConcreteConversation(id, page);
        
        let messages : MessageModel[] = response.messages.map(x => 
            new MessageModel(x.timestamp, x.id, x.personaId, x.content));

        return new ConversationModel(response.id, response.name, response.context, messages, response.personasId);
    }

    public async GetConversations(): Promise<GeneralConversationResponse[]> {
        
        let personaId : UUID = userDataProvider.UserData.CurrentPersonaId;

        const response = await this._endpointService.GetConversations(personaId);

        return response;
    }

    public async UpdateConversation(payload: PutConversationRequest)
        : Promise<GeneralConversationResponse> {
        const response = await this._endpointService.PutConversation(payload);

        return response;
    }
}