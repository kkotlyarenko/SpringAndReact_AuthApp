import React from 'react';
import styled from 'styled-components';
import { BoldLink } from "../../styles/shared/sharedStyles.tsx";

interface Point {
    id: number;
    x: number;
    y: number;
    r: number;
    hit: boolean;
    timestamp: number;
}

interface ResultsTableProps {
    data: Point[];
    onDelete: (id: number) => void;
}

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    @media (max-width: 768px) {
        margin-left: auto;
        margin-right: auto;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`;

const TableHeader = styled.th`
    border: 1px solid #ddd;
    padding: 12px 8px;
    background-color: rgba(243, 172, 18, 0.9);
    color: white;
    font-size: 14px;
`;

const TableData = styled.td`
    border: 1px solid #ddd;
    padding: 12px 8px;
    text-align: center;
    font-size: 13px;
    color: #333;

    &:first-child {
        border-left: none;
    }

    &:last-child {
        border-right: none;
    }
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const DeleteText = styled(BoldLink)`
    color: red;
    cursor: pointer;
    font-size: 13px;

    &:hover {
        text-decoration: underline;
    }
`;

const ResultsTable: React.FC<ResultsTableProps> = ({ data, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <thead>
                <tr>
                    <TableHeader>X</TableHeader>
                    <TableHeader>Y</TableHeader>
                    <TableHeader>R</TableHeader>
                    <TableHeader>Hit</TableHeader>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Action</TableHeader>
                </tr>
                </thead>
                <tbody>
                {data.map((point) => (
                    <TableRow key={point.id}>
                        <TableData>{point.x}</TableData>
                        <TableData>{point.y}</TableData>
                        <TableData>{point.r}</TableData>
                        <TableData>{point.hit ? 'Yes' : 'No'}</TableData>
                        <TableData>{new Date(point.timestamp * 1000).toLocaleString()}</TableData>
                        <TableData>
                            <DeleteText onClick={() => onDelete(point.id)}>
                                Delete
                            </DeleteText>
                        </TableData>
                    </TableRow>
                ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default ResultsTable;