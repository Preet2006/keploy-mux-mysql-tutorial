"use client";

import React, { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "keploy-tutorial-progress";

export const PROGRESS_STEPS = [
  { id: "clone", label: "Repo cloned" },
  { id: "mysql", label: "MySQL running" },
  { id: "build", label: "App built" },
  { id: "record", label: "Recording started" },
  { id: "requests", label: "API requests made" },
  { id: "tests-generated", label: "Tests generated" },
  { id: "replay", label: "Tests replayed" },
  { id: "passed", label: "6/6 passed" },
] as const;

type StepId = (typeof PROGRESS_STEPS)[number]["id"];

export function ProgressTracker() {
  const [done, setDone] = useState<Set<StepId>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setDone(new Set(JSON.parse(saved) as StepId[]));
    } catch {}
  }, []);

  const toggle = useCallback((id: StepId) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const reset = () => {
    setDone(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  if (!mounted) return null;

  const count = done.size;
  const total = PROGRESS_STEPS.length;
  const pct = Math.round((count / total) * 100);

  return (
    <div
      role="region"
      aria-label="Tutorial progress tracker"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: "var(--radius-xl)",
        padding: "1.25rem",
        margin: "2rem 0",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Your Progress
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.1875rem" }}>
            {count}/{total} steps completed
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {count === total && (
            <span style={{ fontSize: "0.75rem", color: "#4ade80", fontWeight: 700 }}>🎉 Done!</span>
          )}
          <button
            onClick={reset}
            aria-label="Reset progress"
            style={{
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              background: "transparent",
              border: "1px solid var(--bg-border)",
              borderRadius: "4px",
              padding: "0.25rem 0.5rem",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              transition: "color 150ms ease",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "4px",
          background: "var(--bg-elevated)",
          borderRadius: "999px",
          marginBottom: "1rem",
          overflow: "hidden",
        }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% complete`}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: count === total
              ? "linear-gradient(to right, #22c55e, #4ade80)"
              : "linear-gradient(to right, var(--keploy-orange-dim), var(--keploy-orange))",
            borderRadius: "999px",
            transition: "width 400ms ease",
          }}
        />
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {PROGRESS_STEPS.map((step, i) => {
          const isDone = done.has(step.id);
          const isNext = !isDone && i === PROGRESS_STEPS.findIndex((s) => !done.has(s.id));
          return (
            <button
              key={step.id}
              onClick={() => toggle(step.id)}
              aria-pressed={isDone}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.5rem 0.625rem",
                borderRadius: "6px",
                border: isNext ? "1px solid var(--bg-border-accent)" : "1px solid transparent",
                background: isDone ? "rgba(34,197,94,0.05)" : isNext ? "var(--keploy-glow)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                fontFamily: "var(--font-sans)",
                transition: "all 150ms ease",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: `2px solid ${isDone ? "#22c55e" : isNext ? "var(--keploy-orange)" : "var(--bg-border)"}`,
                  background: isDone ? "rgba(34,197,94,0.15)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 200ms ease",
                }}
                aria-hidden="true"
              >
                {isDone && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {isNext && !isDone && (
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--keploy-orange)" }} />
                )}
              </span>
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: isDone ? "#4ade80" : isNext ? "var(--keploy-orange)" : "var(--text-muted)",
                  fontWeight: isDone || isNext ? 500 : 400,
                  textDecoration: isDone ? "line-through" : "none",
                  transition: "all 200ms ease",
                }}
              >
                {step.label}
              </span>
              {isNext && (
                <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "var(--keploy-orange)", fontWeight: 700 }}>
                  → Next
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "0.75rem", fontSize: "0.6875rem", color: "var(--text-muted)", textAlign: "center" }}>
        Click any step to mark it done. Progress is saved in your browser.
      </div>
    </div>
  );
}
