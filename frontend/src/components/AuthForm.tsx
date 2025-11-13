import {useState} from "react";
import {
    Card,
    TextField,
    Button,
    Typography,
    Box
} from "@mui/material";
import {AuthService} from "../api/generated";
import AuthUtils from "../services/AuthUtils.ts";

interface AuthFormProps {
    onSuccess: () => void;
}

export function AuthForm({onSuccess}: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false)

        try {
            const loginResult = await AuthService.postApiV1AuthLogin({
            username: username,
            password: password
        });

        AuthUtils.setIdToken(loginResult.id_token!);
        AuthUtils.setRefreshToken(loginResult.refresh_token!);

        onSuccess();
        } catch (err) {
            console.error("Ошибка входа:", error);
            setError(true);
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1300,
            }}
        >
            <Card
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 4,
                    width: 500,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderRadius: 4,
                }}
            >
                <Typography variant="h5" align="center">
                    ITMO ID
                </Typography>

                <TextField
                    label="Логин"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={error}
                />

                {error && (
                    <Typography variant="body2" color="error" align="left">
                        Неверное имя пользователя или пароль
                    </Typography>
                )}

                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error}
                />

                <Button type="submit" variant="contained" color="primary"
                sx={{
                    backgroundColor: "#333",
                }}>
                    Войти
                </Button>
            </Card>
        </Box>
    );
}
