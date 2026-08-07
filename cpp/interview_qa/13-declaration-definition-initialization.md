# Interview Q&A: Declaration, Definition & Initialization

*(Companion to [Note 13](../13-declaration-definition-initialization.md))*

**Q: What is the difference between `int x;` and `int x {};`?**
**A:** `int x;` is Default Initialization, which leaves the variable uninitialized containing garbage memory. `int x {};` is Value Initialization (Zero Initialization), which explicitly zeroes out the memory.

**Q: Are Initialization and Assignment the same thing in C++?**
**A:** No. Initialization (`int x = 5;`) happens at the exact moment the object is created (calling the Constructor). Assignment (`x = 5;`) happens to an object that already exists (calling `operator=`). For complex objects, Initialization is much faster because Assignment requires cleaning up old data before copying new data.

**Q: What is the difference between `int x = 4.5;` and `int x { 4.5 };` in C++?**
**A:** The first is C-style Copy Initialization. It silently allows a **narrowing conversion**, meaning the compiler will truncate `4.5` to `4` without telling you, resulting in silent data loss. The second is C++11 Brace (Uniform) Initialization. Brace initialization strictly forbids narrowing conversions; the compiler will throw a fatal error and refuse to build the program. Because it is safer, `{}` is the modern best practice.

**Q: Why is it bad practice to use `NULL` in C++ instead of `nullptr`?**
**A:** `NULL` is typically defined as a macro for the integer `0`. Because C++ supports function overloading, passing `NULL` to a function might accidentally call an integer overload instead of a pointer overload, leading to dangerous bugs. `nullptr` was introduced in C++11 as a strictly typed pointer literal that can never be treated as an integer.

**Q: What is a common pitfall when using the `auto` keyword in C++?**
**A:** The `auto` keyword strips away reference (`&`) and `const` qualifiers by default. If a function returns a reference to an object, assigning it with `auto myVar = getObject();` will create a brand new copy of the object instead of a reference. You must explicitly use `auto&` to maintain the reference.
