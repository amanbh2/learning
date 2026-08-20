// ============================================================
// grid.cpp — Grid class definition
//
// C++ Concepts: class definition, constructor body, initializer list,
//               nested loop (control flow), const member functions
// ============================================================

#include "grid.h"
#include <iostream>  // std::cout, std::endl

// ---- Constructor ----
// This is where we initialize the grid state.
// Member initializer list syntax: Grid() : cells_({}) initializes the array.
Grid::Grid() {
    // Initialize all cells to EMPTY first.
    for (auto& row : cells_) {       // range-based for loop (C++11)
        for (auto& cell : row) {
            cell = CellType::EMPTY;
        }
    }

    // Place walls on the border.
    for (int x = 0; x < GRID_WIDTH; ++x) {
        cells_[0][x]               = CellType::WALL;   // Top row
        cells_[GRID_HEIGHT - 1][x] = CellType::WALL;   // Bottom row
    }
    for (int y = 0; y < GRID_HEIGHT; ++y) {
        cells_[y][0]              = CellType::WALL;    // Left column
        cells_[y][GRID_WIDTH - 1] = CellType::WALL;   // Right column
    }
}

// ---- setCell ----
void Grid::setCell(const Point& p, CellType type) {
    // Bounds check before writing — avoid undefined behavior.
    if (p.x >= 0 && p.x < GRID_WIDTH && p.y >= 0 && p.y < GRID_HEIGHT) {
        cells_[p.y][p.x] = type;
    }
}

// ---- getCell ----
// 'const' at the end of the signature: this method promises not to modify
// any member variables. It's a "read-only" view of the object.
CellType Grid::getCell(const Point& p) const {
    if (p.x >= 0 && p.x < GRID_WIDTH && p.y >= 0 && p.y < GRID_HEIGHT) {
        return cells_[p.y][p.x];
    }
    return CellType::WALL; // Treat out-of-bounds as a wall
}

// ---- clearEntities ----
// Resets dynamic entities (snake, food) without touching the border walls.
void Grid::clearEntities() {
    for (int y = 1; y < GRID_HEIGHT - 1; ++y) {
        for (int x = 1; x < GRID_WIDTH - 1; ++x) {
            CellType& cell = cells_[y][x]; // Reference — modifies in-place, no copy
            if (cell != CellType::WALL) {
                cell = CellType::EMPTY;
            }
        }
    }
}

// ---- isWall ----
bool Grid::isWall(const Point& p) const {
    return getCell(p) == CellType::WALL;
}

// ---- cellChar (private helper) ----
char Grid::cellChar(CellType type) const {
    // switch statement — cleaner than if/else chains for enum matching.
    switch (type) {
        case CellType::WALL:       return '#';
        case CellType::SNAKE_HEAD: return '@';
        case CellType::SNAKE_BODY: return 'o';
        case CellType::FOOD:       return '*';
        case CellType::POWER_UP:   return '+';
        case CellType::EMPTY:      // fall through
        default:                   return ' ';
    }
}

// ---- render ----
void Grid::render() const {
    // We build each row as a string and print it at once.
    // Printing character-by-character is slow; string concatenation is faster.
    for (int y = 0; y < GRID_HEIGHT; ++y) {
        std::string row;
        row.reserve(GRID_WIDTH * 2); // Reserve memory upfront to avoid reallocations
        for (int x = 0; x < GRID_WIDTH; ++x) {
            row += cellChar(cells_[y][x]);
            row += ' '; // Spacing for a more square-looking grid
        }
        std::cout << row << '\n';
    }
}
