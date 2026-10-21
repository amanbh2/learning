# Radio Bearers (SRBs and DRBs)

## Overview
A **Radio Bearer** is a logical data pipe between the UE and the gNB over the air interface. All data — whether it's an RRC handover command or a Netflix video stream — flows through a Radio Bearer. There are two types: Signaling Radio Bearers (SRBs) for control, and Data Radio Bearers (DRBs) for user data.

## 1. Signaling Radio Bearers (SRBs)

### SRB0 — The Bootstrap Bearer
- **Purpose:** Carries the very first RRC messages before any connection exists.
- **Messages carried:**
  - `RRCSetupRequest` (UE → gNB)
  - `RRCSetup` / `RRCReject` (gNB → UE)
  - `RRCReestablishmentRequest` (UE → gNB)
  - `RRCReestablishment` (gNB → UE)
  - `RRCSystemInfoRequest` (UE → gNB, for on-demand SI)
- **Logical Channel:** CCCH (Common Control Channel)
- **Transport Channel:** UL-SCH (uplink), DL-SCH (downlink)
- **Security:** ❌ None — plaintext, no ciphering, no integrity
- **PDCP/RLC Config:** No PDCP. RLC operates in **Transparent Mode (TM)** — no headers, no segmentation, no retransmissions.
- **When established:** Always available (pre-configured)

### SRB1 — The Primary Signaling Bearer
- **Purpose:** Carries all RRC messages (AS signaling) and the very first piggybacked NAS message.
- **Messages carried:**
  - `RRCSetupComplete` (contains piggybacked NAS: Registration Request)
  - `SecurityModeCommand` / `SecurityModeComplete`
  - `RRCReconfiguration` / `RRCReconfigurationComplete`
  - `MeasurementReport`
  - `ULInformationTransfer` (NAS containers, before SRB2 exists)
- **Logical Channel:** DCCH (Dedicated Control Channel)
- **Security:** ❌ Initially none → ✅ Ciphered + Integrity protected after AS Security Mode Command
- **PDCP/RLC Config:** PDCP with integrity + ciphering. RLC operates in **Acknowledged Mode (AM)** — guaranteed delivery.
- **When established:** During `RRCSetup` message
- **Priority:** **Higher than SRB2** — radio link management is more critical than core network signaling.

### SRB2 — The NAS Signaling Bearer
- **Purpose:** Dedicated bearer for NAS messages (between UE and AMF, transparent to gNB).
- **Messages carried:**
  - All NAS messages after security activation (Registration Accept, PDU Session Establishment, etc.)
  - Carried inside `DLInformationTransfer` / `ULInformationTransfer` RRC wrappers
- **Logical Channel:** DCCH
- **Security:** ✅ Always ciphered + integrity protected (only established after SMC)
- **PDCP/RLC Config:** Same as SRB1 — PDCP with security, RLC AM.
- **When established:** After AS Security activation, during the first `RRCReconfiguration`
- **Priority:** Lower than SRB1

### SRB3 — Direct Secondary Node Signaling (DC only)
- **Purpose:** Provides a direct RRC signaling path between the UE and the **Secondary Node (SN)** in Dual Connectivity (EN-DC or NR-DC). Without SRB3, all SN signaling must route through the Master Node.
- **Logical Channel:** DCCH
- **Security:** ✅ Ciphered + integrity protected (using SN-derived keys)
- **When established:** During SN Addition procedure

## 2. Data Radio Bearers (DRBs)

- **Purpose:** Carry user plane data (IP packets — browsing, streaming, VoNR voice).
- **Logical Channel:** DTCH (Dedicated Traffic Channel)
- **Security:** ✅ Ciphered. Integrity protection is optional (enabled for specific QoS flows).
- **PDCP/RLC Config:** PDCP with ROHC header compression + ciphering. RLC in **AM** (reliable) or **UM** (low-latency, for VoNR).
- **When established:** During PDU Session setup, via `RRCReconfiguration`.
- **Number:** A UE can have multiple DRBs simultaneously (one per QoS flow or group of flows).

## 3. Summary Table

| Bearer | Purpose | Logical Ch | RLC Mode | Security | Established |
|--------|---------|-----------|----------|----------|-------------|
| **SRB0** | Initial RRC | CCCH | TM | ❌ None | Pre-configured |
| **SRB1** | RRC signaling + early NAS | DCCH | AM | ✅ After SMC | RRC Setup |
| **SRB2** | Dedicated NAS | DCCH | AM | ✅ Always | After SMC |
| **SRB3** | Direct SN signaling (DC) | DCCH | AM | ✅ Always | SN Addition |
| **DRB** | User data (IP) | DTCH | AM or UM | ✅ Ciphered | PDU Session Setup |

## 4. The Channel Chain
How does an SRB1 message actually get transmitted?
```
RRC Message → SRB1 → DCCH (logical) → DL-SCH (transport) → PDSCH (physical)
```
How does an SRB0 message get transmitted?
```
RRC Setup Request → SRB0 → CCCH (logical) → UL-SCH (transport) → PUSCH (physical)
```

## 5. LTE vs 5G Comparison

| Aspect | LTE | 5G NR |
|--------|-----|-------|
| SRB0 | Same concept (CCCH) | Same |
| SRB1 | Same concept (DCCH) | Same |
| SRB2 | Same concept (DCCH) | Same |
| SRB3 | ❌ Does not exist | ✅ New — for DC direct SN signaling |
| DRB integrity | ❌ Never | ✅ Optional (new in 5G, critical for URLLC) |
| RLC modes | AM, UM, TM | AM, UM, TM (same concepts) |

## Interview Q&A

**Q: Why is SRB1 given higher scheduling priority than SRB2?**
**A:** SRB1 carries RRC messages that manage the radio link itself (handover commands, measurement configs, security activation). If the radio link is in danger, SRB1 messages must get through immediately. SRB2 carries NAS messages for the core network (session management, etc.), which are important but not as time-critical as keeping the radio link alive.

**Q: Can NAS messages be sent on SRB1?**
**A:** Yes, but only during initial setup. Before SRB2 is established (which requires AS security), the UE piggybacks its first NAS message (`Registration Request`) inside the `RRCSetupComplete` message, which is sent on SRB1. After SMC and SRB2 establishment, all NAS messages move to SRB2.

**Q: Why does SRB0 use RLC Transparent Mode?**
**A:** Because SRB0 carries messages before any connection context exists. There are no sequence numbers, no retransmission buffers, no PDCP layer — the UE has nothing set up yet. The message must be sent as-is. If it fails, the UE simply retries the RACH procedure.

**Q: Why was DRB integrity protection added in 5G but not in LTE?**
**A:** LTE was designed primarily for consumer broadband. 5G must support URLLC (industrial control, autonomous driving) where data integrity is safety-critical. A corrupted packet in a factory robot could cause physical harm. DRB integrity protection (at the PDCP layer) ensures data has not been tampered with.

---
*Last updated: 2026-08-08*
