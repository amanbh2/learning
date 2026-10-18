# 📘 Master Syllabus — 5G RAN Interview Preparation

> **Goal:** Switch to a better 5G RAN company (Nokia / Ericsson / Samsung / Qualcomm / Mavenir / etc.)
> **Approach:** Interview-focused with expert-level awareness on non-interview topics
> **Study order:** Foundation → Core → Applied → Domain
>
> **Legend:**
> - 🔥 = Interview heat (more = asked more often)
> - 🪤 = Interviewer trap / trick question
> - **Deep** = Must know internals, able to explain on whiteboard
> - **Solid** = Confident working knowledge, can answer follow-ups
> - **Aware** = Know what it is, when to use it, no deep internals needed

---

## Study Order & Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                    STUDY PHASES                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase 1 ─── P1: Linux & Bash ──────────┐                  │
│              P2: Networking ─────────────┤                  │
│                                         │                  │
│  Phase 2 ─── P3: C++ & DSA ─────────────┤ (longest pillar) │
│              P4: Debugging & Tooling ────┤ (study with P3)  │
│                                         │                  │
│  Phase 3 ─── P5: DevOps Essentials ─────┤                  │
│              P6: System Design ──────────┘                  │
│                                                             │
│  Always ──── P7: 5G RAN Domain (parallel, gap-fill)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---
---

# P1: Linux & Bash 🐧

> **Directory:** `linux-bash/`
> **Why:** Everything in RAN runs on Linux. "I use it daily" ≠ "I understand it."
> **Interview weight:** Medium-High — not a full round, but woven into every technical discussion

---

### 1. Shell Fundamentals & Bash Scripting 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Variables & quoting | `$VAR` vs `"$VAR"` vs `'$VAR'`, word splitting, globbing |
| Control structures | `if/elif/else`, `for`, `while`, `case`, `select` |
| Functions | Function scope, `local`, return vs `echo`, subshell gotchas |
| Exit codes | `$?`, `set -e`, `set -o pipefail`, `trap` for cleanup |
| String manipulation | `${var#pattern}`, `${var%%pattern}`, `${var:-default}`, `${#var}` |
| Arrays | Indexed arrays, associative arrays (`declare -A`), iteration |
| Here documents | `<<EOF`, `<<-EOF`, `<<<` (here-string) |
| Script best practices | Shebang, `set -euo pipefail`, quoting everything, `shellcheck` |

> 🪤 **Interviewer trap:** *"What's the difference between `[` and `[[`?"* — `[` is a command (`/usr/bin/[`), `[[` is a bash keyword with pattern matching and no word splitting.

> 🪤 **Interviewer trap:** *"What does `set -e` NOT catch?"* — commands in `if` conditions, commands before `||`, commands in subshells.

---

### 2. Pipes, Redirection & Text Processing 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Pipes | `|`, pipe internals (anonymous pipe, fork, dup2), `PIPESTATUS` |
| Redirection | `>`, `>>`, `2>`, `2>&1`, `&>`, `<`, file descriptor numbers |
| `grep` | `-i`, `-r`, `-v`, `-E` (extended regex), `-P` (Perl regex), `-c`, `-l` |
| `awk` | Field processing, `$1`, `$NF`, `BEGIN/END`, pattern matching, built-in variables |
| `sed` | Substitution (`s///g`), in-place edit (`-i`), delete lines, address ranges |
| `find` | `-name`, `-type`, `-exec`, `-mtime`, `-size`, combining with `xargs` |
| `xargs` | `-I{}`, `-P` (parallel), `-0` (null-delimited), when vs `find -exec` |
| `sort`, `uniq`, `cut`, `tr`, `wc` | Standard pipeline toolkit |
| `tee` | Writing to file and stdout simultaneously |
| Process substitution | `<(command)`, `>(command)` — when and why |

> 🪤 **Interviewer trap:** *"How do you find the top 10 IP addresses in an access log?"* — `awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10`. Tests pipes + text processing fluency.

---

### 3. File System & Inodes 🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Inode structure | What an inode stores (metadata, block pointers), inode number, `ls -i` |
| Hard links vs Symlinks | Hard link = same inode, symlink = separate inode pointing to path. Hard links can't cross filesystems or link directories |
| File descriptors | FD table per process, FD 0/1/2, `ulimit -n`, `/proc/<pid>/fd/` |
| `/proc` filesystem | `/proc/cpuinfo`, `/proc/meminfo`, `/proc/<pid>/maps`, `/proc/<pid>/status` |
| `/sys` filesystem | Kernel parameters, device info |
| Filesystem types | `ext4`, `xfs`, `tmpfs`, `procfs`, `sysfs` — when each is used |
| `df`, `du`, `lsof` | Disk usage, open files — critical for debugging "disk full" or "too many open files" |

> 🪤 **Interviewer trap:** *"You delete a large log file but `df` still shows disk full. Why?"* — A process still has the file open (FD reference). File space isn't released until all FDs are closed. Use `lsof | grep deleted`.

---

### 4. Process Management 🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| Process vs Thread | Process = separate address space, thread = shared address space. `fork()` vs `pthread_create()` |
| `fork()` & `exec()` | Fork creates child (copy-on-write), exec replaces process image. Fork bomb: `:(){ :|:& };:` |
| Process states | Running, Sleeping (S/D), Stopped, Zombie. What a zombie is and how to clean it up |
| Orphan processes | Parent dies → child adopted by `init`/`systemd` (PID 1) |
| Process tree | `pstree`, `ppid`, how `systemd` is PID 1 |
| `ps`, `top`, `htop` | Reading process info, CPU/memory usage, load average meaning |
| `nice` & `renice` | Process priority, nice values (-20 to 19), real-time scheduling |
| Background/foreground | `&`, `bg`, `fg`, `jobs`, `nohup`, `disown` |
| `cgroups` | Resource limits for groups of processes — foundation for containers |

> 🪤 **Interviewer trap:** *"How do you kill a zombie process?"* — You can't kill a zombie (it's already dead). You must kill its **parent** or wait for the parent to call `wait()`. If parent is `init`, `init` automatically reaps it.

> 🪤 **Interviewer trap:** *"What's the difference between `kill -9` and `kill -15`?"* — `SIGTERM` (15) is a polite request (can be caught/handled); `SIGKILL` (9) is an immediate kernel kill (cannot be caught). Always try SIGTERM first.

