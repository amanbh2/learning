# C++ Language — Interview Q&A

This file is a centralized compilation of all interview questions and tricky concepts discussed across the C++ language notes.

## Table of Contents
- [From Note 01: CPU Instruction Set Architecture (ISA)](#from-note-01-cpu-instruction-set-architecture-isa)
- [From Note 02: Language Levels & The Translation Process](#from-note-02-language-levels--the-translation-process)
- [From Note 06: Basic I/O and Namespaces](#from-note-06-basic-io-and-namespaces)
- [From Note 07: Namespaces & Scope Resolution Deep Dive](#from-note-07-namespaces--scope-resolution-deep-dive)
- [From Note 08: Compilation and Linking Process](#from-note-08-compilation-and-linking-process)

---

### [From Note 01: CPU Instruction Set Architecture (ISA)](./01-instruction-set-architecture.md)

**Q: How do you build C++ code on an x86 Ubuntu machine that is intended to run on an ARM-based radio unit?**
**A:** You must use a **cross-compiler** (such as `aarch64-linux-gnu-gcc`). Because C++ compiles directly to machine code, a standard x86 compiler will generate x86 instructions which the ARM processor cannot understand. The cross-compiler runs on the x86 host architecture but specifically outputs ARM-compatible machine instructions.

---

### [From Note 02: Language Levels & The Translation Process](./02-compilation-vs-interpretation.md)

**Q: What is the fundamental difference in how C++ and Python are translated to run on a CPU?**
**A:** C++ is an **Ahead-Of-Time (AOT) Compiled Language**. The compiler translates the source code entirely into native machine code *before* the user ever runs it. The resulting executable runs directly on the bare metal CPU, offering maximum speed but locking the executable to a specific OS and CPU architecture.
Python is an **Interpreted Language**. It uses a middleman called a Virtual Machine (the PVM). When you run a script, it is first turned into Bytecode, which the PVM reads and translates into machine code *on the fly* while the program is running. This makes Python highly portable ("write once, run anywhere") but much slower because of the real-time translation overhead.

---

### [From Note 06: Basic I/O and Namespaces](./06-basic-io-and-namespaces.md)

**Q: Why is `using namespace std;` considered bad practice in professional C++ codebases?**
**A:** The `std` namespace is massive and contains hundreds of functions and objects. Writing `using namespace std;` in the global scope (especially inside a header file) pulls all of these into the global namespace. This defeats the entire purpose of namespaces and leads to **namespace pollution** and **naming collisions**. If you name a variable `count` or `data`, it might conflict with `std::count` or `std::data`. 
*Best Practice:* Prefix explicitly with `std::` or use localized scope declarations (e.g., `using std::cout;` inside a specific function).

---

### [From Note 07: Namespaces & Scope Resolution Deep Dive](./07-namespaces-deep-dive.md)

**Q: Why does C++ use `::` for scope resolution instead of a single colon `:` or a dot `.`?**
**A:** 
- The dot `.` is strictly reserved for member access on instantiated objects (e.g., `obj.method()`). Namespaces are not objects; they are compile-time organizational structures.
- A single colon `:` is not used because it is already heavily overloaded in C/C++ parsing. It is used for `goto` labels, `switch` cases, ternary operators (`? :`), access specifiers (`public:`), constructor initialization lists, and bit fields. Reusing it for scope resolution would create massive parsing ambiguities. Therefore, the unique `::` token was introduced.

**Q: What does a blank scope resolution operator (e.g., `::myVar`) do?**
**A:** It forces the compiler to look in the **Global Scope**. This is used when a local variable "shadows" (has the same name as) a global variable, allowing you to bypass the local variable and access the global one directly.

**Q: Is the `std` namespace defined entirely within `<iostream>`?**
**A:** No. In C++, namespaces are **"open"**. This means multiple files and headers can contribute to the same namespace. `<iostream>` adds `cin` and `cout` to the `std` namespace, while `<vector>` adds the `vector` class, and `<string>` adds the `string` class. They all collaboratively build the single `std` namespace block.

---

### [From Note 08: Compilation and Linking Process](./08-compilation-and-linking-process.md)

**Q: Do file extensions like `.cpp` or `.h` actually mean anything to the C++ compiler?**
**A:** No. File extensions in C++ are purely conventional for human readability and to help build tools (like Make or CMake) recognize file types. To the compiler, they are just plain text files. The preprocessor literally copies and pastes the contents of a `#include` regardless of whether the file ends in `.h`, `.hpp`, or `.mango`. You can even compile a file with no extension by explicitly telling the compiler it contains C++ code (e.g., `g++ -x c++ my_file`).

---
*Last updated: 2026-08-07*
