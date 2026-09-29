"use client";

import React from "react";

type CalloutType = "info" | "tip" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: string; defaultTitle: string }> = {
  info: { icon: "ℹ️", defaultTitle: "Note" },
  tip: { icon: "💡", defaultTitle: "Why This Matters" },
  warning: { icon: "⚠️", defaultTitle: "Heads Up" },
  success: { icon: "✅", defaultTitle: "Success" },
  error: { icon: "🚫", defaultTitle: "Error" },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon, defaultTitle } = config[type];
  return (
    <div className={`callout callout-${type}`} role="note">
      <span className="callout-icon" aria-hidden="true">{icon}</span>
      <div className="callout-body">
        <div className="callout-title">{title ?? defaultTitle}</div>
        <div className="callout-text">{children}</div>
      </div>
    </div>
  );
}
