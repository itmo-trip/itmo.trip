import {Route, Routes} from "react-router-dom";
import './App.css'
import AppTheme from './theme/AppTheme';
import TripsTape from './components/TripsTape.tsx';
import {Container, CssBaseline} from "@mui/material";
import {AppAppBar} from "./components/AppAppBar.tsx";
import {useEffect, useState} from "react";
import {AuthForm} from "./components/AuthForm.tsx";
import {SuccessLoginToast} from "./components/SuccessLoginToast.tsx";
import {Modal, Box} from '@mui/material';
import {MeService} from "./api/generated";
import MyTripsTape from "./components/MyTripsTape.tsx";
import {AppBarProvider} from "./AppBarContext.tsx";

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
            const profile = await MeService.getApiV1Me();

            setUser({studentId: `${profile.first_name} ${profile.last_name} (${profile.student_id})`});
            console.log("Успех нереальный");
        } catch (err) {
            console.error("Не удалось загрузить профиль после логина", err);
        }
    };

    return (
        <>
            <Modal
                open={!isAuthenticated}
                aria-labelledby="auth-form-modal"
                aria-describedby="auth-form-to-login"
                sx={{
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 4,
                        minWidth: 360,
                        maxWidth: '90%',
                    }}
                >
                    <AuthForm onSuccess={handleLoginSuccess} />
                </Box>
            </Modal>

            {toastMessage && (
                <SuccessLoginToast
                    message={toastMessage}
                    onClose={() => setToastMessage("")}
                />
            )}

            <AppBarProvider>
                <AppTheme>
                    <CssBaseline enableColorScheme/>
                    <AppAppBar
                        user={user!}
                        onLogout={() => {
                            setIsAuthenticated(false);
                            setUser(null);
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
                        <Routes>
                            <Route path="/" element={<TripsTape/>}/>
                            <Route path="my_trips" element={<MyTripsTape/>}/>
                        </Routes>
                        <TripsTape/>
                    </Container>
                </AppTheme>
            </AppBarProvider>
        </>
    );
}

export default App
