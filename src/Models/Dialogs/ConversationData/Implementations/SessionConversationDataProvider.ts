import {IConversationDataProvider} from "../Interfaces/IConversationDataProvider";
import ConversationModel from "../../Models/ConversationModel";
import {ConversationService} from "../../Services/ConversationService";

export class SessionConversationDataProvider implements IConversationDataProvider {

    private conversationService: ConversationService | null = null;
    private _conversations: ConversationModel[] = [];
    private _loadingConversations: Map<string, Promise<ConversationModel>> = new Map();

    public Init(): void {
        this.conversationService = new ConversationService();
    }

    public async GetPage(id: string, page: number): Promise<ConversationModel> {
        let conversation = this._conversations.find(x => x.Id === id);
        
        if (conversation === undefined) {
            if (!this._loadingConversations.has(id)) {
                const loadingPromise = this.conversationService!.GetConcreteConversation(id, page)
                    .then(conv => {
                        this._conversations.push(conv);
                        this._loadingConversations.delete(id);
                        return conv;
                    });
                
                this._loadingConversations.set(id, loadingPromise);
            }
            
            conversation = await this._loadingConversations.get(id);
        }
        
        return conversation!;
    }

    public async Get(id: string): Promise<ConversationModel> {
        return this.GetPage(id, 1);
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