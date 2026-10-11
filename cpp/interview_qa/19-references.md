# Interview Q&A — Note 19: References

---

## Q1: What's the difference between a pointer and a reference?

| | Pointer (`T*`) | Reference (`T&`) |
|--|--------------|----------------|
| Can be null | Yes | No |
| Can be reseated | Yes | No |
| Requires `*`/`->` to use | Yes | No |
| Can point to array | Yes | No |
| Memory: | Usually 8 bytes | May or may not occupy storage |

---

## Q2: When should you use a reference vs a pointer as a function parameter?

- **`const T&`** — read a large object without copying, argument is always required
- **`T&`** — function needs to modify the caller's object, argument is always required
- **`T*`** — argument is optional (can be null), or you need pointer arithmetic
- **Pass by value** — for small/cheap types like `int`, `bool`, `char`

---

## Q3: Why can `const T&` bind to a temporary but `T&` cannot?

By design: `const T&` promises not to modify the object, so binding it to a temporary (which is about to be destroyed) is safe. A non-`const` `T&` would allow modification of a temporary, which is almost always a bug.

`const T&` also **extends the lifetime** of the temporary it binds — the temporary lives until the reference goes out of scope.

---

## Q4: What is a dangling reference and how do you create one accidentally?

A dangling reference points to an object whose lifetime has ended. Using it is Undefined Behavior.

Common ways to create one:
1. **Returning a reference to a local variable** — the local is destroyed on return
2. **Storing a reference to a `std::vector` element, then mutating the vector** — reallocation moves elements, invalidating all references
3. **Returning a reference to a function-internal temporary**

---

## Q5: What is `const` correctness and why does it cascade?

`const` correctness means marking everything that shouldn't be modified as `const`. It cascades because: if you have a `const` object, you can only call `const`-qualified member functions on it. Those functions can only call other `const` functions, and references/pointers they return must also be `const`. Breaking the chain at any point causes a compile error.

---

## Q6 (Tricky): What is the type of `ref` in `auto ref = someRef;` if `someRef` is `int&`?

**`int`**, not `int&`. `auto` strips references. You must write `auto& ref = someRef` to get a reference.

---

## Q7 (Tricky): Does a reference occupy memory?

The C++ standard doesn't say. In practice, a reference to a local variable typically doesn't take any storage (the compiler just aliases it). A reference stored as a class member *does* occupy storage (it's usually implemented as a pointer internally). But the standard only says: "a reference shall be initialized to refer to a valid object or function."
