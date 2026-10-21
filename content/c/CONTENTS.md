# C Language — Table of Contents & Syllabus

> **Profile**: 5G RAN Engineer (experienced) | **Goal**: Deep under-the-hood mastery + interview readiness  

## Phase 1 — Foundations (Deep Dive)

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|---------------|--------------|--------|
| 01 | Compilation & Linking | ⭐⭐⭐⭐ | Preprocessor → Compiler → Assembler → Linker, symbol resolution, relocation, static vs dynamic libs, Makefiles | Planned |
| 02 | Data Representation | ⭐⭐⭐⭐⭐ | Two's complement, IEEE 754 floating point, endianness, sizeof, alignment, padding, integer overflow/wraparound | Planned |
| 03 | Pointers | ⭐⭐⭐⭐⭐ | Pointer arithmetic, double pointers, function pointers, void pointers, dangling/wild pointers, restrict keyword | Planned |
| 04 | Arrays & Strings | ⭐⭐⭐⭐ | Array-pointer decay, multidimensional arrays, string internals, buffer overflow | Planned |
| 05 | Structures, Unions & Bit Fields | ⭐⭐⭐⭐⭐ | Struct padding/packing, bit fields, unions for protocol headers, `__attribute__((packed))` | Planned |
| 06 | Dynamic Memory | ⭐⭐⭐⭐⭐ | malloc/calloc/realloc/free internals, memory leaks, heap fragmentation, valgrind, custom allocators | Planned |
| 07 | Storage Classes & Type Qualifiers | ⭐⭐⭐⭐ | static, extern, volatile (hardware registers), const correctness, restrict, register, linkage rules | Planned |

## Phase 2 — Systems Programming

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|---------------|--------------|--------|
| 08 | Bit Manipulation | ⭐⭐⭐⭐⭐ | Bitmasks, set/clear/toggle, protocol header parsing, bit counting tricks | Planned |
| 09 | Preprocessor Deep Dive | ⭐⭐⭐⭐ | Macro pitfalls, stringification, token pasting, X-macros, conditional compilation, include guards | Planned |
| 10 | Undefined Behavior & Tricky C | ⭐⭐⭐⭐⭐ | UB catalog, sequence points, strict aliasing, signed overflow, null pointer dereference, compiler assumptions | Planned |
| 11 | [Memory Layout & Virtual Memory](./01-virtual-memory-layout.md) | ⭐⭐⭐⭐⭐ | Text/Data/BSS/Heap/Stack, Page Tables, MMU, and TLB | **Done** (Note 01) |
| 12 | [Multi-threading (pthreads)](./02-multithreading-pthreads.md) | ⭐⭐⭐⭐⭐ | Process vs thread, race conditions, and mutexes | **Done** (Note 02) |
| 13 | IPC Mechanisms | ⭐⭐⭐⭐⭐ | Shared memory, message queues, pipes, signals, Unix domain sockets — core to RAN software | Planned |
| 14 | [Socket Programming Basics](./03-socket-programming-basics.md) | ⭐⭐⭐⭐ | sockaddr structs, inet enums, and byte order conversions | **Done** (Note 03) |
| 14b| [I/O Multiplexing (select, poll, epoll)](./04-io-multiplexing.md) | ⭐⭐⭐⭐ | Solving blocking I/O with single-threaded concurrency | **Done** (Note 04) |
| 14c| [UDP Socket Architecture & Troubleshooting](./05-udp-socket-architecture.md) | ⭐⭐⭐⭐ | UDP state, symmetric ports, and debugging dropped packets | **Done** (Note 05) |
| 15 | State Machines in C | ⭐⭐⭐⭐⭐ | Function pointer tables, enum-driven FSMs — used everywhere in protocol stacks | Planned |

## Phase 3 — Expert Level

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|---------------|--------------|--------|
| 16 | Cache & Performance Optimization | ⭐⭐⭐⭐ | Cache lines, locality (spatial/temporal), cache-friendly code, branch prediction, loop optimization | Planned |
| 17 | Callbacks & Event-Driven Design | ⭐⭐⭐⭐ | Callback patterns, timer wheels, event loops, reactor pattern | Planned |
| 18 | Debugging & Profiling | ⭐⭐⭐ | GDB, valgrind, core dumps, AddressSanitizer, perf, common crash patterns | Planned |
| 19 | Data Structures in C | ⭐⭐⭐⭐ | Linked lists, queues, hash tables, ring buffers — hand-coded | Planned |
| 20 | File I/O & System Calls | ⭐⭐⭐ | fopen vs open, buffered vs unbuffered I/O, file descriptors, dup/dup2 | Planned |
| 21 | Modern C Features | ⭐⭐⭐ | C11/C17/C23: _Generic, _Static_assert, atomics, compound literals, designated initializers | Planned |
| 22 | Error Handling Patterns | ⭐⭐⭐⭐ | errno, goto cleanup, return codes, defensive programming patterns used in production RAN code | Planned |

---
*This file is auto-maintained. It updates whenever a new note is added.*
