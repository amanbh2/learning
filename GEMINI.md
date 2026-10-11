# GEMINI.md — Master AI Instructions

> **This file is the single source of truth for any AI assistant working with this repository.**  
> Read this file completely before making any changes to the repo.

---

## Repository Purpose

This is a **personal learning repository** for **interview preparation** targeting a switch to a better company in the **5G RAN domain**. The repo is organized into **7 pillars** covering the complete skill set needed: Linux, Networking, C++/DSA, Debugging, DevOps, System Design, and 5G RAN. Notes are created through conversational learning with an AI assistant — the user discusses a topic, and the AI produces structured notes and code examples.

### Learner Profile

- **Experienced 5G RAN engineer** — not a beginner programmer.
- Wants **deep, under-the-hood understanding** — how things work internally, not surface-level explanations.
- Preparing for **technical interviews** — notes should cover the way interviewers ask questions, tricky edge cases, and common pitfalls.
- Reference material: *Modern C* (Jens Gustedt), *CS:APP* (Bryant & O'Hallaron).

---

## Repository Structure

```
learning/
├── GEMINI.md                # THIS FILE — AI rules & conventions
├── README.md                # Human-friendly repo overview
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
├── CONTENTS.md          # Syllabus and Table of Contents
├── BEST_PRACTICES.md    # Living document for best practices
├── interview_qa/        # Interview Q&A per topic
├── 01-<topic>.md        # Numbered note files
├── 02-<topic>.md
└── code/                # Companion code examples (where applicable)
```

### Pillar System

The repo is organized into **7 pillars** studied in order (foundation → core → applied → domain). Each pillar has its own directory. New pillars should only be created when the user explicitly requests them. Each follows the same pattern: a folder with `CONTENTS.md`, `BEST_PRACTICES.md`, `interview_qa/`, numbered notes, and optionally a `code/` subdirectory.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Note files | `<SectionNumber>-<kebab-case-topic>.md` | `12-cucp-resiliency.md` |
| Code directories | `code/<SectionNumber>-<kebab-case-topic>/` | `code/12-cucp-resiliency/` |
| Code files | Descriptive, lowercase, `.c` or `.cpp` extension | `pointer_basics.c` |

- **Numbering** must strictly be sequential integers (e.g., `01`, `02`, `03`). 
- **NEVER** use sub-numbering or letters (e.g., `00b`, `04b`, `12a`). This is not sustainable.
- If a new note is inserted in the middle of a syllabus, you must renumber all subsequent notes to maintain the strict integer sequence.

---

## Note Format

Every note file must follow this template:

```markdown
# Topic Title

## Overview
Brief description of what this note covers.

## Content
The main learning material — explanations, concepts, diagrams (if any).

## Code Examples
References to companion code files in `code/<NN>-<topic>/` with explanations of what each file demonstrates.

## Key Takeaways
- Bullet point summary of the most important concepts.

---
*Last updated: YYYY-MM-DD*
```

### Rules
- Use **fenced code blocks** with language tags (```c) for inline snippets.
- For substantial code (>15 lines), create a separate `.c` file in the `code/` directory and reference it.
- Keep notes **concise and clear** — this is a personal reference, not a textbook.

---

## CONTENTS.md, BEST_PRACTICES.md & interview_qa/ Maintenance

The `CONTENTS.md` file inside each subject directory is both the **master syllabus** and the **table of contents**.
The `BEST_PRACTICES.md` file is a living document of standard idioms.
The `interview_qa/` folder inside each subject directory contains individual markdown files mapping to specific note topics, compiling all interview questions.

### Rules
1. **Always update** `CONTENTS.md` when adding, removing, or renaming a note.
2. Format each entry as: `| NN | [Topic Title](./NN-topic.md) | Interview Heat | Key Concepts | Status |`
3. Keep entries sorted by number, grouped by Phase.
4. **Always update** the appropriate file in `interview_qa/` (e.g., `interview_qa/14-control-flow.md`) whenever a new interview question or tricky concept is discussed. Create the file if it does not exist.
5. If a topic note mentions an interview question, it MUST also be appended to that domain's `interview_qa/` folder.
6. Keep the `BEST_PRACTICES.md` file updated with new language idioms or coding standards as they are discovered.

---

## AI Behavior Rules

1. **Read this file first** before making any changes to the repository.
2. **Never create a new pillar/subject directory** unless the user explicitly asks. The 7 pillars are already established.
3. **Always update `CONTENTS.md`** after creating, modifying, or renaming a note.
4. **Proactive Updates**: During conversations, if you discover new insights, corrections, or topics that deserve to be documented, automatically update the relevant notes and `CONTENTS.md` without waiting for explicit permission, and then inform the user about the changes you made.
5. **Renumber and reorganize notes** dynamically to maintain a logical learning progression. While new notes may be added out of order, the `CONTENTS.md` and filenames should eventually reflect the proper syllabus order (lowest-level to highest-level concepts).
6. **Keep notes conversational but structured** — they should read naturally while following the template.
7. **Use visual aids** — include Mermaid or PlantUML diagrams, tables, and alerts in notes where appropriate to explain complex concepts effectively.
8. **Include runnable code examples** whenever a topic involves programming concepts.
9. **Add the current date** to the "Last updated" footer of every note you create or modify.

### 5G RAN Specific Rules
10. **No Code Examples Needed:** The 5G RAN domain is purely theoretical for cracking interviews. Do not attempt to write or include code examples for this domain.
11. **Compare with LTE/NB-IoT:** Whenever possible, explicitly highlight differences between 5G NR and LTE or NB-IoT, especially focusing on tricky differences that interviewers love to ask about.
12. **Diagram Format:** Always use **PlantUML** for diagrams in the 5G RAN domain. Ensure they use a white background (`skinparam backgroundColor white`). Do not use Mermaid.

### Pillar-Specific Rules
19. **Theory-only pillars** (`linux-bash/`, `networking/`, `devops/`): Include inline code snippets and commands, but do not create separate code files unless the user explicitly asks.
20. **Code-heavy pillars** (`cpp/`, `dsa-practice/`, `debugging-tooling/`, `system-design/`): Always include runnable code examples in `code/` subdirectories.
21. **Cross-reference between pillars** — when a topic is covered in multiple pillars (e.g., sockets in `c/` and `networking/`), link to the existing note instead of duplicating content.
22. **Interview traps** — mark interviewer trick questions and common pitfalls with the 🪤 emoji for easy scanning.

### Depth & Tone

13. **Go deep** — explain how things work under the hood (memory layout, compiler behavior, hardware interaction). The user is not a beginner.
14. **Interview-oriented** — include common interview questions, tricky edge cases, and "gotcha" scenarios interviewers love.
15. **Don't skip the basics** — even if a topic is simple or foundational (like basic syntax, variable initialization, or comments), create notes for it to ensure a complete, unbroken learning path. Do not skip foundational topics assuming the user already knows them from C.
16. **Evolve the learning path** — if a new important topic comes up, add it to the appropriate Phase in the domain's `CONTENTS.md`.
17. **Be comprehensive, not biased** — when the user mentions a few examples (e.g., "MOCN, CHO, etc."), treat them as starting points, not an exhaustive list. Always give the full picture of what the market/industry demands, covering all relevant features and trends, not just the ones explicitly named.
18. **Reorganize freely** — notes can be renumbered, restructured, and rearranged to maintain clean organization. Create as many levels of hierarchy as needed. The goal is a neatly organized knowledge base, not rigid numbering.

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
*Last updated: 2026-10-11 — expanded from 3 directories to 7-pillar structure.*
