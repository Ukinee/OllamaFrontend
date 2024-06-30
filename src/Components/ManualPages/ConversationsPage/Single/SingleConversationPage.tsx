import {ReactElement, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {authorizationService} from "../../../../Models/Users/Services/AuthorizationServiceProvider";
import {ConversationService} from "../../../../Models/Dialogs/Services/ConversationService";
import {ConcreteConversationResponse} from "../../../../Models/Dialogs/Models/ConcreteConversationResponse";
import {LoadingPage} from "../../../ServicePages/LoadingPage/LoadingPage";
import {PersonaPanel} from "../ControlPanel/PersonaPanel";
import './SingleConversationPage.css';
import {ConversationPanel} from "../ControlPanel/ConversationPanel";

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

            const conversationService: ConversationService = new ConversationService();

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
                <ConversationPanel conversationData={conversation!}/>
                <PersonaPanel/>
            </div>
        </div>
    );
} 