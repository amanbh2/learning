# C++ Language — Table of Contents & Syllabus

> *Note: This phase assumes strong C knowledge, but covers C++ basics explicitly where the approach differs (e.g., I/O, Strings, Types).*

## Phase 1 — C++ Fundamentals & The Compilation Pipeline (LearnCpp Ch 1-7)

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 01 | [CPU Instruction Set Architecture (ISA)](./01-instruction-set-architecture.md) | ⭐⭐⭐ | How C/C++ compiles to x86/ARM and cross-compilation basics. | **Done** |
| 02 | [Language Levels & The Translation Process](./02-compilation-vs-interpretation.md) | ⭐⭐⭐ | How C++ Ahead-Of-Time (AOT) compilation differs from Python Interpretation | **Done** |
| 03 | [OOP Origins & The Language Landscape](./03-oop-origins-and-landscape.md) | ⭐⭐ | Why OOP was created, C++ history, and market comparisons | **Done** |
| 04 | [Core OOP Concepts](./04-oop-core-concepts.md) | ⭐⭐⭐ | Encapsulation, Abstraction, Inheritance, and Polymorphism | **Done** |
| 05 | [C vs C++: Differences, Additions, and Enduring Problems](./05-c-vs-cpp-differences.md) | ⭐⭐⭐ | Differences between C and C++, why C++ was created, new features, and persistent problems | **Done** |
| 06 | [Basic I/O and Namespaces](./06-basic-io-and-namespaces.md) | ⭐⭐ | Input/Output using iostream and understanding namespaces | **Done** |
| 07 | [Namespaces & Scope Resolution Deep Dive](./07-namespaces-deep-dive.md) | ⭐⭐⭐ | Why :: is used over : and how to handle nested namespaces and global scope shadowing | **Done** |
| 08 | [Compilation and Linking Process](./08-compilation-and-linking-process.md) | ⭐⭐⭐⭐⭐ | Preprocessor, Compiler, Assembler, Linker and translation units | **Done** |
| 09 | [Types, Strings & Constexpr](./09-types-strings-constexpr.md) | ⭐⭐⭐ | `std::string` vs `char*`, `auto` type deduction, `bool`, `constexpr` vs `#define` macros, `nullptr` vs `NULL`. | **Done** |
| 10 | [Crashes, Core Dumps & GDB](./10-crashes-core-dumps-and-gdb.md) | ⭐⭐⭐⭐⭐ | Segmentation Faults, Core Files, GDB commands, MMU hardware | **Done** |
| 11 | [Comments & Documentation Strategies](./11-comments-and-documentation.md) | ⭐ | Doxygen `///` comments, VS Code shortcuts, and commenting best practices | **Done** |
| 12 | [C++ Jargon & Glossary](./12-cpp-jargon-and-glossary.md) | ⭐⭐⭐⭐ | Statements vs Expressions, UB, RAII, L-values, Translation Units | **Done** |
| 13 | [Declaration, Definition & Initialization](./13-declaration-definition-initialization.md) | ⭐⭐⭐⭐⭐ | Decl vs Def, Copy/Direct/Brace Init, Copy Elision, Under the Hood | **Done** |

| 14 | [Local Scope, Lifetime, and Temporary Objects](./14-local-scope-and-lifetime.md) | ⭐⭐⭐⭐ | Local block scope, temporary objects, lifetime, dangling references. | **Done** |

## Phase 2 — Control Flow, Types & Challenges (LearnCpp Ch 1+)

| # | Topic | Interview Heat | Key Concepts | Status |
|---|-------|---------------|--------------|--------|
| 15 | [Control Flow & `enum class`](./15-control-flow.md) | ⭐⭐⭐ | C++ loop mechanics, `enum class`, fallthrough, `constexpr if`. Game loop pattern. | **Done** |
| 16 | [Ch1 Basics Challenge — Temperature Converter](./16-ch1-basics-challenge.md) | ⭐⭐⭐⭐ | Statements vs Expressions, initialization forms, UB, `float` vs `double`, integer division trap, `endl` vs `"\n"` | **Done** |
| 17 | Type Conversions & Casting | ⭐⭐⭐⭐⭐ | Implicit/Explicit casts, **`static_cast`**, `dynamic_cast`, `const_cast`. Replacing C-style casts. | Planned |
| 18 | References vs Pointers | ⭐⭐⭐⭐⭐ | L-value references (`&`), pass-by-reference vs pass-by-address. `const` references. | Planned |
| 19 | Function Overloading & Default Args | ⭐⭐⭐⭐ | Function overloading, name mangling (extern "C"), default arguments, `inline` functions. | Planned |

## Phase 3 — Object-Oriented C++ (LearnCpp Ch 13-15)

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 19 | Enums, Structs & `enum class` | ⭐⭐⭐ | Standard C-enums vs strongly-typed C++ `enum class`. | Planned |
| 20 | Classes & Encapsulation | ⭐⭐⭐ | `class` vs `struct`, access specifiers (public/private/protected), the hidden `this` pointer. | Planned |
| 21 | Object Lifecycle & RAII | ⭐⭐⭐⭐⭐ | Constructors, initializer lists, Destructors. RAII (Resource Acquisition Is Initialization) — **the most important C++ idiom**. | Planned |

## Phase 4 — Modern Data Structures (LearnCpp Ch 16-19)

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 22 | Dynamic Arrays (`std::vector`) | ⭐⭐⭐⭐⭐ | Replacing C-style arrays. Vector capacity vs size, reallocation, `push_back` vs `emplace_back`. | Planned |
| 23 | Fixed Arrays (`std::array`) | ⭐⭐⭐ | Stack-allocated fixed arrays, bounds checking (`.at()`). | Planned |
| 24 | Iterators & Algorithms | ⭐⭐⭐⭐ | Standardizing container access. `<algorithm>` library (`std::sort`, `std::find`). | Planned |
| 25 | Dynamic Allocation | ⭐⭐⭐⭐ | `new` and `delete`. The heap vs stack. Replacing `malloc` and `free`. | Planned |

## Phase 5 — Advanced OOP & Move Semantics (LearnCpp Ch 20-25)

| # | Topic | Interview Heat | Key Concepts & C Comparisons | Status |
|---|-------|---------------|--------------|--------|
| 26 | Lambdas & Callbacks | ⭐⭐⭐⭐ | Lambda expressions, captures (by value/ref), closures, `std::function`. Replacing C function pointers. | Planned |
| 27 | Operator Overloading | ⭐⭐⭐⭐ | Overloading operators (`+`, `<<`, `==`), friend functions. Shallow vs Deep copy, Rule of 3. | Planned |
| 28 | Move Semantics & Smart Pointers | ⭐⭐⭐⭐⭐ | L-values vs R-values, `std::move`. `std::unique_ptr`, `std::shared_ptr`. Rule of 5. | Planned |
| 29 | Inheritance & Memory Layout | ⭐⭐⭐⭐ | Base/Derived classes, object slicing. Memory layout of derived objects. | Planned |
| 30 | Polymorphism & Virtual Functions | ⭐⭐⭐⭐⭐ | Static vs Dynamic binding. **The VTable and VPtr under the hood.** `override`, `final`, pure virtuals. | Planned |

---
*This file is auto-maintained. It updates whenever a new note is added.*
