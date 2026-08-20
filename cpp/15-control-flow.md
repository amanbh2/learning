# 15 — Control Flow & `enum class`

## Overview

Control flow in C++ is very similar to C, but with key additions: **`enum class`** (strongly-typed enumerations), **`constexpr if`** (compile-time branching), and **range-based `for` loops**. These are the tools we use to build the game loop in our Snake game.

---

## The Game Loop Pattern

Every real-time program (game, embedded firmware, telecom scheduler) follows the same fundamental loop:

```
while (running) {
    1. Handle Input / Receive Events
    2. Update State
    3. Render / Transmit Output
    4. Sleep / Yield (control timing)
}
```

This is not just a game pattern — it's the same event loop in a gNodeB scheduler, a UI framework, or a network daemon. Recognizing this pattern is key.

---

## `enum class` — Strongly-Typed Enumerations

This is one of the most important improvements C++ made over C enums.

### The C Problem

```c
// C-style enum: values leak into the surrounding scope.
enum GameState { RUNNING, PAUSED, GAME_OVER };
enum Direction  { UP, DOWN, RUNNING }; // ERROR: 'RUNNING' is redefined!
```

C enums are just `int`s in disguise. The names are injected into the global namespace, causing name collisions and silent implicit conversions:

```c
int x = RUNNING; // Compiles fine — no warning. Dangerous.
```

### The C++ Fix: `enum class`

```cpp
enum class GameState { RUNNING, PAUSED, GAME_OVER };
enum class Direction  { UP, DOWN, LEFT, RIGHT, NONE };

// Values are scoped — you MUST qualify them:
GameState state = GameState::RUNNING;

// No accidental integer comparisons:
int x = GameState::RUNNING;  // COMPILE ERROR — great!

// No name collision between enums:
// Direction::RUNNING doesn't exist, no clash with GameState::RUNNING
```

> **Interview question:** *"What's the difference between `enum` and `enum class`?"*  
> Answer: Scoping, no implicit `int` conversion, no name collision. Always prefer `enum class` in modern C++.

---

## `switch` on `enum class`

```cpp
// From game: utils.h + main.cpp
switch (state) {
    case GameState::RUNNING:
        std::cout << "Controls: WASD | Q to Quit\n";
        break;
    case GameState::PAUSED:
        std::cout << "[PAUSED]\n";
        break;
    case GameState::GAME_OVER:
        std::cout << "GAME OVER\n";
        break;
}
```

**Interview gotcha: `fallthrough`**  
Omitting `break` causes execution to "fall through" to the next case. In C++17, mark intentional fallthroughs with `[[fallthrough]]` to suppress compiler warnings:

```cpp
switch (key) {
    case 'W': // intentional fallthrough
    case 'w':
        [[fallthrough]]; // C++17 attribute — tells compiler this is deliberate
    case VK_UP:
        direction = Direction::UP;
        break;
}
```

---

## Range-Based `for` Loop

Introduced in C++11. Cleaner than index-based loops when you don't need the index.

```cpp
// grid.cpp — iterating over all cells to reset them
for (auto& row : cells_) {       // 'auto&' deduces the type and takes a reference
    for (auto& cell : row) {
        cell = CellType::EMPTY;  // modifies in-place because it's a reference
    }
}
```

**Key rule:** Use `auto&` (reference) when you want to modify elements. Use `const auto&` when read-only. Use `auto` (copy) only for cheap types like `int`.

---

## `constexpr` Constants

```cpp
// utils.h
constexpr int GRID_WIDTH  = 20;
constexpr int GRID_HEIGHT = 20;
```

`constexpr` means the value is computed at **compile time** — no runtime cost, no memory address, no symbol table entry. It's the replacement for `#define` macros. The compiler will substitute `GRID_WIDTH` with `20` everywhere.

> **Interview question:** *"What's the difference between `const` and `constexpr`?"*  
> `const` means the value can't change at runtime but may be set at runtime.  
> `constexpr` means the value is known and computed at compile time.

---

## Code Examples

These concepts are demonstrated in the Phase 1 Snake game:

| File | Demonstrates |
|------|-------------|
| [`utils.h`](./code/snake/utils.h) | `enum class Direction`, `enum class GameState`, `constexpr` grid size |
| [`grid.cpp`](./code/snake/grid.cpp) | Range-based `for` loops, `switch` on `CellType`, wall initialization |
| [`main.cpp`](./code/snake/main.cpp) | Game loop `while`, `switch` on `GameState`, `switch` on input key |

**How to build and run:**
```bash
cd cpp/code/snake
g++ -std=c++17 -Wall -Wextra -o snake.exe main.cpp grid.cpp
./snake.exe
```

---

## Key Takeaways

- Always prefer `enum class` over C-style `enum` — scoped, type-safe, no implicit `int` conversion.
- The game loop (`input → update → render → sleep`) is the foundation of any real-time system.
- Use `[[fallthrough]]` (C++17) to mark intentional switch case fallthroughs.
- Use `auto&` in range-based `for` loops to modify elements; use `const auto&` for read-only.
- `constexpr` is evaluated at compile time — use it instead of `#define` for constants.

---
*Last updated: 2026-08-16*
