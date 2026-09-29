"use client";

import React, { useEffect, useState } from "react";

const sections = [
  { id: "what-were-building", label: "What We're Building", num: "01" },
  { id: "why-keploy", label: "Why Keploy?", num: "02" },
  { id: "prerequisites", label: "Prerequisites", num: "03" },
  { id: "run-the-application", label: "Run the Application", num: "04" },
  { id: "start-recording", label: "Start Recording", num: "05" },
  { id: "what-keploy-captured", label: "What Keploy Captured", num: "06" },
  { id: "understanding-the-tests", label: "Understanding the Tests", num: "07" },
  { id: "replay-the-tests", label: "Replay the Tests", num: "08" },
  { id: "the-6-6-result", label: "The 6/6 Result", num: "09" },
  { id: "troubleshooting", label: "Troubleshooting", num: "10" },
  { id: "what-i-learned", label: "What I Learned", num: "11" },
  { id: "next-steps", label: "Next Steps", num: "12" },
];

export function Sidebar() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.set(id, observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Tutorial sections">
      {/* Logo mark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          padding: "0 0.75rem",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            background: "var(--keploy-glow)",
            border: "1px solid var(--bg-border-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
          }}
          aria-hidden="true"
        >
          🔴
        </div>
        <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>
          Keploy Tutorial
        </span>
      </div>

      <div className="nav-section-label">Sections</div>

      {sections.map(({ id, label, num }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`nav-item${active === id ? " active" : ""}`}
          onClick={handleClick(id)}
        >
          <span className="nav-num">{num}</span>
          <span>{label}</span>
        </a>
      ))}

      <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--bg-border)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--color-success)", marginBottom: "0.25rem" }}>
            ✓ All tests passed
          </div>
          <div>Keploy 3.8.47 · mux-mysql</div>
          <div style={{ marginTop: "0.25rem" }}>6/6 test cases</div>
        </div>
      </div>
    </nav>
  );
}
