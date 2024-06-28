export class PostPersonaRequest{
    public name: string;
    public role: string;
    public description: string;
    
    constructor(name: string, role: string, description: string){
        this.name = name;
        this.role = role;
        this.description = description;
    }
}