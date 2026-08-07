# Interview Q&A: Crashes, Core Dumps, and GDB

*(Companion to [Note 10](../10-crashes-core-dumps-and-gdb.md))*

**Q: What causes a Segmentation Fault (`SIGSEGV`) and what actually triggers it?**
**A:** It is caused by accessing illegal memory (dereferencing a null pointer, writing past an array bounds, or writing to read-only memory). It is triggered by the hardware's Memory Management Unit (MMU) detecting an invalid page translation and notifying the OS through a hardware interrupt. The OS then kills the process with a `SIGSEGV`.

**Q: In GDB, if you are analyzing a core dump from a crash, what is the very first command you should run and why?**
**A:** The `backtrace` (or `bt`) command. This prints the call stack leading up to the crash, allowing you to instantly see exactly which function called which function, and pinpoint the exact line of code that triggered the fatal signal.
