import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorizationService } from "../../Models/Users/Services/AuthorizationServiceProvider";
import ConversationModel from "../../Models/Dialogs/Models/ConversationModel";
import {conversationDataProvider} from "../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";

export function UseConversation(conversationId: string | undefined, currentPage : number, refreshDialogs: () => void ) {
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<ConversationModel | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchConversation(validConversationId: string, page: number) {
            setLoading(true);

            if (!(await authorizationService.TryAuthorize())) {
                navigate('/auth/login');
                return;
            }

            const conversation = await conversationDataProvider.GetPage(validConversationId, page);
            setConversation(conversation);
            setLoading(false);
        }

        if (conversationId === undefined) {
            return;
        }

        fetchConversation(conversationId, currentPage);
    }, [conversationId, currentPage, navigate, refreshDialogs]);

    return { loading, conversation };
}
