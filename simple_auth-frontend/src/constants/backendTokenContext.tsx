import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface BackendTokenContextProps {
    token: string | null;
    setToken: (val: string | null) => void;
}

export const BackendTokenContext = createContext<BackendTokenContextProps>({
    token: null,
    setToken: () => {},
});

export const BackendTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("jwtToken"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("jwtToken", token);
        } else {
            localStorage.removeItem("jwtToken");
        }
    }, [token]);

    return (
        <BackendTokenContext.Provider value={{ token, setToken }}>
    {children}
    </BackendTokenContext.Provider>
);
};

export const useBackendToken = () => useContext(BackendTokenContext);
