# References: L-value References, `const` References & Dangling

## Overview
References are one of the most C++-specific features with no C equivalent. They look simple but hide deep rules about lifetimes, `const` correctness, and performance. Getting references wrong is a top source of UB in C++ code — and a top interview topic.

---

## 1. What is a Reference?

A **reference** is an alias — a second name that refers to an existing object. Unlike a pointer, a reference:
- **Cannot be null** (there is no "null reference")
- **Cannot be reseated** (once bound to an object, it cannot be made to refer to a different object)
- **Does not require dereferencing** (`*` or `->`) — you use it just like the original variable

```cpp
int x = 5;
int& ref = x;    // ref is an alias for x

ref = 10;        // modifies x directly
std::cout << x;  // prints 10

// Under the hood: the compiler may implement references as constant pointers:
// int* const ref = &x;  — but this is an implementation detail, not the standard
```

> **Interview question:** *"What's the difference between a pointer and a reference?"*
>
> | Feature | Pointer (`T*`) | Reference (`T&`) |
> |---------|--------------|----------------|
> | Can be null | Yes | No |
> | Can be reseated | Yes | No (once bound, always bound) |
> | Requires `*` to access value | Yes | No |
> | Syntax to take address | `&var` | N/A |
> | Can point to array | Yes | No |

---

## 2. Pass-by-Reference vs Pass-by-Address (vs Pass-by-Value)

In C, you pass large structs either by value (expensive copy) or by pointer (manual `&` and `*`). C++ references give you a third option that is syntactically cleaner.

```cpp
struct BigData { char buffer[1024]; };

// C style: Pass by pointer (pass address)
void processC(BigData* data) {
    data->buffer[0] = 'A';  // Must dereference with ->
}

// C++ style: Pass by reference (no copy, no pointer syntax)
void processCpp(BigData& data) {
    data.buffer[0] = 'A';   // Use . directly — looks like value but is a reference
}

BigData bd;
processC(&bd);    // C: must pass address
processCpp(bd);   // C++: just pass the variable — reference binds automatically
```

### When to use what

| Situation | Use |
|-----------|-----|
| Small cheap type (`int`, `bool`) | **Pass by value** |
| Large type, function reads but doesn't modify | **`const T&`** |
| Large type, function must modify the caller's object | **`T&`** |
| Parameter can be null / is optional | **`T*`** (pointer) |
| Transferring ownership (advanced) | **`T&&`** (see note 32) |

---

## 3. `const` References — The Most Important C++ Tool

A `const T&` (constant reference) is read-only access to an object without copying it. It is the correct way to pass large objects to functions that only need to read them.

```cpp
// ✅ Correct — no copy, read-only access
void printName(const std::string& name) {
    std::cout << name;
    // name = "Bob";  // COMPILE ERROR — can't modify through const ref
}

// ❌ Wasteful — copies the entire string (could be megabytes for large strings)
void printNameBad(std::string name) { ... }
```

### The Special Power of `const T&`: Binding Temporaries

A `const T&` can bind to a **temporary (rvalue)** and extends its lifetime for the duration of the reference. A non-const `T&` **cannot** bind to a temporary.

```cpp
// Non-const ref cannot bind to temporary
std::string& r1 = std::string("Hello");   // ❌ COMPILE ERROR

// const ref CAN bind to temporary — temporary's lifetime is extended!
const std::string& r2 = std::string("Hello");  // ✅ Works — lives until r2 goes out of scope

// Also works for function returns:
const int& ref = 5;      // ✅ Binds the literal 5 (a temporary) — lives until ref dies
const double& dRef = 5;  // ✅ The int 5 is promoted to double 5.0, then bound
```

> **Interview question:** *"Why does `const T&` extend the lifetime of a temporary but `T&` doesn't?"*
>
> By design. The C++ standard allows `const T&` to bind temporaries because the `const` guarantee means you can't do anything dangerous with it. A non-const `T&` to a temporary would allow writing to an object that's about to be destroyed — clearly a mistake.

---

## 4. References and `const` Correctness

`const` correctness means consistently marking things `const` when they aren't meant to be modified. It is a discipline, and failing to apply it creates a cascade of problems.

```cpp
class Buffer {
    std::string data;
public:
    // Getter — MUST be const member function
    const std::string& getData() const {  // The trailing 'const' means: "this doesn't modify the object"
        return data;
    }

    // Setter — non-const
    void setData(const std::string& s) {  // const& for the parameter — we don't modify 's'
        data = s;
    }
};

const Buffer buf;
buf.getData();  // ✅ Fine — getData is const
buf.setData("x"); // ❌ COMPILE ERROR — can't call non-const method on const object
```

> **The `const` cascade rule:** If you have a `const` object, you can only call `const` methods on it. If those methods return references, the references must also be `const`. If you break the chain anywhere, you get a compile error.

---

## 5. Dangling References — The Silent Killer

A **dangling reference** refers to an object that no longer exists (its lifetime has ended). Using it is **Undefined Behavior** — typically a crash, but sometimes silent data corruption.

### Gotcha #1: Returning a reference to a local variable
```cpp
int& getLocal() {
    int x = 42;
    return x;     // ❌ x is destroyed when this function returns — ref dangles
}

int& r = getLocal();  // r is a dangling reference
std::cout << r;       // UB — could print 42, 0, crash, or anything
```

### Gotcha #2: Reference to a vector element that gets invalidated
```cpp
std::vector<int> v = {1, 2, 3};
int& elem = v[0];       // reference to first element

v.push_back(4);         // ❌ might cause vector reallocation → moves all elements to new memory
std::cout << elem;      // UB — elem may point to freed memory
```

> **Rule:** Never store a reference/pointer to a container element and then modify the container. `std::vector` invalidates all iterators and references on reallocation.

### Gotcha #3: Returning `const string&` to a temporary
```cpp
const std::string& getName() {
    return std::string("Alice");  // ❌ Returns reference to temporary
                                  // Temporary is destroyed at the semicolon
}                                 // Returns dangling reference!
```

---

## 6. References vs Pointers: The Decision Framework

```
Is the argument optional (can be absent)?
  ├─ YES → Use a pointer (T*)
  └─ NO  → Should the function modify the caller's object?
              ├─ YES → Use a non-const reference (T&)
              └─ NO  → Use a const reference (const T&)
                         (or pass by value if the type is cheap)
```

---

## Key Takeaways

- A reference is an **alias** — it cannot be null or reseated. No `*` or `->` syntax needed.
- **`const T&`** is the correct tool for "pass a large object to a read-only function" — no copy, no modification.
- **`const T&` can bind temporaries** and extends their lifetime — `T&` cannot.
- **`const` correctness** must be applied consistently — member functions, parameters, and return types all need to be `const`-correct together.
- **Dangling references** (to locals, reallocated containers, temporaries from return values) are UB — the compiler usually won't warn you.
- **Decision rule:** optional → pointer; modify → `T&`; read-only → `const T&`.

---

*Last updated: 2026-08-30*
