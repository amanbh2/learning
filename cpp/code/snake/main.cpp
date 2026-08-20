// ============================================================
// main.cpp — Phase 1: Static Grid & Game Loop
//
// C++ Concepts covered:
//   - enum class (Direction, GameState)
//   - constexpr constants
//   - while loop (game loop pattern)
//   - switch statement
//   - Passing objects by reference
//   - Windows console: ReadConsoleInput, Sleep
// ============================================================

#include <iostream>
#include <windows.h>  // Windows API: GetStdHandle, ReadConsoleInput, Sleep
#include "grid.h"
#include "utils.h"

// ============================================================
// clearScreen()
// Uses ANSI escape code to move cursor to (row 1, col 1).
// This avoids screen flicker vs system("cls").
// ============================================================
void clearScreen() {
    std::cout << "\033[H";
}

// ============================================================
// printHUD()
// Prints the Heads-Up Display: score and controls.
// Takes state by value (enum class is trivially cheap to copy).
// ============================================================
void printHUD(GameState state, int score) {
    std::cout << "  === SNAKE === \n";
    std::cout << "  Score: " << score << "\n";

    // switch on enum class — cleaner than if/else chains
    switch (state) {
        case GameState::RUNNING:
            std::cout << "  Controls: WASD | Q to Quit | P to Pause\n";
            break;
        case GameState::PAUSED:
            std::cout << "  [PAUSED] Press P to resume\n";
            break;
        case GameState::GAME_OVER:
            std::cout << "  *** GAME OVER *** Press Q to Quit\n";
            break;
    }
    std::cout << '\n';
}

// ============================================================
// handleInput()
// Non-blocking key check using Windows PeekConsoleInput / ReadConsoleInput.
// Returns the character pressed, or '\0' if none.
// ============================================================
char handleInput(HANDLE hIn) {
    DWORD events = 0;
    GetNumberOfConsoleInputEvents(hIn, &events);
    if (events == 0) return '\0';

    INPUT_RECORD record;
    DWORD read = 0;
    ReadConsoleInput(hIn, &record, 1, &read);

    // We only care about KEY_DOWN events (not releases, mouse, etc.)
    if (record.EventType == KEY_EVENT && record.Event.KeyEvent.bKeyDown) {
        // Virtual key codes for arrow keys
        switch (record.Event.KeyEvent.wVirtualKeyCode) {
            case VK_UP:    return 'w';
            case VK_DOWN:  return 's';
            case VK_LEFT:  return 'a';
            case VK_RIGHT: return 'd';
            default:
                // For regular keys, return the ASCII character
                return record.Event.KeyEvent.uChar.AsciiChar;
        }
    }
    return '\0';
}

// ============================================================
// main() — The Game Loop
//
// The core pattern of any real-time game:
//   while (running) {
//     1. Handle Input
//     2. Update State
//     3. Render
//     4. Sleep (control frame rate)
//   }
// ============================================================
int main() {
    // Get handles to console input and output
    HANDLE hIn  = GetStdHandle(STD_INPUT_HANDLE);
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);

    // Enable ANSI escape codes on Windows 10+
    DWORD dwMode = 0;
    GetConsoleMode(hOut, &dwMode);
    SetConsoleMode(hOut, dwMode | ENABLE_VIRTUAL_TERMINAL_PROCESSING);

    // Set console input to raw mode (no line buffering, no echo)
    SetConsoleMode(hIn, ENABLE_WINDOW_INPUT | ENABLE_MOUSE_INPUT);

    // Hide the cursor for cleaner rendering
    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(hOut, &cursorInfo);
    cursorInfo.bVisible = FALSE;
    SetConsoleCursorInfo(hOut, &cursorInfo);

    // ---- Initialize game state ----
    Grid      grid;
    GameState state = GameState::RUNNING;
    int       score = 0;

    // Place the snake head at the center of the grid
    Point snakeHead = { GRID_WIDTH / 2, GRID_HEIGHT / 2 };
    grid.setCell(snakeHead, CellType::SNAKE_HEAD);

    // ---- The Game Loop ----
    bool running = true;
    while (running) {

        // --- 1. Handle Input ---
        char key = handleInput(hIn);

        // Convert to lowercase for case-insensitive comparison.
        // static_cast<char>: the C++ way to cast — explicit and safer than C-style.
        if (key != '\0') {
            key = static_cast<char>(std::tolower(static_cast<unsigned char>(key)));
        }

        switch (key) {
            case 'q':
                running = false;
                break;
            case 'p':
                // Toggle pause — demonstrating enum class comparison
                if (state == GameState::RUNNING)
                    state = GameState::PAUSED;
                else if (state == GameState::PAUSED)
                    state = GameState::RUNNING;
                break;
            default:
                break;
        }

        // --- 2. Update State ---
        // (Phase 1: No movement yet — snake head is static)

        // --- 3. Render ---
        clearScreen();
        printHUD(state, score);
        grid.render();

        // --- 4. Control Frame Rate: ~10 FPS ---
        Sleep(100);
    }

    // Restore cursor visibility before exiting
    cursorInfo.bVisible = TRUE;
    SetConsoleCursorInfo(hOut, &cursorInfo);
    std::cout << "\033[H\033[J"; // Clear screen
    std::cout << "Thanks for playing Snake!\n";

    return 0;
}
