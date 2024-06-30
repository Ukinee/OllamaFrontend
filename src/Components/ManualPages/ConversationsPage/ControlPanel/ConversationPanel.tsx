import {ReactElement, useState} from "react";
import {ConcreteConversationResponse} from "../../../../Models/Dialogs/Models/ConcreteConversationResponse";
import {ConversationService} from "../../../../Models/Dialogs/Services/ConversationService";
import {PutConversationRequest} from "../../../../Models/Dialogs/Models/PutConversationRequest";

export function ConversationPanel({conversationData}: { conversationData: ConcreteConversationResponse }): ReactElement {
    const [name, setName] = useState(conversationData.name);
    const [globalContext, setGlobalContext] = useState(conversationData.globalContext);
    const [loading, setLoading] = useState(false);
    
    return (
        <div>
            <h1>Conversation Panel</h1>

            <p>Name</p>
            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }/>

            <p>Global Context</p>
            <textarea
                value={globalContext}
                onChange={(e) =>
                    setGlobalContext(e.target.value)
                }/>

            <button disabled={loading} onClick={() => OnButtonClick(name, globalContext, conversationData, setName, setGlobalContext, setLoading)}>
                Update data
            </button>
        </div>
    );
}

async function OnButtonClick(name: string, context: string, conversationData: ConcreteConversationResponse, setName: any, setGlobalContext: any, setLoading: any) {
    const dialogService: ConversationService = new ConversationService();

    try {
        if (context === null || context === undefined)
            context = "";

        setLoading(true);
        
        let updateRequest = new PutConversationRequest(conversationData.id, name, context);
        let response = await dialogService.UpdateConversation(updateRequest);

        setName(response.name);
        setGlobalContext(response.context);
        
        setLoading(false);
    } catch (ex) {
        console.error(ex);

        setName(conversationData.name);
        setGlobalContext(conversationData.globalContext);
        setLoading(false);
    }
}