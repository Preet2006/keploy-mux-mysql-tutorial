import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/Callout";
import { Step } from "@/components/Step";
import { CodeBlock } from "@/components/CodeBlock";
import { TestResult } from "@/components/TestResult";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { StatusCard } from "@/components/StatusCard";
import { CommandComparison } from "@/components/CommandComparison";
import { InfoCard, InfoCardGrid } from "@/components/InfoCard";
import { FileTree } from "@/components/FileTree";
import { HeroFlow } from "@/components/HeroFlow";
import { AnimatedFlow } from "@/components/AnimatedFlow";
import { TestCaseCards } from "@/components/TestCaseCards";
import { BeforeAfter } from "@/components/BeforeAfter";
import { TroubleshootCard } from "@/components/TroubleshootCard";
import { ExpectedOutput } from "@/components/ExpectedOutput";
import { ProgressTracker } from "@/components/ProgressTracker";

/**
 * MDX component registry — all custom React components available
 * inside .mdx files. Required by @next/mdx.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Native HTML overrides
    h2: ({ children, id }) => (
      <h2 id={id} style={{ scrollMarginTop: "5rem" }}>
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} style={{ scrollMarginTop: "5rem" }}>
        {children}
      </h3>
    ),
    code: ({ children, className }) => {
      const lang = className?.replace("language-", "") ?? "";
      if (lang) {
        return (
          <CodeBlock language={lang}>{String(children).trimEnd()}</CodeBlock>
        );
      }
      return (
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            background: "var(--bg-elevated)",
            color: "var(--text-code)",
            padding: "0.125rem 0.375rem",
            borderRadius: "4px",
            border: "1px solid var(--bg-border)",
          }}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
    hr: () => <hr className="divider" />,

    // All custom components
    Callout,
    Step,
    CodeBlock,
    TestResult,
    ArchitectureDiagram,
    StatusCard,
    CommandComparison,
    InfoCard,
    InfoCardGrid,
    FileTree,
    HeroFlow,
    AnimatedFlow,
    TestCaseCards,
    BeforeAfter,
    TroubleshootCard,
    ExpectedOutput,
    ProgressTracker,

    ...components,
  };
}
