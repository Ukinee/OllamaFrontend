import {AuthorizationService} from "./AuthorizationService";
import {userDataProvider} from "../UserData/Providers/UserDataProvider";
import {UserService} from "./UserService";
import {CreateApiClient} from "../../../api/AxiosClient";

export const authorizationService = new AuthorizationService(userDataProvider, new UserService());