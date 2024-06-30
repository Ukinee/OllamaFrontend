export class GeneralConversationResponse {
    
    public constructor(id: string, name: string, context: string) {
        this.id = id;
        this.name = name;
        this.context = context;
    }
    
    public readonly id: string;
    public readonly name: string;
    public readonly context: string;
}