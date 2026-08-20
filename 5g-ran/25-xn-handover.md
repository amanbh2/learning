# Xn Handover (Inter-gNB)

## Overview
Xn Handover is the primary inter-gNB handover mechanism in 5G. The source gNB communicates directly with the target gNB over the Xn interface. The AMF is only notified *after* the handover succeeds (Path Switch). This is the equivalent of LTE's X2 Handover.

## 1. Complete Call Flow

```plantuml
@startuml
skinparam backgroundColor white
participant "UE" as UE
participant "Source gNB" as SRC
participant "Target gNB" as TGT
participant "AMF" as AMF

== Preparation Phase ==
UE -> SRC : **MeasurementReport** (Event A3 triggered)
note right: "Target cell PCI 120 is\nbetter than serving by 3dB"
SRC -> TGT : **XnAP: Handover Request**
note left
  Contains:
  • Cause (e.g., handover desirable for radio reasons)
  • UE Context: security keys (K_gNB*), UE capabilities,
    PDU Session resources, AMBR
  • Source-to-Target Transparent Container:
    RRC Reconfiguration (handover command for UE)
end note
TGT -> TGT : Admission Control\n(can I accept this UE?)
TGT -> SRC : **XnAP: Handover Request Acknowledge**
note right
  Contains:
  • Admitted PDU Sessions
  • Target-to-Source Transparent Container:
    **RRCReconfiguration with reconfigurationWithSync**
    (target cell config, CFRA preamble, T304)
  • DL forwarding GTP-U tunnel info
end note

== Execution Phase ==
SRC -> UE : **RRCReconfiguration** (Handover Command)
note right
  Contains:
  • reconfigurationWithSync:
    - Target cell config (PCI, freq, SSB)
    - CFRA preamble (dedicated, no contention)
    - **T304** timer started by UE
    - New C-RNTI for target cell
end note

SRC -> TGT : **XnAP: SN Status Transfer**
note left: PDCP SN and HFN for each DRB\n(so target can continue sequence)
SRC -> TGT : **Data Forwarding** (GTP-U)
note left: Buffered DL data forwarded to target\nto minimize packet loss

UE -> TGT : **CFRA RACH** (Msg1 with dedicated preamble)
TGT -> UE : **RAR** (Msg2: TA + UL Grant)
UE -> TGT : **RRCReconfigurationComplete**
note right: T304 stopped. Handover successful.

== Completion Phase ==
TGT -> AMF : **NGAP: Path Switch Request**
note left: "UE is now at my cell.\nPlease update the core path."
AMF -> TGT : **NGAP: Path Switch Request Acknowledge**
note right: AMF updates UPF with new\nGTP-U tunnel endpoints
TGT -> SRC : **XnAP: UE Context Release**
note left: Source releases UE context\nand frees radio resources
@enduml
```

## 2. Phase-by-Phase Breakdown

### Preparation Phase
| Step | Message | Key Content | Purpose |
|------|---------|-------------|---------|
| 1 | MeasurementReport | Event A3 + target PCI + RSRP/RSRQ/SINR | UE tells source: "neighbor is better" |
| 2 | XnAP: Handover Request | UE context, security, PDU sessions | Source asks target: "can you take this UE?" |
| 3 | XnAP: Handover Request Ack | Target cell config, CFRA preamble, forwarding tunnels | Target says: "yes, here is the config for the UE" |

### Execution Phase
| Step | Message | Key Content | Purpose |
|------|---------|-------------|---------|
| 4 | RRCReconfiguration (HO cmd) | `reconfigurationWithSync` with target config | Source commands UE: "switch to target cell NOW" |
| 5 | SN Status Transfer | PDCP SN/HFN per DRB | Ensures no data duplication or loss |
| 6 | Data Forwarding | Buffered DL packets via GTP-U | Minimizes packet loss during HO |
| 7 | CFRA RACH on target | Dedicated preamble (Msg1) → RAR (Msg2) | UE synchronizes with target cell |
| 8 | RRCReconfigurationComplete | — | UE confirms: "I'm on the target cell" |

### Completion Phase
| Step | Message | Key Content | Purpose |
|------|---------|-------------|---------|
| 9 | NGAP: Path Switch Request | Target cell NCGI, new GTP-U tunnels | Tell AMF to redirect core traffic to target |
| 10 | Path Switch Request Ack | Updated security keys | AMF confirms path update |
| 11 | XnAP: UE Context Release | — | Source cleans up UE resources |

## 3. What is `reconfigurationWithSync`?
This is the IE inside `RRCReconfiguration` that makes it a "handover command." It contains:
- `newUE-Identity`: New C-RNTI at the target cell
- `t304`: Handover timer (if it expires → HO failure)
- `physCellId`: Target PCI
- `rach-ConfigDedicated`: CFRA preamble assignment
- `spCellConfigCommon`: Full target cell PHY config (frequency, SSB, BWP)

## 4. LTE vs 5G Comparison

| Aspect | LTE (X2 Handover) | 5G (Xn Handover) |
|--------|-------------------|-------------------|
| Interface | X2 (X2AP) | Xn (XnAP) |
| Core notification | Path Switch via S1AP | Path Switch via NGAP |
| HO command IE | `mobilityControlInfo` | `reconfigurationWithSync` |
| Beam management | ❌ Not needed | ✅ CFRA preamble mapped to SSB beam |
| Data forwarding | ✅ via X2-U | ✅ via Xn-U |

## Interview Q&A

**Q: Why is Xn Handover preferred over N2 Handover?**
**A:** Xn Handover is faster because the source and target gNBs communicate directly over the Xn interface. The AMF is only involved *after* the handover succeeds (Path Switch). In N2 Handover, ALL preparation signaling goes through the AMF, adding latency and core network load.

**Q: What happens if T304 expires during handover?**
**A:** T304 expiry = Handover Failure. The UE:
1. Declares the handover as failed
2. Starts T311 (RLF recovery timer)
3. Searches for any suitable cell (could be source, target, or third cell)
4. Sends `RRCReestablishmentRequest` to that cell
5. If re-establishment succeeds → connection recovered. If T311 expires → UE goes to IDLE.

**Q: What is SN Status Transfer and why is it needed?**
**A:** The PDCP layer uses sequence numbers for each DRB. When the UE hands over, the target gNB must know the exact PDCP SN where the source left off, so it can continue the sequence without duplicating or losing packets. The source sends the current PDCP SN and Hyper Frame Number (HFN) per DRB in the SN Status Transfer.

---
*Last updated: 2026-08-08*
