import {UserData} from "../../Models/UserModel";
import {UUID} from "node:crypto";

export interface IUserDataProvider {
    get UserData(): UserData;
    set UserData(value: UserData);
    UpdateCurrentPersona(id: UUID): void;
    HasUserData(): boolean;
    Clear() : void;
}