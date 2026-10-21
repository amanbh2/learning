# C++ Language — Table of Contents & Notes

> **Purpose:** Deep conceptual mastery of Modern C++ (11/14/17/20), language mechanics, object models, memory management, and low-level systems programming.
> **Note Track:** Theoretical foundations, language rules, memory diagrams, and under-the-hood explanations for quick review and retention.

---

## Phase 0 — Context & The C++ Landscape

*Purpose: Understand the machine and ecosystem before writing a single line of C++. No challenge — this is prerequisite context.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 01 | [CPU Instruction Set Architecture (ISA)](./01-instruction-set-architecture.md) | ⭐⭐⭐ | x86 vs ARM vs RISC-V, CISC vs RISC, cross-compilation | ✅ Done |
| 02 | [Language Levels & The Translation Process](./02-compilation-vs-interpretation.md) | ⭐⭐⭐ | AOT vs Interpreted, PVM, portability vs performance tradeoff | ✅ Done |
| 03 | [OOP Origins & The Language Landscape](./03-oop-origins-and-landscape.md) | ⭐⭐ | Why OOP was created, C++ history, multi-paradigm design | ✅ Done |
| 04 | [Core OOP Concepts](./04-oop-core-concepts.md) | ⭐⭐⭐ | Encapsulation, Abstraction, Inheritance, Polymorphism | ✅ Done |
| 05 | [C vs C++: Differences & Enduring Problems](./05-c-vs-cpp-differences.md) | ⭐⭐⭐ | What C++ adds over C, UB, memory management, templates | ✅ Done |

---

## Phase 1 — Foundations: The Compilation Pipeline & Program Structure

*LearnCpp Ch 1–3, 7. Purpose: Know what the machine does with your code before you write it.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 06 | [Basic I/O and Namespaces](./06-basic-io-and-namespaces.md) | ⭐⭐ | `iostream`, `cin`/`cout`, `std::` prefix, `using namespace` danger | ✅ Done |
| 07 | [Namespaces Deep Dive](./07-namespaces-deep-dive.md) | ⭐⭐⭐ | Nested namespaces, `::` vs `:`, anonymous namespaces, ADL | ✅ Done |
| 08 | [The Compilation & Linking Process](./08-compilation-and-linking-process.md) | ⭐⭐⭐⭐⭐ | Preprocessor, Compiler, Assembler, Linker, TUs, ODR, build flags | ✅ Done |
| 09 | [Types, Strings & Compile-Time Evaluation](./09-types-strings-constexpr.md) | ⭐⭐⭐ | `bool`, `nullptr` vs `NULL`, `std::string` vs `char*`, `auto`, `constexpr` vs `#define` | ✅ Done |
| 10 | [Crashes, Core Dumps & GDB](./10-crashes-core-dumps-and-gdb.md) | ⭐⭐⭐⭐⭐ | Segfaults, Core files, GDB commands, MMU, signal handling | ✅ Done |
| 11 | [Comments & Documentation](./11-comments-and-documentation.md) | ⭐ | Doxygen `///`, file-level comments, documentation strategy | ✅ Done |
| 12 | [C++ Jargon & Glossary](./12-cpp-jargon-and-glossary.md) | ⭐⭐⭐⭐ | Statements vs Expressions, UB causes, RAII intro, L/R-values, TU, zero-overhead | ✅ Done |
| 13 | [Declaration, Definition & Initialization](./13-declaration-definition-initialization.md) | ⭐⭐⭐⭐⭐ | ODR, copy/direct/brace init, narrowing conversions, copy elision, `[[maybe_unused]]` | ✅ Done |
| 14 | [Local Scope, Lifetime & Temporary Objects](./14-local-scope-and-lifetime.md) | ⭐⭐⭐⭐ | Scope vs lifetime, `static` locals, temporaries, dangling refs, lifetime extension | ✅ Done |
| 15 | [Control Flow & `enum class`](./15-control-flow.md) | ⭐⭐⭐ | Range-based `for`, `enum class` vs C enum, `[[fallthrough]]`, `constexpr if`, game loop | ✅ Done |

### 🎯 Challenge 1 — C++ Basics (Temperature Converter)

