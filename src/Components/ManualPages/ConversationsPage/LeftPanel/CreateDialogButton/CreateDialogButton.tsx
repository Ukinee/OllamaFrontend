import {ReactElement, useEffect, useState} from "react";
import {CreateAuthorisedApiClient} from "../../../../../api/AuthorisedAxiosClient";
import {userDataProvider} from "../../../../../Models/Users/UserData/Providers/UserDataProvider";
import {ConversationService} from "../../../../../Models/Dialogs/Services/ConversationService";

export function CreateDialogButton({refreshDialogs}: { refreshDialogs: () => void; }): ReactElement {

    const [isAvailable, setAvailable] = useState(true);

    function onClick() {
        onButtonClickAsync();

        async function onButtonClickAsync() {
            if (isAvailable == false)
                return;

            setAvailable(false);

            const dialogService: ConversationService = new ConversationService();
            await dialogService.CreateConversation();

            refreshDialogs();

            setAvailable(true);
        }
    }


    return (
        <div>
            <button onClick={onClick} disabled={isAvailable == false}>
                Create Dialog
            </button>
        </div>
    )
} 