# DevOps Essentials — Best Practices

> A living document of DevOps idioms and best practices discovered during learning.

---

## Docker

1. **Use multi-stage builds** — separate build dependencies from runtime, keeps images small.
2. **Run as non-root user** — add `USER` directive in Dockerfile for security.
3. **Use `.dockerignore`** — exclude `.git`, build artifacts, and unnecessary files from build context.

## Kubernetes

1. **Always set resource requests and limits** — prevents runaway pods from affecting the cluster.
2. **Use readiness probes** — ensures traffic only goes to healthy pods.
3. **Externalize config with ConfigMaps** — don't bake environment-specific config into images.

## Git

1. **Never force-push to shared branches** — use `git revert` instead to undo on main.
2. **Write meaningful commit messages** — "fix bug" is not meaningful; describe *what* and *why*.

---

*Last updated: 2026-10-11*
