"use client";

import React, { useState, useCallback } from "react";

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: string;
  showLineNumbers?: boolean;
}

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  return Promise.resolve();
}

function highlight(code: string, lang: string): string {
  if (lang === "bash" || lang === "sh" || lang === "shell") {
    // Single combined-regex pass per line: matches are found against the
    // original escaped text only, so a later alternative can never re-match
    // HTML (e.g. the quotes in class="token-bash-cmd") injected by an earlier one.
    const token = /(--[\w-]+=?|-[a-zA-Z]\b)|(^\s*)(keploy|go|git|docker|docker-compose|mysql|curl|npm|cd|mkdir|export|source|chmod|echo|cat|ls)(?=\s|$)|(["'`])(?:\\.|(?!\4)[^\\])*\4/g;
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .split("\n")
      .map((line) => {
        if (line.trim().startsWith("#")) {
          return `<span class="token-comment">${line}</span>`;
        }
        return line.replace(token, (match, flag, cmdLead, cmd, quote) => {
          if (flag) return `<span class="token-bash-flag">${flag}</span>`;
          if (cmd) return `${cmdLead}<span class="token-bash-cmd">${cmd}</span>`;
          if (quote) return `<span class="token-string">${match}</span>`;
          return match;
        });
      })
      .join("\n");
  }

  if (lang === "yaml" || lang === "yml") {
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .split("\n")
      .map((line) => {
        if (line.trim().startsWith("#")) {
          return `<span class="token-yaml-comment">${line}</span>`;
        }
        const keyMatch = line.match(/^(\s*)([\w-]+)(:)(.*)/);
        if (keyMatch) {
          return `${keyMatch[1]}<span class="token-yaml-key">${keyMatch[2]}</span>${keyMatch[3]}<span class="token-yaml-value">${keyMatch[4]}</span>`;
        }
        return line;
      })
      .join("\n");
  }

  if (lang === "go") {
    // Same single-pass rule as the bash branch above — one regex, one scan
    // of the original text, so injected HTML is never re-matched.
    const token = /(\/\/[^\n]*)|(["'`])(?:\\.|(?!\2)[^\\])*\2|\b(package|import|func|var|const|type|struct|interface|return|if|else|for|range|switch|case|default|defer|go|chan|select|break|continue|fallthrough|goto|map|make|new|nil|true|false|error)\b|\b(\d+)\b/g;
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(token, (match, comment, quote, keyword, number) => {
        if (comment) return `<span class="token-comment">${comment}</span>`;
        if (quote) return `<span class="token-string">${match}</span>`;
        if (keyword) return `<span class="token-keyword">${keyword}</span>`;
        if (number) return `<span class="token-number">${number}</span>`;
        return match;
      });
  }

  // JSON / generic
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(["'])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="token-string">$1$2$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>');
}

export function CodeBlock({ language = "bash", filename, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    copyToClipboard(children).then(() => {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [children]);

  const lang = language.toLowerCase();
  const highlighted = highlight(children, lang);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="code-block-dots">
            <div className="code-block-dot dot-red" />
            <div className="code-block-dot dot-yellow" />
            <div className="code-block-dot dot-green" />
          </div>
          {filename && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {filename}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="code-block-lang">{lang}</span>
          <button
            className={`copy-btn${copied ? " copied" : ""}`}
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <div className="code-block-content">
        <pre>
          <code
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  );
}
