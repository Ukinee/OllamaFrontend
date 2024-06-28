export class PostConversationRequest {

    constructor(name: string, globalContext: string) {
        this.Name = name;
        this.GlobalContext = globalContext;
    }

    public Name: string
    public GlobalContext: string
}