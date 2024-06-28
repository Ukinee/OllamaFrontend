import {ReactElement, useState} from "react";
import {ConcreteConversationResponse} from "../../../../Models/Dialogs/Models/ConcreteConversationResponse";
import {CreateAuthorisedApiClient} from "../../../../api/AuthorisedAxiosClient";
import {dataStorage} from "../../../../Models/Users/UserData/Providers/DataStorage";
import {ConversationService} from "../../../../Models/Dialogs/Services/ConversationService";
import {PutConversationRequest} from "../../../../Models/Dialogs/Models/PutConversationRequest";

export function ControlPanel({conversationData}: { conversationData: ConcreteConversationResponse }): ReactElement {

    const [name, setName] = useState(conversationData.name);
    const [globalContext, setGlobalContext] = useState(conversationData.globalContext);

    return (
        <div>
            <h1>Control Panel</h1>

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

            <button onClick={() => OnButtonClick(name, globalContext, conversationData, setName, setGlobalContext)}>
                Update data
            </button>
        </div>
    );
}

async function OnButtonClick(name: string, context: string, conversationData: ConcreteConversationResponse, setName: any, setGlobalContext: any) {
    const axios = CreateAuthorisedApiClient(dataStorage);
    const dialogService: ConversationService = new ConversationService(axios);

    try {
        if (context === null || context === undefined)
            context = "";
        
        let updateRequest = new PutConversationRequest(conversationData.id, name, context);
        let response = await dialogService.UpdateConversation(updateRequest);

        setName(response.Name);
        setGlobalContext(response.Context);
    } catch (ex) {
        console.error(ex);

        setName(conversationData.name);
        setGlobalContext(conversationData.globalContext);
    }
}