import {ReactElement, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import ConversationModel from "../../../../../Models/Dialogs/Models/ConversationModel";
import {
    conversationDataProvider
} from "../../../../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";
import {userDataProvider} from "../../../../../Models/Users/UserData/Providers/UserDataProvider";
import {UUID} from "node:crypto";

export function DialogList({refreshDialogs}: { refreshDialogs: () => void }): ReactElement {
    const [conversationModels, setConversationModels] = useState<ConversationModel[]>([])

    const isRefreshing = useRef(false);
    
    useEffect(() => {
        RefreshDialogs();

        async function RefreshDialogs() {
            if (isRefreshing.current) {
                return;
            }

            isRefreshing.current = true;
            
            let currentPersonaId: UUID = userDataProvider.UserData.CurrentPersonaId;
            let conversationModels = await conversationDataProvider.GetByPersonaId(currentPersonaId);
            console.log(conversationModels)
            setConversationModels(conversationModels);
            
            isRefreshing.current = false;
        }
    }, [refreshDialogs]);

    return (
        <div>
            <h1>Dialog List</h1>
            <ul>
                {
                    conversationModels.map((dialog) => (
                        <div key={dialog.Id}>
                            <br/>
                            <Link to={`/conversations/${dialog.Id}`}>{dialog.Name}</Link>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}