# Challenge #2 — Type-Safe Calculator

## Reading Material

Read these notes **before** coding. These are not optional — the challenge is designed to force you to apply exactly what's in them.

| Note | Topic | Key Concepts to Apply |
|------|-------|----------------------|
| [17 — Type System & Conversions](../17-type-system-and-conversions.md) | Casts, narrowing, promotion | `static_cast`, avoiding C-style casts, integral promotion rules |
| [18 — Functions: Overloading & Defaults](../18-functions-overloading-defaults.md) | Overloading, default args | Function overloads, overload resolution, `= delete`, default params |
| [19 — References](../19-references.md) | `T&`, `const T&`, dangling | Pass-by-const-ref, `const` correctness, reference vs pointer decision |

---

## The Challenge

Build a **type-safe calculator** that operates on a `Number` abstraction supporting both `int` and `double`. The program reads two numbers and an operator from the user and prints the result.

### Requirements

**1. A `Number` struct** that holds either an `int` or a `double` (use a `bool is_double` flag and a union or two members — your choice):
```
struct Number {
    // stores either an int or a double
    // knows which one it is
};
```

**2. Four overloaded `calculate` functions** — one for each arithmetic operation:
```cpp
Number calculate(const Number& a, const Number& b, char op);
```
Actually, implement `add`, `subtract`, `multiply`, `divide` as separate overloaded or named functions — you decide the API.

**3. Type promotion rules** — when one operand is `double` and the other is `int`, the result must be `double` (mirror C++'s usual arithmetic conversions).

**4. A `to_double` function** using `static_cast` (not C-style cast) to convert a `Number` to `double`.

**5. Division safety** — integer division by zero should print an error. Floating-point division by zero should produce the correct IEEE 754 result (`inf`) rather than crashing.

**6. A `print_number` function** with `const Number&` parameter — it must be `const`-correct and demonstrate you understand why.

**7. Prevent `calculate` from being called with a `float`** — use `= delete` on a `float` overload.

### Sample Interaction
```
Enter first number (e.g. 5 or 3.14): 7
Enter second number: 2
Enter operation (+, -, *, /): /

Integer result: 3    (integer division)
Double result:  3.5  (after static_cast)
```

### Compilation Target
```bash
g++ -std=c++17 -Wall -Wextra -pedantic -o calc challenge2_calculator.cpp
```

---

## Concepts This Forces You To Use

```
// CONCEPTS TESTED:
// - static_cast (numeric cast without C-style cast)
// - Function overloading and overload resolution
// - Pass-by-const-reference (const Number&) for read-only args
// - const member function correctness
// - = delete to prevent unwanted implicit conversions
// - Default function arguments (at least one place)
// - Integer vs floating-point division (the classic trap)
// - Integral promotion behavior
```

---

## Submission

When done, paste your `.cpp` file content in the chat. I will:
1. Review for correctness, C++ best practices, and missed concepts
2. Highlight mistakes and improvements you could have made
3. Update notes 17–19 if new insights emerge from your solution
4. Mark this challenge complete when you're satisfied

---

*Challenge created: 2026-08-30*
