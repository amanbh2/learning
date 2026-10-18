/**
 * Learning Hub - Subject Configuration
 * Easily enable/disable subjects and define metadata.
 */
const CONFIG = {
    siteTitle: "Learning Hub",
    siteTagline: "Interview-grade mastery across 5G RAN, Systems, and Telecom Engineering",
    githubRepo: "https://github.com/amanbh2/learning",
    subjects: [
        {
            id: "5g-ran",
            title: "5G RAN Domain",
            tagline: "Radio Access Network, RRC, CU-DU/CU-CP Architecture & Call Flows",
            description: "Deep, interview-level knowledge of 5G NR, L3 protocols, F1/E1 interfaces, mobility procedures, 3GPP releases, and cloud-native RAN.",
            icon: "📡",
            pillar: "P7",
            layer: "Domain Layer",
            contentsFile: "5g-ran/CONTENTS.md",
            baseDir: "5g-ran",
            enabled: true,
            accentColor: "#6366f1",
            badge: "Active",
            totalPhases: 8,
            totalTopics: 55
        },
        {
            id: "linux-bash",
            title: "Linux & Bash",
            tagline: "Kernel, System Calls, Process Management & Shell Scripting",
            description: "Under-the-hood Linux internals, memory management, IPC, signals, networking stack, and advanced scripting.",
            icon: "🐧",
            pillar: "P1",
            layer: "Foundation Layer",
            contentsFile: "linux-bash/CONTENTS.md",
            baseDir: "linux-bash",
            enabled: false,
            accentColor: "#f59e0b",
            badge: "Planned"
        },
        {
            id: "networking",
            title: "Networking",
            tagline: "TCP/IP, UDP, SCTP, Sockets & Telecom Transport",
            description: "Deep packet analysis, socket programming, flow control, congestion control, SCTP multi-homing, and network debugging.",
            icon: "🌐",
            pillar: "P2",
            layer: "Foundation Layer",
            contentsFile: "networking/CONTENTS.md",
            baseDir: "networking",
            enabled: false,
            accentColor: "#0ea5e9",
            badge: "Planned"
        },
        {
            id: "cpp",
            title: "C++ & DSA",
            tagline: "Modern C++ (11/14/17/20), Low-Latency Systems & Data Structures",
            description: "Master modern C++, RAII, smart pointers, move semantics, multithreading, lock-free queues, and DSA implementation.",
            icon: "⚡",
            pillar: "P3",
            layer: "Core Layer",
            contentsFile: "cpp/CONTENTS.md",
            baseDir: "cpp",
            enabled: false,
            accentColor: "#10b981",
            badge: "Planned"
        },
        {
            id: "debugging-tooling",
            title: "Debugging & Tooling",
            tagline: "GDB, Core Dumps, Valgrind, Wireshark & Profiling",
            description: "Industrial debugging techniques: crash analysis, memory leaks, concurrency race conditions, and packet traces.",
            icon: "🔍",
            pillar: "P4",
            layer: "Core Layer",
            contentsFile: "debugging-tooling/CONTENTS.md",
            baseDir: "debugging-tooling",
            enabled: false,
            accentColor: "#ec4899",
            badge: "Planned"
        },
        {
            id: "devops",
            title: "DevOps Essentials",
            tagline: "Docker, Kubernetes, CI/CD, Git & Modern Build Systems",
            description: "Containerization, K8s orchestration in telecom (SR-IOV, DPDK, CPU pinning), Helm, and CI/CD automation pipelines.",
            icon: "🛠️",
            pillar: "P5",
            layer: "Applied Layer",
            contentsFile: "devops/CONTENTS.md",
            baseDir: "devops",
            enabled: false,
            accentColor: "#8b5cf6",
            badge: "Planned"
        },
        {
            id: "system-design",
            title: "System Design",
            tagline: "Telecom LLD & HLD: Resilient, Low-Latency High Availability",
            description: "Designing carrier-grade 99.999% availability systems, CU-CP warm/hot redundancy, distributed state synchronization.",
            icon: "🏗️",
            pillar: "P6",
            layer: "Applied Layer",
            contentsFile: "system-design/CONTENTS.md",
            baseDir: "system-design",
            enabled: false,
            accentColor: "#14b8a6",
            badge: "Planned"
        }
    ]
};