> **File:** [`16-ch1-basics-challenge.md`](./16-ch1-basics-challenge.md)
> **Covers:** Notes 06–15 — `cin`/`cout`, initialization, UB, integer division trap, `\n` vs `endl`
> **Namespace requirement:** Converter logic must live in a `converter::` namespace. Split across at least two `.cpp` files and compile manually with `g++` — exercises notes 07 (namespaces) and 08 (compilation & linking).
> **Status:** ✅ Done & Reviewed

---

## Phase 2 — Type System: Casts, Functions & References

*LearnCpp Ch 8–12. Purpose: Understand how C++ truly handles types — where C++ is stricter, safer, and smarter than C.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 17 | [Type System & Implicit Conversions](./17-type-system-and-conversions.md) | ⭐⭐⭐⭐ | Integral promotion, arithmetic conversions, narrowing, `static_cast`, `const_cast`, `reinterpret_cast`, `dynamic_cast` intro, why no C-style casts | ✅ Done |
| 18 | [Functions: Overloading, Default Args & `inline`](./18-functions-overloading-defaults.md) | ⭐⭐⭐⭐ | Function overloading, name mangling, `extern "C"`, default args, `inline`, deleted functions | ✅ Done |
| 19 | [References: L-value Refs, `const` Refs & Dangling](./19-references.md) | ⭐⭐⭐⭐⭐ | `&` vs `*`, pass-by-ref vs pass-by-address, `const T&`, return-by-ref traps, reference semantics | ✅ Done |

### 🎯 Challenge 2 — Type-Safe Calculator

> **File:** [`20-challenge2-type-safe-calculator.md`](./20-challenge2-type-safe-calculator.md)
> **Covers:** Notes 17–19 — `static_cast`, function overloading, references, `const` correctness
> **Namespace requirement:** All calculator logic in a `calc::` namespace with inner `detail::` namespace for helpers — exercises nested namespaces (note 07) and ADL.
> **Status:** 🔵 Active — Code it and submit for review

---

## Phase 3 — OOP Foundations: Classes, Encapsulation & RAII

*LearnCpp Ch 13–15. Purpose: The beating heart of C++ — where it truly separates from C.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 21 | [Structs & Classes: The Basics](./21-structs-and-classes.md) | ⭐⭐⭐ | `class` vs `struct`, access specifiers, member functions, `this` pointer | 📋 Planned |
| 22 | [Constructors & Initializer Lists](./22-constructors-initializer-lists.md) | ⭐⭐⭐⭐⭐ | Constructor types, member initializer list vs body assignment, delegating constructors, `explicit` | 📋 Planned |
| 23 | [Destructors & RAII](./23-destructors-raii.md) | ⭐⭐⭐⭐⭐ | Destructor mechanics, RAII pattern, resource acquisition = initialization, why no GC is needed | 📋 Planned |
| 24 | [Static Members, Friend & Encapsulation](./24-static-members-friend-encapsulation.md) | ⭐⭐⭐ | `static` data/function members, `friend` functions/classes, proper encapsulation design | 📋 Planned |

### 🎯 Challenge 3 — RAII File Logger

> **File:** `25-challenge3-raii-file-logger.md`
> **Covers:** Notes 21–24 — class design, constructors, RAII destructor auto-closes file handle, `const` correctness
> **Namespace requirement:** Logger in `logging::` namespace with `logging::detail::` for internals. Split into `logger.h` + `logger.cpp` + `main.cpp` — exercises header guards, multi-TU compilation (note 08), and namespace organisation (note 07).
> **Status:** 📋 Planned

---

## Phase 4 — Operator Overloading & Copy Semantics

*LearnCpp Ch 21. Purpose: Deep copy, shallow copy, Rule of Three — classic interview territory.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 26 | [Operator Overloading](./26-operator-overloading.md) | ⭐⭐⭐⭐ | Overloading `+`, `<<`, `==`, `[]`, member vs friend, operator chaining | 📋 Planned |
| 27 | [Copy Semantics & Rule of Three](./27-copy-semantics-rule-of-three.md) | ⭐⭐⭐⭐⭐ | Shallow vs deep copy, copy constructor, copy assignment operator, Rule of Three | 📋 Planned |

### 🎯 Challenge 4 — Matrix Class with Operators

