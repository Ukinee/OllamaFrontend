import React, {ReactElement, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserDataForm} from "../BaseForm/UserDataForm";
import {CreateApiClient} from "../../../api/AxiosClient";
import {UserService} from "../../../Models/Users/Services/UserService";
import {dataStorage} from "../../../Models/Users/UserData/Providers/DataStorage";
import {authorizationService} from "../../../Models/Users/Services/AuthorizationServiceProvider";

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
    const apiClient = CreateApiClient();
    const userService: UserService = new UserService(apiClient);

    try {
        const response = await userService.LoginUser(username, password)
        dataStorage.UserData = response;
    } catch {
        setStatus('Unauthorized');
    }
}
