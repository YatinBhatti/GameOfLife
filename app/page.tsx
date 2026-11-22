
"use client";

import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";
import { useGameOfLife } from "@/hooks/useGameOfLife";

export default function Home() {
  const {
    boardState,
    setBoardState,
    isPlaying,
    setIsPlaying,
    generation,
    speed,
    setSpeed,
    computeNextBoard,
    resetBoard
  } = useGameOfLife();

  const population = boardState.reduce(
    (total, row) =>
      total + row.filter(cell => cell === 1).length,
    0
  );

  return (
    <main className="lab">

      {/* Header */}
      <header className="topbar">
        <div className="brand">
  <div className="brand-icon">✳</div>
  <span>
    <span style={{ color: "#a3ff5f" }}>Y</span>ATIN'S LAB
  </span>
</div>

        <div className="top-label">
          CELLULAR AUTOMATA EXPERIMENT
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="eyebrow">
          A UNIVERSE OF POSSIBILITIES
        </div>

        <h1>
          Conway's <span>Game of Life.</span>
        </h1>

        <p>
          Simple rules. Infinite possibilities. Watch life emerge.
        </p>
      </section>

      {/* Dashboard */}
      <section className="dashboard">

        {/* Canvas */}
        <div className="panel board-panel">
          <div className="panel-heading">
            <div className="panel-title">
              THE LIVING GRID / 80 × 80
            </div>

            <div className="live-indicator">
              <span className="live-dot" />
              {isPlaying ? "RUNNING" : "STANDBY"}
            </div>
          </div>

          <GameBoard
            boardState={boardState}
            setBoardState={setBoardState}
          />

          <p style={{
            color: "#78877c",
            fontSize: "11px",
            marginTop: "14px",
            textAlign: "center"
          }}>
            CLICK ANY CELL TO CREATE OR DESTROY LIFE
          </p>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">

          <GameControls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            computeNextBoard={computeNextBoard}
            resetBoard={resetBoard}
            speed={speed}
            setSpeed={setSpeed}
          />

          {/* Statistics */}
          <div className="panel control-panel">
            <div className="section-label">
              LIVE STATISTICS
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">
                  {generation}
                </div>
                <div className="stat-name">
                  GENERATION
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-value">
                  {population}
                </div>
                <div className="stat-name">
                  ALIVE CELLS
                </div>
              </div>
            </div>
          </div>

        </aside>
      </section>

      <footer className="footer">
        DESIGNED TO EXPLORE LIFE THROUGH MATHEMATICS
      </footer>

    </main>
  );
}
