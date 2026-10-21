# P2: Networking — Table of Contents & Syllabus

> **Pillar:** P2 (Foundation Layer)
> **Goal:** Deep understanding of transport and network protocols — the foundation of 5G interfaces
> **Interview weight:** Medium-High — "explain what happens when..." questions
> **Depth:** Deep on TCP/SCTP/Sockets, Solid on IP/DNS, Aware on HTTP

---

## Phase 1 — Foundations

*"How does data get from point A to point B?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 01 | OSI Model & TCP/IP Stack | 🔥🔥🔥 | 7-layer vs 4-layer model, encapsulation, PDU names, where 5G protocols sit | 📋 Planned |
| 02 | IP Addressing & Subnetting | 🔥🔥🔥 | IPv4/IPv6, subnet masks, CIDR, private ranges, NAT, ARP, ICMP, routing | 📋 Planned |

## Phase 2 — Transport Protocols

*"SCTP vs TCP — why does 5G use SCTP?" — the highest-frequency networking interview question.*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 03 | TCP Deep Dive | 🔥🔥🔥🔥🔥 | 3-way handshake, states, TIME_WAIT, flow/congestion control, Nagle, keep-alive | 📋 Planned |
| 04 | UDP | 🔥🔥🔥 | Connectionless model, multicast/broadcast, GTP-U, buffer overflow (silent drop) | 📋 Planned |
| 05 | SCTP (Stream Control Transmission Protocol) | 🔥🔥🔥🔥🔥 | 4-way handshake, multi-homing, multi-streaming, chunks, SCTP vs TCP, heartbeat, SCTP in Linux | 📋 Planned |

## Phase 3 — Application Layer & Tools

*"How do you debug a networking issue?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 06 | Socket Programming Concepts | 🔥🔥🔥🔥 | Socket API, `sockaddr`, byte order, blocking vs non-blocking, I/O multiplexing, server architectures | 📋 Planned |
| 07 | DNS | 🔥🔥 | Resolution process, `/etc/resolv.conf`, record types, debugging tools | 📋 Planned |
| 08 | Network Debugging Tools | 🔥🔥🔥 | `tcpdump`, `ss`/`netstat`, `ping`, `traceroute`, `ip`, `iptables` | 📋 Planned |
| 09 | HTTP & REST Basics | 🔥🔥 | HTTP methods, status codes, headers, REST principles — relevant for O-RAN O1/A1 | 📋 Planned |

---

## Cross-References

- Socket programming implementation: [c/03-socket-programming-basics.md](../c/03-socket-programming-basics.md)
- I/O multiplexing (select/poll/epoll): [c/04-io-multiplexing.md](../c/04-io-multiplexing.md)
- UDP architecture: [c/05-udp-socket-architecture.md](../c/05-udp-socket-architecture.md)
- SCTP usage in 5G interfaces: [5g-ran/11-5g-interfaces.md](../5g-ran/11-5g-interfaces.md)

---
*This file is auto-maintained. Updated whenever notes are added or modified.*
*Last updated: 2026-10-11*
