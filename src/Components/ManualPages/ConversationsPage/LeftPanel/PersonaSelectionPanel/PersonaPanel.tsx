import {ReactElement, useEffect, useState} from "react";
import {DropdownMenu} from "../../../../Common/DropdownMenu/DropdownMenu";
import {userDataProvider} from "../../../../../Models/Users/UserData/Providers/UserDataProvider";
import {PersonasService} from "../../../../../Models/Personas/PersonasService";
import {PersonaResponse} from "../../../../../Models/Personas/Models/PersonaResponse";


export function PersonaPanel({refreshDialogs}: { refreshDialogs: () => void }): ReactElement {

    const [isInitialized, setIsInitialized] = useState(false)
    const [initialItem, setInitialItem] = useState<string>("")

    const [personas, setPersonas] = useState<PersonaResponse[]>([])

    useEffect(() => {
        GetPersonas();
        
        async function GetPersonas() {
            const service = new PersonasService();
            const response = await service.GetUserPersonas();

            let personaId = userDataProvider.UserData.CurrentPersonaId;
            let initialPersona = response.find(x => x.id == personaId);

            if (initialPersona == undefined) {
                throw new Error("Initial persona not found");
            }

            setPersonas(response);
            setInitialItem(initialPersona.name);

            setIsInitialized(true);
        }
    }, []);

    if (isInitialized == false) {
        return (
            <div>
                <h1>Persona Panel</h1>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <h1>Persona Panel</h1>
            <DropdownMenu
                initialItem={initialItem}
                items={personas.map(item => item.name)}
                onSelect={(item) => OnSelect(item, personas, refreshDialogs)}
                onCreate={(item) => OnCreate(item, personas, setPersonas)}
            />
        </div>
    );
}

async function OnSelect(item: string, personas: PersonaResponse[], refreshDialogs: () => void) {

    let persona = personas.find(x => x.name == item);

    if (persona == undefined) {
        throw new Error("Persona not found");
    }

    userDataProvider.UpdateCurrentPersona(persona.id);
    refreshDialogs();
}

async function OnCreate(item: string, personas: PersonaResponse[], setPersonas: any): Promise<boolean> {

    try {
        let personaService = new PersonasService();
        let response = await personaService.PostPersona(item);
        setPersonas([...personas, response]);
        return true;
    } catch (error) {
        return false;
    }
} 
