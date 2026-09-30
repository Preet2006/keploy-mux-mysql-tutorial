"use client";

import React, { useState } from "react";

interface TestCase {
  name: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  statusCode: number;
  requestBody?: string;
  responseLabel?: string;
  responseBody: string;
  dbInteraction: string;
  description: string;
}

const testCases: TestCase[] = [
  {
    name: "post-create-1",
    method: "POST",
    path: "/create",
    statusCode: 200,
    requestBody: `{
  "link": "https://keploy.io"
}`,
    responseBody: `{
  "message": "Converted",
  "link": "http://localhost:8080/links/1",
  "status": true
}`,
    dbInteraction: `insert into list (website) values("https://keploy.io")`,
    description: "Creates a new short link. Keploy captures the INSERT query and the shortened link URL returned in the response.",
  },
  {
    name: "get-all-1",
    method: "GET",
    path: "/all",
    statusCode: 200,
    responseBody: `{
  "message": [
    { "id": "1", "website": "https://keploy.io" }
  ],
  "status": true
}`,
    dbInteraction: `select * from list`,
    description: "Fetches all stored links. Keploy asserts the full JSON response matches — the recorded mapping provides the DB rows.",
  },
  {
    name: "get-links-by-id-1",
    method: "GET",
    path: "/links/{id}",
    statusCode: 307,
    responseLabel: "Response Headers",
    responseBody: `HTTP/1.1 307 Temporary Redirect
Location: https://keploy.io`,
    dbInteraction: `select website from list where id=1`,
    description: "Redirects to the original URL for the given ID — this handler doesn't return JSON, it issues an HTTP redirect. Keploy's test case for this asserts the status code and Location header rather than a response body.",
  },
];

const methodColors: Record<string, { bg: string; border: string; text: string }> = {
  GET: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", text: "#60a5fa" },
  POST: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", text: "#4ade80" },
  DELETE: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", text: "#f87171" },
  PUT: { bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)", text: "#fb923c" },
};

export function TestCaseCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div role="list" aria-label="Captured test cases" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1.5rem 0" }}>
      {testCases.map((tc) => {
        const mc = methodColors[tc.method];
        const isOpen = expanded === tc.name;
        return (
          <div
            key={tc.name}
            role="listitem"
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${isOpen ? "var(--bg-border-accent)" : "var(--bg-border)"}`,
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              transition: "border-color 200ms ease",
            }}
          >
            {/* Header row — always visible */}
            <button
              onClick={() => setExpanded(isOpen ? null : tc.name)}
              aria-expanded={isOpen}
              aria-controls={`tc-body-${tc.name}`}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.625rem",
                padding: "0.875rem 1rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-sans)",
              }}
            >
              {/* Method badge */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  padding: "0.1875rem 0.5rem",
                  borderRadius: "4px",
                  background: mc.bg,
                  border: `1px solid ${mc.border}`,
                  color: mc.text,
                  flexShrink: 0,
                  minWidth: "3rem",
                  textAlign: "center",
                }}
              >
                {tc.method}
              </span>

              {/* Path */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                {tc.path}
              </span>

              {/* Status */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: tc.statusCode < 400 ? "#4ade80" : "#f87171",
                  marginLeft: "auto",
                  flexShrink: 0,
                }}
              >
                {tc.statusCode}
              </span>

              {/* Pass badge */}
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "#4ade80",
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  borderRadius: "4px",
                  padding: "0.1875rem 0.5rem",
                  flexShrink: 0,
                }}
              >
                ✓ PASS
              </span>

              {/* Expand chevron */}
              <span
                aria-hidden="true"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 200ms ease",
                }}
              >
                ▼
              </span>
            </button>

            {/* Expanded body */}
            {isOpen && (
              <div
                id={`tc-body-${tc.name}`}
                style={{
                  borderTop: "1px solid var(--bg-border)",
                  padding: "1.125rem 1.25rem",
                  animation: "fade-up 0.2s ease both",
                }}
              >
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.65 }}>
                  {tc.description}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                  {tc.requestBody && (
                    <YamlPanel label="Request Body" content={tc.requestBody} />
                  )}
                  <YamlPanel label={tc.responseLabel ?? "Response Body"} content={tc.responseBody} />
                  <YamlPanel label="DB Interaction (mocked)" content={tc.dbInteraction} />
                </div>

                <div
                  style={{
                    marginTop: "0.875rem",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                  }}
                >
                  Note: Values shown are representative of what Keploy records. Exact captured values depend on your recording session.
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function YamlPanel({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "0.375rem",
        }}
      >
        {label}
      </div>
      <pre
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          lineHeight: 1.6,
          color: "#c9d1d9",
          background: "#0a0c10",
          borderRadius: "6px",
          padding: "0.75rem",
          margin: 0,
          overflowX: "auto",
          border: "1px solid var(--bg-border)",
        }}
      >
        <code>{content}</code>
      </pre>
    </div>
  );
}
