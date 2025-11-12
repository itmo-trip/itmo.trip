import './App.css'
import AppTheme from './theme/AppTheme';
import TripsTape from './components/TripsTape.tsx';
import {Container, CssBaseline} from "@mui/material";
import AppAppBar from "./components/AppAppBar.tsx";
import {useState} from "react";
import {AuthForm} from "./components/AuthForm.tsx";
import {SuccessLoginToast} from "./components/SuccessLoginToast.tsx";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setToastMessage("Вы успешно вошли в систему!");
    };

    return (
        <>
            {!isAuthenticated && <AuthForm onSuccess={handleLoginSuccess} />}

            {toastMessage && (
                <SuccessLoginToast message={toastMessage} onClose={() => setToastMessage("")} />
            )}

            <AppTheme>
                <CssBaseline enableColorScheme/>
                <AppAppBar/>
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
