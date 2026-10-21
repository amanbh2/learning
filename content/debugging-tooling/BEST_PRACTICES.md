# Debugging & Tooling — Best Practices

> A living document of debugging idioms and best practices discovered during learning.

---

## GDB

1. **Create a `.gdbinit` file** — automate common setup (`set print pretty on`, `set pagination off`).
2. **Use `bt full` not just `bt`** — shows local variables in each frame, often reveals the bug immediately.
3. **For multi-threaded bugs, use `set scheduler-locking on`** — prevents other threads from running while you step.

## Memory

1. **Compile with `-fsanitize=address` during development** — catches bugs at the point of error, not later.
2. **ASan and TSan cannot coexist** — maintain separate build configurations.
3. **Valgrind for production binaries, ASan for development** — Valgrind doesn't need recompilation.

## Coverity

1. **Never blindly suppress a finding** — document why it's a false positive.
2. **Treat Coverity defects like bugs** — triage, assign, fix in the same sprint.

---

*Last updated: 2026-10-11*
