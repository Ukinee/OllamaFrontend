import ConversationModel from "../../../../Models/Dialogs/Models/ConversationModel";
import {ReactElement, useEffect, useState} from "react";
import {PersonaResponse} from "../../../../Models/Personas/Models/PersonaResponse";
import {PersonasService} from "../../../../Models/Personas/PersonasService";
import {conversationDataProvider} from "../../../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";
import {PersonaEntry} from "./PersonaEntry";

export function ConversationPersonasPanel({conversation}: { conversation: ConversationModel }): ReactElement {

    const [userName, setUserName] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [foundPersonas, setFoundPersonas] = useState<PersonaResponse[]>([])
    const [currentPersonas, setCurrentPersonas] = useState<PersonaResponse[]>([])

    useEffect(() => {
        fetchCurrentPersonas();

        async function fetchCurrentPersonas() {
            let personasService = new PersonasService();
            let conversationPersonas = await personasService.GetConversationPersonas(conversation.Id);

            setCurrentPersonas(conversationPersonas);
        }
    }, [conversation]);

    async function handleSearch() {
        if (userName === undefined || userName.trim() == "") {
            return;
        }

        setIsSearching(true);
        setFoundPersonas([])

        let personasService = new PersonasService();
        let foundPersonas = await personasService.GetPersonasByUserName(userName);
        let updatedConversation = await conversationDataProvider.Get(conversation.Id);

        let filteredPersonas = foundPersonas.filter(persona =>
            updatedConversation.PersonasIds.includes(persona.id) === false
        );

        setFoundPersonas(filteredPersonas);

        setIsSearching(false);
    }

    async function handleRemovePersona(currentConversation: ConversationModel, persona: PersonaResponse) {
        let personasService = new PersonasService();
        await personasService.RemovePersonaFromConversation(currentConversation.Id, persona.id);
        setCurrentPersonas(currentPersonas.filter(p => p.id !== persona.id))

        await conversationDataProvider.Update(currentConversation.Id);
        await handleSearch();
    }

    async function handleAddPersona(currentConversation: ConversationModel, persona: PersonaResponse) {
        let personasService = new PersonasService();
        await personasService.AddPersonaToConversation(currentConversation.Id, persona.id);
        setCurrentPersonas([...currentPersonas, persona])

        await conversationDataProvider.Update(currentConversation.Id);
        await handleSearch();
    }

    return (
        <div>
            <h1>Current personas</h1>
            <ul>
                {
                    currentPersonas.map((persona) => (
                        <div key={persona.id}>
                            <br/>
                            <PersonaEntry persona={persona} conversation={conversation} buttonLabel={"Remove"}
                                          onClick={handleRemovePersona}/>
                        </div>
                    ))
                }
            </ul>
            <h1>Search by user name</h1>
            <input
                type="text"
                placeholder="User name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}/>
            <button onClick={handleSearch} disabled={isSearching}>Search</button>
            <ul>
                {
                    foundPersonas.map((persona) => (
                        <div key={persona.id}>
                            <br/>
                            <PersonaEntry persona={persona} conversation={conversation} buttonLabel={"Add"}
                                          onClick={handleAddPersona}/>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}