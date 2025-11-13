import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {StyledEngineProvider} from '@mui/material/styles';
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StyledEngineProvider>
    </StrictMode>
)
