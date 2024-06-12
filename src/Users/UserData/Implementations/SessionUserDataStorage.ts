import {IUserDataStorage} from "../Interfaces/IUserDataStorage";
import {UserData} from "../../Models/UserModel";

export class SessionUserDataStorage implements IUserDataStorage {
    private _userData? : UserData;

    get UserData(): UserData {
        if (this._userData == null) {
            throw new Error('User data not set');
        }

        return this._userData;
    }

    set UserData(value: UserData) {
        this._userData = value;
    }

    HasUserData = (): boolean => this._userData != null;
}