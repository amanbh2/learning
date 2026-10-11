# Interview Q&A — Note 18: Functions: Overloading, Default Args & `inline`

---

## Q1: What determines which overload the compiler picks?

The compiler uses overload resolution ranked by: exact match > trivial conversion > numeric promotion > numeric conversion > user-defined conversion > ellipsis. If two overloads tie at the same rank, the call is **ambiguous** and a compile error.

---

## Q2: Can you overload functions based solely on return type?

**No.** The return type is not part of the overload signature. Two functions with the same name and same parameters but different return types cause a compile error.

---

## Q3: What is name mangling and why does it exist?

Name mangling is the compiler encoding of parameter types into the linker symbol name (e.g., `add(int, int)` → `_Z3addii`). It exists so that function overloads can have unique linker symbols. Without it, the linker would see two `add` symbols and fail.

---

## Q4: Why do you need `extern "C"` when calling C functions from C++?

C doesn't do name mangling — a C function `add(int, int)` is just the symbol `add`. C++ looks for the mangled symbol `_Z3addii` and finds nothing → linker error. `extern "C"` tells the C++ compiler to skip mangling for that declaration, using the plain C symbol.

---

## Q5: Where should default argument values be specified — in the declaration or the definition?

In the **declaration** (header file). Not in the definition. If you repeat them in the definition, you get a compile error ("redefinition of default argument").

---

## Q6: Can default arguments have a gap? (e.g., `void f(int a = 1, int b, int c = 3)`)

**No.** Once you provide a default for a parameter, all parameters to its right must also have defaults. The defaults must form a right-to-left contiguous block.

---

## Q7: What does `inline` actually do in modern C++?

Two things:
1. It is a **hint** to the compiler to expand the function at the call site (but the compiler ignores it if it decides otherwise).
2. More practically: it marks the function as allowed to have **multiple definitions across translation units** without violating the ODR. This is why function definitions in header files are marked `inline`.

Do **not** use `inline` as a manual performance trick — the compiler's inliner is smarter than you.

---

## Q8: What does `void f(double) = delete` do?

It **explicitly deletes** the `double` overload, causing a compile error if someone calls `f(3.14)`. This is the modern way to prevent unwanted implicit conversions from reaching an overload. Before `= delete`, you'd have to hide the function, which was error-prone.
