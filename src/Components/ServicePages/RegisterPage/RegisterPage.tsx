import React, {useState, ReactElement} from "react";
import {UserDataForm} from "../BaseForm/UserDataForm";
import {CreateApiClient} from "../../../api/AxiosClient";
import {UserService} from "../../../Models/Users/Services/UserService";
import {userDataProvider} from "../../../Models/Users/UserData/Providers/UserDataProvider";
import {Link, useNavigate} from "react-router-dom";
import {authorizationService} from "../../../Models/Users/Services/AuthorizationServiceProvider";
import {conversationDataProvider} from "../../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";

export function RegisterPage(): ReactElement {

    const navigate = useNavigate();
    const [available, setAvailable] = useState(true);
    const [status, setStatus] = useState('');

    const onSubmit = async (username: string, password: string) => {
        if (available == false) {
            return;
        }

        setStatus('');
        setAvailable(false);
        
        await HandleRegister(username, password, setStatus);
        
        if (await authorizationService.TryAuthorize() == false) {
            setAvailable(true);
            return;
        }
        
        navigate('/');
    };

    return (
        <div>
            <h1>Register</h1>
            {UserDataForm("Register", available, onSubmit)}
            <p>{status}</p>
            <Link to="/auth/login">Login</Link>
        </div>
    );
};

async function HandleRegister(username: string, password: string, setStatus: any) {
    const userService: UserService = new UserService();

    try {
        const data = await userService.RegisterUser(username, password);
        userDataProvider.UserData = data;        
        conversationDataProvider.Init();
        await conversationDataProvider.LoadAll();
    } catch (ex) {
        setStatus('Unauthorized');
    }
}
