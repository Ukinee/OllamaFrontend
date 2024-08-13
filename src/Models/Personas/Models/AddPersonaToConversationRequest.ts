export class AddPersonaToConversationRequest {

    public constructor(conversationId: string, personaId: string) {
        this.ConversationId = conversationId
        this.PersonaId = personaId
    }

    public readonly ConversationId: string
    public readonly PersonaId: string
}