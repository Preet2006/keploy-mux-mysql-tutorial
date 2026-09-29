# Keploy API Testing — Interactive Tutorial & DevRel Demonstration

> **Personal Tutorial & Technical Submission for the Keploy Developer Relations Role**  
> *Demonstrating zero-code e2e API testing with Go (`mux-mysql`), Next.js 15, MDX, and interactive developer visual storytelling.*

[![Keploy Version](https://img.shields.io/badge/Keploy-v3.8.47-blue.svg?style=flat-square&logo=go)](https://keploy.io)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8.svg?style=flat-square&logo=go)](https://go.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg?style=flat-square&logo=mysql)](https://www.mysql.com/)

---

## 🚀 Start Here

Choose how you want to evaluate this submission:

1. **Explore the Interactive Tutorial Web Application**:
   Run `npm install && npm run dev` and navigate to [http://localhost:3000](http://localhost:3000) to view the Next.js visual documentation experience.
2. **Understand the Keploy Integration**:
   Jump to [Keploy API Testing Demonstration (`mux-mysql`)](#-keploy-api-testing-demonstration-mux-mysql) to inspect the recording and replay workflow.
3. **Inspect Test Case Artifacts**:
   Review the documented recording sessions (`test-set-0` and `test-set-1`), containing 6 replayed test cases across 3 API endpoints.

---

## 📌 Executive Summary

Writing and maintaining integration tests for API services is historically tedious, fragile, and time-consuming. Hand-crafting mock databases, seeding state, and asserting complex JSON responses often leads to low test coverage and fragile test suites.

**Keploy** solves this by capturing real API traffic (inbound HTTP requests and outbound dependency calls) and turning them into **durable, deterministic automated test suites** — without writing manual test code or managing test database fixtures.

This repository serves two distinct purposes:
1. **Interactive Technical Documentation App**: A Next.js 15 + MDX web application built specifically to explain Keploy's mechanics, recording workflow, and replay verification using the Go `mux-mysql` sample service.
2. **Keploy API Testing Demonstration**: A validated reference execution running Keploy `v3.8.47` against the Gorilla Mux URL-shortener service backed by a live MySQL 8.0 instance.

---

## 🏗️ Repository Architecture & Layout

```text
keploy-devrel-assignment/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system CSS (tokens, glassmorphism, syntax themes)
│   │   ├── layout.tsx           # Application root layout with metadata & font configuration
│   │   └── page.mdx             # Core interactive tutorial written in MDX
│   ├── components/              # DX UI components (AnimatedFlow, BeforeAfter, CodeBlock,
│   │                            #  ExpectedOutput, HeroFlow, KeployDiffView, Navbar,
│   │                            #  ProgressTracker, TestCaseCards, TestResult, etc.)
│   └── mdx-components.tsx       # MDX element component mappings
├── public/                      # Static web assets
├── next.config.ts               # Next.js 15 configuration with MDX compiler support
├── tsconfig.json                # Strict TypeScript configuration
├── eslint.config.mjs            # ESLint flat config
├── postcss.config.mjs           # PostCSS setup
├── package.json                 # Project dependencies & npm scripts
├── .gitignore                   # Standard Git ignore rules
└── README.md                    # Project documentation & reviewer guide
```

---

## 💻 Interactive Web Application

The web application is designed with modern developer experience (DX) principles, dark-mode styling, glassmorphism, and responsive visual storytelling.

### Key Visual & Interactive Features
- **4-Stage Pipeline Visualization (`AnimatedFlow`)**: Explains how Keploy intercepts traffic, writes YAML definitions, mocks dependencies during replay, and asserts responses.
- **Side-by-Side Comparison (`BeforeAfter`)**: Highlights the contrast between manual integration test writing vs. Keploy's record/replay model.
- **Interactive Progress Checklist (`ProgressTracker`)**: Allows developers to track their local execution state as they follow the tutorial.
- **Realistic Diff Viewer (`KeployDiffView`)**: Demonstrates response drift matching vs. noise-filtered header/timestamp fields.
- **Terminal Output Component (`ExpectedOutput`)**: Styled shell outputs clearly marked with representative labels.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Content Engine**: `@next/mdx` with React Server Components (RSC)
- **Styling**: Vanilla CSS with CSS Custom Properties & HSL color tokens
- **Icons**: `lucide-react`
- **Language**: TypeScript (Strict Mode)

### Running the Web Application Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/keploy-devrel-assignment.git
cd keploy-devrel-assignment

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

To validate production builds:
```bash
npm run build
npm run start
```

---

## ⚡ Keploy API Testing Demonstration (`mux-mysql`)

This tutorial documents the execution of Keploy against a Go URL-shortener service utilizing Gorilla Mux and MySQL 8.0.

### Target Stack & System Context
- **Keploy CLI**: `v3.8.47`
- **Go Runtime**: `1.21+`
- **Web Framework**: `gorilla/mux`
- **Database**: `MySQL 8.0` (Docker Compose containerized)
- **Tested API Endpoints**:
  1. `POST /links` — Create short link
  2. `GET /links` — Retrieve all links
  3. `GET /links/{id}` — Fetch specific link by ID

### Test Suite Execution Summary

| Metric | Execution Result |
| :--- | :--- |
| **Recording Sessions** | `2` (`test-set-0`, `test-set-1`) |
| **Total Test Cases** | `6` replayed test cases |
| **Passing Tests** | `6 / 6` (`100%` pass rate) |
| **Dependency Mocking** | Recorded MySQL queries replayed without live DB calls |
| **Test Code Required** | **None** — generated automatically from recorded API traffic |

---

## 📖 Step-by-Step CLI Walkthrough

Follow these commands to reproduce the `mux-mysql` sample service test recording and replay locally:

### Step 1: Clone Sample Service & Start MySQL
```bash
# Clone the official Go samples repository
git clone https://github.com/keploy/samples-go.git
cd samples-go/mux-mysql

# Start containerized MySQL instance via Docker Compose
docker compose up -d
```

### Step 2: Build the Go Binary
```bash
# Download dependencies and build binary
go mod tidy
go build -o mux-mysql .
```

### Step 3: Record API Traffic with Keploy
```bash
# Start the binary in Keploy record mode
# Note: sudo may be required on Linux depending on socket permission configuration
keploy record -c "./mux-mysql"
```

While Keploy is recording, send sample requests using `curl`:
```bash
# 1. Create a link
curl -s -X POST http://localhost:8080/links \
  -H "Content-Type: application/json" \
  -d '{"url": "https://keploy.io", "custom": "keploy"}'

# 2. Fetch all links
curl -s http://localhost:8080/links

# 3. Fetch link by ID
curl -s http://localhost:8080/links/1
```
Press `Ctrl+C` to complete the session. Keploy creates `keploy/test-set-0/` containing recorded YAML test specifications (`post-create-1.yaml`, `get-all-1.yaml`, `get-links-by-id-1.yaml`) and `mappings.yaml`.

### Step 4: Replay and Verify Tests
```bash
# Replay captured test sets against the application
keploy test -c "./mux-mysql" --delay 10
```
*Expected output: 6/6 tests passed across recorded test sets.*

---

## 🎨 DevRel Design & UX Principles

This repository demonstrates Developer Relations best practices:

1. **Honest Developer Documentation**: Terminal outputs are labeled as "Representative output" or "Expected (no output on success)" rather than claiming captured raw logs.
2. **Hydration-Safe HTML Architecture**: Built with clean, valid semantic HTML to prevent React hydration errors.
3. **Responsive Visual Components**: Flow diagrams, diff viewers, and code tabs adapt seamlessly across desktop, tablet, and mobile viewports.
4. **Progressive Disclosure**: High-level summaries appear upfront, with detailed technical code blocks and CLI steps revealed logically as the reader scrolls.

---

## 🧪 Verification & QA Matrix

### Keploy Execution Verification
| Test Set | Captured Test Cases | Passed | Failed |
| :--- | :---: | :---: | :---: |
| `test-set-0` | 3 (`post-create-1`, `get-all-1`, `get-links-by-id-1`) | 3 | 0 |
| `test-set-1` | 3 (`post-create-1`, `get-all-1`, `get-links-by-id-1`) | 3 | 0 |
| **TOTAL** | **6 replayed test cases** | **6** | **0** |

### Next.js Application Verification
| Check Item | Status | Verification Method |
| :--- | :---: | :--- |
| **Production Build** | `PASSED` | `npm run build` executed cleanly (Exit code 0, 0 TypeScript compilation errors) |
| **HTML Hydration** | `PASSED` | HTML paragraph nesting resolved cleanly across MDX components |
| **Static Generation** | `PASSED` | Prerendered static pages validated by Next.js compiler output |

---

## 🔮 Future Improvements

- **CI/CD Automation**: Integrate `keploy test` into GitHub Actions to run test suite replay automatically on pull requests.
- **Coverage Reporting**: Configure Keploy coverage flags to track Go handler code paths covered by recorded YAML test cases.

---

## 🤝 References & Acknowledgments

- **Keploy Core Repository**: [github.com/keploy/keploy](https://github.com/keploy/keploy)
- **Keploy Go Samples**: [github.com/keploy/samples-go](https://github.com/keploy/samples-go)
- **Keploy Documentation**: [keploy.io/docs](https://keploy.io/docs)

---
*Created as part of the Keploy DevRel Engineering Candidate Assignment.*