> **File:** `28-challenge4-matrix-class.md`
> **Covers:** Notes 26–27 — operator overloading, deep copy, Rule of Three
> **Status:** 📋 Planned

---

## Phase 5 — Data Structures & The STL (Part 1: Sequential)

*LearnCpp Ch 16–19. Purpose: Learn the standard sequential containers and their internals — then implement them yourself. No templates yet — that comes in Phase 8.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 29 | [std::array & std::vector](./29-array-and-vector.md) | ⭐⭐⭐⭐⭐ | Stack-fixed vs heap-dynamic, `size` vs `capacity`, reallocation factor, `emplace_back` vs `push_back`, iterator invalidation on realloc | 📋 Planned |
| 30 | [Iterators & Algorithms](./30-iterators-and-algorithms.md) | ⭐⭐⭐⭐ | Iterator categories (input/forward/bidirectional/random-access), `begin`/`end`, `std::sort`, `std::find`, `std::transform`, `std::accumulate` | 📋 Planned |
| 31 | [Dynamic Allocation: new, delete & The Heap](./31-dynamic-allocation.md) | ⭐⭐⭐⭐ | `new`/`delete` vs `malloc`/`free`, heap vs stack, memory leaks, `new[]`/`delete[]`, placement `new` | 📋 Planned |
| 33 | [std::list & std::forward_list](./33-list-forward-list.md) | ⭐⭐⭐⭐ | Node-based memory, pointer chaining, no random access, iterator invalidation rules vs vector, `splice`, cache performance cost | 📋 Planned |
| 34 | [std::stack, std::queue & std::deque](./34-stack-queue-deque.md) | ⭐⭐⭐⭐ | Adapter containers, `std::deque` chunk-array internals, LIFO vs FIFO, when deque beats vector | 📋 Planned |

### 🎯 Challenge 5 — `MyVector<int>` from Scratch

> **File:** `32-challenge5-myvector.md`
> **Covers:** Notes 29–31 — implement a dynamic array: heap allocation, `push_back` with capacity doubling, `operator[]`, copy constructor, destructor (RAII). No templates yet — use `int` as the element type.
> **Status:** 📋 Planned

### 🎯 Challenge 6 — `MyLinkedList` from Scratch

> **File:** `35-challenge6-my-linked-list.md`
> **Covers:** Notes 33–34 — singly linked list with `push_front`/`push_back`/`pop_front`, RAII node cleanup in destructor, forward iterator pattern, `operator==`. No templates — use `int`.
> **Status:** 📋 Planned

### 🎯 Challenge 7 — `MyStack` & `MyQueue` from Scratch

> **File:** `36-challenge7-my-stack-queue.md`
> **Covers:** Notes 33–34 — build a LIFO stack and FIFO queue on top of your `MyLinkedList` (adapter pattern). Enforce correct interface — no indexing allowed through the adapter.
> **Status:** 📋 Planned

---

## Phase 6 — Inheritance & Polymorphism

*LearnCpp Ch 24–25. Purpose: The VTable, virtual dispatch, and why object slicing will haunt you.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 37 | [Inheritance & Memory Layout](./37-inheritance-memory-layout.md) | ⭐⭐⭐⭐ | Base/derived, `protected`, object slicing, memory layout of derived objects, constructor/destructor call order | 📋 Planned |
| 38 | [Virtual Functions & The VTable](./38-virtual-functions-vtable.md) | ⭐⭐⭐⭐⭐ | `virtual`, static vs dynamic binding, VTable & VPtr under the hood, `override`, `final`, cost of virtual dispatch | 📋 Planned |
| 39 | [Abstract Classes & Interface Pattern](./39-abstract-classes-interfaces.md) | ⭐⭐⭐⭐ | Pure virtual (`= 0`), abstract classes, interface pattern, `virtual` destructors (critical!), `dynamic_cast` deep dive | 📋 Planned |

### 🎯 Challenge 8 — Polymorphic Shape Renderer

> **File:** `40-challenge8-shape-renderer.md`
> **Covers:** Notes 37–39 — inheritance hierarchy, virtual dispatch, pure virtuals, virtual destructor
> **Status:** 📋 Planned

---

## Phase 7 — Move Semantics & Smart Pointers

