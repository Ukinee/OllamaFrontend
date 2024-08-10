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
        if (!loading && conversation) {
            const loadedMessages = conversation.Messages || [];
            
            if (loadedMessages.length === 0) {
                setHasMore(false);
            } else {
                setMessages(prevMessages => {
                    const existingIds = new Set(prevMessages.map(message => message.Id));
                    const newUniqueMessages = loadedMessages.filter(message => !existingIds.has(message.Id));

                    const result = [...prevMessages, ...newUniqueMessages];


                    result.sort((a: MessageModel, b: MessageModel) =>
                        new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
                    );

                    return result;
                });
            }
        }
    }, [loading, conversation]);

    return {
        messages,
        fetchMessages,
        hasMore,
        loading
    };
}
