export class GeneralConversationResponse {
    
    public constructor(id: string, name: string, context: string) {
        this.Id = id;
        this.Name = name;
        this.Context = context;
    }
    
    public readonly Id: string;
    public readonly Name: string;
    public readonly Context: string;
}