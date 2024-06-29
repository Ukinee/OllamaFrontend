import {AxiosInstance} from "axios";
import {GeneralConversationResponse} from "../Models/GeneralConversationResponse";
import {PostConversationRequest} from "../Models/PostConversationRequest";
import {ConcreteConversationResponse} from "../Models/ConcreteConversationResponse";
import {PutConversationRequest} from "../Models/PutConversationRequest";
import {AuthorisedEndpointService} from "../../../api/AuthorisedEndpointService";
import {CreateAuthorisedApiClient} from "../../../api/AuthorisedAxiosClient";
import {dataStorage} from "../../Users/UserData/Providers/DataStorage";

export class ConversationService {
    private _endpointService: AuthorisedEndpointService;

    constructor() {
        const apiClient: AxiosInstance = CreateAuthorisedApiClient(dataStorage);

        this._endpointService = new AuthorisedEndpointService(apiClient);
    }

    public async CreateConversation(): Promise<GeneralConversationResponse> {

        const payload = new PostConversationRequest(`new dialog`, ``);

        const response = await this._endpointService.PostConversation(payload);

        return response;
    }

    public async GetConcreteConversation(id: string): Promise<ConcreteConversationResponse> {
        const response = await this._endpointService.GetConcreteConversation(id);

        return response;
    }

    public async GetConversations(): Promise<GeneralConversationResponse[]> {
        const response = await this._endpointService.GetConversations();

        return response;
    }

    public async UpdateConversation(payload: PutConversationRequest)
        : Promise<GeneralConversationResponse> {
        const response = await this._endpointService.PutConversation(payload);

        return response;
    }
}