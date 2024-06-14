import {ReactElement, useEffect, useState} from "react";
import {dataStorage} from "../../../Users/UserData/Providers/DataStorage";
import {authorizationService} from "../../../Users/Services/AuthorizationServiceProvider";
import {EnsureAuthorization} from "../../Common/EnsureAuthorization";

export function HomePage(): ReactElement {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(dataStorage.UserData.Id);
    }, []);
    
    if (authorizationService.IsAuthorized() == false) {
        return EnsureAuthorization();
    }

    return (
        <div>
            <h1>Home</h1>
            <br/>
            <div>
                <h2>Hello {userName}</h2>
            </div>
        </div>
    );
} 