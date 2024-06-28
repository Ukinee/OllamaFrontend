import {AxiosInstance} from "axios";
import {UserData} from "../Models/Users/Models/UserModel";
import {UserRequest} from "../Models/Users/Models/UserRequest";

export class UnauthorisedEndpointService {

    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }

    public async CheckLogin(token: string): Promise<boolean> {
        this._apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await this._apiClient.get('User/CheckLogin');

        return true;
    }
    
    public async Register(userRequest : UserRequest) : Promise<UserData> {
        const response = await this._apiClient.post('User/Register', userRequest);
        
        const {_, id, token, _1} = await response.data;
        
        return new UserData(id, token);
    }

    public async LoginUser(userRequest : UserRequest): Promise<UserData> {
        const response = await this._apiClient.post('User/Login', userRequest);
        
        const {_, id, token, _1} = await response.data;
        
        return new UserData(id, token);
    }
}
