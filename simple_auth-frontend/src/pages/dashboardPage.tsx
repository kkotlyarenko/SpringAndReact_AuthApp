import React, { useEffect, useState } from "react";
import { useBackendToken } from "../constants/backendTokenContext";
import { useNavigate } from "react-router-dom";
import {
    userInfoEndpoint,
    updateUserPasswordEndpoint,
    deleteUserEndpoint, getPointsEndpoint, addPointEndpoint, deletePointEndpoint,
} from "../constants";
import Sidebar from "../components/sidebar/Sidebar";
import ResultsTable from "../components/table/ResultsTable";
import {
    DashboardContainer,
    MenuButton,
    Header,
    Form,
    Input,
    SubmitButton,
    ChartContainer,
    TableContainer, PageContainer,
} from "./dashboardStyles.tsx";
import { FaBars } from "react-icons/fa";
import CanvasGraph from "../components/canvas/CanvasGraph.tsx";

interface UserInfo{
    id: number
    username: string;
}

interface Point {
    id: number;
    x: number;
    y: number;
    r: number;
    hit: boolean;
    timestamp: number;
}

const Dashboard: React.FC = () => {
    const { token, setToken } = useBackendToken();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [results, setResults] = useState<Point[]>([]);
    const [xValue, setXValue] = useState<number | null>(null);
    const [yValue, setYValue] = useState<number | null>(null);
    const [rValue, setRValue] = useState<number | null>(1);
    const [points, setPoints] = useState<Point[]>([]);

    const handleCanvasClick = async(x: number, y: number) => {
        const checkedPoint = await checkPoint(x, y, rValue!);
        const newPoint: Point = { id: checkedPoint.id, x: x, y: y, r: rValue!, hit: checkedPoint.hit, timestamp: checkedPoint.timestamp };
        setPoints([newPoint, ...points]);
        setResults([newPoint, ...results]);
        setXValue(null);
        setYValue(null);
    };

    const checkPoint = async(x: number, y: number, r: number) => {
        try {
            const response = await fetch(addPointEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ x, y, r }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(
                    errorDetails.message || "Error checking point"
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            alert((error as Error).message);
            return false;
        }
    }

    const handleFormSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (xValue === null || yValue === null || rValue === null) {
            alert('Please fill in all fields');
            return;
        }
        const checkedPoint = await checkPoint(xValue, yValue, rValue);
        const newPoint: Point = { id: checkedPoint.id, x: xValue, y: yValue, r: rValue, hit: checkedPoint.hit, timestamp: checkedPoint.timestamp };
        setPoints([newPoint, ...points]);
        setResults([newPoint, ...results]);
        setXValue(null);
        setYValue(null);
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const response = await fetch(userInfoEndpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(
                        errorDetails.message || "Session expired or invalid"
                    );
                }

                const data = await response.json();
                setUserInfo(data);
                setIsLoading(false);
            } catch (error) {
                console.error(
                    "Error checking token:",
                    (error as Error).message
                );
                setToken(null);
                navigate("/");
            }
        };

        fetchUserInfo();
    }, [token, setToken, navigate]);

    const parsePoints = (data: Point[]): Point[] => {
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: expected an array");
        }

        return data.map((item) => {
            return {
                id: item.id,
                x: item.x,
                y: item.y,
                r: item.r,
                hit: item.hit,
                timestamp: item.timestamp,
            };
        });
    };

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(getPointsEndpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(
                        errorDetails.message || "Error fetching results"
                    );
                }

                const data = await response.json();
                const points= parsePoints(data.points);
                setResults(points);
                setPoints(points);
            } catch (error) {
                console.error(
                    "Error fetching results:",
                    (error as Error).message
                );
            }
        };

        fetchResults();
    }, [setResults, token]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        setToken(null);
        navigate("/");
    };

    const handleChangePassword = async (
        oldPassword: string,
        newPassword: string
    ) => {
        try {
            const response = await fetch(updateUserPasswordEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(
                    errorDetails.message || "Error changing password"
                );
            }

            alert("Password changed successfully");
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const handleDeleteAccount = async (password: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action is irreversible."
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(deleteUserEndpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(
                    errorDetails.message || "Error deleting account"
                );
            }

            alert("Account deleted successfully");
            setToken(null);
            navigate("/");
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const onDelete = async (id: number) => {
        try {
            const response = await fetch(`${deletePointEndpoint}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(
                    errorDetails.message || "Error deleting point"
                );
            }

            const newResults = results.filter((point) => point.id !== id);
            setResults(newResults);
            setPoints(newResults);
        } catch (error) {
            alert((error as Error).message);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <PageContainer>
            <DashboardContainer>
                <MenuButton onClick={toggleSidebar}>
                    <FaBars />
                </MenuButton>
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    handleLogout={handleLogout}
                    handleChangePassword={handleChangePassword}
                    handleDeleteAccount={handleDeleteAccount}
                />
                <Header>Welcome, {userInfo ? userInfo.username : "Guest"}!</Header>
                <ChartContainer>
                    <CanvasGraph rValue={rValue!} points={points} onCanvasClick={handleCanvasClick} />
                </ChartContainer>
                <Form onSubmit={handleFormSubmit}>
                    <label>Enter X (-5 to 5):</label>
                    <Input
                        type="number"
                        step="0.5"
                        min="-5"
                        max="5"
                        value={xValue ?? ''}
                        onChange={(e) => setXValue(parseFloat(e.target.value))}
                    />
                    <label>Enter Y (-5 to 5):</label>
                    <Input
                        type="number"
                        step="0.5"
                        min="-5"
                        max="5"
                        value={yValue ?? ''}
                        onChange={(e) => setYValue(parseFloat(e.target.value))}
                    />
                    <label>Enter R (-5 to 5):</label>
                    <Input
                        type="number"
                        step="0.5"
                        min="-5"
                        max="5"
                        value={rValue ?? ''}
                        onChange={(e) => setRValue(parseFloat(e.target.value))}
                    />
                    <SubmitButton type="submit">Check</SubmitButton>
                </Form>

            <TableContainer>
                <ResultsTable data={results} onDelete={onDelete} />
            </TableContainer>
        </DashboardContainer>
</PageContainer>
    );
};

export default Dashboard;