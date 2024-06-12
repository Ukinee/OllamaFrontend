import {ReactElement, useEffect, useState} from "react";
import {dataStorage} from "../Users/UserData/Providers/DataStorage";

export function ApplicationContent(): ReactElement {

    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(dataStorage.UserData.Id);
    }, []);

    return (
        <div>
            <h1>Application Content</h1>
            <br/>
            <div>
                <h2>Hello {userName}</h2>
            </div>
        </div>
    );
} 