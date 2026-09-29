"use client";

import React from "react";

interface InfoCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export function InfoCard({ title, icon, children }: InfoCardProps) {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.625rem",
        }}
      >
        {icon && <span style={{ fontSize: "1.125rem" }} aria-hidden="true">{icon}</span>}
        <span
          style={{
            fontWeight: 600,
            fontSize: "0.9375rem",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

interface InfoCardGridProps {
  children: React.ReactNode;
}

export function InfoCardGrid({ children }: InfoCardGridProps) {
  return <div className="card-grid">{children}</div>;
}
