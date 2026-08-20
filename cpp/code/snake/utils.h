#pragma once

// ============================================================
// utils.h — Shared constants, types, and enums for Snake game
//
// C++ Concepts: constexpr, enum class, struct, operator overloading
// ============================================================

// ---- Constants ----
// 'constexpr' means these are evaluated at compile time (no runtime cost).
// See note: 09-types-strings-constexpr.md
constexpr int GRID_WIDTH  = 20;
constexpr int GRID_HEIGHT = 20;

// ---- enum class: Strongly-Typed Enumerations ----
// Unlike C-style enums, 'enum class' values are scoped (Direction::UP, not just UP).
// This prevents accidental integer comparisons and name clashes.
// See note: cpp/15-control-flow.md

enum class Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    NONE    // Initial state — the snake hasn't moved yet
};

enum class GameState {
    RUNNING,
    PAUSED,
    GAME_OVER
};

enum class CellType {
    EMPTY,
    WALL,
    SNAKE_HEAD,
    SNAKE_BODY,
    FOOD,
    POWER_UP
};

// ---- struct Point ----
// A simple value type representing a 2D coordinate on the grid.
// Using a struct (not class) because all data is public by default — appropriate
// for a plain data type with no behavior to hide.
struct Point {
    int x = 0;
    int y = 0;

    // Operator overloading: allows us to write 'a == b' instead of 'a.x == b.x && a.y == b.y'
    // The 'const' at the end means this method doesn't modify the object.
    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }

    bool operator!=(const Point& other) const {
        return !(*this == other);
    }
};
