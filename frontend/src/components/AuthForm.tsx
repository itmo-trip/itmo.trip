import './css/AuthForm.css';
import { useState } from 'react';

interface AuthFormProps {
    onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "admin" && password === "1234") {
            onSuccess();
        } else {
            setError("Неверные данные");
        }
    };

    return (
        <div className="auth-overlay">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Авторизация</h2>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}
