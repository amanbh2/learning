# P4: Debugging & Tooling — Table of Contents & Syllabus

> **Pillar:** P4 (Core Skills Layer)
> **Goal:** Master the tools that separate a "coder" from a "production-ready engineer"
> **Interview weight:** High — "How would you debug X?" is asked in every senior interview
> **Depth:** Deep on GDB/core dumps/memory leaks, Solid on Coverity/Wireshark, Aware on perf
> **Prerequisites:** Study alongside P3 (C++ & DSA) — you need code to debug

---

## Phase 1 — GDB & Crash Analysis

*"You get a core dump from production. Walk me through your debugging process."*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 01 | GDB Mastery | 🔥🔥🔥🔥🔥 | Breakpoints, watchpoints, backtrace, multi-thread debugging, TUI mode, `.gdbinit` | 📋 Planned |
| 02 | Core Dump Analysis | 🔥🔥🔥🔥🔥 | Generating cores, loading in GDB, crash signals, reading backtraces, no-symbol debugging | 📋 Planned |
| 03 | Common Crash Patterns | 🔥🔥🔥🔥 | Null deref, use-after-free, double free, buffer overflow, stack overflow, dangling ref | 📋 Planned |

## Phase 2 — Memory & Static Analysis

*"Your process memory keeps growing. How do you investigate?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 04 | Memory Leak Detection | 🔥🔥🔥🔥🔥 | Valgrind, ASan, LSan, `mtrace`, Valgrind vs ASan trade-offs, logical leaks | 📋 Planned |
| 05 | Static Analysis (Coverity & cppcheck) | 🔥🔥🔥 | Coverity defect types, triage, false positives, `cppcheck`, `clang-tidy`, compiler warnings | 📋 Planned |

## Phase 3 — Protocol & Runtime Analysis

*"The message isn't reaching the target. How do you trace it?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 06 | Wireshark & Packet Analysis | 🔥🔥🔥 | Capture/display filters, SCTP/GTP dissection, pcap files, `tshark` | 📋 Planned |
| 07 | Sanitizers (ASan, TSan, UBSan) | 🔥🔥🔥 | What each catches, compiler flags, mutual exclusivity, integration with CI | 📋 Planned |
| 08 | Performance Profiling | 🔥🔥 | `perf`, `gprof`, `strace`/`ltrace`, flame graphs, `futex` contention | 📋 Planned |

---

## Cross-References

- GDB basics also covered in [cpp/10-crashes-core-dumps-and-gdb.md](../cpp/10-crashes-core-dumps-and-gdb.md)
- Memory layout: [c/01-virtual-memory-layout.md](../c/01-virtual-memory-layout.md)
- Wireshark for 5G protocols: complements [5g-ran/](../5g-ran/) protocol notes

---
*This file is auto-maintained. Updated whenever notes are added or modified.*
*Last updated: 2026-10-11*
