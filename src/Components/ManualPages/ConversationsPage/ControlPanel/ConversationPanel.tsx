import {ReactElement, useEffect, useState} from "react";
import {ConversationService} from "../../../../Models/Dialogs/Services/ConversationService";
import {PutConversationRequest} from "../../../../Models/Dialogs/Models/PutConversationRequest";
import ConversationModel from "../../../../Models/Dialogs/Models/ConversationModel";

export function ConversationPanel({ conversationData }: { conversationData: ConversationModel }): ReactElement {
    const [name, setName] = useState(conversationData.Name);
    const [globalContext, setGlobalContext] = useState(conversationData.GlobalContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(conversationData.Name);
        setGlobalContext(conversationData.GlobalContext);
    }, [conversationData]);

    const handleUpdate = async () => {
        const dialogService = new ConversationService();

        try {
            setLoading(true);

            const updateRequest = new PutConversationRequest(conversationData.Id, name, globalContext || '');
            const response = await dialogService.UpdateConversation(updateRequest);

            setName(response.name);
            setGlobalContext(response.context);
        } catch (error) {
            console.error(error);
            setName(conversationData.Name);
            setGlobalContext(conversationData.GlobalContext);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Conversation Panel</h1>

            <p>Name</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <p>Global Context</p>
            <textarea value={globalContext} onChange={(e) => setGlobalContext(e.target.value)} />

            <button disabled={loading} onClick={handleUpdate}>Update data</button>
        </div>
    );
}
