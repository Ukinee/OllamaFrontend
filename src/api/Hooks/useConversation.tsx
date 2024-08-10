import { useState, useEffect } from 'react';
import ConversationModel from "../../Models/Dialogs/Models/ConversationModel";
import {conversationDataProvider} from "../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";

export function UseConversation(conversationId: string | undefined, currentPage : number, refreshDialogs: () => void) {
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<ConversationModel | null>(null);

    useEffect(() => {
        async function fetchConversation(validConversationId: string, page: number) {
            setLoading(true);

            const conversation = await conversationDataProvider.GetPage(validConversationId, page);
            setConversation(conversation);
            
            setLoading(false);
        }

        if (conversationId === undefined) {
            return;
        }

        fetchConversation(conversationId, currentPage);
    }, [conversationId, currentPage, refreshDialogs]);

    return { loading, conversation };
}
