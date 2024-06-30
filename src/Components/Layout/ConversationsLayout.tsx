import {ReactElement, useState} from "react";
import {Outlet} from "react-router-dom";
import {DialogList} from "../ManualPages/ConversationsPage/LeftPanel/DialogList/DialogList";
import {CreateDialogButton} from "../ManualPages/ConversationsPage/LeftPanel/CreateDialogButton/CreateDialogButton";

export function ConversationsLayout(): ReactElement {
    const [update, setUpdate] = useState(false);

    const refreshDialogs = () => setUpdate(update == false);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <div style={{ width: '300px', border: '1px solid black', overflowY: 'auto' }}>
                <CreateDialogButton refreshDialogs={refreshDialogs} />
                <DialogList refreshDialogs={refreshDialogs} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                <Outlet />
            </div>
        </div>
    );
}