# GEMINI.md — Master AI Instructions

> **This file is the single source of truth for any AI assistant working with this repository.**  
> Read this file completely before making any changes to the repo.

---

## Repository Purpose

This is a **personal technical knowledge base** and **digital note-keeper** across computer science, systems programming, and engineering domains (including 5G RAN, C++, DSA, Linux, Networking, and DevOps). Hosted live via **GitHub Pages** as a fast, zero-build, offline-capable Single Page Application (PWA) under the brand **AMAN.LEARN**.

### Learner Profile & Usage Model

- **Experienced systems / software engineer** — not a beginner programmer.
- **Digital Note-Keeper**: Updated iteratively using AI when studying new topics, and used as a rapid reference to review concepts when forgotten.
- **Deep, Under-the-Hood Understanding**: Notes explain internal mechanics, architectural trade-offs, edge cases, and common interview traps (🪤).
- **Strictly Notes Only**: This repository is dedicated exclusively to conceptual notes, architectural breakdowns, and reference documentation. Coding practice and rough implementation files live in separate external repositories.

---

## Repository Structure

```
learning/
├── GEMINI.md                # THIS FILE — AI rules & conventions (Cockpit)
├── README.md                # Human-friendly repo overview
├── index.html               # Web application entry point (GitHub Pages)
├── manifest.webmanifest     # Offline PWA manifest
├── sw.js                    # Offline PWA service worker
├── res/                     # Static site resources & icons
│   ├── favicon.png          # Browser favicon
│   ├── icon-192.png         # PWA 192x192 icon
│   └── icon-512.png         # PWA 512x512 icon
├── css/
│   ├── style.css            # Web design system, typography, dark/light themes
│   └── vendor/              # Vendored hljs stylesheets
├── js/
│   ├── config.js            # Subject pillars configuration
│   ├── app.js               # Client-side router, TOC parser, search, markdown engine
│   └── vendor/              # Vendored marked, hljs, minisearch libraries
├── fonts/                   # Self-hosted Inter & JetBrains Mono woff2 fonts
│
└── content/                 # All learning curricula & notes
    ├── 5g-ran/              # 5G RAN Domain Knowledge
    ├── cpp/                 # C++ Language & Modern Features
    ├── dsa/                 # Data Structures & Algorithms (Patterns & Concepts)
    ├── c/                   # C Language notes
    ├── linux-bash/          # Linux & Bash Internals
    ├── networking/          # Networking Protocols & Socket Programming
    ├── debugging-tooling/   # GDB, Valgrind, Core Dumps, Profiling
    ├── devops/              # Git, Docker, Kubernetes, CI/CD, CMake
    └── system-design/       # Telecom & Distributed System Design
```

Each subject directory in `content/<subject>/` follows this structure:
```
content/<subject>/
├── CONTENTS.md          # Master Syllabus & Table of Contents (rendered by web app)
├── BEST_PRACTICES.md    # Living document for best practices
├── assets/              # Diagrams, images, illustrations
├── 01-<topic>.md        # Sequential markdown note files
└── 02-<topic>.md
```

> [!IMPORTANT]
> - **Strictly Notes Only:** Do NOT create `code/` subfolders or store rough code in this repository. Code practice belongs in external repositories. Inline markdown code blocks (```cpp, ```c, etc.) inside notes are welcomed and encouraged.
> - **No Separate `interview_qa/` Directories:** All interview questions, tricky edge cases, and "gotchas" are embedded **directly inside the note files** using callout blocks and the 🪤 emoji.

---

## Web Application Compatibility & TOC Enforcement

The repository is directly rendered by a zero-build client-side web application deployed to GitHub Pages. All markdown files and syllabi must strictly conform to these parsing rules:

### 1. `CONTENTS.md` Structure (Strict Enforcement)
Every `CONTENTS.md` is parsed by `js/app.js` and MUST follow this exact format:
- **Phase Headings:** `## Phase <NN>: <Title>` (e.g. `## Phase 0: The Big Picture`)
- **Phase Quotes (optional):** `> *"Why does 5G exist?"*`
- **Topic Tables:** Must contain exactly 4 columns:
  ```markdown
  | NN | Topic | Interview Heat | Key Concepts |
  |----|-------|----------------|--------------|
  | 01 | [Topic Title](./01-topic-name.md) | Medium | Concept 1, Concept 2 |
  ```
- **Links in Table:** Must use relative markdown paths: `[Title](./<NN>-<topic-slug>.md)`
- **Heat Ratings:** Use standard ratings: `Low`, `Medium`, `High`, or `Very High`.
- **No Status Column:** Do not add a completion status column in `CONTENTS.md` tables.

### 2. Note Structure & Markdown Features
Every note file must follow this template:

```markdown
# Topic Title

## Overview
Brief description of what this note covers.

## Content
The main learning material — explanations, concepts, diagrams.

### Interview Traps & Gotchas
🪤 Common tricky questions, edge cases, and pitfalls interviewers ask about.

## Key Takeaways
- Bullet point summary of the most important concepts.

---
*Last updated: YYYY-MM-DD*
```

