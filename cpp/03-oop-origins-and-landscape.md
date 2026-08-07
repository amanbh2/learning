# OOP Origins & The Language Landscape

## 1. Why was OOP created? (The Need)

In the 1970s and 1980s, software was growing incredibly complex. Languages like C were built around **Procedural Programming**—software was a series of steps (functions) that operated on raw data structures.

**The Crisis:**
1. **Global State Chaos:** As codebases reached millions of lines, managing global variables became a nightmare. Any function could modify any data.
2. **Mental Overload:** Human brains struggle to map abstract procedures to real-world business logic. 
3. **Code Reuse:** In C, if you wanted a Queue for Integers and a Queue for Floats, you basically had to write two separate sets of functions or use dangerous `void *` casts.

**The Solution:** Object-Oriented Programming (OOP) was born to model software after the real world. Instead of "Data + Functions that act on data," OOP bundles them together into **Objects** ("Nouns" that possess both state/data and behaviors/methods).

---

## 2. The Origins and Timeline of C and C++

### A Brief Timeline
- **1972 (The Birth of C):** Dennis Ritchie at Bell Labs creates C to rewrite the UNIX operating system. C becomes the dominant language for systems programming because of its simplicity and raw hardware access.
- **1979 ("C with Classes"):** Bjarne Stroustrup (also at Bell Labs) is working on complex simulations. He loves the organizational power of an older language called *Simula* (the first language with objects), but needs the raw speed of C. He creates an extension to C called "C with Classes".
- **1983 (C++ is Born):** "C with Classes" is officially renamed to **C++** (a pun on the C increment operator `++`, meaning the next evolution of C).
- **1989/1990 (ANSI C / C89 / C90):** The C language is officially standardized for the first time.
- **1998 (C++98):** The first official ISO standard for C++ is released, standardizing the language and introducing the Standard Template Library (STL).

### The Evolution of the Standards
Both C and C++ are governed by ISO committees that release new versions (standards) every few years to modernize the languages.

#### Major C Standards
| Standard      | Year | Key Updates                                                                                                         |
| ------------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| **C89 / C90** | 1989 | The original ANSI/ISO standard.                                                                                     |
| **C99**       | 1999 | Added `inline` functions, variable-length arrays, `//` single-line comments (borrowed from C++), and `<stdbool.h>`. |
| **C11**       | 2011 | Added multi-threading support (`<threads.h>`), static assertions, and anonymous structures.                         |
| **C17 / C18** | 2018 | A bug-fix release with no major new features.                                                                       |
| **C23**       | 2023 | Modernizations like `nullptr`, `constexpr`, and removing old legacy features (K&R function definitions).            |

#### Major C++ Standards
| Standard | Year | Key Updates |
|----------|------|-------------|
| **C++98 / C++03**| 1998 | The baseline standard. Introduced STL (vectors, maps) and exceptions. C++03 was a minor bug-fix. |
| **C++11** *(Revolutionary)*| 2011 | Completely modernized the language. Added `auto`, `nullptr`, smart pointers, move semantics, and lambdas. Often referred to as "Modern C++". |
| **C++14** | 2014 | Minor updates and bug fixes for C++11. |
| **C++17** | 2017 | Added `std::optional`, `std::variant`, `std::string_view`, and parallel algorithms. |
| **C++20** *(Revolutionary)*| 2020 | Massive update. Added Modules (replacing `#include`), Concepts (template safety), Coroutines, and the `std::format` library. |
| **C++23** | 2023 | Standard library enhancements (e.g., `std::print`). |

---

## 3. What are C and C++ Used For?
Because C and C++ are compiled directly to machine code and offer deterministic, low-level memory control, they are used wherever **performance, latency, and resource constraints** are critical.

**Common Uses of C:**
- Operating System Kernels (Linux, Windows, macOS).
- Embedded Systems (Microcontrollers, IoT devices).
- Device Drivers.
- Legacy telecom systems.

**Common Uses of C++:**
- **Telecommunications:** 5G RAN (gNodeB L1/L2 stacks) where processing must happen in exact microsecond deadlines.
- **Video Games:** AAA game engines (Unreal Engine) where graphics rendering requires maximum CPU/GPU throughput.
- **High-Frequency Trading:** Financial systems where a microsecond delay costs millions of dollars.
- **Web Browsers:** The engines inside Chrome (V8) and Firefox are built in C++ to render pages and execute JavaScript quickly.
- **AI Infrastructure:** While data scientists write Python, the heavy lifting underneath (TensorFlow, PyTorch, CUDA) is entirely C++.

---

## 3. The OOP Language Landscape & Market Needs

Different OOP languages evolved to solve specific market problems. Here is how they differ and where they fit today:

### C++
- **Design Philosophy:** "Zero-overhead abstraction." You pay for what you use. It gives you raw memory control (like C) but with OOP abstractions.
- **Where it fits:** High-frequency trading, AAA Game Engines (Unreal), Telecommunications (5G RAN, gNodeB), Embedded Systems, Browsers (V8 Engine).
- **Market Popularity:** Extremely high in domains where **microseconds matter**. Difficult to master, so senior C++ engineers are highly paid and heavily recruited.

### Java
- **Design Philosophy:** "Write Once, Run Anywhere." Java compiles to bytecode that runs on a Virtual Machine (JVM). It introduced Automatic Garbage Collection (you don't call `free()`).
- **Where it fits:** Enterprise backend systems (banking, ecommerce), Android apps, Big Data (Hadoop, Kafka).
- **Market Popularity:** Massive in the corporate enterprise world. It trades the raw speed of C++ for safety (no segmentation faults) and developer productivity.

### C#
- **Design Philosophy:** Microsoft's response to Java. Very similar to Java but tied closely to the Windows ecosystem (though now cross-platform via .NET Core).
- **Where it fits:** Enterprise software, Unity Game Engine, Windows desktop apps.
- **Market Popularity:** Extremely popular in corporate IT and game development (via Unity).

### Python
- **Design Philosophy:** "Readability counts." It is dynamically typed, interpreted, and supports OOP, procedural, and functional paradigms.
- **Where it fits:** AI/Machine Learning, Data Science, Backend Web (Django/FastAPI), Scripting/Automation.
- **Market Popularity:** The most popular language in the world right now due to the AI boom. However, it is **very slow** compared to C++. (Interestingly, Python's AI libraries like PyTorch/TensorFlow are actually written in C++ under the hood for speed!).

### Rust (The Modern Challenger)
- **Design Philosophy:** Memory safety without garbage collection.
- **Where it fits:** Directly competing with C and C++ in system programming.
- **Market Popularity:** Rapidly growing. Many companies are rewriting C++ codebases in Rust to prevent memory leaks and security vulnerabilities, though 5G telecom is still heavily entrenched in C/C++.

## Key Takeaways for a 5G RAN Engineer
As a 5G engineer, you are operating in the **C/C++ domain** because handling radio frames every 1ms requires deterministic, real-time performance. Java and Python have Garbage Collectors that can randomly pause the program for 10ms to clean up memory—in a gNodeB, a 10ms pause means dropped calls and a crashed network.

---
*Last updated: 2026-07-28*
