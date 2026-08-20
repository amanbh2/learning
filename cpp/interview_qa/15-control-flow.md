# Interview Q&A — 15: Control Flow & `enum class`

## Q1: What is the difference between `enum` and `enum class`?

**A:** C-style `enum` injects its values directly into the enclosing scope and allows implicit conversion to `int`. `enum class` (introduced in C++11) is scoped and strongly typed.

| Feature | `enum` | `enum class` |
|---|---|---|
| Scope | Global / namespace scope | Scoped to enum name |
| Implicit `int` cast | Yes (`int x = RUNNING;`) | No — compile error |
| Name collision | Possible | Impossible |
| Syntax | `RUNNING` | `GameState::RUNNING` |

**Always prefer `enum class`** in modern C++.

---

## Q2: What happens if you forget `break` in a `switch` statement?

**A:** Execution "falls through" to the next case and runs its body, even without matching. This is a common source of bugs. Mark intentional fallthroughs with `[[fallthrough]]` (C++17) to suppress compiler warnings:

```cpp
switch (key) {
    case 'W':
    case 'w':
        [[fallthrough]]; // intentional
    case VK_UP:
        direction = Direction::UP;
        break;
}
```

---

## Q3: What is the game loop pattern and where else does it appear?

**A:** The game loop is:
```
while (running) { input → update → render → sleep }
```
This exact pattern appears in: gNodeB MAC schedulers (poll → schedule → transmit → tick), UI event loops (GTK, Qt), network servers (epoll → dispatch → respond), embedded firmware (ISR → process → output).

---

## Q4: What is the difference between `const` and `constexpr`?

**A:**
- `const` — value cannot change at runtime. Can be initialized at runtime.
- `constexpr` — value is computed **at compile time**. Zero runtime cost. Replacement for `#define` macros, but type-safe.

```cpp
int n = read_config();
const int SIZE = n;        // OK: set at runtime, never changes
constexpr int WIDTH = 20;  // Computed at compile time
```

---

## Q5: What does `auto&` mean in a range-based for loop?

**A:** `auto` deduces the element type. `&` makes it a reference — the loop variable refers to the actual element in the container, not a copy. Without `&`, you'd be iterating over copies and any modifications would be lost.

```cpp
for (auto& cell : row)  { cell = EMPTY; } // Modifies the actual element
for (auto  cell : row)  { cell = EMPTY; } // Modifies a copy — original unchanged!
for (const auto& cell : row) { /* read-only */ }
```
