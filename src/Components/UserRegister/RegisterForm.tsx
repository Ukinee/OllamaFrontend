import React, {ReactElement} from "react";

export function RegisterForm
(
    username: string,
    setUsername: React.Dispatch<string>,
    password: string,
    setPassword: React.Dispatch<string>,
    loading: boolean,
    handleSubmit: Function
): ReactElement {
    const handleFormSubmit = (e: any) => {
        handleSubmit();
    };
    
    return (
        <div>
            <h1>Register User</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleFormSubmit} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </div>
    );
}