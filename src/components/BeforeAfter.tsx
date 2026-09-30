"use client";

import React from "react";

export function BeforeAfter() {
  const before = [
    { step: "Manual curl", detail: "Test each endpoint by hand" },
    { step: "No assertions", detail: "Hope the response looks right" },
    { step: "No DB state", detail: "Manually seed / reset fixtures" },
    { step: "No regression safety", detail: "Find bugs in production" },
  ];

  const after = [
    { step: "keploy record", detail: "Real traffic captured automatically" },
    { step: "YAML test cases", detail: "Every request + response stored" },
    { step: "Dependency mocks", detail: "mappings.yaml replays DB state" },
    { step: "keploy test", detail: "6/6 assertions on every run" },
  ];

  return (
    <div
      role="region"
      aria-label="Before and after Keploy comparison"
      style={{
        display: "grid",
        gap: "1rem",
        margin: "1.5rem 0",
      }}
      className="before-after-grid"
    >
      {/* BEFORE */}
      <div
        style={{
          background: "rgba(239,68,68,0.04)",
          border: "1px solid rgba(239,68,68,0.12)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
        }}
      >
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#f87171",
            marginBottom: "1rem",
          }}
        >
          Without Keploy
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {before.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6875rem",
                  color: "#f87171",
                  flexShrink: 0,
                  marginTop: "0.0625rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AFTER */}
      <div
        style={{
          background: "rgba(34,197,94,0.04)",
          border: "1px solid rgba(34,197,94,0.15)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
        }}
      >
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4ade80",
            marginBottom: "1rem",
          }}
        >
          With Keploy
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {after.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6875rem",
                  color: "#4ade80",
                  flexShrink: 0,
                  marginTop: "0.0625rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
