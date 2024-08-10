import {UUID} from "node:crypto";

export class UserResponse{
    public id: string;
    public userName: string;
    public token: string;
    public personasIds: UUID[];
    
    constructor(id: string, userName: string, token: string, personasIds: UUID[]) {
        this.id = id;
        this.userName = userName;
        this.token = token;
        this.personasIds = personasIds;
    }
}