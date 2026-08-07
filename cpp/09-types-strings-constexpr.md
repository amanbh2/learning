# Types, Strings, and Compile-Time Evaluation

## Overview
C++ introduces several new fundamental types and keywords designed to make code safer, more expressive, and less reliant on dangerous C-style macros. This note covers the critical differences between C and C++ regarding strings, null pointers, type deduction, and compile-time constants.

---

## 1. The `bool` Type
In C, developers historically used `int` for booleans (where `0` is false and anything else is true) or `#include <stdbool.h>` to get `_Bool`. 
C++ makes `bool` a built-in primitive type.
- Values: `true` (evaluates to 1) and `false` (evaluates to 0).
- Size: Usually 1 byte.

---

## 2. Null Pointers: `nullptr` vs `NULL`
In C, `NULL` is typically defined as a macro for the integer `0` (or `(void*)0`). 

In C++, using `NULL` is considered **bad practice** because it can lead to dangerous function overloading ambiguities. Because C++ allows function overloading, passing `NULL` to a function might accidentally call the integer version instead of the pointer version!

C++11 introduced `nullptr`, which is a strictly typed pointer literal. It can *only* be assigned to pointer types, never to integers.

```cpp
void process(int x) {
    // Integer version
}

void process(char* ptr) {
    // Pointer version
}

int main() {
    process(NULL);    // DANGER: Might call process(int) because NULL is 0!
    process(nullptr); // SAFE: Guaranteed to call process(char*)
    return 0;
}
```

---

## 3. Strings: `std::string` vs `char*`
In C, strings are represented as null-terminated character arrays (`char*`). Managing them requires manual memory management (`malloc`), manual sizing, and dangerous functions like `strcpy` which frequently cause buffer overflows.

C++ introduces the `<string>` library and the `std::string` class.
- **Dynamic Sizing:** `std::string` automatically grows its internal memory if you add characters to it.
- **Memory Safety:** It automatically frees its memory when it goes out of scope (using RAII—we will cover this later).
- **Operators:** You can easily concatenate strings using the `+` operator.

```cpp
#include <iostream>
#include <string>

int main() {
    // The C Way (Dangerous)
    char nameC[10] = "John";
    // strcat(nameC, " Doe"); // DANGER: Buffer Overflow! Array only holds 10 chars.

    // The C++ Way (Safe)
    std::string nameCpp = "John";
    nameCpp += " Doe"; // Perfectly safe, dynamically resizes internally.
    std::cout << nameCpp << std::endl;
    return 0;
}
```

---

## 4. Type Deduction: The `auto` Keyword
In modern C++ (C++11 and later), you can use the `auto` keyword to tell the compiler to figure out the type of a variable based on what you assign to it. **This is evaluated entirely at compile time**, meaning there is zero performance penalty at runtime.

```cpp
auto x = 5;           // Compiler knows this is an int
auto pi = 3.14159;    // Compiler knows this is a double
auto name = "Alice";  // Compiler knows this is a const char*
```

**Interview Gotcha:** `auto` strips away references and `const` qualifiers by default. If a function returns a reference (`int&`), and you catch it with `auto y = ...`, `y` will be a standard `int` (a copy). If you want a reference, you must use `auto& y = ...`.

---

## 5. Compile-Time Constants: `constexpr` vs `#define`
In C, developers use `#define MAX_USERS 100` to create constants. The preprocessor literally does a text find-and-replace before compilation.
**The Problem:** Macros have no concept of C++ scope or type safety.

C++ introduces `constexpr` (Constant Expression). 
A `constexpr` variable is a true, strongly-typed C++ variable whose value is evaluated and baked directly into the machine code at **compile time**.

```cpp
// C-Style (Bad in C++)
#define MAX_USERS 100 

// C++ Style (Safe, Typed, Scoped)
constexpr int maxUsers = 100;
```
Modern C++ pushes heavily towards replacing all `#define` macros with `constexpr` variables or `inline` functions.

---

## Key Interview Takeaways
- **Always use `nullptr`**, never `NULL`. It prevents function overloading bugs.
- **Always use `std::string`** for text. Only use `char*` if interfacing with legacy C APIs.
- **`auto`** infers types at compile time (no runtime cost), but remember it drops references unless you explicitly use `auto&`.
- **Prefer `constexpr` over `#define`** to maintain type safety and scope control.

---
*Last updated: 2026-08-07*
