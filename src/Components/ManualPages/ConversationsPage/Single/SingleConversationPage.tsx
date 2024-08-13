import {useParams} from "react-router-dom";
import './SingleConversationPage.css';
import {ConversationPanel} from "../ControlPanel/ConversationPanel";
import {MessageList} from "../MessageList/MessageList";
import {UseConversation} from "../../../../api/Hooks/useConversation";
import {LoadingPage} from "../../../ServicePages/LoadingPage/LoadingPage";
import {MessageInputPanel} from "../MessageInputPanel/MessageInputPanel";
import {userDataProvider} from "../../../../Models/Users/UserData/Providers/UserDataProvider";
import {ConversationPersonasPanel} from "../ControlPanel/ConversationPersonasPanel";

export function SingleConversationPage({refreshDialogs}: { refreshDialogs: () => void }) {
    const {conversationId} = useParams();
    const {loading, conversation} = UseConversation(conversationId, 1, refreshDialogs);

    if (conversationId === undefined || conversation === undefined || conversation === null) {
        return (
            <div>
                <h1>Broken Conversation PoroSad</h1>
            </div>
        );
    }

    if (loading) {
        return <LoadingPage/>;
    }

    if (!conversation.PersonasIds.some(x => x === userDataProvider.UserData.CurrentPersonaId)) {
        return (
            <div>
                <h1>Invalid access!!!!!</h1>
            </div>
        );
    }

    return (
        <div className="root">
            <div className="messages">
                <MessageList conversationId={conversationId} refreshDialogs={refreshDialogs}/>
                <MessageInputPanel conversationId={conversationId}/>
            </div>

            <div className="controlPanel">
                <ConversationPanel conversationData={conversation}/>
                <ConversationPersonasPanel conversation={conversation}/>
            </div>
        </div>
    );
}
