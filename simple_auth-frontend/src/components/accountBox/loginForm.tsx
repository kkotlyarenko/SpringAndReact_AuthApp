import React, { useState, useContext } from "react";
import {
    BoldLink,
    BoxContainer, ErrorText,
    FormContainer,
    Input,
    LineText,
    SubmitButton,
} from "../../styles/shared/sharedStyles.tsx";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext.js";
import { loginEndpoint } from "../../constants";
import { useBackendToken } from "../../constants/backendTokenContext";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const { switchToSignup } = useContext(AccountContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {setToken} = useBackendToken();
    const navigate = useNavigate();

    const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(loginEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error((await response.json()).details);
            }

            const data = await response.json();
            console.log("Login successful");
            setToken(data.jwtToken);
            navigate("/dashboard");

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Error logging in:", err.message);
                setError(err.message || "Something went wrong");
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <BoxContainer>
            <FormContainer>
                <Input
                    type="text"
                    placeholder="Login"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormContainer>
            <ErrorText>{error}</ErrorText>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton onClick={handleButtonClick} disabled={loading}>
                {loading ? "Loading..." : "Signin"}
            </SubmitButton>
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Don&apos;t have an account?{" "}
                <BoldLink onClick={switchToSignup} href="#">
                    Signup
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}