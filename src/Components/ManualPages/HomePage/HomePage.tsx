import {ReactElement, useEffect, useState} from "react";
import {dataStorage} from "../../../Models/Users/UserData/Providers/DataStorage";
import {authorizationService} from "../../../Models/Users/Services/AuthorizationServiceProvider";
import {useNavigate} from "react-router-dom";
import {LoadingPage} from "../../ServicePages/LoadingPage/LoadingPage";

export function HomePage(): ReactElement {
    
    const navigate = useNavigate(); 
    
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if ((await authorizationService.TryAuthorize()) == false) {
                navigate('/auth/login');
                return;
            }

            setLoading(false);

            setUserName(dataStorage.UserData.Id);
        };

        fetchData();
    }, []);
    
    if (loading) {
        return <LoadingPage/>
    }
    
    return (
        <div>
            <h1>Home</h1>
            <br/>
            <div>
                <h2>Hello {userName}</h2>
            </div>
        </div>
    );
} 