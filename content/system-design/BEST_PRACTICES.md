# System Design — Best Practices

> A living document of system design idioms and best practices discovered during learning.

---

## LLD

1. **Start with the interface, not the implementation** — define `public` methods first, then design internals.
2. **Use RAII for all resources** — locks, file handles, connections, memory.
3. **Prefer composition over inheritance** — more flexible, avoids fragile base class problem.
4. **Make it work, make it right, make it fast** — in that order.

## HLD

1. **Always clarify requirements first** — functional, non-functional, scale, latency budget.
2. **State trade-offs explicitly** — "I chose X over Y because..." — interviewers love this.
3. **Think about failure modes** — what happens when a component dies?

---

*Last updated: 2026-10-11*
