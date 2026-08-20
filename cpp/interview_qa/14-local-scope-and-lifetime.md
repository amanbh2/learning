# 14. Local Scope, Lifetime, and Temporary Objects

**Q: What is the difference between scope and lifetime in C++?**
- **Scope:** A compile-time concept dictating *where* an identifier can be accessed in the source code.
- **Lifetime:** A runtime concept dictating *when* an object occupies memory and is valid. 
*Example:* A `static` local variable has local scope (only visible in the function) but global lifetime (exists for the duration of the program).

**Q: Explain the lifetime of a temporary object.**
- A temporary object (usually an unnamed r-value) is created during expression evaluation. It is destroyed at the end of the **full-expression** in which it was created (typically at the semicolon `;`).

**Q: What happens if you return a reference to a local variable?**
- This results in a **dangling reference**. The local variable's lifetime ends when the function scope closes, meaning the memory is reclaimed. Accessing the returned reference invokes Undefined Behavior (UB).

**Q: Can you extend the lifetime of a temporary object?**
- Yes, binding a temporary object to a `const` l-value reference (`const T&`) or an r-value reference (`T&&`) extends the lifetime of the temporary to match the lifetime of the reference itself.

**Q: Is it safe to do this: `const char* str = (std::string("Hello") + " World").c_str();`?**
- **No.** The temporary `std::string` object created by the concatenation is destroyed at the end of the full expression (at the semicolon). The pointer `str` will immediately point to freed memory, becoming a dangling pointer.
