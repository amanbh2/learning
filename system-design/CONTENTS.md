# P6: System Design (LLD + HLD) — Table of Contents & Syllabus

> **Pillar:** P6 (Applied Knowledge Layer)
> **Goal:** The round that determines your level and compensation band
> **Interview weight:** VERY HIGH for senior roles — often the deciding round
> **Depth:** Deep on all topics — this is where you tie everything together
> **Prerequisites:** Needs P1-P5 foundations (Linux, Networking, C++, Debugging, DevOps)

---

## Part A — Low-Level Design (LLD)

*"Design a class/module that does X. Show me the interface, data structures, and concurrency model."*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 01 | Design Patterns for Telecom | 🔥🔥🔥🔥 | Singleton, Observer, Strategy, State Machine, Factory, Command, RAII Wrapper, Producer-Consumer | 📋 Planned |
| 02 | Thread-Safe Message Queue | 🔥🔥🔥🔥🔥 | `push`/`pop`, `mutex` + `condition_variable`, bounded vs unbounded, shutdown signaling | 📋 Planned |
| 03 | Timer Wheel / Timer Manager | 🔥🔥🔥🔥 | Hierarchical timing wheel, O(1) start/stop, callback registration, RRC timers context | 📋 Planned |
| 04 | State Machine Framework | 🔥🔥🔥🔥🔥 | Enum-driven FSM, function pointer table, guard conditions, entry/exit actions, hierarchical FSM | 📋 Planned |
| 05 | LRU Cache | 🔥🔥🔥🔥 | HashMap + doubly linked list, O(1) get/put, thread safety, template design | 📋 Planned |
| 06 | Connection Pool | 🔥🔥🔥 | `acquire`/`release`, RAII auto-return, health checking, SCTP association pool | 📋 Planned |
| 07 | Ring Buffer / Circular Buffer | 🔥🔥🔥🔥 | Array-based, read/write pointers, lock-free SPSC variant, packet buffering | 📋 Planned |

## Part B — High-Level Design (HLD)

*"Design a system that does X at scale. Walk me through the architecture."*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 08 | System Design Framework | 🔥🔥🔥 | Clarify → Architecture → API → Data Model → Deep Dive → Trade-offs | 📋 Planned |
| 09 | Design: gNB CU-CP with High Availability | 🔥🔥🔥🔥🔥 | Active-Standby, state sync, failure detection, failover, split-brain, cloud-native variant | 📋 Planned |
| 10 | Design: UE Context Management | 🔥🔥🔥🔥 | UE context fields, O(1) multi-key lookup, memory pools, scaling, lifecycle, concurrency | 📋 Planned |
| 11 | Design: RAN Scheduler | 🔥🔥🔥 | Round-robin, proportional fair, 1ms timing, QoS integration, DL vs UL | 📋 Planned |
| 12 | Design: Protocol Message Codec | 🔥🔥🔥🔥 | ASN.1 encoding (PER/BER), encode/decode pattern, zero-copy, error handling | 📋 Planned |
| 13 | Design: Distributed Logging & Tracing | 🔥🔥 | ELK stack, log levels, structured logging, OpenTelemetry, 5G correlation | 📋 Planned |

---

## Cross-References

- CU-CP HA: [5g-ran/29-cucp-resiliency-and-ha.md](../5g-ran/29-cucp-resiliency-and-ha.md)
- Redis state management: [5g-ran/30-redis-in-cloud-native-ran.md](../5g-ran/30-redis-in-cloud-native-ran.md)
- C++ concurrency: [cpp/ Phase 12](../cpp/CONTENTS.md)
- Thread-safe coding: [cpp/ Phase 7 (smart pointers, RAII)](../cpp/CONTENTS.md)
- RRC state machine: [5g-ran/16-rrc-states-and-transitions.md](../5g-ran/16-rrc-states-and-transitions.md)
- RRC timers: [5g-ran/17-rrc-timers-reference.md](../5g-ran/17-rrc-timers-reference.md)
- QoS / Scheduler: [5g-ran/31-5g-qos-architecture.md](../5g-ran/31-5g-qos-architecture.md)

---
*This file is auto-maintained. Updated whenever notes are added or modified.*
*Last updated: 2026-10-11*
