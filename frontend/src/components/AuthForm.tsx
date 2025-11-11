import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Card, TextField, Button, Typography, Box } from "@mui/material";

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

    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0, 0, 0, 0.5)",
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
                    width: 320,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    bgcolor: theme.palette.background.paper, // фон Card под тему
                    color: theme.palette.text.primary,       // текст под тему
                }}
            >
                <Typography variant="h5" align="center" color="text.primary">
                    Авторизация
                </Typography>

                <TextField
                    label="Логин"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {error}
                    </Typography>
                )}

                <Button type="submit" variant="contained" color="primary">
                    Войти
                </Button>
            </Card>

        </Box>
    );
}