---

### 5. Signals 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Common signals | `SIGTERM`, `SIGKILL`, `SIGINT` (Ctrl+C), `SIGHUP`, `SIGCHLD`, `SIGPIPE`, `SIGSEGV`, `SIGBUS`, `SIGALRM` |
| Signal handling | `signal()`, `sigaction()`, signal masks, `SA_RESTART` |
| Async-signal safety | Why you can't call `malloc`, `printf` in signal handlers — only async-signal-safe functions |
| `trap` in bash | `trap 'cleanup' EXIT`, `trap '' SIGINT` (ignore), practical scripting use |

> 🪤 **Interviewer trap:** *"Your process receives SIGSEGV. What happened and how do you debug?"* — Segfault = invalid memory access. Check core dump with GDB: `bt` to see backtrace, examine the faulting address.

---

### 6. Users, Permissions & Security 🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Permission model | `rwx` for user/group/other, octal notation (755, 644), `chmod`, `chown` |
| Special bits | `setuid` (runs as file owner), `setgid`, sticky bit (`/tmp`) |
| `umask` | Default permission mask, how `022` works |
| `sudo` | `sudoers` file, `visudo`, security implications |
| SSH basics | Key-based auth, `~/.ssh/config`, `ssh-agent`, port forwarding |

---

### 7. Systemd & Service Management 🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| `systemctl` | `start`, `stop`, `restart`, `enable`, `disable`, `status`, `is-active` |
| Unit files | `[Unit]`, `[Service]`, `[Install]` sections, `ExecStart`, `Restart=always` |
| `journalctl` | `-u <service>`, `-f` (follow), `--since`, `-p err` (priority filter) |
| Targets | `multi-user.target`, `graphical.target`, boot process order |
| Timers | `systemd` timers vs `cron` |
| `crontab` | Syntax (min hour dom mon dow), `@reboot`, common pitfalls |

---

### 8. Memory Management (OS-Level) 🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| Virtual memory | Why every process thinks it has all the memory, page tables, TLB |
| Physical vs Virtual | `VmRSS` vs `VmSize` in `/proc/<pid>/status` |
| Page faults | Minor (in memory but not mapped) vs Major (disk read needed) |
| `mmap` | Memory-mapped files, shared memory via `mmap`, anonymous mappings |
| Shared memory | `shmget`/`shmat` (SysV) vs `shm_open`/`mmap` (POSIX) |
| OOM Killer | When it triggers, `oom_score`, `oom_score_adj`, how to protect critical processes |
| Memory tools | `free -h`, `/proc/meminfo`, `vmstat`, `pmap` |
| Stack vs Heap | Stack: automatic, LIFO, limited size. Heap: dynamic, `brk`/`sbrk`/`mmap` |

