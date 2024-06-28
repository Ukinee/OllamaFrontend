export class PutPersonaRequest{
    public id: string;
    public name: string;
    public role: string;
    public description: string;

    constructor(id: string, name: string, role: string, description: string){
        this.id = id;
        this.name = name;
        this.role = role;
        this.description = description;
    }
}