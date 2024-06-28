import {ReactElement, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {authorizationService} from "../../../../Models/Users/Services/AuthorizationServiceProvider";
import {ConversationService} from "../../../../Models/Dialogs/Services/ConversationService";
import {CreateAuthorisedApiClient} from "../../../../api/AuthorisedAxiosClient";
import {dataStorage} from "../../../../Models/Users/UserData/Providers/DataStorage";
import {ConcreteConversationResponse} from "../../../../Models/Dialogs/Models/ConcreteConversationResponse";
import './SingleConversationPage.css';
import {ControlPanel} from "../ControlPanel/ControlPanel";
import {LoadingPage} from "../../../ServicePages/LoadingPage/LoadingPage";

export function SingleConversationPage(): ReactElement {
    const navigate = useNavigate();

    const conversationId: string | undefined = useParams().conversationId;
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] =
        useState<ConcreteConversationResponse>();


    useEffect(() => {
        async function getMessages() {

            setLoading(true);
            
            if ((await authorizationService.TryAuthorize()) == false) {
                navigate('/auth/login');
                return;
            }

            let client = CreateAuthorisedApiClient(dataStorage);
            const conversationService: ConversationService = new ConversationService(client);

            const conversation: ConcreteConversationResponse = await conversationService.GetConcreteConversation(conversationId!);
            setConversation(conversation);

            setLoading(false);
        }

        getMessages();
    }, [conversationId]);

    if (conversationId === undefined || conversation === null) {
        return (
            <div>
                <h1>Broken Conversation PoroSad</h1>
            </div>
        );
    }

    if (loading) {
        return <LoadingPage/>;
    }

    return (
        <div className="root">
            <div className="messages">
                <h1>Single Conversation : {conversation!.name}</h1>
                <ul>
                    <li>Messages:</li>
                    {conversation!.messages.map((message) => (
                        <li key={message.Id}>
                            {message.ChatName} as {message.ChatRole}: {message.Content}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="controlPanel">
                <ControlPanel conversationData={conversation!}/>
            </div>
        </div>
    );
} 