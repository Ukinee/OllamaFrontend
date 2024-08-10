import {UUID} from "node:crypto";
import {UserResponse} from "./UserResponse";

export class UserData {
   
    constructor(userResponse: UserResponse) {
        this.UserName = userResponse.userName;
        this.Id = userResponse.id;
        this.Token = userResponse.token;
        this.PersonasIds = userResponse.personasIds;
        
        this.CurrentPersonaId = this.PersonasIds[0];
    }
    
    public UserName:string;
    public Id:string;
    public Token:string;
    public PersonasIds:UUID[];
    
    public CurrentPersonaId : UUID;
}