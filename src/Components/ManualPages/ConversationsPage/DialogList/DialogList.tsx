import {ReactElement, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {CreateAuthorisedApiClient} from "../../../../api/AuthorisedAxiosClient";
import {dataStorage} from "../../../../Users/UserData/Providers/DataStorage";
import {DialogService} from "../../../../Dialogs/Services/DialogService";
import {GeneralConversationResponse} from "../../../../Dialogs/Models/GeneralConversationResponse";

export function DialogList(): ReactElement {

    const [dialogs, setDialogs] = useState<GeneralConversationResponse[]>([]);

    console.log("Creating Dialog List");
    
    useEffect(() => {
        const axios = CreateAuthorisedApiClient(dataStorage);
        const dialogService: DialogService = new DialogService(axios);
        
        dialogService.GetDialogs()
            .then(dialogs => setDialogs(dialogs))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Dialog List</h1>
            <ul>
                {
                    dialogs.map(dialog =>
                        <Link to={`/conversations/${dialog.Id}`} key={dialog.Id}>{dialog.Name}</Link>)
                }
            </ul>
        </div>
    );
}