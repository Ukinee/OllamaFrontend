import {AxiosInstance, AxiosResponse} from "axios";
import {UserRequest} from "../Models/UserRequest";
import {UserData} from "../Models/UserModel";

export class UserService {

    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }

    public async CheckLogin(user: UserData): Promise<boolean> {

        this._apiClient.defaults.headers.common['Authorization'] = `Bearer ${user.Token}`;

        try {
            const response = await this._apiClient.get('User/CheckLogin')

            console.log("Login response:\n", response.data);
            
            return true;
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
            const response = await this._apiClient.post('User/Register', user);

            const {_, id, token, _1} = response.data;

            return new UserData(id, token);
        } catch (error) {
            console.error("Error registering user:\n", error);

            throw error;
        }
    }

    public async LoginUser(username: string, password: string): Promise<UserData> {
        try {
            const user: UserRequest = new UserRequest(username, password);
            const response = await this._apiClient.post('User/Login', user);

            const {_, id, token, _1} = response.data;

            console.log('Data:\n', response.data);

            return new UserData(id, token);
        } catch (error) {
            console.error("Error logging in user:\n", error);
            throw error;
        }
    }
}