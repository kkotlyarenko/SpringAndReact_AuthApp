import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {BackendTokenProvider, useBackendToken} from "./constants/backendTokenContext.tsx";
import LoginPage from "./pages/loginPage.tsx";
import Dashboard from "./pages/dashboardPage.tsx";

const App: React.FC = () => {
    return (
        <BackendTokenProvider>
            <Router>
                <AppRoutes />
            </Router>
        </BackendTokenProvider>
    );
};

const AppRoutes: React.FC = () => {
    const { token } = useBackendToken();

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
    );
};

export default App;