*LearnCpp Ch 22–23. Purpose: The single most important modern C++ topic for performance-critical and memory-safe code.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 41 | [L-values, R-values & Move Semantics](./41-lvalues-rvalues-move-semantics.md) | ⭐⭐⭐⭐⭐ | L/R/X-value taxonomy, `std::move`, move constructor, move assignment, Rule of Five, perfect forwarding intro | 📋 Planned |
| 42 | [Smart Pointers](./42-smart-pointers.md) | ⭐⭐⭐⭐⭐ | `unique_ptr`, `shared_ptr`, `weak_ptr`, `make_unique`/`make_shared`, custom deleters, cyclic reference trap | 📋 Planned |

### 🎯 Challenge 9 — `MyUniquePtr<T>` & `MySharedPtr<T>` from Scratch

> **File:** `43-challenge9-my-smart-pointers.md`
> **Covers:** Notes 41–42 — implement `MyUniquePtr` (non-copyable, move-only, RAII) and `MySharedPtr` (ref-counted, with `MyWeakPtr` to break cycles). Forces Rule of Five, move semantics, and reference counting from first principles.
> **Status:** 📋 Planned

---

## Phase 8 — Templates & Generic Programming

*LearnCpp Ch 11, 26. Purpose: Write once, work for any type — the backbone of the entire STL.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 44 | [Function & Class Templates](./44-function-class-templates.md) | ⭐⭐⭐⭐⭐ | Template syntax, type deduction, explicit specialization, class templates, template non-type parameters | 📋 Planned |
| 45 | [Advanced Templates: Variadic & SFINAE](./45-advanced-templates.md) | ⭐⭐⭐⭐ | Variadic templates, fold expressions, `std::enable_if`, SFINAE, tag dispatch | 📋 Planned |
| 46 | [Concepts (C++20)](./46-concepts.md) | ⭐⭐⭐⭐ | `requires` clause, named concepts (`std::integral`, `std::copyable`), constrained auto, replacing SFINAE | 📋 Planned |

### 🎯 Challenge 10 — Type-Safe `Optional<T>` Implementation

> **File:** `47-challenge10-my-optional.md`
> **Covers:** Notes 44–46 — class templates, template specialization, concepts for constraints
> **Status:** 📋 Planned

---

## Phase 8b — Data Structures & The STL (Part 2: Associative & Sorted)

*Now that we have templates, we revisit data structures — implementing them properly: fully generic, type-safe, and production-grade. These are the structures interviewers most love to ask you to build from scratch.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 48 | [std::map, std::set & BST Internals](./48-map-set-bst-internals.md) | ⭐⭐⭐⭐⭐ | Red-black tree concept, why `std::map` is always sorted, `lower_bound`/`upper_bound`, iterator stability, `emplace` vs `insert` | 📋 Planned |
| 49 | [std::unordered_map & Hash Table Internals](./49-unordered-map-hash-internals.md) | ⭐⭐⭐⭐⭐ | Bucket array, separate chaining vs open addressing, load factor & rehashing, `std::hash`, worst-case O(n) and when to avoid | 📋 Planned |
| 50 | [std::priority_queue, Heaps & Sorting Algorithms](./50-priority-queue-heap-sorting.md) | ⭐⭐⭐⭐⭐ | Max/min-heap, `sift_up`/`sift_down`, `std::make_heap`, `std::sort` introsort internals, quicksort, mergesort, binary search complexity | 📋 Planned |

### 🎯 Challenge 11 — Generic `MyBST<K, V>` from Scratch

> **File:** `51-challenge11-my-bst.md`
> **Covers:** Note 48 — templated BST with `insert`, `find`, `erase`, in-order traversal (`begin`/`end` iterator), and `operator[]`. Handle the tricky 3-case delete (leaf, one child, two children).
> **Status:** 📋 Planned

### 🎯 Challenge 12 — Generic `MyHashMap<K, V>` from Scratch

> **File:** `52-challenge12-my-hashmap.md`
> **Covers:** Note 49 — hash map with separate chaining, custom `hash<K>` hook, load factor resize (rehash at 0.75), `insert`/`find`/`erase`/`operator[]`. Compare perf against `std::unordered_map`.
> **Status:** 📋 Planned

