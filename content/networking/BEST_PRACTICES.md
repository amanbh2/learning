# Networking — Best Practices

> A living document of networking idioms and best practices discovered during learning.

---

## Socket Programming

1. **Always use `SO_REUSEADDR`** for server sockets — avoids "Address already in use" after restart.
2. **Check return values of every socket call** — `socket()`, `bind()`, `listen()`, `accept()`, `connect()` can all fail.
3. **Use `htons()`/`htonl()` for port/address** — network byte order is big-endian, x86 is little-endian.

## SCTP

1. **Use `sctp_connectx()` not `connect()`** — supports multi-homing (multiple destination addresses).
2. **Handle `SCTP_PEER_ADDR_CHANGE` notifications** — essential for detecting path failover.

---

*Last updated: 2026-10-11*
