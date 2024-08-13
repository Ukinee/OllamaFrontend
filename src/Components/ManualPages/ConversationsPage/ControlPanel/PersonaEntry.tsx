import {ReactElement} from "react";
import ConversationModel from "../../../../Models/Dialogs/Models/ConversationModel";
import {PersonaResponse} from "../../../../Models/Personas/Models/PersonaResponse";

interface PersonaEntryProps {
    persona: PersonaResponse;
    conversation: ConversationModel;
    buttonLabel: string;
    onClick: (conversation : ConversationModel, persona: PersonaResponse) => Promise<void>;
}

export function PersonaEntry({persona, conversation, buttonLabel, onClick}: PersonaEntryProps): ReactElement {
    return (
        <div style={ { display: 'flex', flexDirection: 'row' }}>
            <p>{persona.name}</p>
            <button onClick={() => onClick(conversation, persona)}>{buttonLabel}</button>
        </div>
    )
}