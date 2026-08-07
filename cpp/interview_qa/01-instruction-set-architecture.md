# Interview Q&A: CPU Instruction Set Architecture (ISA)

*(Companion to [Note 01](../01-instruction-set-architecture.md))*

**Q: How do you build C++ code on an x86 Ubuntu machine that is intended to run on an ARM-based radio unit?**
**A:** You must use a **cross-compiler** (such as `aarch64-linux-gnu-gcc`). Because C++ compiles directly to machine code, a standard x86 compiler will generate x86 instructions which the ARM processor cannot understand. The cross-compiler runs on the x86 host architecture but specifically outputs ARM-compatible machine instructions.
