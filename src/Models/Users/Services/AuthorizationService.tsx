import {IUserDataStorage} from "../UserData/Interfaces/IUserDataStorage";
import {UserService} from "./UserService";
import {ReactElement} from "react";

export class AuthorizationService {

    private readonly _userDataStorage: IUserDataStorage;
    private readonly _userService: UserService;
    private _isAuthorized: boolean = false;

    constructor(userDataStorage: IUserDataStorage, userService: UserService) {
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

        const dataStorage: IUserDataStorage = this._userDataStorage;
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