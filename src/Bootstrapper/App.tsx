import React, {ReactElement , useEffect, useState} from "react";
import {dataStorage} from "../Users/UserData/Providers/DataStorage";
import {CreateApiClient} from "../api/AxiosClient";
import {UserService} from "../Users/Services/UserService";
import {RegisterUserComponent} from "../Components/UserRegister/RegisterUserComponent";
import {ApplicationContent} from "../ApplicationContent/ApplicationContent";

export function App(): ReactElement {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkLoginStatus() {
            if (dataStorage.HasUserData()) {
                const apiClient = CreateApiClient();
                const userService = new UserService(apiClient);

                try {
                    const isLoggedIn = await userService.CheckLogin(dataStorage.UserData);

                    setIsLoggedIn(isLoggedIn);
                } catch (error) {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }

            setLoading(false);
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isLoggedIn) {
        return <ApplicationContent/>;
    }

    return <RegisterUserComponent/>;
}