### 3. Rich Markdown Elements Supported by Web Renderer
- **GitHub Callouts:** Use `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.
- **Fenced Code Blocks:** Always specify language tag (```cpp, ```c, ```bash, ```json).
- **PlantUML Code Blocks:** Fenced with ```plantuml are rendered as collapsible disclosure panels with syntax-preserved source code.
- **Sticky Headings:** The web app generates a sticky "On This Page" sidebar from all `##` and `###` headings with smooth scrolling and active section tracking.
- **Cross-Links:** Intra-subject relative links (e.g. `[4G vs 5G](./02-4g-vs-5g-key-differences.md)`) and cross-subject links (e.g. `[C++ ISA](../cpp/01-instruction-set-architecture.md)`) automatically translate to SPA routes.
- **Images:** Always place images inside `<subject>/assets/` and reference using standard markdown syntax: `![Alt Text](./assets/filename.png)`. NEVER use Obsidian wiki-links `![[...]]`.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Note files | `<SectionNumber>-<kebab-case-topic>.md` | `12-cu-cp-and-cu-up-split.md` |
| Static resources | Stored under `res/` | `res/favicon.png` |
| Assets / Images | `<subject>/assets/<descriptive-name>.png` | `5g-ran/assets/network-architecture.png` |

- **Numbering** must strictly be sequential integers (e.g., `01`, `02`, `03`). 
- **NEVER** use sub-numbering or letters (e.g., `00b`, `04b`, `12a`).
- If a new note is inserted in the middle of a syllabus, you must renumber all subsequent notes to maintain the strict integer sequence.

---

## AI Behavior Rules

1. **Read this file first** before making any changes to the repository.
2. **Never break Web Application Compatibility**: When modifying or creating notes or `CONTENTS.md`, adhere strictly to the 4-column TOC format and markdown standards.
3. **Never create a new subject directory** unless the user explicitly asks. The 9 subject directories are already established.
4. **Always update `CONTENTS.md`** after creating, modifying, or renaming a note.
5. **No separate `interview_qa/` or `code/` folders**: Keep all interview questions and 🪤 traps within the main note files, and do not commit practice code directories here.
6. **Proactive Updates**: During conversations, if you discover new insights, corrections, or topics that deserve to be documented, automatically update the relevant notes and `CONTENTS.md` without waiting for explicit permission, and then inform the user about the changes you made.
7. **Renumber and reorganize notes** dynamically to maintain a logical learning progression.
8. **Keep notes conversational but structured** — they should read naturally while following the template.
9. **Use visual aids** — include PlantUML diagrams (with white background: `skinparam backgroundColor white`), tables, and alert callouts.
10. **Include inline code snippets** directly in markdown fenced code blocks when explaining programming concepts (C++, Linux, Debugging, System Design).
11. **Add the current date** to the "Last updated" footer of every note you create or modify.

### Subject-Specific Rules
12. **5G RAN Domain:** Purely conceptual notes. Explicitly highlight differences between 5G NR and LTE or NB-IoT, especially focusing on tricky differences interviewers love to ask about.
13. **C++ vs DSA Distinction:** Keep C++ language mechanics (memory model, RAII, templates, concurrency, modern standards) in `cpp/` and algorithmic patterns/structures (trees, graphs, DP, two pointers) in `dsa/`.
14. **Cross-reference between subjects:** Link using `../<subject>/<file>.md` syntax instead of duplicating content.
15. **Interview traps:** Mark interviewer trick questions and common pitfalls with the 🪤 emoji for easy scanning.

---

## Current Curricula

| # | Subject | Directory | Scope | Status |
|---|---------|-----------|-------|--------|
| 1 | 5G RAN Domain | `5g-ran/` | 3GPP Architecture, Protocols (NR, LTE, NB-IoT) | **Active** (55 Topics) |
| 2 | C++ Language | `cpp/` | Memory Model, OOP, Modern C++11/14/17/20, Metaprogramming | **Active** (22 Topics) |
| 3 | C Language | `c/` | Low-level C, Pointers, Memory Management, OS Interfacing | **Active** (5 Topics) |
| 4 | Data Structures & Algorithms | `dsa/` | Core Structures, Patterns, Conceptual Breakdowns | 📋 Planned |
| 5 | Linux & Bash | `linux-bash/` | Kernel Internals, IPC, Memory Management, Shell Scripting | 📋 Planned |
| 6 | Networking | `networking/` | TCP/IP, SCTP, Sockets, Packet Flow | 📋 Planned |
| 7 | Debugging & Tooling | `debugging-tooling/` | GDB, Core Dumps, Valgrind, Wireshark, ASan | 📋 Planned |
| 8 | DevOps Essentials | `devops/` | Docker, Kubernetes, CI/CD, CMake, Git | 📋 Planned |
| 9 | System Design | `system-design/` | Telecom LLD/HLD, High-throughput Distributed Systems | 📋 Planned |

---

*This file was created on 2026-07-24 and should be updated whenever repo conventions change.*
*Last updated: 2026-10-21 — AMAN.LEARN rebrand, zero-build offline PWA, res/ directory organization, and separated C++ & DSA curricula.*

