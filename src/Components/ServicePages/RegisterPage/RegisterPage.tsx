import React, {useState, ReactElement} from "react";
import {UserDataForm} from "../BaseForm/UserDataForm";
import {CreateApiClient} from "../../../api/AxiosClient";
import {UserService} from "../../../Users/Services/UserService";
import {UserData} from "../../../Users/Models/UserModel";
import {dataStorage} from "../../../Users/UserData/Providers/DataStorage";
import {Link, useNavigate } from "react-router-dom";

export function RegisterPage(): ReactElement {

    const navigate = useNavigate();
    const [available, setAvailable] = useState(true);

    const onSubmit = (username: string, password: string) => {
        if (available == false) {
            return;
        }

        setAvailable(false);
        HandleRegister(username, password);
        navigate('/');
    };

    return (
        <div>
            <h1>Register</h1>
            {UserDataForm("Register", available, onSubmit)}
            <Link to="/auth/login">Login</Link>
        </div>
    );
};

function HandleRegister(username: string, password: string) {
    const apiClient = CreateApiClient();
    const userService: UserService = new UserService(apiClient);

    userService.RegisterUser(username, password)
        .then((data: UserData) => {
            dataStorage.UserData = data;
        })
        .catch((ex) => console.log(ex.stack))
}
