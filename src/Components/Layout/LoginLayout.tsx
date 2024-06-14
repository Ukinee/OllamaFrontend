import {ReactElement} from "react";
import {Outlet} from "react-router-dom";

export function LoginLayout(): ReactElement {
    return (
        <div>
            <Outlet/>
        </div>
    );
}