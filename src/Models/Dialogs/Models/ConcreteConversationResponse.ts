import {MessageResponse} from "../../Messages/Models/MessageResponse";

export class ConcreteConversationResponse{
    public constructor(id: string, name: string, context: string, messages: MessageResponse[], personasId: string[]) {
        this.id = id;
        this.personasId = personasId;
        this.name = name;
        this.context = context;
        this.messages = messages;
    }
    
    public readonly id: string
    public readonly name: string
    public readonly context: string
    public readonly messages: MessageResponse[]
    public readonly personasId: string[]
}