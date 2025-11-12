import './App.css'
import AppTheme from './theme/AppTheme';
import TripsTape from './components/TripsTape.tsx';
import {Container, CssBaseline} from "@mui/material";
import AppAppBar from "./components/AppAppBar.tsx";
import {useEffect, useState} from "react";
import {AuthForm} from "./components/AuthForm.tsx";
import {SuccessLoginToast} from "./components/SuccessLoginToast.tsx";
import {getUserProfile} from "./api/authApi.ts";

function checkAuthFromStorage(): boolean {
    const idToken = localStorage.getItem("idToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return !!idToken && !!refreshToken;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [user, setUser] = useState<{ studentId?: string } | null>(null);

    useEffect(() => {
        if (checkAuthFromStorage()) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = async () => {
        setIsAuthenticated(true);
        try {
            const profile = await getUserProfile();
            setUser({studentId: profile.studentId});
            console.log("Успех нереальный");
        } catch (err) {
            console.error("Не удалось загрузить профиль после логина", err);
        }
    };

    return (
        <>
            {!isAuthenticated && <AuthForm onSuccess={handleLoginSuccess} />}

            {toastMessage && (
                <SuccessLoginToast message={toastMessage} onClose={() => setToastMessage("")} />
            )}

            <AppTheme>
                <CssBaseline enableColorScheme/>
                <AppAppBar
                    // @ts-ignore
                    user={user}
                    onLogout={() => {
                        setIsAuthenticated(false)
                        setUser(null)
                    }}
                />
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        my: 10,
                        gap: 4,
                    }}
                >
                    <TripsTape/>
                </Container>
            </AppTheme>
        </>
    )
}

export default App
