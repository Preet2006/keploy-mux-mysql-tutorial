"use client";

import React, { useState } from "react";

interface TroubleshootItem {
  problem: string;
  reason: string;
  command?: string;
  expected?: string;
  next: string;
}

interface TroubleshootCardProps {
  item: TroubleshootItem;
}

export function TroubleshootCard({ item }: TroubleshootCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        margin: "0.75rem 0",
        transition: "border-color 200ms ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.875rem 1.125rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "var(--font-sans)",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", flex: 1 }}>
          {item.problem}
        </span>
        <span
          aria-hidden="true"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 200ms ease",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          style={{
            borderTop: "1px solid var(--bg-border)",
            padding: "1rem 1.125rem",
            animation: "fade-up 0.2s ease both",
          }}
        >
          <Row label="Likely Reason" value={item.reason} />

          {item.command && (
            <div style={{ marginTop: "0.75rem" }}>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.375rem" }}>
                Command / Check
              </div>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  background: "#0a0c10",
                  borderRadius: "6px",
                  padding: "0.75rem 1rem",
                  margin: 0,
                  overflowX: "auto",
                  border: "1px solid var(--bg-border)",
                  color: "#c9d1d9",
                }}
              >
                <code>{item.command}</code>
              </pre>
            </div>
          )}

          {item.expected && (
            <div style={{ marginTop: "0.75rem" }}>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.375rem" }}>
                What Should Happen
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.6,
                  color: "#86efac",
                  background: "rgba(34,197,94,0.05)",
                  border: "1px solid rgba(34,197,94,0.1)",
                  borderRadius: "6px",
                  padding: "0.625rem 0.875rem",
                }}
              >
                {item.expected}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "0.75rem",
              padding: "0.625rem 0.875rem",
              borderRadius: "6px",
              background: "var(--keploy-glow)",
              border: "1px solid var(--bg-border-accent)",
              fontSize: "0.8125rem",
              color: "var(--keploy-orange)",
            }}
          >
            <span style={{ fontWeight: 700 }}>Next: </span>
            {item.next}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", minWidth: "110px", flexShrink: 0, paddingTop: "0.0625rem" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  );
}