### 🎯 Challenge 13 — `MyHeap<T>` + Sorting Algorithms from Scratch

> **File:** `53-challenge13-my-heap-sorting.md`
> **Covers:** Note 50 — templated max-heap with `push`/`pop`/`top`; implement quicksort (in-place, median-of-3 pivot) and mergesort over a `std::vector<T>`; implement binary search. Benchmark against `std::sort`.
> **Status:** 📋 Planned

---

## Phase 9 — Lambdas, Functional Programming & Callbacks

*LearnCpp Ch 20. Purpose: The modern C++ way to pass behavior as data — mandatory for STL mastery.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 54 | [Lambdas & Closures](./54-lambdas-and-closures.md) | ⭐⭐⭐⭐ | Lambda syntax, capture modes (by value, by ref, `this`), generic lambdas, `mutable`, IIFE | 📋 Planned |
| 55 | [std::function, Callbacks & Event Patterns](./55-std-function-callbacks.md) | ⭐⭐⭐⭐ | `std::function` overhead vs templates, function pointers vs lambdas, `std::bind`, observer pattern | 📋 Planned |

### 🎯 Challenge 14 — Mini Event Dispatcher

> **File:** `56-challenge14-event-dispatcher.md`
> **Covers:** Notes 54–55 — lambdas, `std::function`, callbacks, event subscription/notification
> **Status:** 📋 Planned

---

## Phase 10 — Error Handling

*LearnCpp Ch 27. Purpose: Write code that handles failure gracefully — the mark of production-quality engineering.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 57 | [Exceptions: try, catch, throw](./57-exceptions.md) | ⭐⭐⭐⭐ | Exception hierarchy, `std::exception`, stack unwinding, exception safety guarantees (basic/strong/nothrow) | 📋 Planned |
| 58 | [noexcept, std::optional & Modern Error Handling](./58-noexcept-optional-error-handling.md) | ⭐⭐⭐⭐ | `noexcept` and move semantics, `std::optional`, `std::expected` (C++23), error-code vs exception debate | 📋 Planned |

### 🎯 Challenge 15 — Exception-Safe Config Parser

> **File:** `59-challenge15-config-parser.md`
> **Covers:** Notes 57–58 — exceptions, `std::optional`, `noexcept`, error-handling strategy
> **Status:** 📋 Planned

---

## Phase 11 — Expert C++: Compile-Time Programming

*LearnCpp Ch 5, 28+. Purpose: Write programs where the compiler does the heavy lifting at build time.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 60 | [constexpr Everything & consteval](./60-constexpr-consteval.md) | ⭐⭐⭐⭐ | `constexpr` functions, `consteval`, `if constexpr`, compile-time computation, `std::array` with `constexpr` | 📋 Planned |
| 61 | [Type Traits & Metaprogramming](./61-type-traits-metaprogramming.md) | ⭐⭐⭐ | `std::is_same`, `std::decay`, `std::remove_reference`, `std::conditional`, custom type traits | 📋 Planned |

### 🎯 Challenge 16 — Compile-Time JSON Serializer (type trait driven)

> **File:** `62-challenge16-compile-time-serializer.md`
> **Covers:** Notes 60–61 — `constexpr`, type traits, `if constexpr` dispatch
> **Status:** 📋 Planned

---

## Phase 12 — Expert C++: Concurrency

*LearnCpp Ch 28+. Purpose: Write thread-safe C++ — essential for modern multi-core and RAN systems.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 63 | [Threads & Synchronization](./63-threads-and-synchronization.md) | ⭐⭐⭐⭐⭐ | `std::thread`, `std::mutex`, `std::lock_guard`, `std::unique_lock`, deadlock, RAII for mutexes | 📋 Planned |
| 64 | [std::atomic & Lock-Free Programming](./64-atomic-lockfree.md) | ⭐⭐⭐⭐ | `std::atomic<T>`, memory order, compare-and-swap (CAS), lock-free queue concept | 📋 Planned |
| 65 | [Futures, Promises & std::async](./65-futures-promises-async.md) | ⭐⭐⭐⭐ | `std::future`, `std::promise`, `std::async`, thread pools concept | 📋 Planned |

### 🎯 Challenge 17 — Thread-Safe Work Queue

