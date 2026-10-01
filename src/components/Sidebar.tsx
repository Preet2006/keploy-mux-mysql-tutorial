"use client";

import React from "react";
import { SECTIONS, useActiveSection, scrollToSection } from "@/lib/sections";

export function Sidebar() {
  const active = useActiveSection();

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
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
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            background: "var(--keploy-orange)",
          }}
          aria-hidden="true"
        />
        <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>
          Keploy Tutorial
        </span>
      </div>

      <div className="nav-section-label">Sections</div>

      {SECTIONS.map(({ id, label, num }) => (
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
    </nav>
  );
}
