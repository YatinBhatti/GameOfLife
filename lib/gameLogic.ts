
import { Board } from "@/types";
import { NUM_ROWS, NUM_COLS } from "./constants";

export function createBoard(): Board {
  return Array.from(
    { length: NUM_ROWS },
    () => Array.from({ length: NUM_COLS }, () => 0)
  );
}

export function countNbors(
  board: Board,
  r0: number,
  c0: number
): number {
  let count = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const r = (r0 + dr + NUM_ROWS) % NUM_ROWS;
      const c = (c0 + dc + NUM_COLS) % NUM_COLS;

      if (board[r][c] === 1) {
        count++;
      }
    }
  }

  return count;
}

export function getNextBoard(board: Board): Board {
  const newBoard = board.map(row => [...row]);

  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      const aliveCount = countNbors(board, r, c);

      if (board[r][c] === 0) {
        if (aliveCount === 3) {
          newBoard[r][c] = 1;
        }
      } else {
        if (aliveCount !== 2 && aliveCount !== 3) {
          newBoard[r][c] = 0;
        }
      }
    }
  }

  return newBoard;
}
