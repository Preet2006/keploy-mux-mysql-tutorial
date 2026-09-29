"use client";

import React from "react";

interface ExpectedOutputProps {
  lines: string[];
  label?: string;
}

export function ExpectedOutput({ lines, label = "Expected Output" }: ExpectedOutputProps) {
  return (
    <div style={{ margin: "0.75rem 0 1.25rem" }}>
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "0.375rem",
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
        }}
      >
        <span aria-hidden="true">↳</span>
        {label}
      </div>
      <div
        style={{
          background: "rgba(34,197,94,0.04)",
          border: "1px solid rgba(34,197,94,0.12)",
          borderRadius: "var(--radius-md)",
          padding: "0.75rem 1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          lineHeight: 1.7,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          maxWidth: "100%",
        }}
      >
        {lines.map((line, i) => {
          const isPass = line.startsWith("✓") || line.startsWith("●") || line.toLowerCase().includes("passed");
          const isMuted = line.startsWith("…") || line.startsWith("#");
          return (
            <div
              key={i}
              style={{
                color: isPass ? "#4ade80" : isMuted ? "var(--text-muted)" : "#c9d1d9",
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
