"use client";

import React, { useEffect, useState } from "react";

const sections = [
  { id: "what-were-building", label: "What We're Building", num: "01" },
  { id: "why-keploy", label: "Why Keploy?", num: "02" },
  { id: "prerequisites", label: "Prerequisites", num: "03" },
  { id: "run-the-application", label: "Run the Application", num: "04" },
  { id: "start-recording", label: "Start Recording", num: "05" },
  { id: "what-keploy-captured", label: "What Keploy Captured", num: "06" },
  { id: "understanding-the-tests", label: "Understanding the Tests", num: "07" },
  { id: "replay-the-tests", label: "Replay the Tests", num: "08" },
  { id: "the-6-6-result", label: "The 6/6 Result", num: "09" },
  { id: "troubleshooting", label: "Troubleshooting", num: "10" },
  { id: "what-i-learned", label: "What I Learned", num: "11" },
  { id: "next-steps", label: "Next Steps", num: "12" },
];

export function TableOfContents() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav aria-label="On this page">
      <div className="toc-title">On This Page</div>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`toc-item${active === id ? " active" : ""}`}
          onClick={handleClick(id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
