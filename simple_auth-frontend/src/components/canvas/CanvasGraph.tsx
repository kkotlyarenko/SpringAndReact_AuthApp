import React, { useRef, useEffect } from 'react';
import styled from "styled-components";

interface Point {
    x: number;
    y: number;
    r: number
    hit: boolean;
}

interface CanvasGraphProps {
    rValue: number;
    points: Point[];
    onCanvasClick: (x: number, y: number) => void;
}

export const StyledCanvas = styled.canvas`
    display: flex;
    margin: auto;
    width: 100%;
    max-width: 400px;
    height: auto;
    border: 1px solid black;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const CanvasGraph: React.FC<CanvasGraphProps> = ({ rValue, points, onCanvasClick }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const axisRange = 12;

    const drawGraph = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const unitScale = canvas.width / axisRange;

        drawAxes(ctx, unitScale);

        if (rValue) {
            if (rValue < 0) rValue = 0;
            if (rValue > 5) rValue = 5;
            drawArea(ctx, unitScale, rValue);
        }

        drawPoints(ctx, unitScale, points);
    };

    const drawAxes = (ctx: CanvasRenderingContext2D, unitScale: number) => {
        const centerX = canvasRef.current!.width / 2;
        const centerY = canvasRef.current!.height / 2;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvasRef.current!.width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvasRef.current!.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasRef.current!.width - 10, centerY - 5);
        ctx.lineTo(canvasRef.current!.width, centerY);
        ctx.lineTo(canvasRef.current!.width - 10, centerY + 5);
        ctx.moveTo(centerX - 5, 10);
        ctx.lineTo(centerX, 0);
        ctx.lineTo(centerX + 5, 10);
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';

        for (let i = -5; i <= 5; i++) {
            if (i === 0) continue;
            const x = centerX + i * unitScale;
            ctx.beginPath();
            ctx.moveTo(x, centerY - 5);
            ctx.lineTo(x, centerY + 5);
            ctx.stroke();
            ctx.textAlign = 'center';
            ctx.fillText(i.toString(), x, centerY + 15);

            const y = centerY - i * unitScale;
            ctx.beginPath();
            ctx.moveTo(centerX - 5, y);
            ctx.lineTo(centerX + 5, y);
            ctx.stroke();
            ctx.textAlign = 'left';
            ctx.fillText(i.toString(), centerX + 10, y + 3);
        }
    };

    const drawArea = (ctx: CanvasRenderingContext2D, unitScale: number, rValue: number) => {
        const centerX = canvasRef.current!.width / 2;
        const centerY = canvasRef.current!.height / 2;

        ctx.fillStyle = 'rgba(241, 196, 15, 0.5)';

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, unitScale * rValue, 0, 0.5 * Math.PI, false);
        ctx.closePath();
        ctx.fill();

        ctx.fillRect(
            centerX - unitScale * rValue,
            centerY - unitScale * rValue,
            unitScale * rValue,
            unitScale * rValue
        );

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + unitScale * rValue / 2, centerY);
        ctx.lineTo(centerX, centerY - unitScale * rValue);
        ctx.closePath();
        ctx.fill();
    };

    const drawPoints = (ctx: CanvasRenderingContext2D, unitScale: number, points: Point[]) => {
        const centerX = canvasRef.current!.width / 2;
        const centerY = canvasRef.current!.height / 2;

        points.forEach(point => {
            if (point.r !== rValue) return;
            const x = centerX + point.x * unitScale;
            const y = centerY - point.y * unitScale;

            ctx.fillStyle = point.hit ? 'rgb(158, 255, 92)' : 'red';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const r = rValue;

        if (!r) {
            alert('Please set R value');
            return;
        }

        const xClick = event.clientX - rect.left;
        const yClick = event.clientY - rect.top;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const unitScale = canvas.width / axisRange;

        const x = (xClick - centerX) / unitScale;
        const y = (centerY - yClick) / unitScale;

        onCanvasClick(parseFloat(x.toFixed(2)), parseFloat(y.toFixed(2)));
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth;
        drawGraph();
    };

    useEffect(() => {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [rValue, points]);

    useEffect(() => {
        drawGraph();
    }, [rValue, points]);

    return <StyledCanvas ref={canvasRef} onClick={handleCanvasClick} />
};

export default CanvasGraph;
