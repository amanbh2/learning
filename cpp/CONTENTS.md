# C++ Language — Table of Contents & Syllabus

> *Note: This phase assumes strong C knowledge, but covers C++ basics explicitly where the approach differs (e.g., I/O, Strings, Types).*

## Phase 1 — C++ Fundamentals & Better C

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 01 | [CPU Instruction Set Architecture (ISA)](./01-instruction-set-architecture.md) | ⭐⭐⭐ | How C/C++ compiles to x86/ARM and cross-compilation basics. | **Done** |
| 02 | [Language Levels & The Translation Process](./02-compilation-vs-interpretation.md) | ⭐⭐⭐ | How C++ Ahead-Of-Time (AOT) compilation differs from Python Interpretation | **Done** |
| 03 | [OOP Origins & The Language Landscape](./03-oop-origins-and-landscape.md) | ⭐⭐ | Why OOP was created, C++ history, and market comparisons | **Done** |
| 04 | [Core OOP Concepts](./04-oop-core-concepts.md) | ⭐⭐⭐ | Encapsulation, Abstraction, Inheritance, and Polymorphism | **Done** |
| 05 | [C vs C++: Differences, Additions, and Enduring Problems](./05-c-vs-cpp-differences.md) | ⭐⭐⭐ | Differences between C and C++, why C++ was created, new features, and persistent problems | **Done** |
| 06 | [Basic I/O and Namespaces](./06-basic-io-and-namespaces.md) | ⭐⭐ | Input/Output using iostream and understanding namespaces | **Done** |
| 07 | [Namespaces & Scope Resolution Deep Dive](./07-namespaces-deep-dive.md) | ⭐⭐⭐ | Why :: is used over : and how to handle nested namespaces and global scope shadowing | **Done** |
| 08 | [Compilation and Linking Process](./08-compilation-and-linking-process.md) | ⭐⭐⭐⭐⭐ | Preprocessor, Compiler, Assembler, Linker and translation units | Planned |
| 09 | Types, Strings & Constexpr | ⭐⭐⭐ | `std::string` vs `char*`, `auto` type deduction, `bool`, `constexpr` vs `#define` macros, `nullptr` vs `NULL`. | Planned |
| 10 | References vs Pointers | ⭐⭐⭐⭐⭐ | L-value references (`&`), pass-by-reference vs pass-by-address. `const` references. **Interview: When to use pointers vs references?** | Planned |
| 11 | Functions & Overloading | ⭐⭐⭐⭐ | Function overloading, name mangling (extern "C"), default arguments, `inline` functions vs macros. | Planned |

## Phase 2 — Object-Oriented C++

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 12 | Classes, Structs & Encapsulation | ⭐⭐⭐ | `class` vs `struct`, access specifiers (public/private/protected), the hidden `this` pointer. | Planned |
| 13 | Object Lifecycle & RAII | ⭐⭐⭐⭐⭐ | Constructors, initializer lists, Destructors. RAII (Resource Acquisition Is Initialization) — **the most important C++ idiom**. | Planned |
| 14 | Operator Overloading | ⭐⭐⭐⭐ | Overloading operators (`+`, `<<`, `==`), friend functions. Shallow vs Deep copy, Rule of 3. | Planned |
| 15 | Inheritance & Memory Layout | ⭐⭐⭐⭐ | Base/Derived classes, access controls in inheritance. Object slicing. Memory layout of derived objects. | Planned |
| 16 | Polymorphism & Virtual Functions | ⭐⭐⭐⭐⭐ | Static vs Dynamic binding. **The VTable and VPtr under the hood.** `override`, `final`, pure virtuals, virtual destructors. | Planned |

## Phase 3 — Modern C++ & Memory Safety

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 17 | Move Semantics & R-values | ⭐⭐⭐⭐⭐ | L-values vs R-values, `std::move`, Move constructors/assignment. Rule of 5. Perfect forwarding. **Crucial for performance.** | Planned |
| 18 | Smart Pointers | ⭐⭐⭐⭐⭐ | Replacing `malloc`/`free`. `std::unique_ptr` (zero-cost abstraction), `std::shared_ptr` (ref counting), `std::weak_ptr`. | Planned |
| 19 | Templates & Metaprogramming | ⭐⭐⭐⭐ | Function/Class templates, specialization, SFINAE. Replacing `void*` casts. | Planned |
| 20 | The STL (Standard Template Library) | ⭐⭐⭐⭐⭐ | Containers (`vector`, `map`, `unordered_map`), Iterators, Algorithms (`std::sort`). Replacing manual C data structures. | Planned |
| 21 | Lambdas & Callbacks | ⭐⭐⭐⭐ | Lambda expressions, captures (by value/ref), closures, `std::function`. Replacing C function pointers. | Planned |

## Phase 4 — Robustness & Advanced Topics

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 22 | Exception Handling | ⭐⭐⭐ | `try`, `catch`, `throw`. Stack unwinding. `noexcept`. Error handling vs C's `errno`/return codes. | Planned |
| 23 | Concurrency | ⭐⭐⭐⭐⭐ | `std::thread`, `std::mutex`, `std::lock_guard`, atomics. Replacing pthreads. | Planned |

---
*This file is auto-maintained. It updates whenever a new note is added.*
