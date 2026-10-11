# Linux & Bash — Best Practices

> A living document of Linux/Bash idioms and best practices discovered during learning.

---

## Bash Scripting

1. **Always start with `set -euo pipefail`** — exits on error, undefined vars, and pipe failures.
2. **Quote all variables** — `"$var"` not `$var`, to prevent word splitting and globbing.
3. **Use `[[` instead of `[`** — bash keyword, supports pattern matching, no word splitting issues.
4. **Use `$(command)` not backticks** — nestable, more readable.
5. **Use `local` for function variables** — prevents leaking into global scope.

---

*Last updated: 2026-10-11*
