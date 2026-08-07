# Crashes, Core Dumps, and GDB

## Overview
Before diving into Pointers and Memory Management, it is absolutely essential to understand what happens when memory management goes wrong. In C and C++, there is no "Virtual Machine" to catch your mistakes. If you do something illegal, the operating system forcefully kills your program.

---

## 1. Major Types of Crashes
When a C/C++ program terminates abnormally, it is usually due to a fatal signal sent by the Operating System. The most common are:

1. **Segmentation Fault (`SIGSEGV` - Signal 11):** The most common crash. Occurs when a program tries to read or write to a memory address it does not have permission to access.
2. **Abort (`SIGABRT` - Signal 6):** The program intentionally killed itself. This usually happens when an internal `assert()` fails, or an unhandled C++ exception is thrown.
3. **Bus Error (`SIGBUS` - Signal 7):** Similar to a Segfault, but usually related to hardware alignment issues (e.g., trying to read an integer from an odd memory address that the CPU architecture doesn't support).
4. **Floating Point Exception (`SIGFPE` - Signal 8):** Occurs during illegal math operations, most commonly dividing by zero.
5. **Stack Overflow:** Not a specific signal, but usually results in a `SIGSEGV`. Occurs when a program uses too much stack memory (usually due to infinite recursion), blowing past the allocated stack boundary.

---

## 2. What Exactly is a Segmentation Fault? (Under the Hood)
A Segmentation Fault is an enforcement mechanism driven by **hardware**, specifically a chip inside the CPU called the **MMU (Memory Management Unit)**.

1. **Virtual Memory:** Every C++ program thinks it owns the entire RAM. The pointers you use are "Virtual Addresses".
2. **The MMU Translation:** When your C++ code tries to write to a pointer (e.g., `*ptr = 5;`), the CPU asks the MMU to translate that Virtual Address into a Physical RAM address using Page Tables.
3. **The Fault:** If the pointer is `nullptr` (address 0), uninitialized (random garbage), or points to read-only memory (like string literals), the MMU detects that the program does not have a valid mapping or permission for that address.
4. **The Kill:** The MMU triggers a hardware interrupt. The OS catches this interrupt, realizes your program is violating memory boundaries, and immediately terminates it by sending a `SIGSEGV`.

---

## 3. What is a Core File?
When the OS brutally murders your program with a `SIGSEGV` or `SIGABRT`, all the data in RAM (variables, call stack, pointers) is instantly lost. 

A **Core File** (or Core Dump) is a post-mortem snapshot. If you have core dumps enabled in your OS (e.g., `ulimit -c unlimited` in Linux), the OS will pause for a fraction of a second before killing the process, copy the *entire* working memory (RAM) of the program, and dump it into a massive file on your hard drive (usually named `core` or `core.<pid>`).

**Why it matters for 5G RAN:** If a gNodeB software stack crashes at 3 AM in a live cell tower, you aren't there to watch it. The OS generates a core file. In the morning, you download that core file and analyze it to figure out exactly what line of code caused the crash.

---

## 4. What is GDB?
**GDB (GNU Debugger)** is the industry-standard debugger for C and C++ on Linux/UNIX systems. 

It does two main things:
1. **Live Debugging:** You can run your program inside GDB. You can pause execution (breakpoints), step through code line-by-line, and inspect variables while the program is running.
2. **Post-Mortem Analysis:** You can load a **Core File** into GDB along with the original executable binary. GDB will reconstruct the exact state of the program at the exact microsecond it crashed.

*Note: For GDB to map memory addresses back to human-readable C++ code (file names and line numbers), you MUST compile your code with the `-g` flag (e.g., `g++ -g main.cpp`).*

---

## 5. Important GDB Commands
When you load a core file (`gdb ./my_program ./core`), you use these commands to investigate the crash:

| Command | Shorthand | What it does |
|---------|-----------|--------------|
| `backtrace` | `bt` | Prints the call stack. This is **always the first command you run**. It shows you exactly which function called which function, leading up to the exact line of code that caused the crash. |
| `frame <N>` | `f <N>` | Switches your view to a specific function frame in the backtrace. If frame 0 is a system library (like `libc`), you might go to `f 1` or `f 2` to look at your own code. |
| `print <var>` | `p <var>` | Evaluates and prints the value of a variable at the time of the crash. (e.g., `p myPointer`). |
| `info locals` | | Prints the values of all local variables in the current frame. |
| `list` | `l` | Prints the C++ source code around the current line (requires the code to be compiled with `-g`). |
| `info threads` | | In a multi-threaded application (like 5G software), this lists all running threads. |
| `thread <N>` | `t <N>` | Switches context to thread `<N>`. Often, a crash happens on one thread, but you need to check what other threads were doing. |
| `x/<format> <addr>` | `x` | Examines raw memory at a specific hexadecimal address. |

---

## Interview Highlight: Segfaults
**Q: What causes a Segmentation Fault and what actually triggers it?**
**A:** It is caused by accessing illegal memory (dereferencing a null pointer, writing past an array bounds, or writing to read-only memory). It is triggered by the hardware's Memory Management Unit (MMU) detecting an invalid page translation and notifying the OS, which then kills the process with a `SIGSEGV`.

---
*Last updated: 2026-08-07*
