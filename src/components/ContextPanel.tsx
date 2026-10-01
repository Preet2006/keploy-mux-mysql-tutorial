"use client";

import React, { useEffect, useState } from "react";
import { SECTIONS, useActiveSection } from "@/lib/sections";

/**
 * Right rail. Deliberately not a second navigation list — the left sidebar
 * already owns that job. This shows passive context instead: which section
 * is in view, how far through the page you are, and the run's headline
 * facts (shown once in the chrome, not duplicated in the sidebar too).
 */
export function ContextPanel() {
  const active = useActiveSection();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = SECTIONS.find((s) => s.id === active);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Reading position — one line, not a list */}
      <div>
        <div className="toc-title">Reading</div>
        <div
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-primary)",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {current ? (
            <>
              <span className="mono" style={{ color: "var(--keploy-orange)" }}>
                {current.num}
              </span>{" "}
              {current.label}
            </>
          ) : (
            "—"
          )}
        </div>
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            marginTop: "0.75rem",
            height: "2px",
            background: "var(--bg-border)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--keploy-orange)",
            }}
          />
        </div>
      </div>

      {/* Run metadata — appears exactly once in the page chrome */}
      <div>
        <div className="toc-title">This Run</div>
        <div style={{ fontSize: "0.8125rem", color: "var(--color-success)", fontWeight: 600, marginBottom: "0.5rem" }}>
          6/6 tests passed
        </div>
        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
          Keploy 3.8.47
          <br />
          mux-mysql sample
          <br />
          Go
        </div>
      </div>
    </div>
  );
}
