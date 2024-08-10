import {IUserDataProvider} from "../UserData/Interfaces/IUserDataProvider";
import {UserService} from "./UserService";
import {ReactElement} from "react";

export class AuthorizationService {

    private readonly _userDataStorage: IUserDataProvider;
    private readonly _userService: UserService;
    private _isAuthorized: boolean = false;

    constructor(userDataStorage: IUserDataProvider, userService: UserService) {
        this._userDataStorage = userDataStorage;
        this._userService = userService;
    }

    public IsAuthorized(): boolean {
        return this._isAuthorized;
    }

    public async TryAuthorize(): Promise<boolean> {

        if (this._isAuthorized) {
            return true;
        }

        const dataStorage: IUserDataProvider = this._userDataStorage;
        const userService: UserService = this._userService;

        if (dataStorage.HasUserData()) {
            console.log("Checking login...");
            
            this._isAuthorized = await userService.CheckLogin(dataStorage.UserData)
            
            console.log("Authorized: ", this._isAuthorized);
            
            return this._isAuthorized;
        }

        return false;
    }
}