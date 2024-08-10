import React, {ReactElement, useEffect, useRef, useState} from "react";
import {RegisterPage} from "../Components/ServicePages/RegisterPage/RegisterPage";
import {HomePage} from "../Components/ManualPages/HomePage/HomePage";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {Layout} from "../Components/Layout/Layout";
import {SleepPage} from "../Components/ManualPages/SleepPage/SleepPage";
import {ControlPage} from "../Components/ManualPages/ControlPage/ControlPage";
import {ConversationPage} from "../Components/ManualPages/ConversationsPage/ConversationPage";
import {SingleConversationPage} from "../Components/ManualPages/ConversationsPage/Single/SingleConversationPage";
import {ConversationsLayout} from "../Components/Layout/ConversationsLayout";
import {LoginPage} from "../Components/ServicePages/LoginPage/LoginPage";
import {LoginLayout} from "../Components/Layout/LoginLayout";
import {conversationDataProvider} from "../Models/Dialogs/ConversationData/Providers/ConversationDataProvider";
import {UserService} from "../Models/Users/Services/UserService";
import {userDataProvider} from "../Models/Users/UserData/Providers/UserDataProvider";
import {LoadingPage} from "../Components/ServicePages/LoadingPage/LoadingPage";

export function App(): ReactElement {
    const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const isInitializedRef = useRef(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (isInitializedRef.current) {
            return;
        }

        isInitializedRef.current = true;

        LoadConversations();

        async function LoadConversations() {

            let userService = new UserService();

            console.log("Checking user data...");
            
            if (userDataProvider.HasUserData() == false) {
                console.log("No data")
                navigate("/auth/login");
                return;
            }

            console.log("Checking login...");
            
            if (await userService.CheckLogin(userDataProvider.UserData) == false) {
                console.log("No login")
                navigate("/auth/login");
                return;
            }
            
            conversationDataProvider.Init();
            await conversationDataProvider.LoadAll();
            refreshDialogs();

            setIsLoading(false);
        }
    }, []);

    const refreshDialogs = () => setUpdate(update === false);

    if (isLoading)
    {
        return <LoadingPage/>
    }
    
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="control" element={<ControlPage/>}/>
                <Route path="sleep" element={<SleepPage/>}/>
                <Route path="conversations" element={<ConversationsLayout refreshDialogs={refreshDialogs}/>}>
                    <Route index element={<ConversationPage/>}/>
                    <Route path=":conversationId" element={<SingleConversationPage refreshDialogs={refreshDialogs}/>}/>
                </Route>
                <Route path="*" element={<div>404</div>}/>
            </Route>
            <Route path="auth/" element={<LoginLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="*" element={<div>login 404</div>}/>
            </Route>
            <Route path="*" element={<Navigate to={"/"} replace/>}/>
        </Routes>
    );
}