# Type System & Implicit Conversions

## Overview
C++ has a richer and *stricter* type system than C. Understanding how the compiler silently converts between types — and how to take explicit control with casts — is mandatory for writing bug-free code and acing type-related interview questions.

---

## 1. Implicit (Automatic) Conversions

When you mix types in an expression, the compiler silently converts them. These conversions follow strict rules and happen in two stages.

### Stage 1 — Integral Promotion
Before any arithmetic, small integer types are **promoted** to `int` (or `unsigned int` if `int` can't hold the value). This is done because CPUs work most naturally with native word-size integers.

```cpp
short a = 5;
short b = 10;
auto c = a + b; // c is int, not short!
                // Both a and b were promoted to int before the addition
```

> **Interview gotcha:** `sizeof(short)` might be 2, but `sizeof(short + short)` is `4` (the result is `int`). This surprises many candidates.

### Stage 2 — Usual Arithmetic Conversions
When operands of different types are combined, both are converted to a **common type** via a ranking:
```
long double > double > float > long long > long > int
```
The smaller type is always widened to match the larger type:
```cpp
int i = 5;
double d = 2.0;
auto result = i + d; // i is promoted to double first → result is double 5.0 + 2.0 = 7.0
```

### The Integer Division Trap (revisited)
```cpp
int result1 = 7 / 2;       // = 3  (integer division truncates)
double result2 = 7 / 2;    // = 3.0 (integer division happens first, then widens!)
double result3 = 7.0 / 2;  // = 3.5 (correct — double arithmetic throughout)
double result4 = (double)7 / 2; // = 3.5 (explicit C-style cast, works but avoid)
double result5 = 7 / 2.0;      // = 3.5 (correct)
```

---

## 2. Narrowing Conversions — The Silent Killer

A **narrowing conversion** is when a value is converted to a type that cannot represent all values of the original type. In C, this happens silently. In C++, brace initialization catches it:

```cpp
double pi = 3.14159;

int a = pi;      // C-style — silently truncates to 3. No warning by default!
int b(pi);       // Direct init — silently truncates. Same problem.
int c { pi };    // COMPILE ERROR: narrowing conversion from double to int
                 // Brace init protects you. Use it always.
```

---

## 3. The Four C++ Casts

C has one cast: `(type)value`. C++ replaces this with **four named casts**, each with a specific, well-defined purpose. The C-style cast is dangerous because it silently attempts all four — never use it in C++.

### 3.1 `static_cast<T>` — The Workhorse ⭐⭐⭐⭐⭐

The most commonly used cast. Performs **compile-time** verified conversions between related types.

**When to use it:**
- Converting between numeric types intentionally (telling the compiler "yes, I know what I'm doing")
- Converting `void*` to a typed pointer (interfacing with C APIs)
- Casting up/down an inheritance hierarchy (without runtime check)

```cpp
// ✅ Intentional numeric conversion
double pi = 3.14159;
int n = static_cast<int>(pi);   // n = 3. Explicit — compiler and reader both know

// ✅ Avoiding integer division (most common use case in interviews)
int a = 7, b = 2;
double result = static_cast<double>(a) / b;  // = 3.5. Clean and readable.

// ✅ void* from C API (e.g., malloc, pthreads)
void* raw = malloc(10);
char* buf = static_cast<char*>(raw);
```

> **Interview rule:** If you want to convert numeric types in C++, **always use `static_cast`**, never a C-style cast. It documents intent and catches illegal conversions at compile time.

### 3.2 `const_cast<T>` — Remove or Add `const` ⭐⭐⭐

The *only* cast that can remove `const` or `volatile` qualifiers.

```cpp
void legacyCPrint(char* str) {    // old C API — doesn't take const char*
    printf("%s", str);
}

const char* message = "Hello";
legacyCPrint(const_cast<char*>(message));  // Safe here — legacyCPrint won't modify it
```

> **Critical rule:** You may only use `const_cast` to remove `const` if the *underlying object was not originally declared `const`*. If it was, writing through the pointer is Undefined Behavior.
>
> ```cpp
> const int x = 42;
> int* p = const_cast<int*>(&x);
> *p = 100;  // 🔴 UNDEFINED BEHAVIOR — x was declared const
> ```

### 3.3 `reinterpret_cast<T>` — Raw Memory Reinterpretation ⭐⭐⭐

The most dangerous cast. It reinterprets the raw bits of one type as another type without any conversion. Primarily used in systems/embedded programming.

```cpp
// Reading raw bytes of a float (e.g., for network serialization)
float f = 3.14f;
uint32_t bits = reinterpret_cast<uint32_t&>(f);  // Read float's bits as int

// Casting a pointer to an integer (e.g., to store it in a map)
int* p = new int(42);
uintptr_t addr = reinterpret_cast<uintptr_t>(p);  // Pointer → integer
```

> **Rule:** If you see `reinterpret_cast`, be suspicious. It bypasses the type system entirely. In 5G/telecom code, it's sometimes necessary for hardware register access or network serialization, but document it heavily.

### 3.4 `dynamic_cast<T>` — Runtime Polymorphic Cast ⭐⭐⭐⭐

The only cast that operates at **runtime**. Used to safely downcast within an inheritance hierarchy. Returns `nullptr` (for pointers) or throws `std::bad_cast` (for references) if the cast is invalid.

*We'll cover this in depth in the Inheritance & Polymorphism phase (notes 29–31). For now, know it exists.*

```cpp
// Safe downcast — only works if base actually points to a Derived object
Base* base = new Derived();
Derived* d = dynamic_cast<Derived*>(base);  // Returns valid pointer — success
if (d) { d->derivedMethod(); }

Base* base2 = new Base();
Derived* d2 = dynamic_cast<Derived*>(base2); // Returns nullptr — safe failure
```

---

## 4. The C-Style Cast — Why You Must Never Use It

```cpp
double pi = 3.14;
int n = (int)pi;           // C-style cast
int n = int(pi);           // Functional cast — also C-style, just different syntax
```

The problem: the C-style cast silently tries all four C++ casts in order. It can accidentally do a `reinterpret_cast` when you expected a `static_cast`, with no warning. It hides bugs and is invisible in code search (`grep`).

```cpp
// DANGEROUS: This looks harmless but strips const via const_cast
const int x = 42;
int* p = (int*)&x;  // C-style does const_cast silently — no warning!

// SAFE: This fails to compile — const_cast is explicit and you'll notice
int* p = static_cast<int*>(&x);  // COMPILE ERROR: cannot cast away const via static_cast
```

---

## 5. `auto` and Type Deduction (Deep Dive)

We saw `auto` in note 09. Here are the important rules for interviews:

```cpp
int x = 5;
int& ref = x;

auto a = ref;   // a is int, NOT int&. auto always drops references!
auto& b = ref;  // b is int&. You must explicitly write & to get a reference.
auto&& c = ref; // c is int& (forwarding reference — see note 32 for full explanation)

const int ci = 10;
auto d = ci;    // d is int (not const int). auto also drops top-level const.
const auto e = ci; // e is const int.
```

> **Interview question:** *"What type does `auto x = getRef()` deduce if `getRef()` returns `int&`?"*
> Answer: `int` — auto strips the reference. You need `auto&` to capture a reference.

---

## Key Takeaways

- **Integral promotion** happens automatically before arithmetic — small types become `int`.
- **Usual arithmetic conversions** widen the narrower type to match the wider one in binary expressions.
- **Narrowing conversions** are silent in C-style code but caught by brace initialization `{}` — use it always.
- Use **`static_cast<T>`** for intentional numeric conversions and C API interop.
- Use **`const_cast<T>`** only when interfacing with legacy APIs, never to actually modify a `const` object.
- Use **`reinterpret_cast<T>`** only for hardware/serialization — it bypasses the type system entirely.
- **Never use C-style casts `(type)x`** — they hide dangerous behavior and cannot be searched.
- **`auto` strips references and top-level `const`** — use `auto&` and `const auto&` explicitly.

---

*Last updated: 2026-08-30*
