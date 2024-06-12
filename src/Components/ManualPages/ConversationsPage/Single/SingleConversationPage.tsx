import {ReactElement} from "react";
import {useParams} from "react-router-dom";

export function SingleConversationPage(): ReactElement {

    const conversationId: string | undefined = useParams().conversationId;

    if (conversationId === undefined) {
        return (
            <div>
                <h1>Broken Conversation PoroSad</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Single Conversation : {conversationId}</h1>
            <ul>
                <li>Message 1</li>
                <li>Message 1</li>
                <li>Message 1</li>
                <li>Message 1</li>
                <li>Message 1</li>
                <li>Message 1</li>
                <li>Message 1</li>
                <li>Message 2</li>
                <li>Message 3</li>
            </ul>
        </div>
    );
} 