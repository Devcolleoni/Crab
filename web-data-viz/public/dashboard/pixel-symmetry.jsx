import { useState, useRef, useCallback } from "react";

const PRESETS = [8, 16, 24, 32];
const SYMMETRY_MODES = ["none", "horizontal", "vertical", "both", "rotate4"];

const SYMMETRY_LABELS = {
  none: "Nenhuma",
  horizontal: "↔ Horizontal",
  vertical: "↕ Vertical",
  both: "✦ Ambas",
  rotate4: "↻ Rotação 4x",
};

const PALETTE = [
  "#1a1a2e","#e63946","#f4a261","#e9c46a",
  "#2a9d8f","#457b9d","#a8dadc","#6d6875",
  "#c77dff","#80b918","#ff6b6b","#ffffff",
];

function createGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function getSymmetricCells(r, c, size, mode) {
  const cells = new Set();
  const addCell = (row, col) => {
    if (row >= 0 && row < size && col >= 0 && col < size)
      cells.add(`${row},${col}`);
  };

  addCell(r, c);

  if (mode === "horizontal" || mode === "both") {
    addCell(r, size - 1 - c);
  }
  if (mode === "vertical" || mode === "both") {
    addCell(size - 1 - r, c);
  }
  if (mode === "both") {
    addCell(size - 1 - r, size - 1 - c);
  }
  if (mode === "rotate4") {
    addCell(c, size - 1 - r);
    addCell(size - 1 - r, size - 1 - c);
    addCell(size - 1 - c, r);
  }

  return [...cells].map(s => {
    const [row, col] = s.split(",").map(Number);
    return { row, col };
  });
}