> **File:** `66-challenge17-threadsafe-queue.md`
> **Covers:** Notes 63–65 — `std::thread`, `std::mutex`, `std::condition_variable`, `std::atomic`
> **Status:** 📋 Planned

---

## Phase 13 — Expert C++: Coroutines (C++20)

*LearnCpp Ch 28+. Purpose: The future of async C++ — already in production in 5G and high-perf systems.*

| # | Note | Interview Heat | Key Concepts | Status |
|---|------|---------------|--------------|--------|
| 67 | [Coroutines: co_await, co_yield, co_return](./67-coroutines.md) | ⭐⭐⭐⭐ | Coroutine frame, suspension points, `std::generator`, lazy sequences, coroutine vs thread | 📋 Planned |

### 🎯 Challenge 18 — Async TCP Echo Server (coroutine-based)

> **File:** `68-challenge18-async-tcp-server.md`
> **Covers:** Note 67 — coroutines, async I/O patterns
> **Status:** 📋 Planned

---

## Challenge Index (Quick Reference)

| # | Challenge | Notes | Key Concepts | DSA From Scratch? | Namespace Practice? | Status |
|---|-----------|-------|-------------|:-----------------:|:-------------------:|--------|
| C1 | [Temperature Converter](./16-ch1-basics-challenge.md) | 06–15 | init, UB, types, multi-file build | — | ✔️ `converter::` | ✅ |
| C2 | [Type-Safe Calculator](./20-challenge2-type-safe-calculator.md) | 17–19 | casts, overloading, references | — | ✔️ `calc::detail::` | 🔵 |
| C3 | RAII File Logger | 21–24 | classes, RAII, destructors | — | ✔️ `logging::detail::` | 📋 |
| C4 | Matrix Class with Operators | 26–27 | operator overloading, deep copy | — | — | 📋 |
| C5 | **MyVector(int) from Scratch** | 29–31 | dynamic array, capacity doubling, RAII | ✔️ | — | 📋 |
| C6 | **MyLinkedList from Scratch** | 33–34 | linked list, RAII nodes, forward iterator | ✔️ | — | 📋 |
| C7 | **MyStack & MyQueue from Scratch** | 33–34 | adapter pattern, LIFO/FIFO over MyLinkedList | ✔️ | — | 📋 |
| C8 | Polymorphic Shape Renderer | 37–39 | VTable, virtual, abstract | — | — | 📋 |
| C9 | **MyUniquePtr(T) & MySharedPtr(T)** | 41–42 | move semantics, ref-counting, Rule of Five | ✔️ | — | 📋 |
| C10 | Type-Safe Optional(T) | 44–46 | templates, concepts, specialization | — | — | 📋 |
| C11 | **Generic MyBST(K,V) from Scratch** | 48 | BST insert/find/erase, in-order iterator | ✔️ | — | 📋 |
| C12 | **Generic MyHashMap(K,V) from Scratch** | 49 | chaining, rehashing, load factor | ✔️ | — | 📋 |
| C13 | **MyHeap(T) + Sorting from Scratch** | 50 | heap, quicksort, mergesort, binary search | ✔️ | — | 📋 |
| C14 | Mini Event Dispatcher | 54–55 | lambdas, std::function, callbacks | — | — | 📋 |
| C15 | Exception-Safe Config Parser | 57–58 | exceptions, std::optional, noexcept | — | — | 📋 |
| C16 | Compile-Time JSON Serializer | 60–61 | constexpr, type traits, if constexpr | — | — | 📋 |
| C17 | Thread-Safe Work Queue | 63–65 | threads, mutex, atomic | — | — | 📋 |
| C18 | Async TCP Echo Server | 67 | coroutines, async I/O | — | — | 📋 |

> **DSA Track:** C5–C7 use `int` only (no templates yet). C9 builds smart pointers via move semantics. C11–C13 are fully generic after Phase 8. Two-pass mirrors interview escalation.
>
> **Namespace Track:** Notes 07–08 are actively exercised in C1, C2, C3. Multi-file convention applies from C3 onwards.

---

*This file is auto-maintained. Updated whenever notes or challenges are added, reviewed, or modified.*
*Last updated: 2026-08-30*