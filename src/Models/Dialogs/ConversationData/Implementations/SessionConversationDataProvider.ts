import {IConversationDataProvider} from "../Interfaces/IConversationDataProvider";
import ConversationModel from "../../Models/ConversationModel";
import {ConversationService} from "../../Services/ConversationService";

export class SessionConversationDataProvider implements IConversationDataProvider {

    private conversationService: ConversationService | null = null;
    private _conversations: ConversationModel[] = [];

    public Init(): void {
        this.conversationService = new ConversationService();
    }

    public async Get(id: string): Promise<ConversationModel> {
        return this.GetPage(id, 1);
    }

    public async GetPage(id: string, page: number): Promise<ConversationModel> {
        if (this._conversations.find(x => x.Id === id) === undefined) {
            const conversation = await this.conversationService!.GetConcreteConversation(id, page);
            this._conversations.push(conversation);
        }
        return this._conversations.find(x => x.Id === id)!;
    }

    public async Update(id: string): Promise<ConversationModel> {

        this._conversations = this._conversations.filter(x => x.Id !== id);

        return this.Get(id);
    }

    public async GetByPersonaId(id: string): Promise<ConversationModel[]> {

        let result = this._conversations.filter(x =>
            x.PersonasIds.some(y => y === id));

        return result;
    }

    public async LoadAll(): Promise<ConversationModel[]> {
        if (this._conversations.length !== 0) {
            throw new Error("Conversations already loaded");
        }

        let responses = await this.conversationService!.GetConversations();

        this._conversations = await Promise.all(responses.map(response => this.Get(response.id)));

        return this._conversations;
    }
}