"use client";

import React from "react";

export function TestResult() {
  return (
    <div className="test-result" role="region" aria-label="Keploy test results">
      <div className="test-result-header">Keploy Test Suite</div>

      <div className="test-result-score">
        <div className="test-result-fraction">6 / 6</div>
        <div className="test-result-label">All Tests Passed</div>
      </div>

      <div className="test-result-rows">
        {[
          { name: "test-set-0", score: "3/3", tests: ["get-all-1", "get-links-by-id-1", "post-create-1"] },
          { name: "test-set-1", score: "3/3", tests: ["get-all-1", "get-links-by-id-1", "post-create-1"] },
        ].map((suite) => (
          <div key={suite.name}>
            <div className="test-result-row">
              <span className="test-result-row-name">{suite.name}</span>
              <span className="test-result-row-score">
                {suite.score}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.375rem", marginBottom: "0.75rem" }}>
              {suite.tests.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.15)",
                    borderRadius: "4px",
                    padding: "0.125rem 0.5rem",
                    color: "#86efac",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
