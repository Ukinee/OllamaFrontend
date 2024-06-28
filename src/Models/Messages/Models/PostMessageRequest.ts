export class PostMessageRequest{
    public readonly conversationId : string;
    
    public readonly personaId: string;
    public readonly content: string;
    public readonly images: string[];
    
    public constructor(conversationId: string, personaId: string, content: string, images: string[]) {
        this.conversationId = conversationId;
        this.personaId = personaId;
        this.content = content;
        this.images = images;
    }
}