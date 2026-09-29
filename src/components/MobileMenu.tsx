"use client";

import React, { useState } from "react";

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

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleNav = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <button
        className="mobile-nav-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        style={{
          display: "flex",
          width: "36px",
          height: "36px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--bg-border)",
          background: "transparent",
          color: "var(--text-secondary)",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.125rem",
          transition: "all var(--transition-fast)",
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <nav
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--bg-surface)",
            zIndex: 40,
            padding: "1.5rem",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
            }}
          >
            Sections
          </div>
          {sections.map(({ id, label, num }) => (
            <button
              key={id}
              className="nav-item"
              onClick={() => handleNav(id)}
              style={{ width: "100%", textAlign: "left" }}
            >
              <span className="nav-num">{num}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
