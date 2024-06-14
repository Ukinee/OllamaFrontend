import React, {ReactElement, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserDataForm} from "../BaseForm/UserDataForm";
import {CreateApiClient} from "../../../api/AxiosClient";
import {UserService} from "../../../Users/Services/UserService";
import {UserData} from "../../../Users/Models/UserModel";
import {dataStorage} from "../../../Users/UserData/Providers/DataStorage";
import {authorizationService} from "../../../Users/Services/AuthorizationServiceProvider";

export function LoginPage(): ReactElement {
    const navigate = useNavigate();
    const [available, setAvailable] = useState(true);
    const [status, setStatus] = useState('AAA');

    const onSubmit = async (username: string, password: string) => {
        if (available == false) {
            return;
        }

        console.log("Pressed login button")

        setStatus('AAA');
        setAvailable(false);

        console.log('Handling Login');
        await HandleLogin(username, password, setStatus);

        console.log("Rechecking Authorization");
        if (await authorizationService.TryAuthorize() == false) {
            setAvailable(true);
            return;
        }

        console.log("navigating");

        navigate("/");
    };

    return (
        <div>
            <h1>{status}</h1>
            {UserDataForm("Login", available, onSubmit)}
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
