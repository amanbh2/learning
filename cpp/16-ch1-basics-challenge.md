# Challenge #1 — C++ Basics (LearnCpp Ch 1)

## Overview
First hands-on challenge based on LearnCpp.com **Chapter 1** (Lessons 1.1–1.10).
Covers the foundational building blocks of a C++ program: statements, variables,
initialization, `std::cin`/`std::cout`, expressions, literals, and undefined behavior.

## Reading Material (LearnCpp.com)

| Lesson | Topic | URL |
|--------|-------|-----|
| 1.1 | Statements and program structure | https://www.learncpp.com/cpp-tutorial/statements-and-the-structure-of-a-program/ |
| 1.2 | Comments | https://www.learncpp.com/cpp-tutorial/comments/ |
| 1.3 | Introduction to objects and variables | https://www.learncpp.com/cpp-tutorial/introduction-to-objects-and-variables/ |
| 1.4 | Variable assignment and initialization | https://www.learncpp.com/cpp-tutorial/variable-assignment-and-initialization/ |
| 1.5 | `std::cout`, `std::cin`, `std::endl` | https://www.learncpp.com/cpp-tutorial/introduction-to-iostream-cout-cin-and-endl/ |
| 1.6 | Uninitialized variables & UB | https://www.learncpp.com/cpp-tutorial/uninitialized-variables-and-undefined-behavior/ |
| 1.9 | Literals and operators | https://www.learncpp.com/cpp-tutorial/introduction-to-literals-and-operators/ |
| 1.10 | Expressions | https://www.learncpp.com/cpp-tutorial/expressions/ |

## The Challenge

**Task**: Write a temperature converter that takes a Celsius input and outputs
Fahrenheit and Kelvin.

**Formulas:**
```
Fahrenheit = (Celsius × 9.0 / 5.0) + 32.0
Kelvin     = Celsius + 273.15
```

## Code Examples

See [`code/challenges/ch1_temperature.cpp`](./code/challenges/ch1_temperature.cpp)

### Submitted Solution

```cpp
#include <iostream>

int main()
{
    std::cout << "Enter temperature in Celsius: ";
    float temp_celcius;
    std::cin >> temp_celcius;

    std::cout << "--- Conversion Results ---\n";
    std::cout << "Celsius\t\t: " << temp_celcius << "\n";
    std::cout << "Fahrenheit\t: " << (temp_celcius * 9.0 / 5.0) + 32.0 << "\n";
    std::cout << "Kelvin\t\t: " << temp_celcius + 273.15 << "\n";

    return 0;
}
```

### Corrected / Ideal Solution

```cpp
// ch1_temperature.cpp
// Temperature Converter: Celsius -> Fahrenheit and Kelvin
// Demonstrates: variables, initialization, cin/cout, expressions, literals

#include <iostream>

int main()
{
    // Brace initialization -- preferred in modern C++ because it prevents
    // narrowing conversions (e.g., double -> int would be a compile error)
    double temp_celsius {};   // zero-initialized to 0.0

    std::cout << "Enter temperature in Celsius: ";
    std::cin >> temp_celsius;

    // 9.0/5.0 -- floating-point division. If written as 9/5, integer division
    // would give 1 (truncated), making the formula completely wrong.
    double fahrenheit { (temp_celsius * 9.0 / 5.0) + 32.0 };
    double kelvin     { temp_celsius + 273.15 };

    std::cout << "--- Conversion Results ---\n";
    std::cout << "Celsius   : " << temp_celsius << "\n";
    std::cout << "Fahrenheit: " << fahrenheit   << "\n";
    std::cout << "Kelvin    : " << kelvin        << "\n";

    return 0;
}
```

## Code Review — What Was Done Well

- Correctly used `std::cin` and `std::cout` without `using namespace std;`
- Used `"\n"` instead of `std::endl` (avoids flushing the output buffer on every line)
- Arithmetic expressions are correct — formulas produce the right results
- Used `9.0 / 5.0` (floating-point division) not `9 / 5` (integer — would give 1)
- `return 0;` at end of `main`

## Code Review — Issues Found

