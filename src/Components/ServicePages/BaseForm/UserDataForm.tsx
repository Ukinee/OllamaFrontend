import {Link} from "react-router-dom";
import React, {useState} from "react";

export function UserDataForm(title: string, available: boolean, onSubmit: (username: string, password: string) => void) {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button disabled={available == false} onClick={() => onSubmit(username, password)}>
                {title}
            </button>
            
            <br/>
        </div>
    );
}