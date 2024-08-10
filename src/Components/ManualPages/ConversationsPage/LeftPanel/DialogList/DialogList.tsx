import {ReactElement, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {authorizationService} from "../../../../../Models/Users/Services/AuthorizationServiceProvider";
import {userDataProvider} from "../../../../../Models/Users/UserData/Providers/UserDataProvider";
import {
    conversationDataProvider
} from "../../../../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";
import ConversationModel from "../../../../../Models/Dialogs/Models/ConversationModel";

export function DialogList({refreshDialogs}: { refreshDialogs: () => void }): ReactElement {
    const navigate = useNavigate();

    const [dialogs, setDialogs] = useState<ConversationModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDialogs() {

            setLoading(true);
            await conversationDataProvider.GetAll();
            
            const dialogs = await conversationDataProvider.GetByPersonId(userDataProvider.UserData.CurrentPersonaId);
            setDialogs(dialogs);
            setLoading(false);
            
            refreshDialogs();
        }

        getDialogs();
    }, []);

    useEffect(() => {
        async function getDialogs() {

            setLoading(true);

            if ((await authorizationService.TryAuthorize()) == false) {
                navigate('/auth/login');
                return;
            }

            try {
                console.log("Reading dialogs per persona:")
                const dialogs = await conversationDataProvider.GetByPersonId(userDataProvider.UserData.CurrentPersonaId);

                console.log(dialogs)

                setDialogs(dialogs);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getDialogs();

    }, [refreshDialogs]);

    if (loading) {
        return <div>
            <h1>Dialog List</h1>
            <div>Loading...</div>
        </div>;
    }

    return (
        <div>
            <h1>Dialog List</h1>
            <ul>
                {
                    dialogs.map((dialog) => (
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