import {ReactElement} from "react";
import {DropdownMenu} from "../../../Common/DropdownMenu/DropdownMenu";

export function PersonaPanel(): ReactElement {

    return (
        <div>
            <h1>Persona Panel</h1>
            <DropdownMenu items={[]} onSelect={(s : string) => {}} onCreate= {async (s : string) => { } }/>
        </div>
    );
} 