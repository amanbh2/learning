# Comments & Documentation Strategies

## 1. The History of C++ Comments
C++ supports two types of comments:
- `/* Multi-line block comments */` (Inherited from C)
- `// Single-line comments` (Invented by C++)

*Fun Fact:* The original C language (C89) did not have single-line comments! Bjarne Stroustrup introduced them in C++ because he found block comments too tedious for quick notes. They became so popular that the C Standards Committee eventually backported them into the C language in 1999 (the C99 standard).

---

## 2. Best Practices for Commenting Code
Writing good comments is a skill. The general rule is: **Comments should explain *WHY* something is being done, not *WHAT* is being done.**

**Bad Commenting (Stating the obvious):**
```cpp
int timeout = 5000; // Set timeout to 5000
```
This is useless. Any programmer reading the code already knows the timeout is being set to 5000. 

**Good Commenting (Explaining the *Why*):**
```cpp
// We must use a 5000ms timeout here because the RAN baseband unit 
// requires at least 4 seconds to spin up its DSP processors.
int timeout = 5000; 
```

---

## 3. Documentation Generators (Doxygen / "Carrot" Comments)
In professional C++ codebases (like huge 5G software stacks), you don't just write comments for other developers reading the raw code. You write comments that a **Documentation Generator** can parse to automatically build beautiful HTML websites or PDFs containing all your API documentation.

The absolute industry standard tool for this in C++ is **Doxygen**. 

To tell Doxygen that a comment is meant for documentation (and isn't just an internal code note), you use a special syntax, often called "Carrot Comments" or "Triple Slash Comments":

**Doxygen Style 1: Javadoc Block (/**)**
```cpp
/**
 * @brief Initializes the radio transceiver.
 * 
 * This function powers on the antenna array and tunes it to the 
 * specified center frequency. It blocks until the PLL locks.
 * 
 * @param frequency The center frequency in MHz.
 * @return 0 on success, or a negative error code if the PLL fails to lock.
 */
int init_transceiver(int frequency);
```

**Doxygen Style 2: Triple Slash (///)**
```cpp
/// @brief Shuts down the radio and releases hardware locks.
void shutdown_transceiver();
```

When you run the `doxygen` command on your codebase, it finds these specific comments and builds a complete API website so other teams can learn how to use your functions without ever looking at your `.cpp` files!

---

## 4. IDE Shortcuts (VS Code)
Modern IDEs like VS Code have built-in shortcuts to make commenting out large blocks of code (usually for debugging) incredibly fast.

- **Toggle Single-Line Comment (`//`)**: 
  - Windows/Linux: `Ctrl + /`
  - Mac: `Cmd + /`
  - *(Select multiple lines and hit this to comment/uncomment the entire block instantly).*
- **Toggle Block Comment (`/* */`)**:
  - Windows/Linux: `Shift + Alt + A`
  - Mac: `Shift + Option + A`

---
*Last updated: 2026-08-07*
