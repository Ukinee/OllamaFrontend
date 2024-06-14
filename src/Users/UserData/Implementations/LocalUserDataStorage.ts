import {UserData} from "../../Models/UserModel";
import {IUserDataStorage} from "../Interfaces/IUserDataStorage";

export class LocalUserDataStorage implements IUserDataStorage {
    get UserData(): UserData {
        const userData: string | null = localStorage.getItem('userData');

        if (userData == null) {
            throw new Error('User data not set');
        }

        return JSON.parse(userData);
    }

    set UserData(value: UserData) {
        localStorage.setItem('userData', JSON.stringify(value));
    }

    HasUserData(): boolean {
        return localStorage.getItem('userData') != null;
    }

    Clear(): void {
        localStorage.removeItem('userData');
    }
}