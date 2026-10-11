# 📚 5G RAN Engineer Interview Preparation Repository

A structured, deep-dive learning repository targeting a senior technical role switch in the **5G RAN domain**. Maintained through conversational learning with AI, combining foundational computer science, core engineering skills, applied system engineering, and deep telecom domain knowledge.

---

## 🗺️ The 7-Pillar Architecture

The repository is organized into four progressive layers covering the full engineering spectrum required for senior 5G RAN interviews:

```
┌────────────────────────────────────────────────────────┐
│                   DOMAIN LAYER                         │
│  [P7] 5G RAN Domain Knowledge (3GPP, L2/L3, O-RAN)      │
└────────────────────────────────────────────────────────┘
                           ▲
┌────────────────────────────────────────────────────────┐
│               APPLIED KNOWLEDGE LAYER                  │
│  [P5] DevOps Essentials       [P6] System Design       │
│  (Docker, K8s, CI/CD, CMake)   (LLD + HLD for Telecom) │
└────────────────────────────────────────────────────────┘
                           ▲
┌────────────────────────────────────────────────────────┐
│                  CORE SKILLS LAYER                     │
│  [P3] C++ & Data Structures   [P4] Debugging & Tooling │
│  (Modern C++, Memory, DSA)     (GDB, Cores, ASan/Valgrind)
│  [P3b] DSA Practice Track                              │
└────────────────────────────────────────────────────────┘
                           ▲
┌────────────────────────────────────────────────────────┐
│                  FOUNDATION LAYER                      │
│  [P1] Linux & Bash            [P2] Networking          │
│  (OS Internals, IPC, Kernel)   (TCP, UDP, SCTP, Sockets│
└────────────────────────────────────────────────────────┘
```

---

## 🏛️ Pillars & Syllabi

| # | Pillar | Layer | Status | Syllabus & Contents |
|---|--------|-------|:------:|---------------------|
| **P1** | **Linux & Bash** | Foundation | 🟢 Active | [View Syllabus →](./linux-bash/CONTENTS.md) |
| **P2** | **Networking** | Foundation | 🟢 Active | [View Syllabus →](./networking/CONTENTS.md) |
| **P3** | **C++ & DSA** | Core Skills | 🟢 Active | [View Syllabus →](./cpp/CONTENTS.md) |
| **P3b**| **DSA Practice** | Core Skills | 📋 Planned | [View Track →](./dsa-practice/CONTENTS.md) |
| **P4** | **Debugging & Tooling** | Core Skills | 🟢 Active | [View Syllabus →](./debugging-tooling/CONTENTS.md) |
| **P5** | **DevOps Essentials** | Applied | 🟢 Active | [View Syllabus →](./devops/CONTENTS.md) |
| **P6** | **System Design (LLD & HLD)** | Applied | 🟢 Active | [View Syllabus →](./system-design/CONTENTS.md) |
| **P7** | **5G RAN Domain** | Domain | 🟢 Active | [View Syllabus →](./5g-ran/CONTENTS.md) |
| — | *C Language (Legacy Reference)* | Foundation | 🟢 Reference | [View Notes →](./c/CONTENTS.md) |

---

## 📖 Reference & Utilities

- **[Telecom Acronyms (170+) →](./ACRONYMS.md)**: Quick reference for 3GPP and RAN abbreviations.
- **[Master AI Rules & Conventions →](./GEMINI.md)**: The single source of truth for repository structure and AI operating principles.

---

## 🎯 Learning Approach

1. **Deep Under-the-Hood Understanding**: Focus on OS internals, memory layout, protocol handshakes, and hardware interaction.
2. **Interview-Focused**: Pinpoints traps (🪤), trick questions, trade-offs, and failure recovery scenarios.
3. **Runnable Code & Real Scenarios**: Hands-on companion code for programming pillars and PlantUML sequence diagrams for 5G call flows.