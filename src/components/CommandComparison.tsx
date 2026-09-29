"use client";

import React from "react";

interface CommandComparisonProps {
  badCommand: string;
  badLabel?: string;
  badError?: string;
  goodCommand: string;
  goodLabel?: string;
  goodNote?: string;
}

export function CommandComparison({
  badCommand,
  badLabel = "What Didn't Work",
  badError,
  goodCommand,
  goodLabel = "What Did Work",
  goodNote,
}: CommandComparisonProps) {
  return (
    <div className="cmd-comparison">
      <div className="cmd-comparison-col cmd-comparison-bad">
        <div className="cmd-comparison-label">✗ {badLabel}</div>
        <div className="cmd-comparison-code">{badCommand}</div>
        {badError && (
          <div
            style={{
              marginTop: "0.625rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#f87171",
              background: "rgba(239,68,68,0.06)",
              padding: "0.5rem 0.625rem",
              borderRadius: "4px",
              border: "1px solid rgba(239,68,68,0.1)",
            }}
          >
            {badError}
          </div>
        )}
      </div>
      <div className="cmd-comparison-col cmd-comparison-good">
        <div className="cmd-comparison-label">✓ {goodLabel}</div>
        <div className="cmd-comparison-code">{goodCommand}</div>
        {goodNote && (
          <div
            style={{
              marginTop: "0.625rem",
              fontSize: "0.75rem",
              color: "#86efac",
            }}
          >
            {goodNote}
          </div>
        )}
      </div>
    </div>
  );
}