> 🪤 **Interviewer trap:** *"A process shows 2GB VmSize but only 200MB VmRSS. Is it using 2GB of memory?"* — No. VmSize includes all mapped regions (shared libs, mmap'd files, not-yet-touched heap). RSS is actual physical memory used.

> [!NOTE]
> Your existing note [01-virtual-memory-layout.md](file:///c:/Users/amanb/Dev/learning/c/01-virtual-memory-layout.md) covers a lot of this. It will be referenced here.

---

### 9. IPC Mechanisms 🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| Pipes | Anonymous (parent-child only), named pipes (FIFOs), `mkfifo`, unidirectional |
| Message queues | POSIX (`mq_open`) vs SysV (`msgget`), when to use |
| Shared memory | Fastest IPC — no kernel copy. Needs synchronization (semaphores/mutexes) |
| Semaphores | Named vs unnamed, counting vs binary, POSIX vs SysV |
| Unix domain sockets | `AF_UNIX`, stream vs datagram, faster than TCP loopback |
| Signals | As IPC — limited (only signal number, no data), async |
| Comparison table | Speed, data capacity, synchronization needs, cross-process vs cross-machine |

> 🪤 **Interviewer trap:** *"What's the fastest IPC mechanism and why?"* — Shared memory. No kernel involvement after setup (no context switches, no data copies). But you must handle synchronization yourself.

---

### 10. Essential Commands & Daily Toolkit 🔥🔥

**Depth: Aware** (just be fluent)

| Category | Commands |
|----------|---------|
| Disk | `df -h`, `du -sh`, `fdisk`, `mount` |
| Network | `ip addr`, `ss`, `netstat`, `ping`, `traceroute`, `curl`, `wget` |
| Archives | `tar`, `gzip`, `zip`, `rsync` |
| Monitoring | `top`, `htop`, `iostat`, `sar`, `dmesg` |
| Misc | `watch`, `timeout`, `time`, `date`, `env`, `printenv`, `alias` |

---
---

# P2: Networking 🌐

> **Directory:** `networking/`
> **Why:** 5G RAN *is* networking. Every interface (F1, E1, NG, Xn) rides on real protocols.
> **Interview weight:** Medium-High — often tested through "explain what happens when..." questions

---

### 1. OSI Model & TCP/IP Stack 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| 7-layer OSI model | Physical, Data Link, Network, Transport, Session, Presentation, Application |
| TCP/IP 4-layer model | Link, Internet, Transport, Application — and how it maps to OSI |
| Encapsulation | How a packet gets wrapped: Data → Segment → Packet → Frame |
| PDU names per layer | Data, Segment (TCP)/Datagram (UDP), Packet, Frame |
| Where 5G protocols live | SCTP/GTP-U = Transport, IP = Network, Ethernet = Data Link |

> 🪤 **Interviewer trap:** *"Where does SCTP sit in the OSI model?"* — Transport layer (Layer 4), same as TCP/UDP.

---

### 2. IP Addressing & Subnetting 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| IPv4 structure | 32-bit, dotted decimal, network vs host portion |
| Subnet masks | `/24` = 255.255.255.0, how to calculate hosts per subnet |
| CIDR notation | `192.168.1.0/24`, supernetting, prefix length |
| Private IP ranges | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` |
| IPv6 basics | 128-bit, `::` shorthand, link-local (`fe80::`), when/why used in 5G |
| NAT | SNAT, DNAT, port forwarding, NAT traversal — why it matters for containers |
| ARP | Address resolution, ARP table, ARP poisoning |
| ICMP | Ping, traceroute internals, "destination unreachable" |
| Routing | Routing tables, default gateway, `ip route`, static vs dynamic routing |

> 🪤 **Interviewer trap:** *"How many usable hosts in a /26 network?"* — 2^6 - 2 = 62 (subtract network address and broadcast).

---

### 3. TCP Deep Dive 🔥🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| 3-way handshake | SYN → SYN-ACK → ACK, sequence numbers, ISN |
| 4-way teardown | FIN → ACK → FIN → ACK, half-close |
| TCP states | `ESTABLISHED`, `TIME_WAIT`, `CLOSE_WAIT`, `FIN_WAIT_1/2`, `SYN_SENT` |
| `TIME_WAIT` | Why it exists (2×MSL), why you see thousands of them, `SO_REUSEADDR` |
| Flow control | Sliding window, receiver window (`rwnd`), window scaling |
| Congestion control | Slow start, congestion avoidance, fast retransmit, fast recovery, `cwnd` |
| Nagle's algorithm | Small packet coalescing, `TCP_NODELAY` to disable, latency vs throughput |
| Keep-alive | `SO_KEEPALIVE`, idle timeout detection, probe packets |
| `SO_REUSEADDR` vs `SO_REUSEPORT` | When and why to use each |
| TCP vs UDP selection | When TCP overhead is unacceptable, when reliability is needed |

> 🪤 **Interviewer trap:** *"Your server shows 50,000 sockets in TIME_WAIT. Is this a problem? How do you fix it?"* — It can exhaust ephemeral ports. Fix: `SO_REUSEADDR`, `tcp_tw_reuse`, reduce `TIME_WAIT` duration, or connection pooling.

> 🪤 **Interviewer trap:** *"What happens if you don't call `close()` on a TCP socket?"* — FD leak → eventually hit `ulimit -n`. The OS will clean up on process exit, but not while running.

---

### 4. UDP 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Connectionless model | No handshake, no state, no ordering, no retransmission |
| When to use | Low-latency needs, multicast/broadcast, streaming, DNS, GTP-U in 5G |
| UDP header | Src port, Dst port, Length, Checksum — only 8 bytes |
| Multicast & Broadcast | `INADDR_BROADCAST`, multicast groups (`239.x.x.x`), `IP_ADD_MEMBERSHIP` |
| UDP buffer overflow | If recv buffer fills up, packets are **silently dropped** — no notification |
| GTP-U | User-plane tunnel in 5G, UDP-based, TEID identifies tunnel |

> [!NOTE]
> Your existing notes [03](file:///c:/Users/amanb/Dev/learning/c/03-socket-programming-basics.md) and [05](file:///c:/Users/amanb/Dev/learning/c/05-udp-socket-architecture.md) cover socket-level UDP. This pillar covers the *protocol concepts*.

---

### 5. SCTP ⭐ 🔥🔥🔥🔥🔥

**Depth: Deep** — this is the **single most important transport protocol for 5G RAN interviews**

| Subtopic | What to Know |
|----------|-------------|
| Why SCTP in 5G | All control-plane interfaces (F1-C, E1, NG-C, Xn-C, X2-C) use SCTP |
| Association setup | 4-way handshake (INIT → INIT-ACK → COOKIE-ECHO → COOKIE-ACK) — why 4 not 3? Anti-SYN-flood |
| Multi-homing | Multiple IP addresses per endpoint, automatic failover, heartbeat mechanism |
| Multi-streaming | Multiple independent streams within one association — no head-of-line blocking |
| Chunks | DATA, SACK, HEARTBEAT, INIT, SHUTDOWN — SCTP message structure |
| Ordered vs Unordered delivery | Per-stream ordering, unordered flag |
| SCTP vs TCP | Head-of-line blocking, multi-homing, message boundaries vs byte stream |
| SCTP shutdown | Graceful (SHUTDOWN → SHUTDOWN-ACK → SHUTDOWN-COMPLETE) vs Abort |
| Heartbeat mechanism | Detecting path failure, `SCTP_PEER_ADDR_CHANGE` notification |
| SCTP in Linux | `lksctp-tools`, `sctp_sendmsg()`, `sctp_recvmsg()`, `sctp_connectx()` |

> 🪤 **Interviewer trap:** *"Why does 5G use SCTP instead of TCP for control plane?"* — (1) Multi-homing for path redundancy (CU-CP HA), (2) Multi-streaming to avoid head-of-line blocking across independent UEs, (3) Message-oriented (preserves message boundaries, no need to frame manually), (4) Built-in heartbeat for fast failure detection.

> 🪤 **Interviewer trap:** *"SCTP has 4-way handshake. Isn't that slower than TCP's 3-way?"* — The extra step (COOKIE-ECHO/ACK) prevents SYN flood attacks. The server doesn't allocate state until the cookie is echoed back — stateless until verified.

---

### 6. Socket Programming 🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| Socket API | `socket()`, `bind()`, `listen()`, `accept()`, `connect()`, `send()`/`recv()` |
| `sockaddr` structures | `sockaddr_in` (IPv4), `sockaddr_in6` (IPv6), `sockaddr_un` (Unix), casting |
| Byte order | `htons()`, `htonl()`, `ntohs()`, `ntohl()` — network byte order is big-endian |
| Blocking vs Non-blocking | `fcntl(fd, F_SETFL, O_NONBLOCK)`, `EAGAIN`/`EWOULDBLOCK` |
| I/O multiplexing | `select()`, `poll()`, `epoll` — scalability differences, edge vs level triggered |
| Server architectures | Fork-per-client, thread-per-client, event-driven (reactor pattern) |
| `SO_*` options | `SO_REUSEADDR`, `SO_KEEPALIVE`, `SO_RCVBUF`/`SO_SNDBUF`, `SO_LINGER` |

> [!NOTE]
> Your existing C notes ([03](file:///c:/Users/amanb/Dev/learning/c/03-socket-programming-basics.md), [04](file:///c:/Users/amanb/Dev/learning/c/04-io-multiplexing.md)) already cover this deeply. This pillar links to them.

---

### 7. DNS 🔥🔥

**Depth: Aware**

| Subtopic | What to Know |
|----------|-------------|
| Resolution process | Stub resolver → recursive resolver → root → TLD → authoritative |
| `/etc/resolv.conf` | Nameserver config, `search` domain |
| `/etc/hosts` | Local override, priority over DNS |
| Record types | A, AAAA, CNAME, MX, NS, PTR, SRV |
| Debugging | `nslookup`, `dig`, `host` |

---

### 8. Network Debugging Tools 🔥🔥🔥

**Depth: Solid**

| Tool | What to Know |
|------|-------------|
| `tcpdump` | Capture filters, `-i`, `-w` (save pcap), `-n` (no DNS), reading output |
| `ss` / `netstat` | `-tlnp` (listening TCP), `-s` (statistics), socket state inspection |
| `ping` | ICMP echo, TTL meaning, packet loss indication |
| `traceroute` | Hop-by-hop path, UDP vs ICMP mode, `*` meaning (firewall or timeout) |
| `ip` command | `ip addr`, `ip route`, `ip link`, `ip neigh` (ARP table) |
| `iptables` / `nftables` | Firewall chains (INPUT, OUTPUT, FORWARD), NAT rules — awareness level |
| `curl` & `wget` | HTTP testing, headers, REST API debugging |

---

### 9. HTTP & REST Basics 🔥🔥

**Depth: Aware** — relevant because O-RAN O1/A1 interfaces use REST

| Subtopic | What to Know |
|----------|-------------|
| HTTP methods | GET, POST, PUT, DELETE, PATCH — idempotency |
| Status codes | 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error) |
| Headers | `Content-Type`, `Authorization`, `Accept` |
| REST principles | Stateless, resource-oriented, URI design |
| JSON basics | Parsing, structure — used everywhere in O-RAN config |

---
---

# P3: C++ & DSA (Merged) ⚙️

> **Directory:** `cpp/` (existing)
> **Why:** The primary interview language for 5G RAN. Learn it by building data structures.
> **Interview weight:** VERY HIGH — typically 2-3 rounds of coding

> [!IMPORTANT]
> The full syllabus already exists in [cpp/CONTENTS.md](file:///c:/Users/amanb/Dev/learning/cpp/CONTENTS.md) — **13 phases, 67 notes, 18 challenges**. Not duplicating it here.

### Current Progress

| Phase | Topic | Status |
|-------|-------|:---:|
| Phase 0 | Context & C++ Landscape (5 notes) | ✅ Done |
| Phase 1 | Foundations: Compilation, Types, Scope (10 notes + Challenge 1) | ✅ Done |
| Phase 2 | Type System, Functions, References (3 notes + Challenge 2) | 🔵 Active |
| Phase 3 | OOP: Classes, Constructors, RAII | 📋 Next |
| Phase 4 | Operator Overloading, Copy Semantics | 📋 |
| Phase 5 | Sequential Data Structures + STL (build MyVector, MyLinkedList) | 📋 |
| Phase 6 | Inheritance & Polymorphism (VTable!) | 📋 |
| Phase 7 | Move Semantics & Smart Pointers | 📋 |
| Phase 8 | Templates & Generic Programming | 📋 |
| Phase 8b | Associative DSA (build MyBST, MyHashMap, MyHeap) | 📋 |
| Phase 9 | Lambdas & Callbacks | 📋 |
| Phase 10 | Error Handling | 📋 |
| Phase 11 | Compile-Time Programming | 📋 |
| Phase 12 | Concurrency (threads, mutex, atomic) | 📋 |
| Phase 13 | Coroutines (C++20) | 📋 |

### Top Interview Topics (priority within the syllabus)

| Rank | Topic | Phase | Why It's #1 |
|:---:|-------|:---:|-------------|
| 1 | Virtual functions & VTable | 6 | "Draw the memory layout" — asked in **every** C++ interview |
| 2 | Smart pointers (unique/shared/weak) | 7 | "What happens when..." ownership puzzles |
| 3 | Move semantics & Rule of Five | 7 | "Write a move constructor" — live coding |
| 4 | RAII & Destructors | 3 | "Why is RAII important?" — foundational |
| 5 | Copy vs Move, deep vs shallow | 4,7 | "What's wrong with this code?" — trap questions |
| 6 | Templates | 8 | "How does the compiler handle templates?" |
| 7 | `std::mutex`, `std::atomic`, deadlocks | 12 | "Make this thread-safe" |
| 8 | Iterator invalidation | 5 | "What happens if you erase during iteration?" |
| 9 | `new`/`delete` vs smart pointers | 5,7 | "When would you still use raw new?" |
| 10 | Lambdas & captures | 9 | "What does this lambda capture?" |

### DSA Practice Track (alongside C++ learning)

> **Directory:** `dsa-practice/` (new — for LeetCode-style problem solving)
> **Start when:** After C++ Phase 5 (when you know enough STL to solve problems)

| # | Pattern | Key Problems | Frequency |
|---|---------|-------------|:---:|
| 1 | **Two Pointers** | Two Sum (sorted), Container With Most Water, 3Sum | 🔥🔥🔥🔥🔥 |
| 2 | **Sliding Window** | Max subarray sum, Longest Substring Without Repeating | 🔥🔥🔥🔥🔥 |
| 3 | **Hash Map** | Two Sum, Group Anagrams, Frequency Count | 🔥🔥🔥🔥🔥 |
| 4 | **Binary Search** | Search Rotated Array, Find Peak, Lower/Upper Bound | 🔥🔥🔥🔥 |
| 5 | **Linked List** | Reverse, Detect Cycle, Merge Two Sorted, LRU Cache | 🔥🔥🔥🔥 |
| 6 | **Stack / Monotonic Stack** | Valid Parentheses, Next Greater Element, Min Stack | 🔥🔥🔥 |
| 7 | **Trees & BST** | Inorder/Level-order traversal, LCA, Validate BST | 🔥🔥🔥🔥 |
| 8 | **Graphs** | BFS/DFS, Number of Islands, Topological Sort | 🔥🔥🔥 |
| 9 | **Heaps** | Top-K elements, Merge K Sorted Lists, Median Finder | 🔥🔥🔥 |
| 10 | **Dynamic Programming** | Coin Change, LCS, Knapsack, House Robber | 🔥🔥🔥 |
| 11 | **Bit Manipulation** | Single Number, Count Bits, Power of Two | 🔥🔥 |
| 12 | **Sorting** | Merge Sort, Quick Sort, Counting Sort | 🔥🔥🔥 |

> 🪤 **Telecom twist:** Interviewers sometimes frame DSA problems in telecom context: *"Design a data structure to store UE contexts with O(1) lookup by C-RNTI and O(1) lookup by IMSI"* — answer: two hash maps pointing to the same UE object.

---
---

# P4: Debugging & Tooling 🔍

> **Directory:** `debugging-tooling/`
> **Why:** "How would you debug this?" is asked in every senior-level interview.
> **Interview weight:** High — often a full round or woven into coding rounds

---

### 1. GDB Mastery 🔥🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| Starting GDB | `gdb ./binary`, `gdb -p <pid>` (attach), `gdb ./binary core` |
| Breakpoints | `break`, `break file:line`, `break func`, conditional (`break if x > 5`) |
| Execution control | `run`, `continue`, `next` (step over), `step` (step into), `finish` (run until return) |
| Inspection | `print var`, `print *ptr`, `print arr[0]@10` (print 10 elements), `display` |
| Backtrace | `bt` (full stack), `bt full` (with locals), `frame N` (switch frame) |
| Watchpoints | `watch var` (break when var changes), `rwatch` (read), `awatch` (access) |
| Multi-thread debugging | `info threads`, `thread N`, `thread apply all bt`, `set scheduler-locking on` |
| Core dump analysis | `bt`, `info registers`, `info proc mappings`, `x/10x $rsp` (examine memory) |
| TUI mode | `gdb -tui`, `layout src`, `layout asm`, `layout split` |
| Useful tricks | `set print pretty on`, `set pagination off`, `.gdbinit` for automation |

> 🪤 **Interviewer trap:** *"Thread 1 is stuck. How do you find out where?"* — `gdb -p <pid>`, `info threads`, `thread 1`, `bt`. Check if it's blocked on a mutex (`pthread_mutex_lock`) → potential deadlock.

---

### 2. Core Dump Analysis 🔥🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Know |
|----------|-------------|
| Generating cores | `ulimit -c unlimited`, `echo '/tmp/core.%e.%p' > /proc/sys/kernel/core_pattern` |
| Loading in GDB | `gdb ./binary /path/to/core` |
| First steps | `bt` → `frame N` → `print var` → `info registers` |
| Common crash signals | `SIGSEGV` (invalid memory), `SIGABRT` (assertion/abort), `SIGBUS` (alignment), `SIGFPE` (divide by zero) |
| Reading the backtrace | Identifying the faulting frame, reading function arguments, recognizing library frames |
| No symbols? | `-g` flag at compilation, `objdump -t`, `addr2line`, separate debug symbols |
| Truncated stack | Stack corruption — look for buffer overflow |

> 🪤 **Interviewer trap:** *"You get a core dump from production but it was compiled with `-O2` and no `-g`. What can you still do?"* — Use `addr2line` with address from `bt`, check `info registers`, rebuild with debug symbols and compare assembly, use `disassemble` in GDB.

---

### 3. Common Crash Patterns 🔥🔥🔥🔥

**Depth: Deep**

| Crash Type | Root Cause | How to Identify |
|-----------|-----------|----------------|
| Null pointer dereference | Accessing `nullptr` or `NULL` | SIGSEGV at address `0x0` or near it |
| Use-after-free | Accessing memory after `delete`/`free` | SIGSEGV at valid-looking but stale address |
| Double free | Calling `delete`/`free` twice | SIGABRT from glibc (`double free or corruption`) |
| Buffer overflow | Writing past array bounds | Stack smashing detected, corrupted backtrace |
| Stack overflow | Deep/infinite recursion | SIGSEGV at stack boundary address |
| Dangling reference | Reference to destroyed local/temporary | Intermittent garbage values, SIGSEGV |
| Uninitialized memory | Reading before writing | Unpredictable values, intermittent bugs |
| Integer overflow | Signed overflow (UB in C/C++) | Wrong computation results, infinite loops |

---

### 4. Memory Leak Detection 🔥🔥🔥🔥🔥

**Depth: Deep**

| Tool | What to Know |
|------|-------------|
| **Valgrind (memcheck)** | `valgrind --leak-check=full ./binary`, reading the output, "definitely lost" vs "indirectly lost" vs "still reachable" |
| **AddressSanitizer (ASan)** | Compile with `-fsanitize=address`, detects: use-after-free, buffer overflow, stack overflow, leak detection |
| **LeakSanitizer (LSan)** | Compile with `-fsanitize=leak`, lightweight leak detection without full ASan overhead |
| **`mtrace`** | `setenv MALLOC_TRACE`, `mtrace` post-processor — old school but sometimes useful |
| **Manual techniques** | Overriding `new`/`delete` with counters, RAII audit, smart pointer audit |
| **Valgrind vs ASan** | Valgrind: no recompilation, 10-20× slower. ASan: needs recompilation, 2× slower, more accurate |

> 🪤 **Interviewer trap:** *"Your process memory keeps growing but Valgrind says no leaks. What's happening?"* — Possible causes: (1) Memory fragmentation, (2) Growing containers that are never cleared (logical leak, not a malloc leak), (3) Circular references with `shared_ptr`, (4) Thread-local storage accumulation.

---

### 5. Static Analysis 🔥🔥🔥

**Depth: Solid**

| Tool | What to Know |
|------|-------------|
| **Coverity** | Commercial static analyzer, defect types (null deref, resource leak, concurrency issues), triage workflow, false positives |
| **`cppcheck`** | Open-source, finds: null derefs, buffer overflows, unused functions, style issues |
| **Compiler warnings** | `-Wall -Wextra -Werror -Wpedantic`, `-Wshadow`, `-Wconversion` — treat warnings as errors |
| **`clang-tidy`** | Linting + modernization (use `auto`, `nullptr`, range-for), custom checks |
| **Common Coverity defects** | `FORWARD_NULL`, `RESOURCE_LEAK`, `USE_AFTER_FREE`, `UNINIT`, `TAINTED_SCALAR` |

> 🪤 **Interviewer trap:** *"How do you handle false positives in Coverity?"* — (1) Annotate with `// coverity[...]`, (2) Model files for custom APIs, (3) Triage and mark as intentional in the dashboard, (4) Never blindly suppress — document why.

---

### 6. Wireshark & Packet Analysis 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Capture filters | `tcp port 80`, `host 192.168.1.1`, `sctp` |
| Display filters | `sctp`, `ip.addr == x`, `tcp.flags.syn == 1`, filter syntax vs capture syntax |
| Following streams | TCP stream follow, SCTP association analysis |
| Protocol dissection | Reading decoded protocol fields, custom dissectors |
| SCTP in Wireshark | Chunk types, association setup flow, HEARTBEAT analysis, multi-homing |
| GTP-U | Tunnel endpoint IDs, inner vs outer IP, correlating user-plane flows |
| pcap files | Saving/loading captures, `tshark` for CLI analysis, `editcap` for splitting |
| Common debugging | "Why isn't this message reaching?" — filter, check IP, check port, check firewall |

---

### 7. Sanitizers (ASan, TSan, UBSan) 🔥🔥🔥

**Depth: Solid**

| Sanitizer | What It Catches | Flag |
|-----------|----------------|------|
| **AddressSanitizer** | Out-of-bounds, use-after-free, double-free, stack-buffer-overflow | `-fsanitize=address` |
| **ThreadSanitizer** | Data races, deadlocks | `-fsanitize=thread` |
| **UndefinedBehaviorSanitizer** | Signed overflow, null deref, misaligned access, shift overflow | `-fsanitize=undefined` |
| **MemorySanitizer** | Uninitialized memory reads | `-fsanitize=memory` (Clang only) |

> [!NOTE]
> ASan and TSan **cannot be used together** — they're mutually exclusive. Run separate builds.

---

### 8. Performance Profiling 🔥🔥

**Depth: Aware**

| Tool | What to Know |
|------|-------------|
| `perf` | `perf stat`, `perf record`, `perf report`, CPU counters, flame graphs |
| `gprof` | Compile with `-pg`, flat profile vs call graph, sampling limitations |
| `strace` | System call tracing, `-c` (summary), `-e trace=open` (filter), `-p` (attach) |
| `ltrace` | Library call tracing — like strace but for `.so` calls |
| Flame graphs | Visualizing CPU time, on-CPU vs off-CPU, Brendan Gregg's tools |
| `time` | `real` vs `user` vs `sys` time — what each means |

> 🪤 **Interviewer trap:** *"strace shows your process spending 80% of time in `futex()`. What does that mean?"* — `futex` = fast userspace mutex. High futex time = threads are spending most of their time **waiting for locks** → lock contention problem. Solution: reduce critical section size, use lock-free structures, or redesign.

---
---

# P5: DevOps Essentials 🐳

> **Directory:** `devops/`
> **Why:** Cloud-native RAN is how 5G is deployed. You must understand the environment your code runs in.
> **Interview weight:** Low-Medium — rarely a dedicated round, but frequently asked about in HLD discussions
> **Depth target:** Practical — "I can use it" not "I can build it"

---

### 1. Git Advanced 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Branching strategies | Feature branches, GitFlow, trunk-based development |
| Rebase vs Merge | Interactive rebase (`git rebase -i`), when to rebase vs merge, golden rule (never rebase public branches) |
| Cherry-pick | `git cherry-pick <hash>`, resolving conflicts, when to use |
| Bisect | `git bisect start/good/bad` — binary search for bug-introducing commit |
| Stash | `git stash`, `git stash pop`, `git stash list`, named stashes |
| Submodules | `git submodule`, when used (third-party deps), common pain points |
| Hooks | Pre-commit hooks, `husky`, enforcing code standards |
| Conflict resolution | 3-way merge, `ours` vs `theirs`, resolving in editor |
| `reflog` | Recovery from mistakes, `git reflog`, `git reset --hard HEAD@{N}` |

> 🪤 **Interviewer trap:** *"You accidentally committed to main. How do you fix it?"* — `git reset --soft HEAD~1` (keeps changes staged), create a branch, push there. If already pushed: `git revert` (never force-push main).

---

### 2. Docker 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Core concepts | Image vs Container, layers, `docker run`, `docker exec`, `docker ps` |
| Dockerfile | `FROM`, `RUN`, `COPY`, `CMD` vs `ENTRYPOINT`, `WORKDIR`, `EXPOSE`, build context |
| Multi-stage builds | Separate build and runtime stages, smaller final images |
| Volumes | Named volumes, bind mounts, `-v` flag, data persistence |
| Networking | Bridge network, host network, `docker network`, container-to-container communication |
| `docker-compose` | `docker-compose.yml`, multi-container apps, `depends_on`, `links` |
| Registry | `docker push`, `docker pull`, private registries, image tagging strategy |
| Best practices | `.dockerignore`, minimize layers, non-root user, health checks |

> 🪤 **Interviewer trap:** *"What's the difference between `CMD` and `ENTRYPOINT`?"* — `ENTRYPOINT` defines the executable (fixed), `CMD` provides default arguments (overridable). Best practice: use both together.

---

### 3. Kubernetes Essentials 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| Architecture | Control plane (API server, etcd, scheduler, controller-manager) vs Worker nodes (kubelet, kube-proxy) |
| Core objects | Pod, Deployment, Service, ReplicaSet, Namespace |
| Pod lifecycle | Pending → Running → Succeeded/Failed, init containers, sidecar pattern |
| Services | ClusterIP, NodePort, LoadBalancer, headless service |
| ConfigMaps & Secrets | Externalizing config, mounting as env vars or files |
| `kubectl` commands | `get`, `describe`, `logs`, `exec`, `apply`, `delete`, `port-forward` |
| Deployments | Rolling update, rollback, `maxSurge`/`maxUnavailable`, scaling |
| Health checks | Liveness probe, readiness probe, startup probe — how they differ |
| Helm | Charts, `values.yaml`, `helm install/upgrade/rollback`, templating basics |
| Networking | Pod-to-Pod, Service discovery (DNS), Ingress |
| Storage | PersistentVolume (PV), PersistentVolumeClaim (PVC), StorageClass |

> 🪤 **Interviewer trap:** *"What happens when a pod's liveness probe fails?"* — Kubelet **restarts** the container. If readiness probe fails, the pod is removed from Service endpoints (no traffic) but NOT restarted.

> 🪤 **Interviewer trap:** *"How does your CU-CP pod maintain state across restarts?"* — It shouldn't (stateless design). UE state goes to external store (Redis, etcd). This is the cloud-native RAN pattern.

---

### 4. CI/CD Concepts 🔥🔥

**Depth: Aware**

| Subtopic | What to Know |
|----------|-------------|
| Pipeline stages | Build → Unit Test → Static Analysis → Integration Test → Deploy |
| Jenkins basics | Jenkinsfile (declarative vs scripted), stages, agents, artifacts |
| GitLab CI | `.gitlab-ci.yml`, runners, stages, artifacts, caching |
| Key concepts | Continuous Integration, Continuous Delivery vs Deployment, blue-green, canary |
| Artifact management | Build artifacts, Docker image registry, version tagging |
| Code quality gates | Coverity/SonarQube integration, test coverage thresholds |

---

### 5. Build Systems 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Know |
|----------|-------------|
| **Makefile** | Targets, dependencies, variables, `$@`/`$<`/`$^`, `.PHONY`, pattern rules |
| **CMake** | `CMakeLists.txt`, `add_executable`, `target_link_libraries`, `find_package`, generator expressions |
| **Ninja** | What it is (fast build executor), used as CMake backend |
| Compilation flags | `-O0`/`-O2`/`-O3`/`-Os`, `-g`, `-Wall`, `-fsanitize=...`, `-std=c++20` |
| Linking | Static (`.a`) vs Shared (`.so`) libraries, `LD_LIBRARY_PATH`, `rpath` |

> 🪤 **Interviewer trap:** *"What's the difference between static and shared libraries?"* — Static: code copied into binary at link time (larger binary, no runtime dependency). Shared: loaded at runtime by dynamic linker (smaller binary, version management headaches, `LD_LIBRARY_PATH`).

---
---

# P6: System Design (LLD + HLD) 📐

> **Directory:** `system-design/`
> **Why:** The round that determines your level and compensation band.
> **Interview weight:** VERY HIGH for senior roles — often the deciding round
> **Prerequisites:** Needs P1-P5 foundations

---

## Part A: Low-Level Design (LLD)

*"Design a class/module that does X. Show me the interface, the data structures, the concurrency model."*

---

### 1. Design Patterns for Telecom 🔥🔥🔥🔥

**Depth: Deep**

| Pattern | Telecom Use Case |
|---------|-----------------|
| **Singleton** | Logger, Config manager, DB connection pool |
| **Observer** | Event notification (RRC state change → notify all subscribers) |
| **Strategy** | Scheduling algorithms (round-robin, proportional-fair — swap at runtime) |
| **State Machine** | RRC state management (IDLE/CONNECTED/INACTIVE transitions) |
| **Factory** | Message creation (create `F1APMessage` without knowing concrete type) |
| **Command** | Queuing operations for deferred execution |
| **RAII Wrapper** | Lock guards, file handles, socket wrappers |
| **Producer-Consumer** | Message passing between protocol layers |

---

### 2. Thread-Safe Message Queue 🔥🔥🔥🔥🔥

**Depth: Deep** — asked directly in interviews

| Subtopic | What to Cover |
|----------|--------------|
| Interface design | `push()`, `pop()`, `try_pop()`, `empty()`, `size()` |
| Synchronization | `std::mutex` + `std::condition_variable` |
| Bounded vs unbounded | Ring buffer (bounded) vs linked list (unbounded) |
| Template design | `ThreadSafeQueue<T>` |
| Edge cases | Shutdown signaling, timeout on pop, multiple producers/consumers |

---

### 3. Timer Wheel / Timer Manager 🔥🔥🔥🔥

**Depth: Deep** — extremely relevant to protocol stacks (T300, T301, T304, T310...)

| Subtopic | What to Cover |
|----------|--------------|
| Simple timer list | Sorted list, O(n) insert — why it doesn't scale |
| Hierarchical timing wheel | Buckets, tick-based, O(1) start/stop |
| Callback registration | Function pointers / `std::function` / lambda |
| Timer types | One-shot vs periodic |
| Concurrency | Thread-safe timer management |
| 5G context | RRC timers, SCTP heartbeat timers, retransmission timers |

---

### 4. State Machine Framework 🔥🔥🔥🔥🔥

**Depth: Deep** — core of any protocol stack implementation

| Subtopic | What to Cover |
|----------|--------------|
| Enum-driven FSM | State enum + Event enum + transition table |
| Function pointer table | `handler[state][event]` dispatch |
| Guard conditions | Transitions that depend on additional checks |
| Entry/Exit actions | Actions on state enter/leave |
| Hierarchical FSM | Nested states (HSM), common in complex protocols |
| 5G context | RRC states, RACH states, handover states |

---

### 5. LRU Cache 🔥🔥🔥🔥

**Depth: Deep** — classic interview LLD problem

| Subtopic | What to Cover |
|----------|--------------|
| Data structure | HashMap + Doubly Linked List |
| Operations | `get()` O(1), `put()` O(1), eviction O(1) |
| Thread safety | Reader-writer lock, concurrent LRU |
| Template design | `LRUCache<K, V>` |
| 5G context | Caching UE capabilities, measurement configs |

---

### 6. Connection Pool 🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Cover |
|----------|--------------|
| Pool interface | `acquire()`, `release()`, max size, timeout |
| RAII wrapper | Auto-return connection on scope exit |
| Health checking | Periodic validation of pooled connections |
| 5G context | SCTP association pool, Redis connection pool |

---

### 7. Ring Buffer / Circular Buffer 🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Cover |
|----------|--------------|
| Array-based design | Read/write pointers, modulo arithmetic, full vs empty |
| Lock-free variant | Single producer single consumer (SPSC) using atomics |
| 5G context | Packet buffering between layers, DL/UL data path |

---

## Part B: High-Level Design (HLD)

*"Design a system that does X at scale. Walk me through the architecture."*

---

### 8. System Design Framework 🔥🔥🔥

**Depth: Solid** — the approach for any HLD question

| Step | What to Do |
|------|-----------|
| 1. Clarify requirements | Functional, non-functional, scale, latency budget |
| 2. High-level architecture | Block diagram, major components, data flow |
| 3. API / Interface design | What goes in, what comes out, protocols |
| 4. Data model | Key entities, relationships, storage choices |
| 5. Deep dive | Pick a component, go deep — this is where you shine |
| 6. Bottlenecks & trade-offs | Latency vs throughput, consistency vs availability |

---

### 9. Design: gNB CU-CP with High Availability 🔥🔥🔥🔥🔥

**Depth: Deep** — **the** telecom HLD question

| Subtopic | What to Cover |
|----------|--------------|
| Active-Standby architecture | Primary handles traffic, standby takes over on failure |
| State synchronization | What state to sync (UE contexts, bearer configs), how (Redis, shared storage, message replication) |
| Failure detection | SCTP heartbeat, health checks, watchdog timers |
| Failover procedure | SCTP multi-homing, AMF re-routing, UE impact (seamless vs service interruption) |
| Split-brain prevention | Fencing, leader election, consensus |
| Cloud-native variant | Kubernetes pod restart, StatefulSet, PVC for state |

---

### 10. Design: UE Context Management 🔥🔥🔥🔥

**Depth: Deep**

| Subtopic | What to Cover |
|----------|--------------|
| UE context structure | What fields: C-RNTI, IMSI, security context, bearer list, measurement config, RRC state |
| Lookup patterns | O(1) by C-RNTI (hot path), O(1) by AMF-UE-NGAP-ID, iteration for paging |
| Memory management | Pre-allocated pool vs dynamic allocation, memory budget per UE |
| Scaling | How many UEs per CU-CP? Memory estimation. Partitioning strategies |
| Lifecycle | Create on RRC Setup, update on Reconfiguration, delete on Release |
| Concurrency | Which threads access UE context? Locking strategy |

---

### 11. Design: RAN Scheduler 🔥🔥🔥

**Depth: Solid** (unless targeting MAC/scheduler teams)

| Subtopic | What to Cover |
|----------|--------------|
| Scheduling algorithms | Round-robin, Proportional Fair, Max C/I, QoS-aware |
| Timing constraints | Must decide within 1ms (slot-level), real-time requirements |
| Data structures | Priority queues, sorted lists for QoS priority |
| DL vs UL scheduling | Different constraints, buffer status reports (BSR) |
| QoS integration | 5QI → scheduling priority mapping |

---

### 12. Design: Protocol Message Codec 🔥🔥🔥🔥

**Depth: Solid**

| Subtopic | What to Cover |
|----------|--------------|
| ASN.1 encoding | PER (Packed Encoding Rules), BER, what 5G uses (APER for RRC, NGAP; BER for some) |
| Encode/Decode pattern | Message → ASN.1 struct → byte buffer → send/receive → decode |
| Zero-copy design | Avoiding unnecessary copies in the encode/decode path |
| Error handling | Malformed messages, partial decodes, version mismatch |
| Performance | Pre-compiled codec (asn1c, osmocom), runtime cost |

---

### 13. Design: Distributed Logging & Tracing 🔥🔥

**Depth: Aware**

| Subtopic | What to Cover |
|----------|--------------|
| Log aggregation | ELK stack (Elasticsearch + Logstash + Kibana), Fluentd |
| Log levels | ERROR, WARN, INFO, DEBUG, TRACE — when to use each |
| Structured logging | JSON logs, correlation IDs, trace IDs |
| Distributed tracing | OpenTelemetry, span context propagation |
| 5G context | Correlating logs across CU-CP, CU-UP, DU for a single UE flow |

---
---

# P7: 5G RAN Domain 📡

> **Directory:** `5g-ran/` (existing)
> **Full syllabus:** [5g-ran/CONTENTS.md](file:///c:/Users/amanb/Dev/learning/5g-ran/CONTENTS.md)
> **Interview weight:** VERY HIGH — typically a dedicated domain round + woven into system design

### Current Coverage: 34 notes across 6 phases — ✅ Strong

### Gaps to Fill (Prioritized)

| Priority | Topic | Why It's Missing |
|:---:|-------|-----------------|
| 🔴 | **Dual Connectivity (EN-DC, NR-DC, MR-DC)** | Very high interview frequency, especially EN-DC (most deployments are NSA) |
| 🔴 | **RRC Reconfiguration Deep Dive** | The most complex and important RRC message — needs its own note |
| 🔴 | **QoS Architecture (SDAP, 5QI, QoS Flow → DRB mapping)** | Note exists but not started |
| 🔴 | **Network Slicing** | Note exists but not started |
| 🔴 | **CU-CP / CU-UP Split (E1) details** | Note exists but not started |
| 🔴 | **5G Interfaces Deep Dive** | Note exists but not started |
| 🟡 | **Carrier Aggregation** | Inter-band CA, intra-band CA, SCell management |
| 🟡 | **Security (AS/NAS)** | Ciphering, integrity, key hierarchy, security mode command |
| 🟡 | **Network Sharing (MOCN/MORAN)** | Note exists but not started |
| 🟡 | **SON / ANR / MLB** | Self-Organizing Networks, Automatic Neighbor Relations |
| 🟡 | **DAPS Handover (detailed)** | Dual Active Protocol Stack — zero-interruption HO |
| 🟡 | **RedCap (Reduced Capability NR)** | NR-Light for IoT, reduced bandwidth, relaxed latency |
| 🟡 | **UE Capability Handling** | Capability enquiry/info, feature group indicators |
| 🟢 | **NTN** | Note exists but not started — low interview frequency |
| 🟢 | **Sidelink / V2X** | PC5 interface, ProSe — niche but growing |
| 🟢 | **IAB (Integrated Access & Backhaul)** | Self-backhauling gNB — niche |

---
---

# Summary: What You're Studying

| Pillar | Directory | Topics | Top Interview Questions |
|--------|-----------|:---:|------------------------|
| P1: Linux & Bash | `linux-bash/` | 10 | "What happens when you type a command?", zombie processes, signals |
| P2: Networking | `networking/` | 9 | SCTP vs TCP, TCP state diagram, socket programming |
| P3: C++ & DSA | `cpp/` + `dsa-practice/` | 67+12 | VTable, smart pointers, move semantics, LeetCode |
| P4: Debugging | `debugging-tooling/` | 8 | GDB, core dumps, memory leaks, Coverity |
| P5: DevOps | `devops/` | 5 | Docker, K8s pods, CI/CD pipeline, CMake |
| P6: System Design | `system-design/` | 13 | Thread-safe queue, timer wheel, CU-CP HA, state machine |
| P7: 5G RAN | `5g-ran/` | 34+16 | EN-DC, RRC Reconfiguration, QoS, handover flows |

**Total: ~170+ topics and subtopics across 7 pillars.**

---

> [!TIP]
> **Next step:** Once you approve this structure, I'll create the directories, `CONTENTS.md` files for each new pillar, and update [GEMINI.md](file:///c:/Users/amanb/Dev/learning/GEMINI.md) to reflect the new repo structure.

---
*Created: 2026-10-11*
