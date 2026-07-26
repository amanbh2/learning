# GEMINI.md — Master AI Instructions

> **This file is the single source of truth for any AI assistant working with this repository.**  
> Read this file completely before making any changes to the repo.

---

## Repository Purpose

This is a **personal learning repository** for studying **C/C++** and potentially **5G RAN** in the future. Notes are created through conversational learning with an AI assistant — the user discusses a topic, and the AI produces structured notes and code examples.

### Learner Profile

- **Experienced 5G RAN engineer** — not a beginner programmer.
- Wants **deep, under-the-hood understanding** — how things work internally, not surface-level explanations.
- Preparing for **technical interviews** — notes should cover the way interviewers ask questions, tricky edge cases, and common pitfalls.
- Reference material: *Modern C* (Jens Gustedt), *CS:APP* (Bryant & O'Hallaron).

---

## Repository Structure

```
learning/
├── GEMINI.md              # THIS FILE — AI rules & conventions
├── README.md              # Human-friendly repo overview
├── LEARNING_PATH.md       # Master learning roadmap (C, C++, 5G RAN)
│
├── c/                     # C Language notes & code
│   ├── CONTENTS.md        # Auto-maintained table of contents
│   ├── 01-<topic>.md      # Numbered note files
│   ├── 02-<topic>.md
│   └── code/              # Companion code examples
│       ├── 01-<topic>/
│       └── 02-<topic>/
│
└── 5g-ran/                # 5G RAN domain knowledge
    ├── CONTENTS.md        # Topics, subtopics & table of contents
    ├── 01-<topic>.md
    └── 02-<topic>.md
```

### Future Subjects

New subject directories (e.g., `cpp/`) will be created **only when the user explicitly requests them**. Each will follow the same pattern: a folder with `CONTENTS.md`, numbered notes, and optionally a `code/` subdirectory.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Note files | `<NN>-<kebab-case-topic>.md` | `03-pointers.md` |
| Code directories | `code/<NN>-<kebab-case-topic>/` | `code/03-pointers/` |
| Code files | Descriptive, lowercase, `.c` extension | `pointer_basics.c` |

- **Numbering** is sequential (01, 02, 03...) and reflects the order in which topics were learned.
- **Never renumber** existing files. If a topic is added out of order, it gets the next available number.

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

## CONTENTS.md Maintenance

The `CONTENTS.md` file inside each subject directory is an **auto-maintained table of contents**.

### Rules
1. **Always update** `CONTENTS.md` when adding, removing, or renaming a note.
2. Format each entry as: `| NN | [Topic Title](./NN-topic.md) | Brief one-line description |`
3. Keep entries sorted by number.

---

## AI Behavior Rules

1. **Read this file first** before making any changes to the repository.
2. **Never create a new subject directory** (e.g., `cpp/`, `5g-ran/`) unless the user explicitly asks.
3. **Always update `CONTENTS.md`** after creating or modifying a note.
4. **Preserve existing notes** — do not modify them unless the user asks for corrections or updates.
5. **Use sequential numbering** — check the existing notes to determine the next number.
6. **Keep notes conversational but structured** — they should read naturally while following the template.
7. **Include runnable code examples** whenever a topic involves programming concepts.
8. **Add the current date** to the "Last updated" footer of every note you create or modify.

### Depth & Tone

9. **Go deep** — explain how things work under the hood (memory layout, compiler behavior, hardware interaction). The user is not a beginner.
10. **Interview-oriented** — include common interview questions, tricky edge cases, and "gotcha" scenarios interviewers love.
11. **Not everything needs a note** — if the user asks a quick random question, just answer it. Only create a note file when the topic is substantial and worth preserving as a reference.
12. **Topics can arrive in any order** — the user may jump around. Number notes by creation order, not by the learning path. Organize via `CONTENTS.md` and `LEARNING_PATH.md`.
13. **Evolve the learning path** — if a new important topic comes up that's not in `LEARNING_PATH.md`, add it to the appropriate pillar and phase.
14. **Be comprehensive, not biased** — when the user mentions a few examples (e.g., "MOCN, CHO, etc."), treat them as starting points, not an exhaustive list. Always give the full picture of what the market/industry demands, covering all relevant features and trends, not just the ones explicitly named.
15. **Reorganize freely** — notes can be renumbered, restructured, and rearranged to maintain clean organization. Create as many levels of hierarchy as needed. The goal is a neatly organized knowledge base, not rigid numbering.

---

## Current Subjects

| Subject | Directory | Status |
|---------|-----------|--------|
| C Language | `c/` | **Active** |
| C++ | — | Planned |
| 5G RAN | `5g-ran/` | **Active** |

---

*This file was created on 2026-07-24 and should be updated whenever repo conventions change.*
