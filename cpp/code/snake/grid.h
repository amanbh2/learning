#pragma once

// ============================================================
// grid.h — Grid class declaration
//
// C++ Concepts: class declaration, #pragma once (include guard),
//               separation of declaration (.h) vs definition (.cpp)
// ============================================================

#include <array>    // std::array — fixed-size stack-allocated container
#include <string>
#include "utils.h"

class Grid {
public:
    // Constructor: sets up the grid with walls on the border and empty cells inside.
    Grid();

    // Sets the cell at position (p.x, p.y) to the given type.
    // 'const Point&' — passing by const reference: no copy, no modification.
    void setCell(const Point& p, CellType type);

    // Returns the cell type at position p.
    CellType getCell(const Point& p) const;

    // Clears all non-wall cells back to EMPTY.
    void clearEntities();

    // Prints the entire grid to the terminal.
    void render() const;

    // Returns true if the point is a wall or out of bounds.
    bool isWall(const Point& p) const;

private:
    // std::array<T, N> — a fixed-size array on the stack.
    // This is a 2D grid stored as a 1D array: index = y * WIDTH + x.
    // We use GRID_HEIGHT rows of GRID_WIDTH columns.
    std::array<std::array<CellType, GRID_WIDTH>, GRID_HEIGHT> cells_;

    // Helper: maps a CellType to its display character.
    char cellChar(CellType type) const;
};
