import { useState } from "react";
import {
    Card,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { login, getUserProfile } from "../api/CustomAuthService.ts";
import {API_BASE} from "../api/OpenAPI.custom.ts";

interface AuthFormProps {
    onSuccess: () => void;
    onProfileComplete: () => void;
}

export function AuthForm({ onSuccess, onProfileComplete }: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [socialUsername, setSocialUsername] = useState("");
    const [userUuid, setUserUuid] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [step, setStep] = useState<"login" | "completeProfile">("login");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setLoading(true);

        const success = await login(username, password);
        setLoading(false);

        if (!success) {
            setError(true);
            return;
        }

        try {
            const profile = await getUserProfile();
            const needsCompletion = !profile.bio || !profile.social_network_username;

            console.log(profile);
            setUserUuid(profile.id);
            console.log(profile.id);

            if (needsCompletion) {
                setStep("completeProfile");
            } else {
                onSuccess();
            }
        } catch (err) {
            console.error("Ошибка при получении профиля:", err);
            setError(true);
        }
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userUuid) {
            console.error("Нет UUID пользователя — некуда PATCHить профиль");
            return;
        }

        setLoading(true);

        try {
            // PATCH user with BIO and SOCIAL_NETWORK_USER_NAME
            const res = await fetch(`${API_BASE}/users/${userUuid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("idToken")}`,
                    Refresh: `${localStorage.getItem("refreshToken")}`,
                },
                body: JSON.stringify({
                    bio,
                    social_network_username: socialUsername,
                }),
            });

            if (!res.ok) throw new Error("Ошибка при PATCH профиля");

            setLoading(false);
            onProfileComplete();
        } catch (err) {
            console.error("Ошибка при сохранении профиля:", err);
            setLoading(false);
        }
    };

    return (
        <Card
            component="form"
            onSubmit={step === "login" ? handleLogin : handleProfileSubmit}
            sx={{
                p: 4,
                width: 400,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 5,
            }}
        >
            {step === "login" ? (
                <>
                    <Typography variant="h5" align="center">
                        ITMO ID
                    </Typography>

                    <TextField
                        label="Логин"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={error}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                    />
                    {error && (
                        <Typography variant="body2" color="error">
                            Неверное имя пользователя или пароль
                        </Typography>
                    )}

                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Вход..." : "Войти"}
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h6" align="center">
                        Дополните профиль
                    </Typography>
                    <TextField
                        label="Биография"
                        fullWidth
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <TextField
                        label="Имя пользователя в соцсетях"
                        fullWidth
                        value={socialUsername}
                        onChange={(e) => setSocialUsername(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !bio || !socialUsername}
                    >
                        {loading ? "Сохранение..." : "Сохранить"}
                    </Button>
                </>
            )}
        </Card>
    );
}
