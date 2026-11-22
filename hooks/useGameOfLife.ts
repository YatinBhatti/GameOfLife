
import { useCallback, useEffect, useState } from "react";
import { Board } from "@/types";
import { createBoard, getNextBoard } from "@/lib/gameLogic";

export function useGameOfLife() {
  const [boardState, setBoardState] = useState<Board>(
    () => createBoard()
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);

  const computeNextBoard = useCallback(() => {
    setBoardState(prev => getNextBoard(prev));
    setGeneration(prev => prev + 1);
  }, []);

  function resetBoard() {
    setBoardState(createBoard());
    setGeneration(0);
    setIsPlaying(false);
  }

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      computeNextBoard();
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, computeNextBoard]);

  return {
    boardState,
    setBoardState,
    isPlaying,
    setIsPlaying,
    generation,
    speed,
    setSpeed,
    computeNextBoard,
    resetBoard
  };
}
