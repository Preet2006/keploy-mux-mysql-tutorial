# Keploy + Go — Interactive API Testing Tutorial

> Submitted as part of a Keploy Developer Relations Engineering application.
> A documented, hands-on run of Keploy against the Go `mux-mysql` sample, presented as an interactive Next.js + MDX tutorial.

**Live demo:** https://keploy-mux-mysql-tutorial.vercel.app/

[![Keploy Version](https://img.shields.io/badge/Keploy-v3.8.47-blue.svg?style=flat-square)](https://keploy.io)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8.svg?style=flat-square&logo=go)](https://go.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg?style=flat-square&logo=mysql)](https://www.mysql.com/)

---

## What this is

Two things in one repository:

1. **A real Keploy run.** Keploy `v3.8.47` recorded and replayed traffic against the Gorilla Mux + MySQL `mux-mysql` sample from [keploy/samples-go](https://github.com/keploy/samples-go) — two recording sessions, six test cases, 6/6 passed on replay.
2. **A Next.js + MDX write-up of that run.** The interactive tutorial documents the exact commands, what Keploy generated, and what the results mean — not a marketing page, a walkthrough.

## Evaluating this submission

- **Read the write-up**: the [live site](https://keploy-mux-mysql-tutorial.vercel.app/), or `npm install && npm run dev` then [http://localhost:3000](http://localhost:3000).
- **Reproduce the run**: follow [Step-by-step CLI walkthrough](#step-by-step-cli-walkthrough) below against the actual `mux-mysql` sample.
- **Note on artifacts**: this repository contains the tutorial website only — the generated `keploy/test-set-0` / `test-set-1` YAML files from the actual recording session are not committed here. The tutorial describes their structure ([What Keploy Captured](#what-keploy-captured-in-this-run)) but you'd need to run the steps below yourself to produce and inspect real ones.

---

## Why Keploy, briefly

Writing and maintaining integration tests for API services is normally the expensive part: fixtures, mocks, seeded database state, ongoing maintenance as the API changes. Keploy sidesteps this by recording real request/response traffic and the application's dependency calls (here, MySQL queries), then replaying that traffic as deterministic tests — no test code, no fixtures to write.

---

## Repository layout

```text
keploy-devrel-assignment/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens, layout, component styles
│   │   ├── layout.tsx           # Root layout: header, sidebar, TOC, metadata
│   │   └── page.mdx             # The tutorial content itself, in MDX
│   ├── components/               # UI components used in the tutorial
│   │   # AnimatedFlow, BeforeAfter, Callout, CodeBlock, ExpectedOutput,
│   │   # FileTree, HeroFlow, InfoCard, MobileMenu, ProgressTracker,
│   │   # Sidebar, StatusCard, Step, TableOfContents, TestCaseCards,
│   │   # TestResult, ThemeToggle, TroubleshootCard
│   └── mdx-components.tsx        # Registers components for use inside page.mdx
├── public/                       # Static assets
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Content**: `@next/mdx` for MDX-as-React-components
- **Styling**: plain CSS with custom properties — no component/UI library
- **Language**: TypeScript, strict mode

### Running it locally

```bash
git clone https://github.com/Preet2006/keploy-mux-mysql-tutorial.git
cd keploy-mux-mysql-tutorial

npm install
npm run dev
# http://localhost:3000
```

To check a production build:

```bash
npm run build
npm run start
```

---

## What Keploy captured in this run

Target service: Go, `gorilla/mux`, MySQL (containerized with a plain `docker run` — the sample doesn't ship a `docker-compose.yml`).

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/create` | `POST` | Create a short link |
| `/all` | `GET` | List all links |
| `/links/{id}` | `GET` | Redirect to the original URL (HTTP 307, not JSON) |

| | |
| :--- | :--- |
| Recording sessions | 2 (`test-set-0`, `test-set-1`) |
| Test cases | 6 total, 3 per session |
| Replay result | 6/6 passed |
| Dependency mocking | MySQL queries replayed from `mappings.yaml`, no live DB hit during replay |
| Hand-written test code | None — all six cases were generated from recorded traffic |

---

## Step-by-step CLI walkthrough

### 1. Clone the sample and start MySQL

```bash
git clone https://github.com/keploy/samples-go.git
cd samples-go/mux-mysql

docker run -p 3306:3306 --rm --name mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -d mysql:latest

export ConnectionString="root:my-secret-pw@tcp(localhost:3306)/mysql"
```

### 2. Build the Go binary

```bash
go mod tidy
go build -o mux-mysql .
```

### 3. Record traffic with Keploy

```bash
# root/sudo may be required depending on your platform's socket permissions
keploy record -c "./mux-mysql"
```

While it's recording, send real requests with `curl`:

```bash
curl -s -X POST http://localhost:8080/create \
  -H "Content-Type: application/json" \
  -d '{"link": "https://keploy.io"}'

curl -s http://localhost:8080/all

curl -s -i http://localhost:8080/links/1   # redirects (307), not JSON
```

`Ctrl+C` stops the session. Keploy writes `keploy/test-set-0/` with three test YAML files (`post-create-1.yaml`, `get-all-1.yaml`, `get-links-by-id-1.yaml`) plus `mappings.yaml`.

### 4. Replay and verify

```bash
keploy test -c "./mux-mysql" --delay 10
```

Result reported for this run: 6/6 tests passed across both recorded test sets. The generated `keploy/` artifacts from that run aren't committed to this repository (see the note above) — this documents the commands and reported outcome, not a byte-for-byte log.

The full walkthrough — with explanations of what each step does and why — is in the tutorial itself, not just this README.

---

## Notes on the write-up

- Terminal and `curl` output in the tutorial is labeled **representative** wherever the exact bytes from the original run weren't preserved — the response shapes match the sample's actual code (request/response structs, status codes), but they're reconstructed from source, not a saved transcript.
- The visual components (the animated workflow diagram, before/after comparison, expandable test cases) exist to explain what Keploy is doing at each step, not to decorate the page.
- Platform notes (Linux vs. macOS vs. Windows) point to Keploy's own installation docs rather than asserting details this run didn't verify.

---

## Possible follow-ups

- Wire `keploy test` into CI (GitHub Actions) so replay runs automatically on pull requests.
- Look at Keploy's coverage reporting to see how much of the Go handler code the recorded test cases actually exercise.

---

## References

- [Keploy](https://github.com/keploy/keploy)
- [Keploy Go samples](https://github.com/keploy/samples-go)
- [Keploy documentation](https://keploy.io/docs)

---
*Submitted as part of a Keploy DevRel Engineering application.*
