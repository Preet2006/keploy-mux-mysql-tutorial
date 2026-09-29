"use client";

import React from "react";

const flowNodes = [
  { label: "Real API Call", color: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.35)", text: "#a5b4fc" },
  { label: "Keploy Records", color: "var(--keploy-glow)", border: "var(--bg-border-accent)", text: "var(--keploy-orange)" },
  { label: "Test Case + Mapping", color: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", text: "#4ade80" },
  { label: "Replay", color: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)", text: "#fb923c" },
  { label: "6/6 Passed ✓", color: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.35)", text: "#4ade80" },
];

export function HeroFlow() {
  return (
    <div
      role="img"
      aria-label="Keploy workflow: Real API Call → Keploy Records → Test Case and Mapping → Replay → 6/6 Passed"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.375rem",
        margin: "2rem 0",
        padding: "1.5rem",
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      {flowNodes.map((node, i) => (
        <React.Fragment key={node.label}>
          <div
            style={{
              padding: "0.5rem 1.125rem",
              borderRadius: "var(--radius-md)",
              background: node.color,
              border: `1px solid ${node.border}`,
              color: node.text,
              fontSize: "0.875rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              transition: "transform var(--transition-base)",
            }}
          >
            {node.label}
          </div>
          {i < flowNodes.length - 1 && (
            <span style={{ color: "rgba(249,115,22,0.4)", fontSize: "1.125rem" }} aria-hidden="true">
              →
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
