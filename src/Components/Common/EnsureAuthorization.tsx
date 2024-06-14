import {authorizationService} from "../../Users/Services/AuthorizationServiceProvider";
import {Navigate} from "react-router-dom";
import {ReactElement} from "react";

export function EnsureAuthorization(): ReactElement {
    authorizationService.TryAuthorize()

    if (authorizationService.IsAuthorized() == false) {
        return (<Navigate to="/auth/login"/>);
    }
    
    throw new Error("Must not be reached");
}