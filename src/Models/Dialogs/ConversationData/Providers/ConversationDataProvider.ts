import {SessionConversationDataProvider} from "../Implementations/SessionConversationDataProvider";
import {IConversationDataProvider} from "../Interfaces/IConversationDataProvider";

export let conversationDataProvider : IConversationDataProvider  = new SessionConversationDataProvider(); 