### 1. Wrong type: `float` instead of `double`

```cpp
float temp_celcius;   // WRONG — loses precision unnecessarily
double temp_celsius;  // CORRECT
```

**Why it matters:** `float` has only ~6–7 significant decimal digits.
`double` has ~15–16. For any scientific/numeric computation, always prefer
`double` unless you have a specific memory constraint reason. Interviewers ask this.

### 2. No brace initialization — variable is uninitialized

```cpp
float temp_celcius;        // WRONG -- uninitialized: holds garbage value
                           //   if cin fails, you'll use garbage in the formula
double temp_celsius {};    // CORRECT -- value-initialized to 0.0
```

**Why it matters:** If the user types a non-numeric string, `cin` will
fail and `temp_celcius` remains uninitialized — using it afterwards is
**Undefined Behavior (UB)**.

Brace initialization `{}` also prevents **narrowing conversions** at compile time:
```cpp
double d { 3.14 };
int i { d };    // COMPILE ERROR -- narrowing: double -> int loses data
int i = d;      // compiles but silently loses .14 (dangerous!)
```

### 3. Typo in variable name

```cpp
float temp_celcius;    // WRONG -- "celcius" is misspelled
double temp_celsius;   // CORRECT spelling
```

### 4. Missing header comment

The challenge required a comment block at the top. Skipped. In production code,
a file-level comment is standard practice.

### 5. `std::endl` vs `"\n"` — done correctly, but the reason matters

```cpp
std::cout << "hello" << std::endl;  // flushes buffer -- expensive I/O call
std::cout << "hello" << "\n";       // just writes newline -- buffered, fast
```

`std::endl` = write '\n' AND flush the stream buffer to the OS immediately.
`"\n"` = write newline; OS flushes when buffer is full.

In a loop printing 1 million lines, `endl` can be 10-100x slower.
**Use `"\n"` by default. Only use `std::endl` when you need immediate flush.**

---

## Key Concepts

### Statements vs Expressions
- A **statement** is a complete instruction ending with `;`
- An **expression** is anything that evaluates to a value: `3 + 4`, `x * 9.0`
- The `<<` operator returns the stream — that is why you can chain:
  `std::cout << a << b << c`

### The Four Initialization Forms

```cpp
int x;           // default init -- UNINITIALIZED (garbage value)
int x = 5;       // copy initialization (C-style, legal but not preferred)
int x(5);        // direct initialization
int x { 5 };     // brace/list initialization -- PREFERRED in modern C++
int x {};        // value-initialization -- zeroes out the variable
```

Brace initialization is preferred because:
1. Prevents narrowing conversions (compile-time safety)
2. Works consistently across all types, including classes and aggregates

### Undefined Behavior (UB) from Uninitialized Variables

Reading an uninitialized variable is UB:
- May print garbage, crash, or silently produce wrong results
- May appear to work on your machine but fail elsewhere
- The compiler can assume UB never happens, enabling optimizations that
  make UB-related bugs even harder to track down

### Integer vs Floating-Point Division Trap

```cpp
int result    = 9 / 5;      // = 1  (integer division truncates)
double result = 9.0 / 5.0;  // = 1.8 (correct)
double result = 9 / 5;      // = 1.0 (integer division first, then widened!)
```

**Rule**: For floating-point division, at least one operand must be a float/double.

### `\n` vs `std::endl`

| | `"\n"` | `std::endl` |
|--|--------|-------------|
| What it does | Writes newline | Writes newline + flushes buffer |
| Performance | Fast (buffered) | Slow in loops (forces I/O syscall) |
| When to use | Almost always | Only when you need immediate flush |

---

## Key Takeaways

- Always use `double` over `float` for general numeric work
- Always use brace initialization `{}` — it is the safest form
- Using an uninitialized variable is **Undefined Behavior** — dangerous and silent
- Integer division truncates — use `9.0/5.0` not `9/5` in float formulas
- Prefer `"\n"` over `std::endl` in almost all cases
- Never use `using namespace std;` — pollutes global namespace

---
*Last updated: 2026-08-17*
