# GEMINI.md — Master AI Instructions

> **This file is the single source of truth for any AI assistant working with this repository.**  
> Read this file completely before making any changes to the repo.

---

## Repository Purpose

This is a **personal learning repository** and **public documentation knowledge base** for **interview preparation** targeting top-tier companies in the **5G RAN domain**. The repo is organized into **7 pillars** covering the complete skill set needed: Linux, Networking, C++/DSA, Debugging, DevOps, System Design, and 5G RAN. The repository is hosted live via **GitHub Pages** with a modern client-side Single Page Application (SPA).

### Learner Profile

- **Experienced 5G RAN engineer** — not a beginner programmer.
- Wants **deep, under-the-hood understanding** — how things work internally, not surface-level explanations.
- Preparing for **technical interviews** — notes should cover the way interviewers ask questions, tricky edge cases, and common pitfalls.
- Reference material: *Modern C* (Jens Gustedt), *CS:APP* (Bryant & O'Hallaron), 3GPP specifications.

---

## Repository Structure

```
learning/
├── GEMINI.md                # THIS FILE — AI rules & conventions (Cockpit)
├── README.md                # Human-friendly repo overview
├── index.html               # Web application entry point (GitHub Pages)
├── css/
│   └── style.css            # Web design system, typography, dark/light themes
├── js/
│   ├── config.js            # Subject pillars configuration
│   └── app.js               # Client-side router, TOC parser, markdown engine
│
│── ── FOUNDATION LAYER ─────────────────────────────
├── linux-bash/              # P1: Linux & Bash
├── networking/              # P2: Networking (TCP, UDP, SCTP, Sockets)
│
│── ── CORE SKILLS LAYER ────────────────────────────
├── cpp/                     # P3: C++ & DSA (merged — learn C++ by building DSA)
├── dsa-practice/            # P3b: LeetCode-style pattern-based problem solving
├── debugging-tooling/       # P4: GDB, Core Dumps, Valgrind, Coverity, Wireshark
│
│── ── APPLIED KNOWLEDGE LAYER ──────────────────────
├── devops/                  # P5: Git, Docker, Kubernetes, CI/CD, CMake
├── system-design/           # P6: LLD + HLD (telecom-specific)
│   ├── lld/                 #     Low-Level Design problems
│   └── hld/                 #     High-Level Design problems
│
│── ── DOMAIN LAYER ─────────────────────────────────
├── 5g-ran/                  # P7: 5G RAN Domain Knowledge
│
│── ── LEGACY ───────────────────────────────────────
└── c/                       # C Language notes (referenced from P1/P2)
```

Each subject directory follows this structure:
```
<subject>/
├── CONTENTS.md          # Master Syllabus & Table of Contents (rendered by web app)
├── BEST_PRACTICES.md    # Living document for best practices
├── 01-<topic>.md        # Numbered note files
├── 02-<topic>.md
└── code/                # Companion code examples (where applicable)
```

> [!IMPORTANT]
> **No Separate `interview_qa/` Directories:** All interview questions, tricky edge cases, and "gotchas" are embedded **directly inside the note files** using callout blocks and the 🪤 emoji. Do NOT create or maintain separate `interview_qa/` subfolders.

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

## Code Examples
References to companion code files in `code/<NN>-<topic>/` (if applicable).

## Key Takeaways
- Bullet point summary of the most important concepts.

---
*Last updated: YYYY-MM-DD*
```

### 3. Rich Markdown Elements Supported by Web Renderer
- **GitHub Callouts:** Use `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.
- **Fenced Code Blocks:** Always specify language tag (```cpp, ```c, ```bash, ```json).
- **Sticky Headings:** The web app generates a sticky "On This Page" sidebar from all `##` and `###` headings. Use descriptive, concise heading titles.
- **Cross-Links:** Relative links between notes (e.g. `[4G vs 5G](./02-4g-vs-5g-key-differences.md)`) automatically translate to SPA routes.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Note files | `<SectionNumber>-<kebab-case-topic>.md` | `12-cu-cp-and-cu-up-split.md` |
| Code directories | `code/<SectionNumber>-<kebab-case-topic>/` | `code/12-cu-cp-split/` |
| Code files | Descriptive, lowercase, `.c` or `.cpp` extension | `pointer_basics.c` |

- **Numbering** must strictly be sequential integers (e.g., `01`, `02`, `03`). 
- **NEVER** use sub-numbering or letters (e.g., `00b`, `04b`, `12a`).
- If a new note is inserted in the middle of a syllabus, you must renumber all subsequent notes to maintain the strict integer sequence.

---

## AI Behavior Rules

1. **Read this file first** before making any changes to the repository.
2. **Never break Web Application Compatibility**: When modifying or creating notes or `CONTENTS.md`, adhere strictly to the 4-column TOC format and markdown standards.
3. **Never create a new pillar/subject directory** unless the user explicitly asks. The 7 pillars are already established.
4. **Always update `CONTENTS.md`** after creating, modifying, or renaming a note.
5. **No separate `interview_qa/` folders**: Keep all interview questions and 🪤 traps within the main note files.
6. **Proactive Updates**: During conversations, if you discover new insights, corrections, or topics that deserve to be documented, automatically update the relevant notes and `CONTENTS.md` without waiting for explicit permission, and then inform the user about the changes you made.
7. **Renumber and reorganize notes** dynamically to maintain a logical learning progression.
8. **Keep notes conversational but structured** — they should read naturally while following the template.
9. **Use visual aids** — include PlantUML diagrams (with white background: `skinparam backgroundColor white`), tables, and alert callouts.
10. **Include runnable code examples** whenever a topic involves programming concepts (C++, Linux, Debugging, System Design).
11. **Add the current date** to the "Last updated" footer of every note you create or modify.

### 5G RAN Specific Rules
12. **No Code Examples Needed:** The 5G RAN domain is purely theoretical for cracking interviews. Do not attempt to write or include code examples for this domain.
13. **Compare with LTE/NB-IoT:** Explicitly highlight differences between 5G NR and LTE or NB-IoT, especially focusing on tricky differences interviewers love to ask about.
14. **Diagram Format:** Always use **PlantUML** for diagrams in the 5G RAN domain (`skinparam backgroundColor white`).

### Pillar-Specific Rules
15. **Theory-only pillars** (`linux-bash/`, `networking/`, `devops/`): Include inline code snippets and commands, but do not create separate code files unless the user explicitly asks.
16. **Code-heavy pillars** (`cpp/`, `dsa-practice/`, `debugging-tooling/`, `system-design/`): Always include runnable code examples in `code/` subdirectories.
17. **Cross-reference between pillars** — link to the existing note instead of duplicating content.
18. **Interview traps** — mark interviewer trick questions and common pitfalls with the 🪤 emoji for easy scanning.

---

## Current Pillars

| # | Pillar | Directory | Layer | Status |
|---|--------|-----------|-------|--------|
| P1 | Linux & Bash | `linux-bash/` | Foundation | **Active** |
| P2 | Networking | `networking/` | Foundation | **Active** |
| P3 | C++ & DSA | `cpp/` | Core | **Active** |
| P3b | DSA Practice | `dsa-practice/` | Core | 📋 Planned (after C++ Phase 5) |
| P4 | Debugging & Tooling | `debugging-tooling/` | Core | **Active** |
| P5 | DevOps Essentials | `devops/` | Applied | **Active** |
| P6 | System Design (LLD+HLD) | `system-design/` | Applied | **Active** |
| P7 | 5G RAN Domain | `5g-ran/` | Domain | **Active** |
| — | C Language (legacy) | `c/` | (referenced from P1/P2) | **Active** |

---

*This file was created on 2026-07-24 and should be updated whenever repo conventions change.*
*Last updated: 2026-10-18 — enforced Web Application TOC parsing rules and removed interview_qa subfolders.*
