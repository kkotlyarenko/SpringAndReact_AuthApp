import { createContext } from "react";

interface AccountContextProps {
    switchToSignup?: () => void;
    switchToSignin?: () => void;
}

export const AccountContext = createContext<AccountContextProps>({});