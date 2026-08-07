# Interview Q&A: General Syntax and Jargon

*(Companion to [Note 12](../12-cpp-jargon-and-glossary.md))*

**Q: What is the fundamental difference between a Statement and an Expression in C++?**
**A:** 
- An **Expression** is code that evaluates to a single value (e.g., `5 + 3`, `x == y`). Expressions can also contain **Subexpressions** (e.g., in `(a + b) * c`, `a+b` is a subexpression).
- A **Statement** is a complete instruction that performs an action, usually ending with a semicolon `;`.
- If you place a semicolon after an expression, it becomes an **Expression Statement** (e.g., `x = 5;`). Even useless expressions are technically valid expression statements. For example, if you write `5;`, the C++ compiler will evaluate the literal `5`, and then immediately discard the result because you didn't do anything with it!

**Q: In Java or Python, an "Object" is an instance of a Class. Is this true in C++?**
**A:** No! In C++, the term "Object" is much more low-level. An Object is simply *any* region of memory that has a size, a type, and a value. Even a primitive `int x = 5;` is considered an Object in C++ vocabulary. A "Variable" is just an Object that has a name.

**Q: Did C or C++ invent the single-line `//` comment?**
**A:** C++ invented it! The original C language (C89) only supported multi-line `/* */` comments. Bjarne Stroustrup introduced the `//` single-line comment when creating C++. It became so incredibly popular that the C standards committee eventually backported it into the C language in 1999 (the C99 standard).

**Q: What is "Undefined Behavior" (UB) in C++, and what are its most common causes?**
**A:** UB occurs when you write code that violates the rules of the C++ language. When this happens, the compiler is allowed to do *anything*. It might crash immediately, but worse, it might appear to work perfectly in testing and then fail catastrophically in production. Common causes include:
1. Reading from an uninitialized variable (garbage memory).
2. Dereferencing a null or invalid pointer.
3. Accessing an array out of bounds.
4. Dividing by zero.
5. Forgetting a `return` statement in a function (other than `main()`).

**Q: Are there any specific naming rules for variables in C++ regarding underscores?**
**A:** Yes! While you are allowed to use underscores, the C++ standard heavily restricts them:
1. You must **never** start an identifier with a double underscore (e.g., `__myVar`).
2. You must **never** start an identifier with an underscore followed by a capital letter (e.g., `_MyVar`).
3. You must **never** start a global variable with an underscore followed by a lowercase letter (e.g., `_myvar`).
These combinations are strictly **reserved by the C++ implementation** (the compiler and the standard library). Using them can cause your variables to silently collide with hidden compiler macros, leading to bizarre compilation errors.

**Q: What is the difference between a Literal and a Variable?**
**A:** A Literal is a fixed, hard-coded value inserted directly into the source code (e.g., `5`, `"Hello"`). A Variable is a named region of memory (an Object) that *holds* a value.

**Q: What does the "Arity" of an operator mean?**
**A:** Arity refers to how many operands (data values) an operator requires to function. 
- **Unary:** Requires 1 operand (e.g., `-x`).
- **Binary:** Requires 2 operands (e.g., `x + y`).
- **Ternary:** Requires 3 operands (e.g., `condition ? true : false`).

**Q: How is it possible to chain operations together, like `x = y = 5;` or `std::cout << "A" << "B";`?**
**A:** In C++, every operator performs its action and then **returns a value**. 
- In `x = y = 5;`, the `=` operator evaluates right-to-left. `y = 5` executes first and *returns* the value `5`, which is then passed to `x = 5`.
- In `std::cout << "A" << "B";`, the `<<` operator evaluates left-to-right. `std::cout << "A"` executes first and *returns the stream object itself* (`std::cout`). The statement then effectively becomes `std::cout << "B";`.

**Q: Languages like Python use `**` for exponents. Why doesn't C++ have a built-in operator for exponents or logarithms?**
**A:** This comes down to C++'s core philosophy of mapping closely to hardware. Modern CPUs have dedicated, single-cycle hardware instructions for `ADD`, `SUB`, `MUL`, and `DIV`. Therefore, C++ provides operators (`+`, `-`, `*`, `/`) that map directly to those fast instructions.
CPUs do **not** have a single instruction for complex exponents or logarithms. Those operations require heavy, multi-step algorithms (like Taylor series) and complex error handling (e.g., fractional exponents of negative numbers). If C++ provided a `**` operator, it would hide a massive, slow function call behind a simple syntax. Instead, C++ forces you to explicitly call `std::pow()` or `std::log()` from the `<cmath>` library, ensuring you are aware of the performance cost.
