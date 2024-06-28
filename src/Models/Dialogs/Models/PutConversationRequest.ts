export class PutConversationRequest {
    public constructor(
        id: string,
        name: string,
        context: string
    ) {
        this.id = id;
        this.globalContext = context;
        this.name = name;
    }

    public readonly name: string;
    public readonly globalContext: string;
    public readonly id: string;
}