import {SessionConversationDataProvider} from "../Implementations/SessionConversationDataProvider";
import {IConversationDataProvider} from "../Interfaces/IConversationDataProvider";

export const conversationDataProvider : IConversationDataProvider = new SessionConversationDataProvider(); 