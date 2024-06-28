import axios from 'axios';
import Config from '../Config/config';

export function CreateApiClient() {

    return axios.create({
        baseURL: Config.BaseUrl,
        timeout: Config.TimeoutMilliseconds,
        withCredentials: false,
        headers: {
            // 'Content-Type': 'application/json',
        }
    });
};
