"use client";

import React from "react";

interface StatusCardProps {
  items: { label: string; value: string; status?: "ok" | "info" }[];
}

export function StatusCard({ items }: StatusCardProps) {
  return (
    <div
      role="region"
      aria-label="Setup status"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        margin: "1.5rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {item.label}
          </span>
          <span
            className="status-badge status-badge-success"
          >
            <span className="status-badge-dot animate-pulse-dot" aria-hidden="true" />
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
