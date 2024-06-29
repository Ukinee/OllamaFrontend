import {AxiosInstance, AxiosResponse} from "axios";
import {UserRequest} from "../Models/UserRequest";
import {UserData} from "../Models/UserModel";
import {CreateApiClient} from "../../../api/AxiosClient";
import {UnauthorisedEndpointService} from "../../../api/UnauthorisedEndpointService";

export class UserService {

    private _endpointService: UnauthorisedEndpointService;

    constructor() {
        const apiClient = CreateApiClient();

        this._endpointService = new UnauthorisedEndpointService(apiClient);
    }

    public async CheckLogin(user: UserData): Promise<boolean> {

        try {
            return await this._endpointService.CheckLogin(user.Token);;
            // @ts-ignore
        } catch (error: AxiosResponse<any, any>) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);

            return false;
        }
    }


    public async RegisterUser(username: string, password: string): Promise<UserData> {

        const user: UserRequest = new UserRequest(username, password);


        try {
            const response = await this._endpointService.Register(user);

            return response;
        } catch (error) {
            console.error("Error registering user:\n", error);

            throw error;
        }
    }

    public async LoginUser(username: string, password: string): Promise<UserData> {
        const user: UserRequest = new UserRequest(username, password);
        
        try {
            const response = await this._endpointService.LoginUser(user);

            return response;
        } catch (error) {
            console.error("Error logging in user:\n", error);
            
            throw error;
        }
    }
}