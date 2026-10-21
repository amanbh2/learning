# Conditional Handover (CHO) — Rel-16

## Overview
Conditional Handover (CHO) is a Rel-16 feature that **proactively pre-configures** the UE with handover commands for multiple candidate cells. The UE autonomously executes the handover when it detects the configured condition is met — eliminating the delay between measurement report and HO execution that causes failures in legacy handover.

## Content

### The Problem CHO Solves
In standard handover, the gNB sends the HO command based on a single Measurement Report. But by the time the UE executes the HO, the radio conditions may have changed (UE moved further, beam faded). This causes:
- **Too-early HO:** UE hasn't moved enough, ping-pongs back
- **Too-late HO:** UE moved too far, RLF before HO completes

### How CHO Works
The gNB **pre-configures** the UE with handover commands for multiple candidate cells. The UE stores them and autonomously executes the handover when it detects the configured condition is met.

### CHO Call Flow

```plantuml
@startuml
skinparam backgroundColor white
participant "UE" as UE
participant "Source gNB" as SRC
participant "Candidate gNB 1" as C1
participant "Candidate gNB 2" as C2

== Configuration Phase ==
SRC -> C1 : XnAP: Handover Request (CHO)
C1 -> SRC : XnAP: Handover Request Ack
SRC -> C2 : XnAP: Handover Request (CHO)
C2 -> SRC : XnAP: Handover Request Ack

SRC -> UE : **RRCReconfiguration**
note right
  Contains conditionalReconfiguration:
  • Candidate 1: config + **execution condition**
    (e.g., A3: RSRP_cand1 > RSRP_serving + 3dB)
  • Candidate 2: config + execution condition
  UE stores both configs but does NOT execute yet
end note

== Execution Phase (UE-autonomous) ==
UE -> UE : Monitors conditions continuously
note over UE: Candidate 1 condition met!\nExecute stored HO command
UE -> C1 : CFRA RACH + RRCReconfigurationComplete
C1 -> SRC : XnAP: Handover Success
SRC -> SRC : Release UE context + cancel Candidate 2
@enduml
```

### CHO vs Standard Handover

| Aspect | Standard HO | Conditional HO |
|--------|-------------|----------------|
| When command is sent | After MeasReport (reactive) | **Before** any trigger (proactive) |
| Execution timing | Immediate after receiving command | UE decides when, based on condition |
| Number of targets | 1 | Multiple candidates pre-configured |
| Ping-pong risk | Higher | Lower (condition-based execution) |
| HO failure risk | Higher (stale measurement) | Lower (real-time condition check) |
| Signaling overhead | Lower (one target) | Higher (multiple targets prepared) |

### RRC Details — `conditionalReconfiguration`
The `RRCReconfiguration` message contains a `conditionalReconfiguration` IE:
- **`condReconfigToAddModList`**: List of candidate configs, each containing:
  - `condReconfigId` — unique ID for this candidate
  - `condExecutionCond` — the measurement event condition (e.g., A3 with specific threshold)
  - `condRRCReconfig` — the full `RRCReconfiguration` to apply (contains `reconfigurationWithSync`)

### CHO Cancellation and Update
- The source gNB can **replace** CHO configs (e.g., if a candidate cell becomes unavailable)
- The source gNB can **cancel** CHO via a new `RRCReconfiguration` with `condReconfigToRemoveList`
- If the UE experiences **RLF** before any CHO condition is met, it can still attempt re-establishment to a CHO candidate

### 🪤 Interview Trap: "If CHO conditions for two candidates are met simultaneously, which one does the UE choose?"
The UE selects the candidate cell with the **best measurement result** at the time of execution. If both conditions trigger at the same time, the UE picks the stronger cell.

## LTE vs 5G Comparison

| Aspect | LTE | 5G NR |
|--------|-----|-------|
| CHO | ❌ Not supported | ✅ Rel-16 |
| Proactive HO prep | ❌ | ✅ Multiple candidates pre-configured |
| UE-autonomous execution | ❌ | ✅ UE decides when to execute |

## Key Takeaways
- CHO is **proactive** — the UE receives HO configs *before* it needs them.
- The UE autonomously monitors conditions and executes when ready — no waiting for network.
- Dramatically reduces HO failure rate (too-early, too-late, ping-pong).
- Increases signaling overhead (multiple targets prepared) — a trade-off.
- Can be combined with DAPS for near-zero interruption conditional handover.

---
*Last updated: 2026-10-18*
