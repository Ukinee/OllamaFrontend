import {ReactElement, useState} from "react";
import {Outlet} from "react-router-dom";
import {DialogList} from "../ManualPages/ConversationsPage/LeftPanel/DialogList/DialogList";
import {CreateDialogButton} from "../ManualPages/ConversationsPage/LeftPanel/CreateDialogButton/CreateDialogButton";
import {PersonaPanel} from "../ManualPages/ConversationsPage/ControlPanel/PersonaPanel";

export function ConversationsLayout({ refreshDialogs }: { refreshDialogs: () => void }): ReactElement {
    return (
        <div style={{flexDirection: 'row', display: 'flex', flex: 1}}>
            <div style={{flexDirection: 'column', width: '300px'}}>
                <div style={{border: '1px solid black'}}>
                    <PersonaPanel refreshDialogs={refreshDialogs}/>
                </div>
                <div style={{border: '1px solid black'}}>
                    <CreateDialogButton refreshDialogs={refreshDialogs}/>
                    <DialogList refreshDialogs={refreshDialogs}/>
                </div>
            </div>
            <div style={{flex: 1}}>
                <Outlet/>
            </div>
        </div>
    )
}