import axios, {AxiosInstance} from 'axios';
import Config from '../Config/config';
import {IUserDataStorage} from "../Users/UserData/Interfaces/IUserDataStorage";

export function CreateApiClient() {

    return axios.create({
        baseURL: Config.BaseUrl,
        timeout: Config.TimeoutMilliseconds,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
