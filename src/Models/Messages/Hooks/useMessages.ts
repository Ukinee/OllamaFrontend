import {useState, useEffect, useCallback} from 'react';
import {MessageModel} from "../Models/MessageModel";
import {UseConversation} from "../../../api/Hooks/useConversation";

export function useMessages(conversationId: string, refreshDialogs: () => void) {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const {loading, conversation} = UseConversation(conversationId, page, refreshDialogs);

    function fetchMessages() {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        if (loading || conversation === null){
            console.log( "Loading messages..." );
            return;
        }
        
        if (conversation.Messages.length === messages.length) {
            console.log( "No more messages" );
            setHasMore(false);
            return;
        }

        console.log(conversation.Messages)
        
        setMessages(conversation.Messages.sort((a, b) => 
            new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()));

    }, [page, conversationId, loading, conversation]);

    return {
        messages,
        fetchMessages,
        hasMore,
        loading
    };
}
