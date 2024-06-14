import {ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {DialogList} from "../ManualPages/ConversationsPage/DialogList/DialogList";

export function ConversationsLayout(): ReactElement {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <div style={{ width: '300px', border: '1px solid black', overflowY: 'auto' }}>
                <DialogList />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                <Outlet />
            </div>
        </div>
    );
}