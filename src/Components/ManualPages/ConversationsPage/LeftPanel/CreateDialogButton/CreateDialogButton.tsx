import {ReactElement, useEffect, useState} from "react";
import {CreateAuthorisedApiClient} from "../../../../../api/AuthorisedAxiosClient";
import {dataStorage} from "../../../../../Models/Users/UserData/Providers/DataStorage";
import {ConversationService} from "../../../../../Models/Dialogs/Services/ConversationService";

export function CreateDialogButton({refreshDialogs}: { refreshDialogs: () => void; }): ReactElement {

    const [isAvailable, setAvailable] = useState(true);

    const onButtonClick = async () => {
        if (isAvailable == false)
            return;

        setAvailable(false);

        const dialogService: ConversationService = new ConversationService();

        await dialogService.CreateConversation();

        refreshDialogs();

        setAvailable(true);
    }

    return (
        <div>
            <button onClick={onButtonClick} disabled={isAvailable == false}>
                Create Dialog
            </button>
        </div>
    )
} 