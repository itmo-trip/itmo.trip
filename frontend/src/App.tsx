import { useState } from 'react'
import { AuthForm } from "./components/AuthForm";
import { SuccessLoginToast } from "./components/SuccessLoginToast.tsx";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
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

            {/* Основное содержимое */}
            <div className={isAuthenticated ? "blur-none" : "blur-sm"}>
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </>
    );
}

export default App;
