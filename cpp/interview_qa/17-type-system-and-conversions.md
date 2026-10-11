# Interview Q&A — Note 17: Type System & Implicit Conversions

---

## Q1: What happens when you mix `int` and `double` in an arithmetic expression?

The `int` is **implicitly promoted to `double`** via "usual arithmetic conversions". The result is always `double`. This is why `7 / 2 = 3` but `7.0 / 2 = 3.5`.

---

## Q2: What is integral promotion?

Before arithmetic operations, types smaller than `int` (like `short`, `char`) are widened to `int` (or `unsigned int`). This means `sizeof(short + short)` returns `4`, not `2`, because both operands became `int` before the addition.

---

## Q3: What is a narrowing conversion and how does brace initialization prevent it?

A narrowing conversion silently loses data (e.g., `double pi = 3.14; int n = pi;` → `n = 3` with no warning). Brace initialization `int n { pi };` causes a **compile error** if a narrowing conversion would occur — making it the safest initialization form.

---

## Q4: What are the four C++ casts and when do you use each?

| Cast | When to use |
|------|-------------|
| `static_cast<T>` | Intentional numeric conversion, C API `void*`, compile-time verified |
| `const_cast<T>` | Remove `const` for legacy APIs that take non-const — never to actually modify a `const` object |
| `reinterpret_cast<T>` | Raw bit reinterpretation (hardware registers, serialization) |
| `dynamic_cast<T>` | Safe polymorphic downcast with runtime check (returns `nullptr` on failure) |

---

## Q5: Why should you never use C-style casts `(type)x` in C++?

C-style casts silently try all four C++ casts in order. They can accidentally do a `reinterpret_cast` or `const_cast` when you intended a `static_cast`, with no warning. They are invisible in code searches (`grep`), and are considered unsafe and non-idiomatic in all modern C++ codebases.

---

## Q6: What type does `auto` deduce from `int& ref = x; auto a = ref;`?

`auto a = ref` deduces `int`, **not** `int&`. `auto` always strips references. To get a reference, you must write `auto& a = ref`. `auto` also strips top-level `const`.

---

## Q7 (Tricky): What is the result of `7 / 2` stored in `double result = 7 / 2;`?

**`3.0`**, not `3.5`. The integer division `7 / 2 = 3` happens first (both operands are `int`), and then the result `3` is widened to `double 3.0`. The assignment does **not** change how the expression was evaluated. Correct form: `double result = 7.0 / 2;` or `static_cast<double>(7) / 2`.
