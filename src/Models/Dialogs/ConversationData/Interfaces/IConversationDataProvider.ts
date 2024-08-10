import ConversationModel from "../../Models/ConversationModel";

export interface IConversationDataProvider{
    Get(id: string): Promise<ConversationModel>;
    GetPage(id: string, page: number): Promise<ConversationModel>;
    GetByPersonId(id: string): Promise<ConversationModel[]>;
    Update(id: string) : Promise<ConversationModel>;
    GetAll(): Promise<ConversationModel[]>;
}