# C++ Jargon and Glossary

C++ has a massive, highly technical vocabulary. When you read documentation or talk to senior engineers, they will constantly use these terms. This document serves as a living glossary of the most important C++ jargon.

## Core Language Concepts

### Statement vs Expression
- **Expression:** Code that evaluates to a single value (e.g., `5`, `5 + 3`, `get_temperature()`).
- **Subexpression:** An expression that is used as an operand within a larger expression. In `(a + b) * c`, `a + b` is a subexpression.
- **Statement:** A complete instruction that performs an action. It usually ends with a semicolon `;`.
- **Expression Statement:** A statement that consists purely of an expression followed by a semicolon. (e.g., `x = 5;`). Even useless expressions are technically valid expression statements (e.g., `5;` will compile, but the CPU will just calculate 5 and immediately discard it).

### Translation Unit (TU)
A Translation Unit is the ultimate output of the Preprocessor stage. It is a single `.cpp` file after all `#include` headers have been physically copy-pasted into it and all `#define` macros have been expanded. The Compiler *only* ever sees Translation Units, not your original `.cpp` or `.h` files.

### Object vs Variable
In many languages (like Java or Python), an "Object" strictly means an instance of a Class. **In C++, this is not true.**
- **Object:** A region of storage (memory) that has a size, a type, and a value. Even a simple `int` is considered an "object" in C++. 
- **Variable:** A variable is simply an object that has a *name*. If you allocate memory dynamically (e.g., `new int`), you create an object, but it is not a variable because it has no name (you access it via a pointer).
- **Instantiation:** The actual creation of an object in memory during runtime.

### Declaration vs Definition
- **Declaration:** Tells the compiler that something exists *somewhere* and what its type is (e.g., `extern int x;` or `void print();`). It does not allocate memory.
- **Definition:** Actually implements the function or allocates the memory for the variable (e.g., `int x = 5;` or `void print() { ... }`). *Every definition is a declaration, but not every declaration is a definition.*

### Undefined Behavior (UB)
When you write code that violates the rules of the C++ language, the C++ standard does not dictate what should happen. This is called **Undefined Behavior (UB)**. The compiler is allowed to do *anything*. It might crash, it might return garbage data, or worse—it might appear to work perfectly on your machine but fail catastrophically in production. **Avoiding UB is the primary goal of modern C++**.

**Common Causes of Undefined Behavior:**
- **Reading Uninitialized Variables:** If you declare `int x;` (default initialization) and try to print `x` before assigning it a value, you are reading garbage memory, which is UB.
- **Division by Zero:** E.g., `int x = 5 / 0;`
- **Dereferencing Null or Invalid Pointers:** Accessing memory that doesn't belong to you (often resulting in a Segfault).
- **Array Out of Bounds:** Reading or writing past the allocated end of an array.
- **Signed Integer Overflow:** If a signed integer hits its maximum value and you add `1`, the C++ standard dictates this is UB (unlike unsigned integers, which safely wrap around to 0).
- **Missing Return Statements:** If a function promises to return an `int` but you forget the `return` statement (except for the special case of `main()`).

## Memory and Objects

### RAII (Resource Acquisition Is Initialization)
The absolute most important design pattern in C++. It means that tying the lifecycle of a resource (like allocated heap memory, an open network socket, or a locked mutex) to the lifecycle of an object. When the object is created (Initialization), it acquires the resource. When the object goes out of scope and is destroyed, its Destructor automatically releases the resource. This is how modern C++ eliminates memory leaks without needing a Garbage Collector.

### L-Value vs R-Value
These terms describe where a value lives in memory, which is critical for advanced C++ optimizations (Move Semantics).
- **L-Value (Locator Value):** An object that occupies an identifiable location in memory (it has a memory address). It can appear on the Left side of an `=` assignment. (e.g., `int myVar = 5;` -> `myVar` is an L-Value).
- **R-Value:** A temporary value that does not have a persistent memory address. It usually appears on the Right side of an assignment. (e.g., the `5` in `int myVar = 5;` is an R-Value. It exists momentarily in a CPU register and is then gone).

### Zero-Overhead Abstraction
The core philosophy of C++. It means you can use high-level abstractions (like Classes, Smart Pointers, and Templates) without paying any runtime performance penalty compared to writing raw, low-level C code. "What you don't use, you don't pay for. And further: What you do use, you couldn't hand code any better."

## Syntax and Naming

### Literals, Operators, and Operands
- **Literal:** A fixed, hard-coded value inserted directly into your source code. (e.g., `5`, `3.14`, `"Hello"`, `true`).
- **Operator:** A mathematical or logical symbol that tells the compiler to perform a specific action (e.g., `+`, `-`, `=`, `<<`).
- **Operand:** The data (variables or literals) that an operator acts upon. In the expression `x + 5`, `x` and `5` are operands, and `+` is the operator.

### Operator Arity (How many operands?)
Operators are categorized by how many operands they require:
1. **Unary:** Acts on exactly ONE operand. (e.g., `-x`, `++y`).
2. **Binary:** Acts on exactly TWO operands. This is the vast majority of operators. (e.g., `x + y`, `a = b`).
3. **Ternary:** Acts on exactly THREE operands. C++ only has one ternary operator: the conditional operator (`condition ? true_val : false_val`).

### Operator Return Values & Chaining
Every operator in C++ performs an operation and then **returns a value**. This return value is what allows operators to be chained together in a single statement.
- **Assignment Chaining:** `x = y = 5;`
  The assignment operator `=` evaluates from right-to-left. `y = 5` executes first. The `=` operator returns the value `5`, which is then fed into `x = 5`.
- **I/O Chaining:** `std::cout << "Hello" << " World";`
  The insertion operator `<<` evaluates from left-to-right. `std::cout << "Hello"` executes first. The `<<` operator is specially designed to **return the stream object itself** (`std::cout`). Thus, the statement becomes `std::cout << " World";` for the next evaluation.

### Identifiers and Keywords
An **Identifier** is the name you give to a variable, function, class, or other entity.
A **Keyword** is a reserved word that has special meaning to the C++ compiler. You cannot use any keyword as an identifier.

Here is the complete list of C++ keywords (up to C++20):
```text
alignas, alignof, and, and_eq, asm, atomic_cancel, atomic_commit, atomic_noexcept, auto, bitand, bitor, bool, break, case, catch, char, char8_t, char16_t, char32_t, class, compl, concept, const, consteval, constexpr, constinit, const_cast, continue, co_await, co_return, co_yield, decltype, default, delete, do, double, dynamic_cast, else, enum, explicit, export, extern, false, float, for, friend, goto, if, inline, int, long, mutable, namespace, new, noexcept, not, not_eq, nullptr, operator, or, or_eq, private, protected, public, reflexpr, register, reinterpret_cast, requires, return, short, signed, sizeof, static, static_assert, static_cast, struct, switch, synchronized, template, this, thread_local, throw, true, try, typedef, typeid, typename, union, unsigned, using, virtual, void, volatile, wchar_t, while, xor, xor_eq
```

---
*Last updated: 2026-08-07*
