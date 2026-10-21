# C++ Best Practices & Idioms

This document tracks the standard C++ best practices and modern idioms we have encountered so far. It acts as a living cheat sheet to ensure we write clean, safe, and professional C++ code.

### 1. Initialization
- **Always prefer Brace / List Initialization (`{}`):** Use `int x { 5 };` instead of `int x = 5;`. It completely prevents accidental narrowing conversions (e.g., trying to fit a `double` into an `int`) by throwing a compiler error instead of silently losing data.
- **Always initialize variables:** Never do `int x;`. Use `int x {};` to perform Value (Zero) Initialization, ensuring the variable starts with a safe, zeroed-out state rather than garbage memory.

### 2. Output and Buffering
- **Prefer `\n` over `std::endl`:** Using `std::endl` flushes the output buffer immediately. Doing this inside a loop will drastically reduce your program's performance. Only use `std::endl` when you specifically need to flush the buffer (like ensuring a debug message is printed before a crash).

### 3. Input and Buffering
- **Never use `fflush(stdin)`:** Calling `fflush()` on an input stream is Undefined Behavior in C++. 
- **Clear the input buffer safely:** When `std::cin >>` leaves trailing characters (like newlines) in the input buffer, clear it using:
  ```cpp
  std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
  ```
  *(Tip: Wrap this ugly syntax in a small `inline` helper function like `clearInput()`)*

### 4. Namespaces
- **Never use `using namespace std;` in the global scope:** This causes namespace pollution and significantly increases the risk of naming collisions. Always explicitly prefix standard library types (e.g., `std::cout`, `std::string`) or use localized `using` declarations inside specific functions.

### 5. Pointers
- **Never use `NULL`:** `NULL` is a C-style macro that usually resolves to the integer `0`. In C++, this can cause function overloading bugs. Always use the strongly-typed `nullptr`.

### 6. Compiler Flags
- **Always compile with Warnings treated as Errors:** Professional projects enforce flags like `-Werror` (GCC/Clang) or `/WX` (MSVC) so that the compiler catches potential logical bugs (like unused or uninitialized variables) and refuses to build until you fix them.

### 7. Unused Variables
- **Use `[[maybe_unused]]`:** If you have a variable that is only used conditionally (like inside an `#ifdef DEBUG` block), mark it with the C++17 `[[maybe_unused]]` attribute to prevent the compiler from throwing an unused variable warning.

### 8. Naming Conventions & Identifiers
- **Use standard case styles:** C++ developers generally use two primary styles for naming variables and functions:
  1. **`snake_case`:** Lowercase words separated by underscores (e.g., `int value_count;`). This is the style used by the C++ Standard Library.
  2. **`camelCase`:** Words joined together, with the first letter lowercase and subsequent words capitalized (e.g., `int valueCount;`). 
  *(Tip: Pick one style and stick to it strictly. Class/Struct names should generally use `PascalCase` e.g., `class MyClass`).*
- **Never start a name with an underscore and a capital letter (`_Var`) or a double underscore (`__var`):** The C++ standard strictly reserves all such identifiers for the compiler and standard library implementations. Using them can cause bizarre conflicts with hidden system macros.
- **Never start a global variable with an underscore (`_var`):** A single underscore followed by a lowercase letter is reserved in the global namespace.

### 9. Whitespace & Formatting
C++ is a **whitespace-independent** language (unlike Python). The compiler ignores spaces, tabs, and newlines except when they are used to separate identifiers or are inside string literals. However, formatting is critical for human readability.
- **Brace Placement Styles:** There are two dominant styles in C++:
  1. **Allman Style:** The opening brace gets its own line. (Highly readable, but takes up vertical space).
  2. **K&R / Stroustrup Style:** The opening brace is on the same line as the statement. (More compact, heavily used in standard library source code).
- **Hard Line Limits:** Professional C++ codebases usually enforce a strict 80-character or 120-character line limit to ensure code is readable side-by-side on modern monitors.
