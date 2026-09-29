"use client";

import React from "react";

interface StepProps {
  number: number | string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

export function Step({ number, title, children, last = false }: StepProps) {
  return (
    <div className="step-wrapper">
      <div className="step-connector">
        <div className="step-num">{number}</div>
        {!last && <div className="step-line" />}
      </div>
      <div className="step-body">
        <div className="step-title">{title}</div>
        {children}
      </div>
    </div>
  );
}
