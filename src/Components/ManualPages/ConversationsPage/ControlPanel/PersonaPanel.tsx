import {ReactElement, useEffect, useState} from "react";
import {DropdownMenu} from "../../../Common/DropdownMenu/DropdownMenu";
import {userDataProvider} from "../../../../Models/Users/UserData/Providers/UserDataProvider";
import {PersonasService} from "../../../../Models/Personas/PersonasService";
import {PersonaResponse} from "../../../../Models/Personas/Models/PersonaResponse";


export function PersonaPanel({ refreshDialogs }: { refreshDialogs: () => void }): ReactElement {
    const [items, setItems] = useState<PersonaResponse[]>([]);
    const [initialItem, setInitialItem] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            const personasService = new PersonasService();
            const response = await personasService.GetPersonas();

            setItems(response.personas);
            const initialPersonaName = GetInitialItem(response.personas);
            setInitialItem(initialPersonaName);
            refreshDialogs();
            setIsLoading(false);
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Persona Panel</h1>
            <DropdownMenu
                initialItem={initialItem}
                items={items.map(item => item.name)}
                onSelect={(item) => OnSelect(item, items, refreshDialogs)}
                onCreate={(item) => OnCreate(item, items, setItems)}
            />
        </div>
    );
}

function GetInitialItem(personas: PersonaResponse[]): string | undefined {
    const personaId = userDataProvider.UserData.CurrentPersonaId;
    let initialPersona = personas.find(persona => persona.id === personaId);

    if (!initialPersona && personas.length > 0) {
        initialPersona = personas[0];
    }

    return initialPersona?.name;
}

async function OnSelect(item: string, items: PersonaResponse[], refreshDialogs: () => void): Promise<void> {
    const selectedPersona = items.find(persona => persona.name === item);

    if (!selectedPersona) {
        throw new Error("Persona not found");
    }

    userDataProvider.UpdateCurrentPersona(selectedPersona.id);
    refreshDialogs();
}

async function OnCreate(item: string, personas: PersonaResponse[], setPersonas: React.Dispatch<React.SetStateAction<PersonaResponse[]>>): Promise<boolean> {
    try {
        const personaService = new PersonasService();
        const newPersona = await personaService.PostPersona(item);

        setPersonas([...personas, newPersona]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
