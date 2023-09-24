import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();

                login(username, password);

                console.log("Zalogowano jako:", data.user.username);

                if (user) {
                    navigate("/dashboard");
                }
            } else {
                console.error("Błąd logowania");
            }
        } catch (error) {
            console.error("Błąd logowania:", error);
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <label>Login</label>
                <small>Login</small>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <label>Hasło</label>
                <small>Hasło</small>

                <input type="submit" value="Zaloguj się" />
            </form>
        </div>
    );
};

export default Login;
