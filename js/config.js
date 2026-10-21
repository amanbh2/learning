/**
 * AMAN.LEARN - Subject & Curriculum Configuration
 * Personal technical knowledge base and digital note-keeper.
 */
const CONFIG = {
    siteTitle: "AMAN.LEARN",
    siteTagline: "Personal technical knowledge base & digital note-keeper across systems, programming languages, and engineering domains.",
    githubRepo: "https://github.com/amanbh2/learning",
    portfolioUrl: "https://amanbh2.github.io/portfolio/",
    subjects: [
        {
            id: "cpp",
            title: "C++ Language",
            tagline: "Modern C++ (11/14/17/20), Memory Model & Systems Programming",
            description: "Under-the-hood modern C++ concepts: object lifetime, RAII, move semantics, smart pointers, templates, memory order, and concurrency.",
            icon: "⚡",
            contentsFile: "content/cpp/CONTENTS.md",
            baseDir: "content/cpp",
            enabled: true,
            accentColor: "#10b981",
            badge: "Active",
            totalPhases: 10,
            totalTopics: 22
        },
        {
            id: "dsa",
            title: "Data Structures & Algorithms",
            tagline: "Core Structures, Algorithmic Paradigms & Complexity Analysis",
            description: "Deep theoretical understanding and patterns: trees, graphs, heaps, dynamic programming, two pointers, and amortized complexity.",
            icon: "📐",
            contentsFile: "content/dsa/CONTENTS.md",
            baseDir: "content/dsa",
            enabled: false,
            accentColor: "#14b8a6",
            badge: "Planned"
        },
        {
            id: "c",
            title: "C Systems Programming",
            tagline: "Virtual Memory, Pthreads, Sockets & Kernel Interfaces",
            description: "Low-level C concepts: process memory layout, POSIX threads, socket architecture, I/O multiplexing (epoll), and protocol bitfields.",
            icon: "🧩",
            contentsFile: "content/c/CONTENTS.md",
            baseDir: "content/c",
            enabled: true,
            accentColor: "#0ea5e9",
            badge: "Active",
            totalPhases: 3,
            totalTopics: 22
        },
        {
            id: "5g-ran",
            title: "5G RAN Domain",
            tagline: "Radio Access Network, 3GPP Protocols, CU-DU Split & Call Flows",
            description: "Deep technical reference for 5G NR L3 protocols (RRC, F1AP, E1AP, NGAP), mobility procedures, and cloud-native RAN architecture.",
            icon: "📡",
            contentsFile: "content/5g-ran/CONTENTS.md",
            baseDir: "content/5g-ran",
            enabled: true,
            accentColor: "#6366f1",
            badge: "Active",
            totalPhases: 8,
            totalTopics: 55
        },
        {
            id: "linux-bash",
            title: "Linux & Kernel Internals",
            tagline: "System Calls, Process Management, IPC & Shell Scripting",
            description: "Under-the-hood Linux architecture: memory management, virtual filesystem, signals, sockets, and automated scripting.",
            icon: "🐧",
            contentsFile: "content/linux-bash/CONTENTS.md",
            baseDir: "content/linux-bash",
            enabled: false,
            accentColor: "#f59e0b",
            badge: "Planned"
        },
        {
            id: "networking",
            title: "Computer Networking",
            tagline: "TCP/IP, UDP, SCTP, Sockets & Transport Protocols",
            description: "Packet flow analysis, socket programming, flow control, congestion control, SCTP multi-homing, and network debugging.",
            icon: "🌐",
            contentsFile: "content/networking/CONTENTS.md",
            baseDir: "content/networking",
            enabled: false,
            accentColor: "#06b6d4",
            badge: "Planned"
        },
        {
            id: "debugging-tooling",
            title: "Debugging & Tooling",
            tagline: "GDB, Core Dumps, Valgrind, Wireshark & Profiling",
            description: "Production crash analysis: segmentation faults, memory corruption, concurrency race conditions, and packet traces.",
            icon: "🔍",
            contentsFile: "content/debugging-tooling/CONTENTS.md",
            baseDir: "content/debugging-tooling",
            enabled: false,
            accentColor: "#ec4899",
            badge: "Planned"
        },
        {
            id: "devops",
            title: "DevOps & Infrastructure",
            tagline: "Docker, Kubernetes, CI/CD, Git & Build Systems",
            description: "Containerization, K8s orchestration, Helm, CPU pinning, and CI/CD automation pipelines.",
            icon: "🛠️",
            contentsFile: "content/devops/CONTENTS.md",
            baseDir: "content/devops",
            enabled: false,
            accentColor: "#8b5cf6",
            badge: "Planned"
        },
        {
            id: "system-design",
            title: "System Design",
            tagline: "Low-Latency, Resilient & High Availability Distributed Systems",
            description: "Architectural principles for high availability, state replication, consensus, and fault-tolerant distributed services.",
            icon: "🏗️",
            contentsFile: "content/system-design/CONTENTS.md",
            baseDir: "content/system-design",
            enabled: false,
            accentColor: "#f43f5e",
            badge: "Planned"
        }
    ]
};
