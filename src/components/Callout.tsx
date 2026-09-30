"use client";

import React from "react";

type CalloutType = "info" | "tip" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { defaultTitle: string }> = {
  info: { defaultTitle: "Note" },
  tip: { defaultTitle: "Why This Matters" },
  warning: { defaultTitle: "Heads Up" },
  success: { defaultTitle: "Result" },
  error: { defaultTitle: "Error" },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { defaultTitle } = config[type];
  return (
    <div className={`callout callout-${type}`} role="note">
      <div className="callout-bar" aria-hidden="true" />
      <div className="callout-body">
        <div className="callout-title">{title ?? defaultTitle}</div>
        <div className="callout-text">{children}</div>
      </div>
    </div>
  );
}
