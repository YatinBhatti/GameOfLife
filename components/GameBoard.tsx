
"use client";

import { useEffect, useRef } from "react";
import { Board } from "@/types";
import {
  WIDTH,
  HEIGHT,
  CELL_SIZE,
  NUM_ROWS,
  NUM_COLS,
} from "@/lib/constants";

interface GameBoardProps {
  boardState: Board;
  setBoardState: React.Dispatch<React.SetStateAction<Board>>;
}

export default function GameBoard({
  boardState,
  setBoardState,
}: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#07100c";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw cells
    for (let r = 0; r < NUM_ROWS; r++) {
      for (let c = 0; c < NUM_COLS; c++) {
        const x = c * CELL_SIZE;
        const y = r * CELL_SIZE;

        if (boardState[r][c] === 1) {
          // Glowing alive cells
          ctx.shadowColor = "#a3ff5f";
          ctx.shadowBlur = 7;
          ctx.fillStyle = "#a3ff5f";

          ctx.fillRect(
            x + 1,
            y + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
          );
        } else {
          // Dead cells
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#0c1912";

          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    // Disable glow before drawing grid
    ctx.shadowBlur = 0;

    // Grid lines
    ctx.strokeStyle = "rgba(163, 255, 95, 0.09)";
    ctx.lineWidth = 0.5;

    for (let r = 0; r <= NUM_ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(WIDTH, r * CELL_SIZE);
      ctx.stroke();
    }

    for (let c = 0; c <= NUM_COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, HEIGHT);
      ctx.stroke();
    }
  }, [boardState]);


  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();

  const scaleX = WIDTH / rect.width;
  const scaleY = HEIGHT / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);

  if (
    row < 0 ||
    row >= NUM_ROWS ||
    col < 0 ||
    col >= NUM_COLS
  ) {
    return;
  }

  setBoardState((prev) => {
    const updated = prev.map((r) => [...r]);

    updated[row][col] = updated[row][col] === 0 ? 1 : 0;

    return updated;
  });
}

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onClick={handleCanvasClick}
        className="game-canvas"
      />
    </div>
  );
}
