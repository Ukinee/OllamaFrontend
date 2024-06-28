import {PersonaResponse} from "./PersonaResponse";

export class PersonasResponse{
    public personas: PersonaResponse[] = [];
    
    constructor(personas: PersonaResponse[]){
        this.personas = personas;
    }
}