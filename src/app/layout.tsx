import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "From Real API Calls to Automated Tests | Keploy + Go",
  description:
    "A hands-on tutorial: build your first API test workflow with Keploy 3.8.47 and Go's mux-mysql sample app — without writing a single test case by hand. 6/6 tests passed.",
  keywords: [
    "Keploy",
    "Go",
    "API testing",
    "test automation",
    "mux-mysql",
    "DevRel",
    "developer tutorial",
    "test recording",
    "test replay",
  ],
  authors: [{ name: "Keploy DevRel Assignment" }],
  openGraph: {
    type: "article",
    title: "From Real API Calls to Automated Tests | Keploy + Go",
    description:
      "A hands-on Keploy quickstart tutorial using the Go mux-mysql sample app. Learn how Keploy records real API traffic and replays it as automated tests.",
    url: "https://keploy-devrel-assignment.vercel.app",
    siteName: "Keploy DevRel Tutorial",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "From Real API Calls to Automated Tests | Keploy + Go",
    description:
      "A hands-on Keploy quickstart tutorial using the Go mux-mysql sample app. 6/6 tests passed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0e12" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔴</text></svg>" />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Skip to Content for Keyboard Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Site Header */}
        <header className="site-header">
          <a href="#what-were-building" className="site-logo" aria-label="Go to beginning of tutorial">
            <span className="logo-badge" aria-hidden="true">
              🔴 KEPLOY
            </span>
            <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>×</span>
            <span>Go Tutorial</span>
          </a>

          <div className="header-actions">
            <a
              href="https://github.com/keploy/keploy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--bg-border)",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all var(--transition-fast)",
                fontWeight: 500,
              }}
              aria-label="View Keploy on GitHub (opens in new tab)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <ThemeToggle />
            <MobileMenu />
          </div>
        </header>

        {/* Doc Layout */}
        <div className="doc-layout" style={{ flex: 1 }}>
          {/* Left Sidebar */}
          <aside className="doc-sidebar">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="doc-main" id="main-content">
            <article className="doc-content">
              {children}
            </article>
          </main>

          {/* Right TOC */}
          <aside className="doc-toc">
            <TableOfContents />

            {/* Right panel — verified facts */}
            <div style={{ marginTop: "2rem" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Verified
              </div>
              {[
                { icon: "✓", label: "Go quickstart" },
                { icon: "✓", label: "Keploy 3.8.47" },
                { icon: "✓", label: "6/6 tests passed" },
                { icon: "✓", label: "mux-mysql sample" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.25rem 0.375rem",
                    fontSize: "0.8125rem",
                    color: "var(--color-success)",
                    marginBottom: "0.125rem",
                  }}
                >
                  <span aria-hidden="true" style={{ fontWeight: 700, fontSize: "0.75rem" }}>{icon}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
