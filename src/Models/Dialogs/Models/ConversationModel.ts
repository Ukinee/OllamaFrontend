import {MessageModel} from "../../Messages/Models/MessageModel";

export default class ConversationModel {
    constructor(id: string, name: string, globalContext: string, messages: MessageModel[], personasIds: string[]) {
        this.PersonasIds = personasIds
        this.Messages = messages
        this.Id = id
        this.Name = name
        this.GlobalContext = globalContext
    }

    public Messages: MessageModel[]
    public PersonasIds: string[]
    public Id: string
    public Name: string
    public GlobalContext: string
}