import styled from "styled-components";
import { BoxContainer } from "../styles/shared/sharedStyles.tsx";

export const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: white;
    max-width: 700px;
    margin: 24px auto;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const DashboardContainer = styled(BoxContainer)`
    width: 90%;
    max-width: 800px;
    min-height: 600px;
    padding: 20px;
    align-items: center;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const MenuButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 30px;
    cursor: pointer;

    svg {
        color: #333;
    }
`;

export const Header = styled.h1`
    font-size: 24px;
    color: #333;
`;

export const Form = styled.form`
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    max-width: 400px;
    height: 42px;
    margin-bottom: 10px;
    padding: 0 10px;
    border: 1px solid rgba(200, 200, 200, 0.3);
    border-radius: 5px;
    outline: none;
    transition: all 200ms ease-in-out;

    &::placeholder {
        color: rgba(200, 200, 200, 1);
    }

    &:focus {
        border-bottom: 2px solid rgba(241, 196, 15, 1);
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    max-width: 400px;
    padding: 11px;
    margin-top: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 100px;
    background: linear-gradient(
            58deg,
            rgba(243, 172, 18, 1) 20%,
            rgba(241, 196, 15, 1) 100%
    );
    cursor: pointer;
    transition: all 240ms ease-in-out;

    &:hover {
        filter: brightness(1.1);
    }

    @media (max-width: 768px) {
        button:focus {
            outline: none;
            box-shadow: none;
        }
    }
`;

export const ChartContainer = styled.div`
    width: 100%;
    margin-top: 30px;
`;

export const TableContainer = styled.div`
    width: 100%;
    margin-top: 30px;
`;
