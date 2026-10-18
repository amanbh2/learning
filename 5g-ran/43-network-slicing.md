# Network Slicing in NG-RAN

## Overview
Network Slicing is the hallmark feature of 5G Standalone (SA). It allows operators to carve a single physical network into multiple, logically isolated, end-to-end virtual networks (slices). Each slice is tailored to fulfill a specific set of requirements (e.g., eMBB, URLLC, mMTC).

## 1. What is an S-NSSAI?
A slice is identified by an **S-NSSAI (Single Network Slice Selection Assistance Information)**.
It consists of two parts:
1. **SST (Slice/Service Type):** 8-bit integer defining the expected behavior.
   - `1`: eMBB (Enhanced Mobile Broadband)
   - `2`: URLLC (Ultra-Reliable Low Latency Communications)
   - `3`: MIoT (Massive IoT)
2. **SD (Slice Differentiator):** 24-bit optional field to differentiate between multiple slices of the same SST (e.g., "eMBB for Police" vs "eMBB for Public").

## 2. Slicing at the RAN Level

While the Core Network handles slice authentication and routing (via AMF and SMF), the RAN is responsible for **Resource Isolation**.

If a gNB supports Slice A (URLLC for automated driving) and Slice B (eMBB for Netflix), it must ensure that a massive Netflix download on Slice B does not delay a critical braking signal on Slice A.

### How the gNB enforces slicing:
1. **Admission Control:** The gNB can reject RRC connection setups for a specific slice if its resources are depleted, while still accepting connections for a high-priority slice.
2. **PRB (Physical Resource Block) Isolation:** The MAC scheduler can implement "Hard Slicing" (strictly reserving 20% of PRBs for Slice A) or "Soft Slicing" (allowing Slice B to use Slice A's PRBs if A is idle, but preempting B immediately when A needs them).
3. **Dedicated Hardware:** In O-RAN setups, an operator might run the CU-UP for Slice A on a bare-metal server for zero latency, while the CU-UP for Slice B runs in a centralized public cloud.

## 3. UE Attach Flow with Slicing

1. **RRCSetupComplete:** When the UE first attaches, it may include a `Requested NSSAI` (list of slices it wants) in its NAS message, encapsulated in `RRCSetupComplete`.
2. **NGAP Initial UE Message:** The gNB forwards this to the AMF.
3. **AMF Validation:** The AMF checks the UE's subscription. It selects the allowed slices.
4. **NGAP Initial Context Setup Request:** The AMF sends the `Allowed NSSAI` back to the gNB.
5. **PDU Session Setup:** When the UE requests a data session, it specifies the S-NSSAI. The gNB creates radio bearers (DRBs) bound to that specific slice.

## LTE vs 5G Comparison

| Aspect | LTE | 5G NR |
|--------|-----|-------|
| Slicing Support | ❌ No (used APNs and DECOR, not true isolation) | ✅ Yes (S-NSSAI, end-to-end isolation) |
| Architecture dependency | N/A | Requires 5G Core (SA). Cannot work in NSA. |

## Interview Q&A

**Q: Can Network Slicing be implemented in an NSA (Option 3x) deployment?**
**A:** No. Network Slicing is an end-to-end architecture that relies fundamentally on the 5G Core (AMF, SMF, UPF). Because NSA uses the 4G EPC (MME, SGW), it cannot support true Network Slicing. 

**Q: How does the MAC layer handle resource allocation between a URLLC slice and an eMBB slice?**
**A:** The MAC scheduler uses prioritization algorithms. When a URLLC packet arrives, it must be transmitted immediately (often within 1ms). The scheduler will preempt (interrupt) any ongoing eMBB transmissions, allocating the next available PRBs to the URLLC slice to ensure its strict packet delay budget is met.

**Q: If a UE is connected to two different slices simultaneously, do they share the same DRB?**
**A:** No. A Data Radio Bearer (DRB) is strictly bound to one specific PDU Session, and a PDU Session is bound to one specific S-NSSAI. Therefore, traffic from different slices will always travel over completely separate DRBs over the air interface.

---
*Last updated: 2026-08-08*
