import {MessageResponse} from "../../Messages/Models/MessageResponse";

export class ConcreteConversationResponse{
    public constructor(id: string, name: string, context: string, messages: MessageResponse[]) {
        this.id = id;
        this.name = name;
        this.globalContext = context;
        this.messages = messages;
    }
    
    public readonly id: string
    public readonly name: string
    public readonly globalContext: string
    public readonly messages: MessageResponse[]
}