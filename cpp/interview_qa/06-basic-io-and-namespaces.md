# Interview Q&A: Basic I/O and Namespaces

*(Companion to [Note 06](../06-basic-io-and-namespaces.md))*

**Q: Why is `using namespace std;` considered bad practice in professional C++ codebases?**
**A:** The `std` namespace is massive and contains hundreds of functions and objects. Writing `using namespace std;` in the global scope (especially inside a header file) pulls all of these into the global namespace. This defeats the entire purpose of namespaces and leads to **namespace pollution** and **naming collisions**. If you name a variable `count` or `data`, it might conflict with `std::count` or `std::data`. 
*Best Practice:* Prefix explicitly with `std::` or use localized scope declarations (e.g., `using std::cout;` inside a specific function).

**Q: In C++, why is it generally recommended to use `\n` instead of `std::endl` for newlines?**
**A:** Output streams like `std::cout` are buffered, meaning they wait until the buffer is full before actually writing to the slow console. `std::endl` does two things: it inserts a newline, and it **forces the buffer to flush immediately**. Using `std::endl` in a loop can absolutely crush your program's performance by forcing thousands of slow I/O flushes. You should only use `std::endl` when you specifically need the buffer flushed immediately (like before a crash).

**Q: If a user is prompted for a single integer via `std::cin >> x;` but types "10 20" and hits enter, what happens to the "20"?**
**A:** The extraction operator (`>>`) only reads up to the first whitespace. It extracts `10` into `x`. The remaining `" 20\n"` is left sitting in the input buffer. If a subsequent `std::cin >> y;` occurs later in the program, it will NOT pause for user input—it will immediately extract the `20` waiting in the buffer into `y`.

**Q: Can you use `std::endl` to flush the `std::cin` input buffer? How do you discard unwanted input?**
**A:** No, `std::endl` is strictly an *output* manipulator meant for `std::cout`. To clear the input buffer (discarding trailing garbage until the next newline), you must use `std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');`.

**Q: Can I just use `fflush(stdin);` in C++ instead of that messy ignore command?**
**A:** **No!** According to the C and C++ standards, calling `fflush()` on an *input* stream results in **Undefined Behavior**. While it happens to work on some compilers (like MSVC on Windows), it will fail or crash on others (like GCC on Linux). Always use `std::cin.ignore()` in C++.
