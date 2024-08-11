import {Link} from "react-router-dom";
import ConversationModel from "../Models/ConversationModel";

interface ConversationItemProps {
    conversation: ConversationModel;
}

export function ConversationItem({conversation}: ConversationItemProps) {
    
    return (
        <div style={{flexDirection: 'row', display: 'flex', flex: 1}}>
            <Link to={`/conversations/${conversation.Id}`}>{conversation.Name}</Link>
        </div>
    )
}