export default function PixelSymmetry() {
  const [gridSize, setGridSize] = useState(16);
  const [grid, setGrid] = useState(() => createGrid(16));
  const [color, setColor] = useState("#e63946");
  const [symmetry, setSymmetry] = useState("both");
  const [tool, setTool] = useState("paint"); // paint | erase
  const [showGuides, setShowGuides] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const isPainting = useRef(false);
  const lastPainted = useRef(new Set());

  const paintCells = useCallback((r, c) => {
    const key = `${r},${c}`;
    if (lastPainted.current.has(key)) return;
    lastPainted.current.add(key);

    const cells = getSymmetricCells(r, c, gridSize, symmetry);
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      cells.forEach(({ row, col }) => {
        next[row][col] = tool === "erase" ? null : color;
      });
      return next;
    });
  }, [gridSize, symmetry, tool, color]);

  const handleMouseDown = (r, c) => {
    isPainting.current = true;
    lastPainted.current = new Set();
    paintCells(r, c);
  };

  const handleMouseEnter = (r, c) => {
    if (isPainting.current) paintCells(r, c);
  };

  const handleMouseUp = () => {
    isPainting.current = false;
    lastPainted.current = new Set();
  };

  const changeSize = (size) => {
    setGridSize(size);
    setGrid(createGrid(size));
  };

  const clearGrid = () => setGrid(createGrid(gridSize));

  const exportPNG = () => {
    const scale = Math.floor(512 / gridSize);
    const canvas = document.createElement("canvas");
    canvas.width = gridSize * scale;
    canvas.height = gridSize * scale;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f8f8f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          ctx.fillStyle = cell;
          ctx.fillRect(c * scale, r * scale, scale, scale);
        }
      });
    });
    const link = document.createElement("a");
    link.download = "simetria.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // Count filled cells
  const filledCount = grid.flat().filter(Boolean).length;
  const totalCells = gridSize * gridSize;

  // Cell size responsive
  const maxGrid = Math.min(window.innerWidth, window.innerHeight) - 160;
  const cellPx = Math.max(4, Math.floor((Math.min(maxGrid, 580)) / gridSize));

  const isAxisRow = (r) => {
    if (symmetry === "horizontal" || symmetry === "both") {
      if (gridSize % 2 === 0) return r === gridSize / 2 - 1 || r === gridSize / 2;
      return r === Math.floor(gridSize / 2);
    }
    return false;
  };
  const isAxisCol = (c) => {
    if (symmetry === "vertical" || symmetry === "both") {
      if (gridSize % 2 === 0) return c === gridSize / 2 - 1 || c === gridSize / 2;
      return c === Math.floor(gridSize / 2);
    }
    return false;
  };

  return (
    <div
      style={{
        minHeight: "100vh", background: "#12121f",
        display: "flex", flexDirection: "column", alignItems: "center",
        fontFamily: "'Courier New', monospace", color: "#ccc",
        userSelect: "none",
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
      <div style={{
        width: "100%", background: "#1a1a2e", borderBottom: "1px solid #2a2a4e",
        padding: "10px 20px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <span style={{ color: "#a8dadc", fontWeight: "bold", letterSpacing: 3, fontSize: 13 }}>
          PIXEL·SYM
        </span>
        <span style={{ color: "#2a2a4e", fontSize: 18 }}>|</span>

        {/* Symmetry */}
        <div style={{ display: "flex", gap: 5 }}>
          {SYMMETRY_MODES.map(m => (
            <button key={m} onClick={() => setSymmetry(m)} style={{
              background: symmetry === m ? "#457b9d" : "transparent",
              border: `1px solid ${symmetry === m ? "#a8dadc" : "#2a2a4e"}`,
              color: symmetry === m ? "#fff" : "#668",
              borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 11,
            }}>
              {SYMMETRY_LABELS[m]}
            </button>
          ))}
        </div>

        <span style={{ color: "#2a2a4e", fontSize: 18 }}>|</span>

        {/* Grid size */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#556" }}>GRID</span>
          {PRESETS.map(s => (
            <button key={s} onClick={() => changeSize(s)} style={{
              background: gridSize === s ? "#2a9d8f" : "transparent",
              border: `1px solid ${gridSize === s ? "#2a9d8f" : "#2a2a4e"}`,
              color: gridSize === s ? "#fff" : "#668",
              borderRadius: 4, padding: "3px 7px", cursor: "pointer", fontSize: 11,
            }}>
              {s}×{s}
            </button>
          ))}
        </div>

        <span style={{ color: "#2a2a4e", fontSize: 18 }}>|</span>

        {/* Tool */}
        <button onClick={() => setTool(t => t === "paint" ? "erase" : "paint")} style={{
          background: tool === "erase" ? "#6d6875" : "transparent",
          border: `1px solid ${tool === "erase" ? "#c77dff" : "#2a2a4e"}`,
          color: tool === "erase" ? "#c77dff" : "#668",
          borderRadius: 5, padding: "3px 10px", cursor: "pointer", fontSize: 11,
        }}>
          {tool === "erase" ? "◻ BORRAR" : "◼ PINTAR"}
        </button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={() => setShowAxes(v => !v)} style={smBtn(showAxes, "#e9c46a")}>Eixos</button>
          <button onClick={clearGrid} style={smBtn(true, "#e63946")}>✕ Limpar</button>
          <button onClick={exportPNG} style={smBtn(true, "#2a9d8f")}>↓ PNG</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, padding: 20, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Canvas */}
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, ${cellPx}px)`,
              gridTemplateRows: `repeat(${gridSize}, ${cellPx}px)`,
              border: "1px solid #2a2a4e",
              cursor: tool === "erase" ? "cell" : "crosshair",
              position: "relative",
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isAx = showAxes && (isAxisRow(r) || isAxisCol(c));
                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    style={{
                      width: cellPx, height: cellPx,
                      background: cell || (isAx ? "rgba(233,196,106,0.07)" : "#1a1a2e"),
                      boxSizing: "border-box",
                      border: showGuides
                        ? (isAx
                          ? "0.5px solid rgba(233,196,106,0.3)"
                          : "0.5px solid #222240")
                        : "none",
                      transition: "background 0.05s",
                    }}
                  />
                );
              })
            )}
          </div>
          {/* Info bar */}
          <div style={{
            marginTop: 6, display: "flex", gap: 16, fontSize: 11, color: "#445",
          }}>
            <span>📐 {gridSize}×{gridSize}</span>
            <span>◼ {filledCount} / {totalCells}</span>
            <span>{((filledCount / totalCells) * 100).toFixed(1)}% preenchido</span>
          </div>
        </div>

        {/* Side panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 160 }}>
          {/* Palette */}
          <div>
            <p style={{ fontSize: 11, color: "#445", margin: "0 0 8px", letterSpacing: 2 }}>COR ATIVA</p>
            <div style={{
              width: 36, height: 36, borderRadius: 6,
              background: color, border: "2px solid #a8dadc",
              marginBottom: 10,
            }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
              {PALETTE.map(c => (
                <div key={c} onClick={() => { setColor(c); setTool("paint"); }} style={{
                  width: 28, height: 28, borderRadius: 4, background: c,
                  border: color === c ? "2.5px solid #a8dadc" : "1.5px solid #2a2a4e",
                  cursor: "pointer", transform: color === c ? "scale(1.15)" : "scale(1)",
                  transition: "transform 0.1s",
                }} />
              ))}
            </div>
            <input type="color" value={color} onChange={e => { setColor(e.target.value); setTool("paint"); }}
              style={{ marginTop: 8, width: "100%", height: 28, border: "none", background: "none", cursor: "pointer" }}
              title="Cor personalizada" />
          </div>

          {/* Symmetry info */}
          <div style={{ background: "#1a1a2e", borderRadius: 8, padding: 12, border: "1px solid #2a2a4e" }}>
            <p style={{ fontSize: 11, color: "#445", margin: "0 0 8px", letterSpacing: 2 }}>SIMETRIA</p>
            <p style={{ fontSize: 13, color: "#a8dadc", margin: 0 }}>{SYMMETRY_LABELS[symmetry]}</p>
            <div style={{ marginTop: 8, fontSize: 11, color: "#556", lineHeight: 1.6 }}>
              {symmetry === "none" && "Sem espelhamento."}
              {symmetry === "horizontal" && "Espelha esquerda ↔ direita."}
              {symmetry === "vertical" && "Espelha cima ↕ baixo."}
              {symmetry === "both" && "Espelha nos 4 quadrantes."}
              {symmetry === "rotate4" && "Rotação 90° × 4."}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#334" }}>
              <div>Células pintadas: <span style={{ color: "#e9c46a" }}>{filledCount}</span></div>
              {symmetry !== "none" && (
                <div>Eixos ativos: <span style={{ color: "#2a9d8f" }}>
                  {symmetry === "horizontal" ? 1 : symmetry === "vertical" ? 1 : symmetry === "both" ? 2 : 4}
                </span></div>
              )}
            </div>
          </div>

          {/* Guide toggle */}
          <button onClick={() => setShowGuides(v => !v)} style={smBtn(showGuides, "#6d6875")}>
            {showGuides ? "◼" : "◻"} Grade visível
          </button>
        </div>
      </div>
    </div>
  );
}

function smBtn(active, accent = "#457b9d") {
  return {
    background: "transparent",
    border: `1px solid ${active ? accent : "#2a2a4e"}`,
    color: active ? accent : "#445",
    borderRadius: 5, padding: "4px 10px",
    cursor: "pointer", fontSize: 11, transition: "all 0.15s",
  };
}
