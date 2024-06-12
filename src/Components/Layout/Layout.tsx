import {Link, Route, Routes, Outlet} from "react-router-dom";
import React from "react";
import {ControlPage} from "../ManualPages/ControlPage/ControlPage";
import {SleepPage} from "../ManualPages/SleepPage/SleepPage";
import {ConversationPage} from "../ManualPages/ConversationsPage/ConversationPage";


export const Layout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <header>
                <Link to="/">Home</Link>
                <Link to="/control">Control</Link>
                <Link to="/sleep">Sleep</Link>
                <Link to="/conversations">Conversations</Link>
            </header>
            
            <Outlet/>
            
            <footer>2024</footer>
        </div>
    )
} 