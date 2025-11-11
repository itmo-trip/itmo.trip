import './App.css'
import AppTheme from './theme/AppTheme';
import TripsTape from './components/TripsTape.tsx';
import {Container, CssBaseline} from "@mui/material";
import AppAppBar from "./components/AppAppBar.tsx";


function App() {
    return (
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
                {/* заглушка для форматирования, когда мало объявлений
                    <Latest/>
                */}
            </Container>
        </AppTheme>
    )
}

export default App
