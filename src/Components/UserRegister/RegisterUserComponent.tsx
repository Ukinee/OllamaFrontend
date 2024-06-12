import React, {useState, ReactElement} from "react";
import {UserData} from "../../Users/Models/UserModel";
import {CreateApiClient} from "../../api/AxiosClient";
import {UserService} from "../../Users/Services/UserService";
import {dataStorage} from "../../Users/UserData/Providers/DataStorage";
import App from "../../Bootstrapper/App";
import {RegisterForm} from "./RegisterForm";

export function RegisterUserComponent(): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const apiClient = CreateApiClient();
            const userService = new UserService(apiClient);
            const user: UserData = await userService.RegisterUser(username, password);
            dataStorage.UserData = user;
            
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Error registering user:\n", error);
        }

        setLoading(false);
    };

    if (isLoggedIn) {
        return <App/>;
    }
    
    return RegisterForm(username, setUsername, password, setPassword, loading, handleSubmit);
};
