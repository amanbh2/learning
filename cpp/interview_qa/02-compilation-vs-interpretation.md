# Interview Q&A: Compilation vs Interpretation

*(Companion to [Note 02](../02-compilation-vs-interpretation.md))*

**Q: What is the fundamental difference in how C++ and Python are translated to run on a CPU?**
**A:** C++ is an **Ahead-Of-Time (AOT) Compiled Language**. The compiler translates the source code entirely into native machine code *before* the user ever runs it. The resulting executable runs directly on the bare metal CPU, offering maximum speed but locking the executable to a specific OS and CPU architecture.
Python is an **Interpreted Language**. It uses a middleman called a Virtual Machine (the PVM). When you run a script, it is first turned into Bytecode, which the PVM reads and translates into machine code *on the fly* while the program is running. This makes Python highly portable ("write once, run anywhere") but much slower because of the real-time translation overhead.
