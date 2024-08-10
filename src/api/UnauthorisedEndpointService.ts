import {AxiosInstance} from "axios";
import {UserData} from "../Models/Users/Models/UserModel";
import {UserRequest} from "../Models/Users/Models/UserRequest";
import {UserResponse} from "../Models/Users/Models/UserResponse";

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
        const response = await this._apiClient.post<UserResponse>('User/Register', userRequest);
        
        return new UserData(response.data);
    }

    public async LoginUser(userRequest : UserRequest): Promise<UserData> {
        const response = await this._apiClient.post<UserResponse>('User/Login', userRequest);

        return new UserData(response.data);
    }
}
