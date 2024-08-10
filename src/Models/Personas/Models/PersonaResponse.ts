import {UUID} from "node:crypto";

export class PersonaResponse{
    public id: UUID;
    public name: string;
    public role: string;
    public description: string;
    
    constructor(id: UUID, name: string, role: string, description: string){
        this.id = id;
        this.name = name;
        this.role = role;
        this.description = description;
    }
}