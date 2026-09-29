"use client";

import React from "react";

interface Node {
  label: string;
  icon?: string;
  type: "api" | "calls" | "keploy" | "tests" | "maps" | "replay" | "pass";
}

export function ArchitectureDiagram() {
  const nodeStyle = (type: Node["type"]): string => {
    const map: Record<Node["type"], string> = {
      api: "arch-node arch-node-api",
      calls: "arch-node arch-node-calls",
      keploy: "arch-node arch-node-keploy",
      tests: "arch-node arch-node-tests",
      maps: "arch-node arch-node-maps",
      replay: "arch-node arch-node-replay",
      pass: "arch-node arch-node-pass",
    };
    return map[type];
  };

  return (
    <figure className="arch-diagram" aria-label="Keploy workflow diagram">
      {/* Go API */}
      <div className={nodeStyle("api")}>
        <span aria-hidden="true">🐹</span>
        <span>Go API (mux-mysql)</span>
      </div>

      <Arrow />

      {/* Real API Calls */}
      <div className={nodeStyle("calls")}>
        <span aria-hidden="true">⚡</span>
        <span>Real API Requests</span>
      </div>

      <Arrow />

      {/* Keploy */}
      <div className={nodeStyle("keploy")}>
        <span aria-hidden="true">🔴</span>
        <span>Keploy 3.8.47</span>
        <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>intercepts & records</span>
      </div>

      {/* Branch */}
      <BranchArrow />

      {/* Tests + Mappings side by side */}
      <div className="arch-node-split">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div className={nodeStyle("tests")}>
            <span aria-hidden="true">📄</span>
            <span>Test Cases</span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            YAML snapshots
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div className={nodeStyle("maps")}>
            <span aria-hidden="true">🗺️</span>
            <span>Mappings</span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            dependency stubs
          </span>
        </div>
      </div>

      <Arrow />

      {/* Replay */}
      <div className={nodeStyle("replay")}>
        <span aria-hidden="true">▶️</span>
        <span>Test Replay</span>
      </div>

      <Arrow />

      {/* Assertions */}
      <div
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.375rem 1rem",
        }}
      >
        <span>Response assertions</span>
      </div>

      <Arrow />

      {/* Pass */}
      <div className={nodeStyle("pass")}>
        <span aria-hidden="true">✅</span>
        <span>6 / 6 Passed</span>
      </div>
    </figure>
  );
}

function Arrow() {
  return (
    <div className="arch-arrow" aria-hidden="true">
      <div className="arch-arrow-line" />
      <div className="arch-arrow-head">▼</div>
    </div>
  );
}

function BranchArrow() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0.25rem 0",
      }}
    >
      <div style={{ width: "1px", height: "1.25rem", background: "var(--bg-border-accent)" }} />
      <div
        style={{
          width: "180px",
          height: "1px",
          background: "linear-gradient(to right, rgba(249,115,22,0.4), rgba(168,85,247,0.4))",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", width: "180px" }}>
        <span style={{ color: "rgba(34,197,94,0.4)", fontSize: "0.75rem" }}>▼</span>
        <span style={{ color: "rgba(168,85,247,0.4)", fontSize: "0.75rem" }}>▼</span>
      </div>
    </div>
  );
}
