import {AxiosInstance} from "axios";
import {AuthorisedEndpointService} from "../../../api/AuthorisedEndpointService";
import {CreateAuthorisedApiClient} from "../../../api/AuthorisedAxiosClient";
import {userDataProvider} from "../../Users/UserData/Providers/UserDataProvider";
import {MessageResponse} from "../Models/MessageResponse";
import { PostMessageRequest } from "../Models/PostMessageRequest";

export class MessageService {
    private _endpointService: AuthorisedEndpointService;

    constructor() {
        const apiClient: AxiosInstance = CreateAuthorisedApiClient(userDataProvider);

        this._endpointService = new AuthorisedEndpointService(apiClient);
    }

    public async PostMessage(conversationId: string, content: string, images: string[]) 
        : Promise<MessageResponse> {

        let personaId : string = userDataProvider.UserData.CurrentPersonaId
        const payload = new PostMessageRequest(conversationId, personaId, content, images);

        const response = await this._endpointService.PostMessage(payload);
        
        return response;
    }
    
    public async DeleteMessage(messageId: string) {
        await this._endpointService.DeleteMessage(messageId);
    }
}