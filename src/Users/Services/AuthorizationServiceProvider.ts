import {AuthorizationService} from "./AuthorizationService";
import {dataStorage} from "../UserData/Providers/DataStorage";
import {UserService} from "./UserService";
import {CreateApiClient} from "../../api/AxiosClient";

export const authorizationService = new AuthorizationService(dataStorage, new UserService(CreateApiClient()));