import axios, {AxiosInstance} from 'axios';
import Config from '../Config/config';
import {IUserDataProvider} from "../Models/Users/UserData/Interfaces/IUserDataProvider";

export const CreateAuthorisedApiClient = (userDataStorage: IUserDataProvider): AxiosInstance => {

    if (userDataStorage.HasUserData() === false) {
        throw new Error('User data not set during api client creation');
    }

    return axios.create({
        baseURL: Config.BaseUrl,
        timeout: Config.TimeoutMilliseconds,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            'Authorization': `Bearer ${userDataStorage.UserData.Token}`
        }
    });
};
