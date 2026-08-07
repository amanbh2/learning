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
│
├── c/                     # C Language notes & code
│   ├── CONTENTS.md        # Syllabus and Table of Contents
│   ├── INTERVIEW_QA.md    # Compiled interview questions and answers
│   ├── 01-<topic>.md      # Numbered note files
│   ├── 02-<topic>.md
│   └── code/              # Companion code examples
│       ├── 01-<topic>/
│       └── 02-<topic>/
│
└── 5g-ran/                # 5G RAN domain knowledge
    ├── CONTENTS.md        # Syllabus and Table of Contents
    ├── INTERVIEW_QA.md    # Compiled interview questions and answers
    ├── 01-<topic>.md
    └── 02-<topic>.md
```

### Future Subjects

New subject directories (e.g., `cpp/`) will be created **only when the user explicitly requests them**. Each will follow the same pattern: a folder with `CONTENTS.md` (which also acts as the syllabus), `INTERVIEW_QA.md`, numbered notes, and optionally a `code/` subdirectory.

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

## CONTENTS.md & INTERVIEW_QA.md Maintenance

The `CONTENTS.md` file inside each subject directory is both the **master syllabus** and the **table of contents**.
The `INTERVIEW_QA.md` file inside each subject directory is the **master compilation of interview questions**.

### Rules
1. **Always update** `CONTENTS.md` when adding, removing, or renaming a note.
2. Format each entry as: `| NN | [Topic Title](./NN-topic.md) | Interview Heat | Key Concepts | Status |`
3. Keep entries sorted by number, grouped by Phase.
4. **Always update** `INTERVIEW_QA.md` whenever a new interview question or tricky concept is discussed.
5. If a topic note mentions an interview question, it MUST also be appended to that domain's `INTERVIEW_QA.md` file.

---

## AI Behavior Rules

1. **Read this file first** before making any changes to the repository.
2. **Never create a new subject directory** (e.g., `cpp/`, `5g-ran/`) unless the user explicitly asks.
3. **Always update `CONTENTS.md`** after creating, modifying, or renaming a note.
4. **Proactive Updates**: During conversations, if you discover new insights, corrections, or topics that deserve to be documented, automatically update the relevant notes and `CONTENTS.md` without waiting for explicit permission, and then inform the user about the changes you made.
5. **Renumber and reorganize notes** dynamically to maintain a logical learning progression. While new notes may be added out of order, the `CONTENTS.md` and filenames should eventually reflect the proper syllabus order (lowest-level to highest-level concepts).
6. **Keep notes conversational but structured** — they should read naturally while following the template.
7. **Use visual aids** — include Mermaid or PlantUML diagrams, tables, and alerts in notes where appropriate to explain complex concepts effectively.
8. **Include runnable code examples** whenever a topic involves programming concepts.
9. **Add the current date** to the "Last updated" footer of every note you create or modify.

### Depth & Tone

10. **Go deep** — explain how things work under the hood (memory layout, compiler behavior, hardware interaction). The user is not a beginner.
11. **Interview-oriented** — include common interview questions, tricky edge cases, and "gotcha" scenarios interviewers love.
12. **Not everything needs a note** — if the user asks a quick random question, just answer it. Only create a note file when the topic is substantial and worth preserving as a reference.
13. **Evolve the learning path** — if a new important topic comes up, add it to the appropriate Phase in the domain's `CONTENTS.md`.
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
