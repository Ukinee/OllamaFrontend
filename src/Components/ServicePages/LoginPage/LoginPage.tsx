import React, {ReactElement, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserDataForm} from "../BaseForm/UserDataForm";
import {CreateApiClient} from "../../../api/AxiosClient";
import {UserService} from "../../../Models/Users/Services/UserService";
import {userDataProvider} from "../../../Models/Users/UserData/Providers/UserDataProvider";
import {authorizationService} from "../../../Models/Users/Services/AuthorizationServiceProvider";
import {conversationDataProvider} from "../../../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";

export function LoginPage(): ReactElement {
    
    const navigate = useNavigate();
    const [available, setAvailable] = useState(true);
    const [status, setStatus] = useState('');

    const onSubmit = async (username: string, password: string) => {
        if (available == false) {
            return;
        }

        setStatus('');
        setAvailable(false);

        await HandleLogin(username, password, setStatus);

        if (await authorizationService.TryAuthorize() == false) {
            setAvailable(true);
            return;
        }

        navigate("/");
    };

    return (
        <div>
            <h1>Login</h1>
            {UserDataForm("Login", available, onSubmit)}
            <p>{status}</p>
            <Link to="/auth/register">Register</Link>
        </div>
    );
};

async function HandleLogin(username: string, password: string, setStatus: any) {
    const userService: UserService = new UserService();

    try {
        const response = await userService.LoginUser(username, password)
        
        userDataProvider.UserData = response;
        conversationDataProvider.Init();
        await conversationDataProvider.LoadAll();
    } catch {
        setStatus('Unauthorized');
    }
}
