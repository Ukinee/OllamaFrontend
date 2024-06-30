import {ReactElement, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ConversationService} from "../../../../../Models/Dialogs/Services/ConversationService";
import {GeneralConversationResponse} from "../../../../../Models/Dialogs/Models/GeneralConversationResponse";
import {authorizationService} from "../../../../../Models/Users/Services/AuthorizationServiceProvider";

export function DialogList({refreshDialogs}: { refreshDialogs: () => void }): ReactElement {
    const navigate = useNavigate();

    const [dialogs, setDialogs] = useState<GeneralConversationResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDialogs() {

            setLoading(true);

            if ((await authorizationService.TryAuthorize()) == false) {
                navigate('/auth/login');
                return;
            }

            const dialogService: ConversationService = new ConversationService();

            try {
                const dialogs = await dialogService.GetConversations();

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
                        <div key={dialog.id}>
                            <br/>
                            <Link to={`/conversations/${dialog.id}`}>{dialog.name}</Link>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}