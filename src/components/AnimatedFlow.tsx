"use client";

import React, { useEffect, useState, useRef } from "react";

type Phase = "idle" | "request" | "intercept" | "capture" | "replay" | "pass";

const PHASES: Phase[] = ["idle", "request", "intercept", "capture", "replay", "pass"];

const phaseLabels: Record<Phase, string> = {
  idle: "Waiting…",
  request: "HTTP Request sent",
  intercept: "Keploy intercepts",
  capture: "Test + Mapping saved",
  replay: "Replaying recorded tests",
  pass: "6 / 6 Passed",
};

export function AnimatedFlow() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [running, setRunning] = useState(false);
  const [loop, setLoop] = useState(false);
  // Store ALL timer IDs so every one is cleared on unmount (not just the last)
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Ref so the finish callback reads the current loop value, not a stale closure
  const loopRef = useRef(loop);
  loopRef.current = loop;

  const clearAllTimers = () => {
    timerIds.current.forEach(clearTimeout);
    timerIds.current = [];
  };

  const runAnimation = () => {
    clearAllTimers();
    setRunning(true);
    const delays = [0, 900, 1800, 2800, 3900, 5000];

    PHASES.forEach((p, idx) => {
      const id = setTimeout(() => {
        setPhase(p);
        if (idx === PHASES.length - 1) {
          const finishId = setTimeout(() => {
            setRunning(false);
            if (loopRef.current) {
              const loopId = setTimeout(runAnimation, 2000);
              timerIds.current.push(loopId);
            }
          }, 1500);
          timerIds.current.push(finishId);
        }
      }, delays[idx]);
      timerIds.current.push(id);
    });
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const isActive = (p: Phase) => PHASES.indexOf(phase) >= PHASES.indexOf(p) && phase !== "idle";

  return (
    <div
      role="region"
      aria-label="Animated Keploy workflow diagram"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: "var(--radius-xl)",
        padding: "1.25rem",
        margin: "2rem 0",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
            How Keploy Works
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {phaseLabels[phase]}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--text-muted)", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={loop}
              onChange={e => setLoop(e.target.checked)}
              style={{ accentColor: "var(--keploy-orange)" }}
            />
            Loop
          </label>
          <button
            onClick={runAnimation}
            disabled={running}
            aria-label="Run animation"
            style={{
              padding: "0.4375rem 1rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--bg-border-accent)",
              background: running ? "transparent" : "var(--keploy-glow)",
              color: "var(--keploy-orange)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: running ? "not-allowed" : "pointer",
              opacity: running ? 0.5 : 1,
              transition: "all 150ms ease",
              fontFamily: "var(--font-sans)",
            }}
          >
            {running ? "Running…" : phase === "pass" ? "Replay ▶" : "▶ Run"}
          </button>
        </div>
      </div>

      {/* Flow */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          width: "100%",
        }}
      >
        <FlowNode label="curl / HTTP client" sublabel="sends request" active={isActive("request")} color="indigo" />
        <FlowArrow active={isActive("request")} />
        <FlowNode label="Go mux-mysql app" sublabel="port :8080" active={isActive("request")} color="blue" />
        <FlowArrow active={isActive("intercept")} />

        {/* Keploy node — highlighted specially */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.875rem 1.25rem",
            borderRadius: "var(--radius-lg)",
            border: `2px solid ${isActive("intercept") ? "var(--keploy-orange)" : "var(--bg-border)"}`,
            background: isActive("intercept") ? "var(--keploy-glow)" : "var(--bg-elevated)",
            maxWidth: "100%",
            textAlign: "center",
            transition: "all 400ms ease",
            boxShadow: isActive("intercept") ? "0 0 24px rgba(249,115,22,0.2)" : "none",
          }}
        >
          <div style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }} aria-hidden="true">🔴</div>
          <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: isActive("intercept") ? "var(--keploy-orange)" : "var(--text-primary)" }}>
            Keploy 3.8.47
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            intercepts HTTP + DB traffic
          </div>

          {/* Sub-captures */}
          {isActive("capture") && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.375rem",
                marginTop: "0.875rem",
                animation: "fade-up 0.4s ease both",
              }}
            >
              <CaptureChip label="HTTP req" />
              <CaptureChip label="HTTP resp" />
              <CaptureChip label="DB query" />
            </div>
          )}
        </div>

        <FlowArrow active={isActive("capture")} split />

        {/* Side-by-side: Test + Mapping */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", width: "100%" }}>
          <SideNode
            label="Test Case YAML"
            sublabel="get-all-1.yaml"
            active={isActive("capture")}
            color="green"
          />
          <SideNode
            label="Mapping YAML"
            sublabel="DB state stub"
            active={isActive("capture")}
            color="purple"
          />
        </div>

        <FlowArrow active={isActive("replay")} />
        <FlowNode label="keploy test" sublabel="replay mode" active={isActive("replay")} color="orange" />
        <FlowArrow active={isActive("replay")} />

        {/* Pass */}
        <div
          style={{
            padding: "0.875rem 1.5rem",
            borderRadius: "var(--radius-lg)",
            border: `2px solid ${isActive("pass") ? "rgba(34,197,94,0.4)" : "var(--bg-border)"}`,
            background: isActive("pass") ? "rgba(34,197,94,0.08)" : "var(--bg-elevated)",
            textAlign: "center",
            transition: "all 500ms ease",
            boxShadow: isActive("pass") ? "0 0 32px rgba(34,197,94,0.12)" : "none",
          }}
        >
          <div style={{ fontSize: isActive("pass") ? "2rem" : "1.25rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: isActive("pass") ? "#4ade80" : "var(--text-muted)", transition: "all 400ms ease", lineHeight: 1 }}>
            {isActive("pass") ? "6 / 6" : "— / —"}
          </div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: isActive("pass") ? "#22c55e" : "var(--text-muted)", marginTop: "0.375rem", transition: "all 400ms ease" }}>
            {isActive("pass") ? "ALL PASSED" : "RESULT"}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowNode({ label, sublabel, active, color }: { label: string; sublabel?: string; active: boolean; color: string }) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    indigo: { bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.25)", text: "#a5b4fc" },
    blue: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)", text: "#93c5fd" },
    orange: { bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.25)", text: "#fb923c" },
    green: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", text: "#4ade80" },
  };
  const c = colorMap[color] ?? colorMap.blue;
  return (
    <div
      style={{
        padding: "0.6875rem 1.5rem",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${active ? c.border : "var(--bg-border)"}`,
        background: active ? c.bg : "var(--bg-elevated)",
        textAlign: "center",
        minWidth: "180px",
        transition: "all 350ms ease",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: active ? c.text : "var(--text-secondary)" }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

function SideNode({ label, sublabel, active, color }: { label: string; sublabel?: string; active: boolean; color: string }) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    green: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", text: "#4ade80" },
    purple: { bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.25)", text: "#c084fc" },
  };
  const c = colorMap[color] ?? colorMap.green;
  return (
    <div
      style={{
        padding: "0.6875rem 1rem",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${active ? c.border : "var(--bg-border)"}`,
        background: active ? c.bg : "var(--bg-elevated)",
        textAlign: "center",
        minWidth: "130px",
        transition: "all 350ms ease",
        animation: active ? "fade-up 0.4s ease both" : "none",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: active ? c.text : "var(--text-muted)" }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "0.25rem" }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

function FlowArrow({ active, split }: { active: boolean; split?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "2rem",
        position: "relative",
      }}
    >
      {split ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
          <div style={{ width: "1px", flex: 1, background: active ? "var(--keploy-orange)" : "var(--bg-border)", transition: "background 300ms ease" }} />
          <div style={{ width: "160px", height: "1px", background: active ? "linear-gradient(to right, rgba(34,197,94,0.5), rgba(168,85,247,0.5))" : "var(--bg-border)", transition: "background 300ms ease" }} />
          <div style={{ display: "flex", justifyContent: "space-between", width: "160px" }}>
            <span style={{ color: active ? "#4ade80" : "var(--text-muted)", fontSize: "0.6875rem", transition: "color 300ms ease" }}>▼</span>
            <span style={{ color: active ? "#c084fc" : "var(--text-muted)", fontSize: "0.6875rem", transition: "color 300ms ease" }}>▼</span>
          </div>
        </div>
      ) : (
        <>
          <div style={{ width: "1px", flex: 1, background: active ? "rgba(249,115,22,0.5)" : "var(--bg-border)", transition: "background 350ms ease" }} />
          <div style={{ color: active ? "rgba(249,115,22,0.6)" : "var(--text-muted)", fontSize: "0.6875rem", transition: "color 350ms ease" }}>▼</div>
        </>
      )}
    </div>
  );
}

function CaptureChip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.625rem",
        fontWeight: 600,
        background: "rgba(249,115,22,0.12)",
        border: "1px solid rgba(249,115,22,0.25)",
        borderRadius: "4px",
        padding: "0.1875rem 0.5rem",
        color: "#fb923c",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
