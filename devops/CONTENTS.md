# P5: DevOps Essentials — Table of Contents & Syllabus

> **Pillar:** P5 (Applied Knowledge Layer)
> **Goal:** Understand the environment your code runs in — practical, not expert-level
> **Interview weight:** Low-Medium — rarely a dedicated round, but comes up in HLD discussions
> **Depth:** Solid on Docker/K8s/Build Systems, Aware on CI/CD

---

## Phase 1 — Version Control & Build

*"How do you manage code and build C++ projects in industry?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 01 | Git Advanced | 🔥🔥🔥 | Rebase vs merge, cherry-pick, bisect, stash, submodules, hooks, `reflog`, conflict resolution | 📋 Planned |
| 02 | Build Systems (CMake, Make, Ninja) | 🔥🔥🔥 | Makefile syntax, CMakeLists.txt, `target_link_libraries`, static vs shared libs, compilation flags | 📋 Planned |

## Phase 2 — Containers & Orchestration

*"How is your gNB software deployed in production?"*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 03 | Docker | 🔥🔥🔥 | Image vs container, Dockerfile, multi-stage builds, volumes, networking, `docker-compose` | 📋 Planned |
| 04 | Kubernetes Essentials | 🔥🔥🔥 | Architecture, Pods, Deployments, Services, ConfigMaps, `kubectl`, health probes, Helm, storage | 📋 Planned |

## Phase 3 — Pipeline

*"Walk me through your CI/CD pipeline."*

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|:---:|-------------|--------|
| 05 | CI/CD Concepts | 🔥🔥 | Pipeline stages, Jenkins/GitLab CI basics, artifact management, code quality gates | 📋 Planned |

---

## Cross-References

- Compilation process: [cpp/08-compilation-and-linking-process.md](../cpp/08-compilation-and-linking-process.md)
- Cloud-native RAN: [5g-ran/29-cucp-resiliency-and-ha.md](../5g-ran/29-cucp-resiliency-and-ha.md)
- Redis in cloud-native: [5g-ran/30-redis-in-cloud-native-ran.md](../5g-ran/30-redis-in-cloud-native-ran.md)

---
*This file is auto-maintained. Updated whenever notes are added or modified.*
*Last updated: 2026-10-11*
