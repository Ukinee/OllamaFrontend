import {UUID} from "node:crypto";

export class PostConversationRequest {

    constructor(name: string, globalContext: string, personaId:UUID) {
        this.name = name;
        this.context = globalContext;
        this.personaId = personaId;
    }

    private personaId: UUID;
    public name: string
    public context: string
}