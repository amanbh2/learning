# Redis in Cloud-Native RAN

## Overview
An overview of Redis (Remote Dictionary Server), why it is the database of choice for modern cloud-native 5G RAN (like CU-CP High Availability), and how it interacts with C/C++ code.

## Content

### 1. The Telecom State Problem
In a 5G network, control plane nodes (like the CU-CP or AMF) must process signaling messages (like handovers) in a matter of milliseconds. 
- Traditional SQL databases write to disk, which takes several milliseconds per transaction — too slow for real-time RAN signaling.
- High Availability (HA) requires that if one CU-CP pod crashes, another pod can instantly take over the UE's call. To do this, the surviving pod needs the UE's exact state (security keys, RRC state, DRBs).

### 2. Enter Redis
**Redis** solves this by being an **In-Memory Key-Value Store**.

| Aspect | Detail |
|--------|--------|
| **In-Memory** | It stores data entirely in RAM, not on a hard drive. Fetching/updating data takes microseconds (0.1ms). |
| **Key-Value Structure** | No tables or SQL queries. You store data against a unique ID (the Key). E.g., Key: `UE:98765`, Value: `RRC_CONNECTED`. |
| **Origin** | Created in 2009 by Salvatore Sanfilippo (antirez). |
| **Language** | Written in highly optimized, minimalist **C**. |
| **Architecture** | Single-threaded core using an event loop. It avoids multi-threading lock contention, processing millions of ops/sec sequentially. |

### 3. How Cloud-Native RAN Uses Redis
In a modern vRAN / O-RAN deployment, the CU-CP application is built to be **"Stateless."**
- **Stateless** does *not* mean there is no state. It means the CU-CP pods themselves hold no persistent memory.
- Every time a CU-CP pod updates a UE's state, it instantly writes that state to a shared Redis Cluster.
- **Failover Scenario:** If CU-CP Pod A crashes mid-call, the Kubernetes load balancer routes the next DU message to CU-CP Pod B. Pod B queries Redis, instantly retrieves the UE context, and completes the procedure as if nothing happened.

### 4. Coding for Redis in C/C++
Because Redis is written in C, it has excellent native C support. The most common C client is called **`hiredis`**.

Interaction is command-based (e.g., `SET`, `GET`, `HSET`, `HGET`).

#### C Code Example (using hiredis)
```c
#include <stdio.h>
#include <hiredis.h>

int main() {
    // 1. Connect to the Redis Server
    redisContext *c = redisConnect("127.0.0.1", 6379);
    if (c == NULL || c->err) {
        printf("Connection error\n");
        return 1;
    }

    // 2. Write data (e.g., saving UE state during a procedure)
    // HSET creates a hash (object). Key="ue:987", Field="state", Value="CONNECTED"
    redisCommand(c, "HSET ue:%d state %s", 987, "CONNECTED");

    // 3. Read data (e.g., a new pod recovering the UE state after a crash)
    redisReply *reply = redisCommand(c, "HGET ue:%d state", 987);
    if (reply->type == REDIS_REPLY_STRING) {
        printf("Recovered UE State: %s\n", reply->str);
    }

    // 4. Cleanup
    freeReplyObject(reply);
    redisFree(c);
    return 0;
}
```

## Key Takeaways
- Redis is the "external brain" for stateless cloud-native telecom applications.
- Its pure C codebase and RAM-only architecture give it the microsecond latency required for 5G signaling.
- In an Active/Active HA setup, Redis is what allows a standby/peer node to seamlessly pick up a dropped SCTP connection without forcing the UE to re-attach.

---
*Last updated: 2026-07-27*
