# Basic I/O and Namespaces

## Overview
This note covers how C++ handles input and output differently than C. We will explore the `<iostream>` library, the concepts of streams, and how C++ uses `namespace` to prevent naming collisions.

## C vs C++ I/O: `<stdio.h>` vs `<iostream>`
In C, we use `printf` and `scanf` from `<stdio.h>`, which rely on format specifiers (like `%d`, `%s`). This approach is powerful but lacks **type safety**—passing the wrong format specifier can lead to undefined behavior or crashes.

C++ introduces `<iostream>`, which uses **Streams** and overloads the bitwise operators (`<<` and `>>`) to handle I/O securely and automatically based on the variable's type.

### The Standard Streams
- `std::cout` (Character Output): Replaces `stdout` / `printf()`. Used with the insertion operator `<<`.
- `std::cin` (Character Input): Replaces `stdin` / `scanf()`. Used with the extraction operator `>>`.
- `std::cerr` (Character Error): Replaces `stderr` (unbuffered).
- `std::endl`: Prints a newline `\n` and flushes the output buffer.

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

#### 1. Reading Strings with Spaces
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
