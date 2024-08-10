export class PutConversationRequest {
    public constructor(
        id: string,
        name: string,
        context: string
    ) {
        this.id = id;
        this.context = context;
        this.name = name;
    }

    public readonly name: string;
    public readonly context: string;
    public readonly id: string;
}