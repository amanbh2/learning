# 📚 AMAN.LEARN — Personal Technical Knowledge Base

A zero-build, offline-capable digital knowledge base and note-keeper across computer science, systems programming, and engineering domains (including 5G RAN, C++, DSA, Linux, Networking, and DevOps). Hosted live via GitHub Pages at **[amanbh2.github.io/learning](https://amanbh2.github.io/learning/)**.

Maintained iteratively through conversational learning with AI: updated when studying new concepts, and referenced for quick recall when forgotten or during interview preparation.

---

## 🗺️ Curricula & Syllabi

All learning tracks reside under [`content/`](./content/) as strictly conceptual notes and architectural documentation:

| # | Subject | Scope | Syllabus & Notes |
|---|---------|-------|------------------|
| **01** | **5G RAN Domain** | 3GPP Architecture, NR L1/L2/L3, Call Flows, O-RAN | [View Syllabus →](./content/5g-ran/CONTENTS.md) |
| **02** | **C++ Language** | Memory Model, RAII, Modern C++11/14/17/20, Metaprogramming | [View Syllabus →](./content/cpp/CONTENTS.md) |
| **03** | **C Language** | Low-level Systems C, Pointers, Memory, ABI | [View Syllabus →](./content/c/CONTENTS.md) |
| **04** | **Data Structures & Algorithms** | Core Structures, Patterns, Complexity, Problem Archetypes | [View Syllabus →](./content/dsa/CONTENTS.md) |
| **05** | **Linux & Bash** | Kernel Internals, Virtual Memory, IPC, Shell Scripting | [View Syllabus →](./content/linux-bash/CONTENTS.md) |
| **06** | **Networking** | TCP/IP Internals, SCTP, Berkeley Sockets, Packet Flow | [View Syllabus →](./content/networking/CONTENTS.md) |
| **07** | **Debugging & Tooling** | GDB, Core Dumps, Valgrind, ASan, Wireshark | [View Syllabus →](./content/debugging-tooling/CONTENTS.md) |
| **08** | **DevOps Essentials** | Docker, Kubernetes, CI/CD, CMake, Git | [View Syllabus →](./content/devops/CONTENTS.md) |
| **09** | **System Design** | High-throughput Telecom LLD/HLD, Distributed Systems | [View Syllabus →](./content/system-design/CONTENTS.md) |

---

## 🏛️ Repository Architecture

- **`index.html`**: Zero-build client-side Single Page Application (PWA).
- **`res/`**: Favicon and PWA application icons.
- **`css/`**: Pure Vanilla CSS design system with graph-grid background and dark/light themes.
- **`js/`**: Client-side hash router, dynamic table-of-contents parser, and local search engine powered by MiniSearch.
- **`content/`**: Markdown syllabi (`CONTENTS.md`) and numbered conceptual notes (`01-<topic>.md`).
- **`fonts/` & `vendor/`**: Fully self-hosted fonts (Inter, JetBrains Mono) and libraries (Marked, Highlight.js, MiniSearch) for 100% offline functionality.

---

## 📖 Reference & Utilities

- **[Telecom Acronyms (170+) →](./ACRONYMS.md)**: Quick reference for 3GPP and RAN abbreviations.
- **[Master AI Rules & Conventions →](./GEMINI.md)**: The single source of truth for repository structure and AI operating principles.

---

## 🎯 Learning Approach

1. **Deep Under-the-Hood Understanding**: Focus on OS internals, memory layout, protocol handshakes, and hardware interaction.
2. **Interview-Focused**: Pinpoints traps (🪤), trick questions, trade-offs, and failure recovery scenarios.
3. **Strictly Notes Only**: Concept breakdowns, sequence flows, and reference documentation; practice problem code is developed in external repositories.