import axios, {AxiosInstance} from 'axios';
import Config from '../Config/config';
import {IUserDataStorage} from "../Users/UserData/Interfaces/IUserDataStorage";

export const CreateAuthorisedApiClient = (userDataStorage: IUserDataStorage): AxiosInstance => {

    if (userDataStorage.HasUserData() === false) {
        throw new Error('User data not set during api client creation');
    }

    return axios.create({
        baseURL: Config.BaseUrl,
        timeout: Config.TimeoutMilliseconds,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDataStorage.UserData.Token}`
        }
    });
};
