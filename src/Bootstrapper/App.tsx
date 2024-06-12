import React, {ReactElement, useEffect, useState} from "react";
import {dataStorage} from "../Users/UserData/Providers/DataStorage";
import {CreateApiClient} from "../api/AxiosClient";
import {UserService} from "../Users/Services/UserService";
import {RegisterPage} from "../Components/ServicePages/LoginPage/RegisterPage";
import {HomePage} from "../Components/ManualPages/HomePage/HomePage";
import {Routes, Route, Link, Router} from "react-router-dom";
import {LoadingPage} from "../Components/ServicePages/LoadingPage/LoadingPage";
import {Layout} from "../Components/Layout/Layout";
import {SleepPage} from "../Components/ManualPages/SleepPage/SleepPage";
import {ControlPage} from "../Components/ManualPages/ControlPage/ControlPage";
import {ConversationPage} from "../Components/ManualPages/ConversationsPage/ConversationPage";
import {SingleConversationPage} from "../Components/ManualPages/ConversationsPage/Single/SingleConversationPage";
import {ConversationsLayout} from "../Components/ManualPages/ConversationsPage/ConversationsLayout/ConversationsLayout";


export function App(): ReactElement {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    console.log("App is starting");

    useEffect(() => {
        async function checkLoginStatus() {
            if (dataStorage.HasUserData()) {
                const apiClient = CreateApiClient();
                const userService = new UserService(apiClient);

                try {
                    console.log("Checking login status");
                    
                    const isLoggedIn = await userService.CheckLogin(dataStorage.UserData);

                    console.log("Login status: " + isLoggedIn);
                    
                    setIsLoggedIn(isLoggedIn);
                } catch (error) {
                    console.log("Error checking login status");
                    
                    setIsLoggedIn(false);
                }
            } else {
                console.log("No user data found");
                
                setIsLoggedIn(false);
            }
            
            console.log("Login status before loading end: " + isLoggedIn);

            setLoading(false);
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        console.log("Loading...");
        
        return <LoadingPage/>;
    }

    if (isLoggedIn === false) {
        console.log("Registering user");
        
        return <RegisterPage/>;
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="control" element={<ControlPage/>}/>
                    <Route path="sleep" element={<SleepPage/>}/>
                    <Route path="conversations" element={<ConversationsLayout/>}>
                        <Route index element={<ConversationPage/>}/>
                        <Route path=":conversationId" element={<SingleConversationPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
} 
