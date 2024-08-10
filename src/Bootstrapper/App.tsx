import React, {ReactElement, useState} from "react";
import {RegisterPage} from "../Components/ServicePages/RegisterPage/RegisterPage";
import {HomePage} from "../Components/ManualPages/HomePage/HomePage";
import {Routes, Route, Navigate} from "react-router-dom";
import {Layout} from "../Components/Layout/Layout";
import {SleepPage} from "../Components/ManualPages/SleepPage/SleepPage";
import {ControlPage} from "../Components/ManualPages/ControlPage/ControlPage";
import {ConversationPage} from "../Components/ManualPages/ConversationsPage/ConversationPage";
import {SingleConversationPage} from "../Components/ManualPages/ConversationsPage/Single/SingleConversationPage";
import {ConversationsLayout} from "../Components/Layout/ConversationsLayout";
import {LoginPage} from "../Components/ServicePages/LoginPage/LoginPage";
import {LoginLayout} from "../Components/Layout/LoginLayout";

export function App(): ReactElement {
    const [update, setUpdate] = useState(false);

    const refreshDialogs = () => setUpdate(update === false);
    
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