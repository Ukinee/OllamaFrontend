import ConversationModel from "../../Models/ConversationModel";

export interface IConversationDataProvider{
    Init() : void;
    
    Get(id: string): Promise<ConversationModel>;
    GetPage(id: string, page: number): Promise<ConversationModel>;
    GetByPersonaId(id: string): Promise<ConversationModel[]>;
    Update(id: string) : Promise<ConversationModel>;
    LoadAll(): Promise<ConversationModel[]>;
}