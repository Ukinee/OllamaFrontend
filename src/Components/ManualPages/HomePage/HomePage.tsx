import {ReactElement, useEffect, useState} from "react";
import {dataStorage} from "../../../Users/UserData/Providers/DataStorage";

export function HomePage(): ReactElement {

    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(dataStorage.UserData.Id);
    }, []);

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