
interface GameControlsProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  computeNextBoard: () => void;
  resetBoard: () => void;
  speed: number;
  setSpeed: (value: number) => void;
}

export default function GameControls({
  isPlaying,
  setIsPlaying,
  computeNextBoard,
  resetBoard,
  speed,
  setSpeed
}: GameControlsProps) {
  return (
    <>
      <div className="panel control-panel">
        <div className="section-label">SIMULATION CONTROLS</div>

        <div className="controls">
          <button
            className="btn btn-primary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "Ⅱ  PAUSE SIMULATION" : "▶  START SIMULATION"}
          </button>

          <button className="btn" onClick={computeNextBoard}>
            ⏭  NEXT GENERATION
          </button>

          <button className="btn btn-reset" onClick={resetBoard}>
            ↺  RESET UNIVERSE
          </button>
        </div>
      </div>

      <div className="panel control-panel">
        <div className="section-label">SIMULATION SPEED</div>

        <div className="speed-value">
          {speed} ms / generation
        </div>

        <input
          className="speed-slider"
          type="range"
          min="50"
          max="1000"
          step="50"
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
        />

        <div className="speed-labels">
          <span>FAST</span>
          <span>SLOW</span>
        </div>
      </div>
    </>
  );
}
