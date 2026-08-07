# Interview Q&A: Namespaces & Scope Resolution Deep Dive

*(Companion to [Note 07](../07-namespaces-deep-dive.md))*

**Q: Why does C++ use `::` for scope resolution instead of a single colon `:` or a dot `.`?**
**A:** 
- The dot `.` is strictly reserved for member access on instantiated objects (e.g., `obj.method()`). Namespaces are not objects; they are compile-time organizational structures.
- A single colon `:` is not used because it is already heavily overloaded in C/C++ parsing. It is used for `goto` labels, `switch` cases, ternary operators (`? :`), access specifiers (`public:`), constructor initialization lists, and bit fields. Reusing it for scope resolution would create massive parsing ambiguities. Therefore, the unique `::` token was introduced.

**Q: What does a blank scope resolution operator (e.g., `::myVar`) do?**
**A:** It forces the compiler to look in the **Global Scope**. This is used when a local variable "shadows" (has the same name as) a global variable, allowing you to bypass the local variable and access the global one directly.

**Q: Is the `std` namespace defined entirely within `<iostream>`?**
**A:** No. In C++, namespaces are **"open"**. This means multiple files and headers can contribute to the same namespace. `<iostream>` adds `cin` and `cout` to the `std` namespace, while `<vector>` adds the `vector` class, and `<string>` adds the `string` class. They all collaboratively build the single `std` namespace block.
