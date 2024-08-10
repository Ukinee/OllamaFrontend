import {UserData} from "../../Models/UserModel";
import {IUserDataProvider} from "../Interfaces/IUserDataProvider";
import {UUID} from "node:crypto";

export class LocalUserDataStorage implements IUserDataProvider {

    private userData: UserData | null = null;

    get UserData(): UserData {

        if (this.userData != null) {
            return this.userData;
        }

        const userData: string | null = localStorage.getItem('userData');

        if (userData == null) {
            throw new Error('User data not set');
        }

        this.userData = JSON.parse(userData);

        if (this.userData == null) {
            throw new Error('User data not valid');
        }

        return this.userData!;
    }

    set UserData(value: UserData) {
        localStorage.setItem('userData', JSON.stringify(value));
    }

    UpdateCurrentPersona(id: UUID): void {
        if (id === undefined) {
            throw new Error('Id not set');
        }
        
        if (id === this.UserData.CurrentPersonaId) {
            return;
        }

        this.UserData.CurrentPersonaId = id;
        this.UserData = this.UserData;
    }

    HasUserData(): boolean {
        return localStorage.getItem('userData') != null;
    }

    Clear(): void {
        localStorage.removeItem('userData');
    }
}