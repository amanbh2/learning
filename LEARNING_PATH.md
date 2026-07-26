# 🎯 Learning Path — 5G RAN Engineer Interview Prep

> **Profile**: 5G RAN Engineer (experienced) | **Goal**: Deep under-the-hood mastery + interview readiness  
> **Depth**: Not beginner-level — focus on *how things work internally*, tricky interview questions, and expert-level understanding.  
> **References**: Inspired by *Modern C* (Jens Gustedt) and *CS:APP* (Bryant & O'Hallaron)

---

## Pillar 1: C Language (`c/`)

### Phase 1 — Foundations (Deep Dive)

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 01 | Compilation & Linking | ⭐⭐⭐⭐ | Preprocessor → Compiler → Assembler → Linker, symbol resolution, relocation, static vs dynamic libs, Makefiles |
| 02 | Data Representation | ⭐⭐⭐⭐⭐ | Two's complement, IEEE 754 floating point, endianness, sizeof, alignment, padding, integer overflow/wraparound |
| 03 | Pointers | ⭐⭐⭐⭐⭐ | Pointer arithmetic, double pointers, function pointers, void pointers, dangling/wild pointers, restrict keyword |
| 04 | Arrays & Strings | ⭐⭐⭐⭐ | Array-pointer decay, multidimensional arrays, string internals, buffer overflow |
| 05 | Structures, Unions & Bit Fields | ⭐⭐⭐⭐⭐ | Struct padding/packing, bit fields, unions for protocol headers, `__attribute__((packed))` |
| 06 | Dynamic Memory | ⭐⭐⭐⭐⭐ | malloc/calloc/realloc/free internals, memory leaks, heap fragmentation, valgrind, custom allocators |
| 07 | Storage Classes & Type Qualifiers | ⭐⭐⭐⭐ | static, extern, volatile (hardware registers), const correctness, restrict, register, linkage rules |

### Phase 2 — Systems Programming

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 08 | Bit Manipulation | ⭐⭐⭐⭐⭐ | Bitmasks, set/clear/toggle, protocol header parsing, bit counting tricks |
| 09 | Preprocessor Deep Dive | ⭐⭐⭐⭐ | Macro pitfalls, stringification, token pasting, X-macros, conditional compilation, include guards |
| 10 | Undefined Behavior & Tricky C | ⭐⭐⭐⭐⭐ | UB catalog, sequence points, strict aliasing, signed overflow, null pointer dereference, compiler assumptions |
| 11 | Memory Layout & Virtual Memory | ⭐⭐⭐⭐⭐ | Text/data/BSS/heap/stack segments, virtual address spaces, page tables, TLB, mmap, stack overflow |
| 12 | Multi-threading (pthreads) | ⭐⭐⭐⭐⭐ | Thread creation, mutex, semaphore, rwlock, deadlock, race conditions, thread-safety, reentrant functions |
| 13 | IPC Mechanisms | ⭐⭐⭐⭐⭐ | Shared memory, message queues, pipes, signals, Unix domain sockets — core to RAN software |
| 14 | Socket Programming | ⭐⭐⭐⭐ | TCP/UDP sockets, SCTP (used in 5G), client-server model, select/poll/epoll |
| 15 | State Machines in C | ⭐⭐⭐⭐⭐ | Function pointer tables, enum-driven FSMs — used everywhere in protocol stacks |

### Phase 3 — Expert Level

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 16 | Cache & Performance Optimization | ⭐⭐⭐⭐ | Cache lines, locality (spatial/temporal), cache-friendly code, branch prediction, loop optimization |
| 17 | Callbacks & Event-Driven Design | ⭐⭐⭐⭐ | Callback patterns, timer wheels, event loops, reactor pattern |
| 18 | Debugging & Profiling | ⭐⭐⭐ | GDB, valgrind, core dumps, AddressSanitizer, perf, common crash patterns |
| 19 | Data Structures in C | ⭐⭐⭐⭐ | Linked lists, queues, hash tables, ring buffers — hand-coded |
| 20 | File I/O & System Calls | ⭐⭐⭐ | fopen vs open, buffered vs unbuffered I/O, file descriptors, dup/dup2 |
| 21 | Modern C Features | ⭐⭐⭐ | C11/C17/C23: _Generic, _Static_assert, atomics, compound literals, designated initializers |
| 22 | Error Handling Patterns | ⭐⭐⭐⭐ | errno, goto cleanup, return codes, defensive programming patterns used in production RAN code |

---

## Pillar 2: C++ (`cpp/` — created when we start)

### Phase 1 — Core OOP & Language

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 01 | C vs C++ & OOP Basics | ⭐⭐⭐⭐ | Classes, constructors/destructors, RAII, rule of 3/5/0 |
| 02 | Inheritance & Polymorphism | ⭐⭐⭐⭐⭐ | Virtual functions, vtable internals, abstract classes, diamond problem, virtual inheritance |
| 03 | Operator Overloading | ⭐⭐⭐ | Overloading rules, friend functions, conversion operators |
| 04 | Templates | ⭐⭐⭐⭐ | Function & class templates, SFINAE, template specialization, variadic templates |
| 05 | STL Containers & Iterators | ⭐⭐⭐⭐⭐ | vector, map, unordered_map, set, deque — internal implementation & complexity |
| 06 | Smart Pointers & Memory | ⭐⭐⭐⭐⭐ | unique_ptr, shared_ptr (ref counting internals), weak_ptr, custom deleters |

### Phase 2 — Modern C++ & Design

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 07 | Move Semantics & Rvalue Refs | ⭐⭐⭐⭐ | std::move, perfect forwarding, copy elision (RVO/NRVO) |
| 08 | Lambda Expressions | ⭐⭐⭐⭐ | Captures, closures, use with STL algorithms |
| 09 | Concurrency in C++ | ⭐⭐⭐⭐ | std::thread, std::mutex, std::async, atomics, memory ordering |
| 10 | Design Patterns | ⭐⭐⭐⭐⭐ | Singleton, Observer, Factory, Strategy — with gNB software context |
| 11 | Exception Handling & RAII | ⭐⭐⭐ | try/catch, exception safety guarantees, noexcept |

---

## Pillar 3: 5G RAN Domain (`5g-ran/`)

> Detailed subtopics for each area are in [5g-ran/CONTENTS.md](./5g-ran/CONTENTS.md)

### Phase 1 — Architecture & PHY

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 01 | 5G System Architecture | ⭐⭐⭐⭐⭐ | SA vs NSA, E2E architecture, CUPS, SBA |
| 02 | gNB Architecture & Functional Split | ⭐⭐⭐⭐⭐ | CU-CP/CU-UP/DU/RU, 7.2x split, F1/E1 interfaces |
| 03 | Network Interfaces | ⭐⭐⭐⭐ | NG, Xn, F1, E1, SCTP, GTP-U |
| 04 | Protocol Stack Overview | ⭐⭐⭐⭐⭐ | CP/UP stacks, channel mapping, packet flow |
| 05 | OFDM, Numerology & Frame Structure | ⭐⭐⭐⭐ | CP-OFDM, SCS, TDD patterns, slot formats |
| 06 | Physical Channels & Signals | ⭐⭐⭐⭐⭐ | PDSCH, PUSCH, PDCCH, PUCCH, PRACH, SSB, DMRS, CSI-RS, SRS |
| 07 | Resource Grid & BWP | ⭐⭐⭐⭐ | RE, RB, CRB/PRB/VRB, resource allocation, BWP switching |

### Phase 2 — Protocol Layers (L2/L3)

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 08 | MAC Layer & Scheduling | ⭐⭐⭐⭐⭐ | MAC CE, BSR, SR, PHR, dynamic/SPS/CG scheduling |
| 09 | HARQ | ⭐⭐⭐⭐⭐ | Processes, timing (K1/K2), codebook types, CBG retx, NDI |
| 10 | DRX | ⭐⭐⭐⭐ | On-duration, inactivity timer, short/long DRX |
| 11 | RACH (detailed) | ⭐⭐⭐⭐⭐ | 4-step/2-step, CBRA/CFRA, preamble groups, power ramping |
| 12 | RLC Layer | ⭐⭐⭐⭐ | AM/UM/TM, segmentation, ARQ, polling, STATUS PDU |
| 13 | PDCP Layer | ⭐⭐⭐⭐ | ROHC, ciphering, integrity, HO data forwarding, DC split bearer |
| 14 | SDAP & QoS | ⭐⭐⭐⭐ | 5QI, QFI→DRB mapping, reflective QoS, GBR/non-GBR |
| 15 | RRC Layer | ⭐⭐⭐⭐⭐ | States (IDLE/INACTIVE/CONNECTED), procedures, SIBs, measurement config, security |

### Phase 3 — Mobility, Beamforming & Advanced

| # | Topic | Interview Heat | Key Concepts |
|---|-------|---------------|--------------|
| 16 | Handover & Mobility | ⭐⭐⭐⭐⭐ | Xn/NG HO, A1-A6 events, CHO, DAPS, RLF |
| 17 | Beamforming & MIMO | ⭐⭐⭐⭐⭐ | Analog/digital/hybrid BF, beam management (P1/P2/P3), BFR, SU/MU-MIMO |
| 18 | CA & Dual Connectivity | ⭐⭐⭐⭐ | PCell/PSCell/SCell, EN-DC/NR-DC, split bearer, SCG handling |
| 19 | Power Control | ⭐⭐⭐⭐ | Open/closed loop, P0/alpha/TPC, PRACH ramping, PHR |
| 20 | O-RAN | ⭐⭐⭐⭐⭐ | Near-RT/Non-RT RIC, xApps/rApps, E2/A1/O1/O2, Open Fronthaul |
| 21 | Network Slicing | ⭐⭐⭐⭐ | S-NSSAI, slice-aware scheduling, resource isolation |
| 22 | Emerging: DSS, SUL, NR-U, IAB, RedCap, NTN | ⭐⭐⭐ | Latest 3GPP features, interview differentiators |

---

## Study Strategy

> Start with **C Phase 1** and **5G RAN Phase 1** in parallel.  
> Layer in **C++** once C foundations are solid.  
> Topics can be studied in **any order** — notes will be numbered by creation order, not by this plan.

---

*Created: 2026-07-27 | This plan evolves as new topics are discovered.*
