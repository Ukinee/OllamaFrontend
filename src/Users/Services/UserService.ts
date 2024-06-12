import {AxiosInstance} from "axios";
import {UserRequest} from "../Models/UserRequest";
import {UserData} from "../Models/UserModel";

export class UserService {

    private _apiClient: AxiosInstance;

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }


    public CheckLogin(user: UserData): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._apiClient.defaults.headers.common['Authorization'] = `Bearer ${user.Token}`;

            this._apiClient.get('User/CheckLogin')
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    
                    console.log(error);
                    
                    if (error.response?.status === 401) {
                        resolve(false);
                    } else {
                        reject(error);
                    }
                });
        });
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

        const user: UserRequest = new UserRequest(username, password);

        try {
            const response = await this._apiClient.post<UserData>('User/Authorize', user);

            return response.data;
        } catch (error) {
            console.error("Error logging in user:\n", error);

            throw error;
        }
    }
}