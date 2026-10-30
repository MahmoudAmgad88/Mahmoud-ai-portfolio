// Diagram and interactive chart used only by the lazily loaded case-study pages.
import { useEffect, useId, useState } from "react";
import { Pause, Play, ShieldCheck } from "lucide-react";

export function Architecture() {
  return (
    <div className="architecture">
      <div className="architecture-row">
        <div className="diagram-label">
          <span>01</span> DETECTION LAYER
        </div>
        <ol>
          {[
            "KPI export",
            "Clean & prepare",
            "Forecast + intervals",
            "Score & rank",
            "Reports",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <div className="evidence-bridge">
        <span />
        Anomaly evidence feeds the RCA concept
        <span />
      </div>
      <div className="architecture-row">
        <div className="diagram-label">
          <span>02</span> RCA PROTOTYPE
        </div>
        <ol>
          {[
            "Evidence + FAISS",
            "Retrieve & re-rank",
            "Grounding gate",
            "Facts | hypotheses",
            "Engineer review",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <div className="diagram-note">
        <ShieldCheck size={17} />
        No evidence → no RCA verdict. Every network decision stays with the
        engineer.
      </div>
    </div>
  );
}

export function AnomalyChart() {
  const chartId = useId();
  const [scenario, setScenario] = useState("degradation");
  const [day, setDay] = useState(34);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setDay((current) => (current >= 49 ? 1 : current + 1)),
      650,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const values = Array.from({ length: 49 }, (_, i) => {
    const base = 102 + Math.sin(i * 0.45) * 13 + Math.cos(i * 0.19) * 7;
    return {
      x: 40 + i * 10,
      base,
      actual:
        base +
        Math.sin(i * 2.3) * 7 +
        (i >= 31 && i <= 36
          ? scenario === "degradation"
            ? 48
            : scenario === "spike"
              ? -48
              : 0
          : 0),
    };
  });
  const line = values.map((p) => `${p.x},${p.actual}`).join(" ");
  const band = [
    ...values.map((p) => `${p.x},${p.base - 20}`),
    ...[...values].reverse().map((p) => `${p.x},${p.base + 20}`),
  ].join(" ");
  const selected = values[day - 1];
  const flagged = Math.abs(selected.actual - selected.base) > 20;
  return (
    <figure className="chart">
      <div className="chart-heading">
        <span>
          <span className="live-dot" /> SIGNAL / OBSERVATION
        </span>
        <span className="chart-code">TS–01</span>
      </div>
      <div className="chart-title">
        Finding the signal.
        <br />
        <span>Keeping the context.</span>
      </div>
      <div
        className="scenario-controls"
        role="group"
        aria-label="Synthetic signal scenario"
      >
        {[
          ["degradation", "Degradation"],
          ["spike", "Spike"],
          ["normal", "Normal"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setScenario(value)}
            aria-pressed={scenario === value}
          >
            {label}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 560 225"
        role="img"
        aria-label={`Synthetic time series: ${scenario === "normal" ? "observations within the expected range" : `six consecutive observations ${scenario === "spike" ? "above" : "below"} the expected range`}. No real network data.`}
      >
        <text x="40" y="20" className="axis-label">
          NORMALISED SIGNAL
        </text>
        {[55, 100, 145, 190].map((y, i) => (
          <g key={y}>
            <line x1="40" x2="530" y1={y} y2={y} className="grid-line" />
            <text x="10" y={y + 4} className="axis-label">
              {100 - i * 25}
            </text>
          </g>
        ))}
        <rect
          x="345"
          y="38"
          width="67"
          height="153"
          fill="var(--accent)"
          opacity=".035"
        />
        <polygon points={band} fill="var(--accent)" opacity=".12" />
        <polyline
          points={values.map((p) => `${p.x},${p.base}`).join(" ")}
          fill="none"
          stroke="var(--muted)"
          strokeDasharray="4 5"
        />
        <polyline
          points={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {scenario !== "normal" &&
          values
            .slice(31, 37)
            .map((p) => (
              <circle
                key={p.x}
                cx={p.x}
                cy={p.actual}
                r="3.8"
                fill="var(--warning)"
                stroke="var(--surface)"
                strokeWidth="2"
              />
            ))}
        <line
          x1={selected.x}
          x2={selected.x}
          y1="38"
          y2="191"
          stroke="var(--muted)"
          strokeDasharray="3 4"
          opacity=".6"
        />
        <circle
          cx={selected.x}
          cy={selected.actual}
          r="5"
          fill={flagged ? "var(--warning)" : "var(--accent)"}
          stroke="var(--surface)"
          strokeWidth="2"
        />
        {scenario !== "normal" && (
          <text x="349" y="30" className="annotation">
            DEVIATION
          </text>
        )}
        <text x="40" y="215" className="axis-label">
          DAY 01
        </text>
        <text x="257" y="215" className="axis-label">
          DAY 25
        </text>
        <text x="485" y="215" className="axis-label">
          DAY 49
        </text>
      </svg>
      <div className="chart-legend">
        <span>
          <i className="legend-line" />
          Observed
        </span>
        <span>
          <i className="legend-band" />
          Expected range
        </span>
        <span>
          <i className="legend-point" />
          Flagged
        </span>
      </div>
      <div className="signal-inspector">
        <label htmlFor={chartId}>
          Inspect day <strong>{String(day).padStart(2, "0")}</strong>
        </label>
        <input
          id={chartId}
          type="range"
          min="1"
          max="49"
          value={day}
          onChange={(event) => {
            setPlaying(false);
            setDay(Number(event.target.value));
          }}
        />
        <output
          className={flagged ? "signal-flagged" : ""}
          aria-live={playing ? "off" : "polite"}
        >
          {flagged ? "Outside range" : "Within range"}
        </output>
      </div>
      <button className="chart-play" onClick={() => setPlaying(!playing)}>
        {playing ? <Pause size={13} /> : <Play size={13} />}
        {playing ? "Pause playback" : "Play signal"}
      </button>
      <figcaption>
        Interactive illustration · Synthetic data · No live inference
      </figcaption>
    </figure>
  );
}
