export class MessageResponse {
    
    public constructor(timestamp: Date, id: string, personaId: string, content: string) {
        this.timestamp = timestamp
        this.id = id
        this.personaId = personaId
        this.content = content
    }
    
    public timestamp : Date
    public id : string 
    public personaId : string 
    public content : string
}