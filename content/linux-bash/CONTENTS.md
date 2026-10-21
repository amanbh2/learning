# P1: Linux & Bash — Table of Contents & Syllabus

> **Pillar:** P1 (Foundation Layer)
> **Goal:** Go from "I use Linux daily" to "I understand what's happening underneath"
> **Interview weight:** Medium-High — woven into every technical discussion
> **Depth:** Solid-to-Deep on core topics, Aware on daily toolkit

---

## Phase 1 — Shell & Text Processing

*"Can you write a bash script that does X?" — a common warm-up in interviews.*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 01 | Shell Fundamentals & Bash Scripting | 🔥🔥🔥 | Variables, quoting, control structures, functions, exit codes, `set -euo pipefail`, arrays | 📋 Planned |
| 02 | Pipes, Redirection & Text Processing | 🔥🔥🔥 | Pipes internals, `grep`, `awk`, `sed`, `find`, `xargs`, process substitution | 📋 Planned |

## Phase 2 — The Linux Kernel Interface

*"What happens under the hood when you run a process?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 03 | File System & Inodes | 🔥🔥 | Inodes, hard vs symlinks, FDs, `/proc`, `/sys`, `lsof` | 📋 Planned |
| 04 | Process Management | 🔥🔥🔥🔥 | `fork`/`exec`, process states, zombie/orphan, `cgroups`, nice values | 📋 Planned |
| 05 | Signals | 🔥🔥🔥 | Common signals, signal handling, `sigaction`, async-signal safety, `trap` | 📋 Planned |
| 06 | Users, Permissions & Security | 🔥🔥 | `rwx`, `setuid`/`setgid`, sticky bit, `umask`, `sudo`, SSH | 📋 Planned |
| 07 | Systemd & Service Management | 🔥🔥 | `systemctl`, unit files, `journalctl`, timers, `crontab` | 📋 Planned |

## Phase 3 — Memory & IPC

*"How do processes communicate? How does the OS manage memory?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 08 | Memory Management (OS-Level) | 🔥🔥🔥🔥 | Virtual memory, page faults, `mmap`, shared memory, OOM killer, stack vs heap | 📋 Planned |
| 09 | IPC Mechanisms | 🔥🔥🔥🔥 | Pipes, message queues, shared memory, semaphores, Unix domain sockets, comparison | 📋 Planned |

## Phase 4 — Daily Toolkit

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 10 | Essential Commands & Daily Toolkit | 🔥🔥 | Disk, network, archive, monitoring commands — fluency check | 📋 Planned |

---

## Cross-References

- Memory & virtual memory also covered in [c/01-virtual-memory-layout.md](../c/01-virtual-memory-layout.md)
- Threading covered in [c/02-multithreading-pthreads.md](../c/02-multithreading-pthreads.md)
- Socket programming covered in [c/03-socket-programming-basics.md](../c/03-socket-programming-basics.md)

---
*This file is auto-maintained. Updated whenever notes are added or modified.*
*Last updated: 2026-10-11*
