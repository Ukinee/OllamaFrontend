import {UserData} from "../../Models/UserModel";

export interface IUserDataStorage{
    get UserData(): UserData;
    set UserData(value: UserData);
    HasUserData(): boolean;
    Clear() : void;
}