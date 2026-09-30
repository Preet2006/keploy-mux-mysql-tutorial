"use client";

import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="card">
      <div
        style={{
          fontWeight: 600,
          fontSize: "0.9375rem",
          color: "var(--text-primary)",
          marginBottom: "0.625rem",
        }}
      >
        {title}
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
