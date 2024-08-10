import {IUserDataProvider} from "../Interfaces/IUserDataProvider";
import {UserData} from "../../Models/UserModel";
import {UUID} from "node:crypto";

export class SessionUserDataStorage implements IUserDataProvider {
    private _userData? : UserData;

    get UserData(): UserData {
        if (this._userData == null) {
            throw new Error('User data not set');
        }

        return this._userData;
    }
    
    UpdateCurrentPersona(id: UUID) {
        
    }

    set UserData(value: UserData) {
        this._userData = value;
    }

    HasUserData = (): boolean => this._userData != undefined;
    
    Clear = (): void => this._userData = undefined;
}