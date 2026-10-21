# Basic I/O and Namespaces

## Overview
This note covers how C++ handles input and output differently than C. We will explore the `<iostream>` library, the concepts of streams, and how C++ uses `namespace` to prevent naming collisions.

## C vs C++ I/O: `<stdio.h>` vs `<iostream>`
In C, we use `printf` and `scanf` from `<stdio.h>`, which rely on format specifiers (like `%d`, `%s`). This approach is powerful but lacks **type safety**—passing the wrong format specifier can lead to undefined behavior or crashes.

C++ introduces `<iostream>`, which uses **Streams** and overloads the bitwise operators (`<<` and `>>`) to handle I/O securely and automatically based on the variable's type.

### The Standard Streams and Operators
- **`std::cout` (Character Output):** Used with the **insertion operator (`<<`)**. It "inserts" the data on its right into the output stream on its left.
- **`std::cin` (Character Input):** Used with the **extraction operator (`>>`)**. It "extracts" data from the input stream on its left and puts it into the variable on its right.
- `std::cerr` (Character Error): Replaces `stderr` (unbuffered).
- `std::endl`: Prints a newline `\n` AND **flushes the output buffer** (forces all waiting data to be printed immediately).

### How `std::cin` Buffering Works Under the Hood
When you request input using `std::cin >> x;`, the program pauses and waits for the user to type something and press Enter. However, the extraction operator `>>` only extracts data until it hits a **whitespace** (space, tab, or newline). 

Whatever is left over stays in the **input buffer**. 

```cpp
int x, y;
std::cin >> x; 
// If the user types "10 20" and hits Enter:
// `x` becomes 10. The " 20\n" is left in the input buffer.

std::cin >> y; 
// The program will NOT pause for input here! It sees " 20" already waiting 
// in the buffer and immediately extracts it into `y`.
```

**How to "flush" or clear the input buffer:**
You **cannot** use `std::endl` with `std::cin`. `std::endl` is strictly an *output* manipulator. To discard unwanted trailing characters in the input buffer, you must use `std::cin.ignore()` to tell it to throw away characters until it hits the newline:

```cpp
#include <limits> // Required for std::numeric_limits

std::cin >> x;
// Safely throw away the rest of the garbage on that line:
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); 
```

**"Isn't that syntax really messy?"**
Yes, it is extremely ugly. If you are coming from C, you might be tempted to use `fflush(stdin);`—**DO NOT DO THIS**. In both C and C++, calling `fflush()` on an input stream is officially **Undefined Behavior** (even though it happens to work on some compilers like MSVC, it will crash on others like GCC). 

Because the C++ standard way is so messy, professional developers almost always hide it inside a small inline helper function:
```cpp
inline void clearInput() {
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
}

// Later in code...
std::cin >> x;
clearInput(); 
```

### Code Comparison

**C Approach (`printf` / `scanf`)**
```c
#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age); // Needs format specifier and pointer reference
    printf("You are %d years old.\n", age);
    return 0;
}
```

**C++ Approach (`std::cin` / `std::cout`)**
```cpp
#include <iostream>

int main() {
    int age;
    std::cout << "Enter your age: ";
    std::cin >> age; // No format specifier or `&` needed. C++ deduces the type!
    std::cout << "You are " << age << " years old." << std::endl;
    return 0;
}
```
*Why is C++ safer here?* `std::cin` automatically detects that `age` is an integer. You don't need `%d`, and you don't need to manually pass the memory address `&age` because C++ uses references under the hood.

### Common I/O Gotchas & C++ Alternatives

#### 1. Performance Warning: `std::endl` vs `\n`
This is a massive C++ interview and code-review topic. Output streams in C++ are **buffered**. When you use `std::cout`, the text doesn't go to the screen immediately; it waits in a buffer until the buffer is full, at which point it writes to the console all at once (flushing). This is done because writing to the console is very slow.

Using `std::endl` does two things: it inserts a newline, and it **forces the buffer to flush immediately**. 
If you use `std::endl` inside a loop that runs 10,000 times, you are forcing the system to perform 10,000 slow I/O flushes, which will absolutely crush your program's performance.

**Best Practice:** Use `\n` when you just want a newline. Only use `std::endl` when you specifically *need* to flush the buffer (e.g., ensuring a debug message prints immediately before a potential crash).

#### 2. Reading Strings with Spaces
If you use `std::cin >> myString;`, it will **stop reading at the first whitespace**. If the user types "John Doe", `myString` will only contain "John".
To read an entire line (including spaces), use `std::getline()` from the `<string>` library:
```cpp
#include <iostream>
#include <string>

int main() {
    std::string fullName;
    std::cout << "Enter full name: ";
    std::getline(std::cin, fullName); // Reads the whole line!
    return 0;
}
```

#### 2. What if I *want* to use format specifiers?
Sometimes `<<` chaining gets ugly (e.g., `cout << "X: " << x << ", Y: " << y;`).
- **Option 1 (The C way):** You can still absolutely use `printf` in C++! Just `#include <cstdio>` and use it exactly like C. It's often faster than `cout`, though not type-safe.
- **Option 2 (Modern C++20):** C++20 introduced `std::format`, which gives you the best of both worlds: python-like formatting with full C++ type safety!
```cpp
#include <iostream>
#include <format> // C++20

int main() {
    int x = 10, y = 20;
    // Type-safe, clean formatting!
    std::cout << std::format("X: {}, Y: {}\n", x, y); 
    return 0;
}
```

## What is a Namespace?
As projects grow larger, naming collisions happen (e.g., two libraries both define a function called `printData()`). C handles this by prefixing function names (e.g., `libA_printData()`).

C++ introduces `namespace`, which acts like an enclosed scope or a container for identifiers. The C++ Standard Library places all its standard functions, classes, and objects inside the `std` namespace.

### The `::` (Scope Resolution Operator)
To access something inside a namespace, we use `::`. For example, `std::cout` means "look inside the `std` namespace and find `cout`".

### Why `using namespace std;` is Considered Bad Practice
Many tutorials start with:
```cpp
#include <iostream>
using namespace std; // Pulls everything from `std` into the global scope

int main() {
    cout << "Hello World!";
    return 0;
}
```
**Interview Note:** Using `using namespace std;` in the global scope (especially in header files) is universally considered bad practice in professional C++. 
- **Reason:** The `std` namespace is massive. Pulling everything into the global scope defeats the entire purpose of namespaces and invites naming collisions (e.g., if you name a variable `data` or `count`, it might conflict with `std::data` or `std::count`).
- **Best Practice:** Explicitly prefix with `std::` or use specific declarations inside functions (e.g., `using std::cout;`).

## Key Takeaways
- C++ streams (`std::cout`, `std::cin`) are **type-safe**. They automatically deduce the variable type without format specifiers.
- Namespaces prevent naming collisions in large projects.
- The C++ Standard Library lives in the `std` namespace.
- Avoid `using namespace std;` in professional code to prevent namespace pollution; prefer explicit `std::` prefixing.

## Code Examples
Companion code for this topic can be found in `code/04-basic-io-and-namespaces/io_example.cpp`.

---
*Last updated: 2026-08-06*
