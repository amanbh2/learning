# Functions: Overloading, Default Arguments & `inline`

## Overview
C++ extends C's function model significantly. This note covers the three features that interviewers test constantly: **function overloading** (and the name mangling that makes it work), **default arguments** (and their gotchas), and **`inline` functions** (the safe replacement for `#define` macros).

---

## 1. Function Overloading

C++ allows multiple functions with the **same name** as long as they have **different parameter lists** (type, number, or order). The return type alone is *not* sufficient to differentiate overloads.

```cpp
// All three are legal — different parameter types
int   add(int a,    int b)    { return a + b; }
float add(float a,  float b)  { return a + b; }
int   add(int a,    int b,    int c) { return a + b + c; }

// ILLEGAL — return type difference alone is not enough
int    getValue() { return 5; }
double getValue() { return 5.0; } // COMPILE ERROR: redefinition of getValue
```

### How Does the Compiler Tell Them Apart? — Name Mangling

In C, `add(int, int)` compiles to a symbol literally called `add` in the object file. If you had two functions called `add`, the linker would see two identical symbols and fail.

C++ solves this via **name mangling** (also called *name decoration*): the compiler encodes the function's parameter types into its symbol name.

```
// C++ compiler turns this:
int add(int, int)

// Into this internal symbol (GCC/Clang mangling):
_Z3addii        (Z = mangled, 3 = length of "add", ii = two ints)
```

Each overload gets a unique mangled name, so the linker has no conflict.

> **Interview question:** *"Why can't you link a C library directly from C++ without `extern "C"`?"*
>
> Because C doesn't do name mangling — its `add` function is just the symbol `add`. C++ looks for `_Z3addii`. The linker finds nothing and throws "undefined symbol". `extern "C"` tells the C++ compiler to **skip mangling** for that function, using the plain C-style symbol instead.

```cpp
// Correct way to call a C library from C++
extern "C" {
    int c_add(int a, int b);  // Linker looks for plain "c_add", not "_Z5c_addii"
}
```

> **Important:** Name mangling is compiler-specific. GCC/Clang and MSVC use completely different mangling schemes, which is one reason you cannot mix object files compiled by different compilers.

---

## 2. How Overload Resolution Works (The Rules)

When you call `add(5, 2.0)`, the compiler picks the best overload through a ranked matching process:

1. **Exact match** — no conversion needed
2. **Trivial conversion** — `const` addition, reference stripping
3. **Numeric promotion** — e.g., `short` → `int`
4. **Numeric conversion** — e.g., `int` → `double`
5. **User-defined conversion** — conversion operator or single-arg constructor
6. **Ellipsis** (`...`) — variadic match (last resort)

If two overloads are equally good at the same rank, the call is **ambiguous** and is a compile error.

```cpp
void print(int x)   { std::cout << "int: "    << x; }
void print(double x){ std::cout << "double: " << x; }

print(5);    // Exact match → print(int)
print(5.0);  // Exact match → print(double)
print(5.0f); // float → promotes to double (promotion wins over conversion) → print(double)

// AMBIGUOUS — float can equally promote to int or double via conversion
// (this specific case depends on the compiler; generally avoid relying on it)
```

---

## 3. Default Arguments

C++ allows function parameters to have **default values**, making them optional at the call site.

```cpp
void connect(const std::string& host, int port = 8080, bool ssl = false) {
    // ...
}

connect("localhost");           // port=8080, ssl=false
connect("localhost", 443);      // port=443, ssl=false
connect("localhost", 443, true); // port=443, ssl=true
```

### The Rules (and the Gotchas)

**Rule 1: Defaults must be right-to-left contiguous.** Once you provide a default, all parameters to the right must also have defaults.

```cpp
void bad(int a = 1, int b, int c = 3) {} // COMPILE ERROR
void ok(int a, int b = 2, int c = 3)  {} // Fine
```

**Rule 2: Declare defaults in the header/declaration, not in the definition.**

```cpp
// In utils.h (declaration)
void setup(int width = 800, int height = 600);

// In utils.cpp (definition — do NOT repeat the defaults here!)
void setup(int width, int height) {   // ✅ correct
    // ...
}

void setup(int width = 800, int height = 600) { // ❌ COMPILE ERROR: redefinition of defaults
    // ...
}
```

**Rule 3: Default arguments can be ambiguous with overloads — the compiler will warn.**

```cpp
void print(int x)         { }
void print(int x, int y = 10) { }

print(5);  // AMBIGUOUS — matches both! Compile error.
```

---

## 4. `inline` Functions — The Safe Macro Replacement

`#define` macros in C are text substitutions that are invisible to the type system:

```cpp
// C-style macro — type-unsafe, no scope, no debugging
#define SQUARE(x)  ((x) * (x))
int result = SQUARE(++i);   // BUG: ++i is evaluated twice → (++i) * (++i)
```

C++ `inline` functions are **type-safe function calls** that the compiler *suggests* expanding inline at the call site (eliminating function call overhead):

```cpp
inline int square(int x) { return x * x; }
int result = square(++i);  // ✅ Safe — ++i is evaluated once, then the function runs
```

> **Important:** `inline` is a *hint* to the compiler, not a command. Modern compilers ignore it and make their own inlining decisions based on optimization level. The `inline` keyword's real purpose in modern C++ is to allow **multiple definitions across translation units** (useful for function definitions in header files — avoids ODR violations).

```cpp
// math_utils.h — inline prevents ODR violation when included in multiple .cpp files
inline int clamp(int val, int lo, int hi) {
    return val < lo ? lo : (val > hi ? hi : val);
}
```

### When to use `inline`:
- Short, performance-critical functions that live in header files
- Template function bodies (these are implicitly `inline`)
- **Never** as a manual performance optimization tool — the compiler knows better

---

## 5. Deleted Functions

C++ lets you explicitly prevent certain function calls by **deleting** them:

```cpp
void processInt(int x) { std::cout << x; }
void processInt(double) = delete;  // Prevent accidental double → int narrowing

processInt(5);    // ✅ Fine
processInt(5.0);  // ❌ COMPILE ERROR: use of deleted function
```

> **Why this matters:** Before `= delete`, unwanted overloads would silently match via implicit conversion. Now you can enforce strict type checking.

The same syntax prevents copy/move in classes (covered in note 25):
```cpp
class Singleton {
    Singleton(const Singleton&) = delete;            // No copying
    Singleton& operator=(const Singleton&) = delete; // No copy assignment
};
```

---

## Key Takeaways

- **Function overloading** allows same-name functions differentiated by parameter types — NOT return type alone.
- **Name mangling** is how C++ encodes overloads into unique linker symbols. `extern "C"` disables it to interop with C.
- **Overload resolution** ranks candidates: exact match > promotion > conversion > user-defined. Ambiguity is a compile error.
- **Default arguments** must be specified right-to-left and in the declaration, not the definition.
- **`inline`** is a compiler hint + ODR exception tool — not a manual optimization directive.
- **`= delete`** explicitly prohibits function calls — the modern, visible way to prevent unwanted conversions or copies.

---

*Last updated: 2026-08-30*
