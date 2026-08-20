# 5G QoS Architecture (SDAP & QFI)

## Overview
Quality of Service (QoS) in 5G represents a fundamental shift from LTE. LTE used a rigid, bearer-based QoS model. 5G uses a highly flexible, **Flow-based QoS model** managed by the **SDAP** (Service Data Adaptation Protocol) layer in the RAN.

## 1. Flow-Based vs Bearer-Based QoS

| Aspect | LTE (Bearer-Based) | 5G (Flow-Based) |
|--------|--------------------|-----------------|
| Granularity | EPS Bearer | QoS Flow |
| Identifier | E-RAB ID | QFI (QoS Flow Identifier) |
| Core to RAN mapping | 1:1 mapping (One EPC bearer = One Radio Bearer) | N:1 mapping (Multiple QoS Flows mapped to one Radio Bearer) |
| Protocol in RAN | PDCP handles QoS mapping | **SDAP** introduced for QoS mapping |

## 2. 5G QoS Core Concepts

### QoS Flow
The finest granularity of QoS differentiation in a PDU session. Every IP packet from the internet is classified by the UPF into a QoS Flow.
- **GBR (Guaranteed Bit Rate):** Strict bandwidth reservation (e.g., Voice, URLLC).
- **Non-GBR:** Best-effort traffic (e.g., Web browsing).
- **Delay Critical GBR:** Extremely low latency (e.g., V2X, factory automation).

### 5QI (5G QoS Identifier)
A scalar value (e.g., 1, 9, 83) that acts as a pointer to a specific set of QoS characteristics:
- Resource Type (GBR, Non-GBR)
- Priority Level
- Packet Delay Budget (PDB)
- Packet Error Rate (PER)

*Example:* 5QI = 1 is for Conversational Voice. 5QI = 9 is for Default Internet.

### QFI (QoS Flow Identifier)
An integer that identifies a QoS flow within a specific PDU session. The UPF inserts the QFI into the GTP-U header of every downlink packet.

## 3. The SDAP Layer's Role

The SDAP layer sits at the top of the AS protocol stack (in the CU-UP). Its primary job is **mapping**.

1. The UPF sends a packet over NG-U. The GTP-U header contains the `QFI` (e.g., QFI=5 for video streaming).
2. The packet arrives at the SDAP layer in the gNB.
3. The SDAP layer looks up its configured mapping rules.
4. SDAP maps this packet to a specific **Data Radio Bearer (DRB)** (e.g., DRB 2).
5. SDAP adds an **SDAP Header** (containing the QFI) to the packet and passes it to PDCP.

### Reflective QoS
A powerful 5G feature. Instead of the gNB explicitly sending an `RRCReconfiguration` to tell the UE how to map uplink traffic, the UE simply "reflects" what it sees in the downlink.
- UE receives a DL packet on DRB 2 with an SDAP header showing QFI 5.
- UE learns: "Ah, QFI 5 traffic should be sent uplink on DRB 2."
- This saves immense amounts of RRC signaling.

## Interview Q&A

**Q: Why was the SDAP layer introduced in 5G?**
**A:** LTE had a 1:1 mapping between Core bearers and Radio bearers, so no translation layer was needed. 5G uses a flow-based architecture in the Core (QoS Flows) but still uses Bearers over the air. SDAP is required to bridge this gap, mapping multiple QoS Flows (identified by QFI) into appropriate Data Radio Bearers (DRBs) based on their QoS requirements.

**Q: What is the difference between 5QI and QFI?**
**A:** 5QI defines the *characteristics* of the QoS (the delay budget, priority, error rate). QFI is just a dynamic *identifier* used to tag packets within a specific PDU session so the gNB knows which QoS rules to apply. Multiple QFIs can point to the same 5QI.

**Q: How does the UPF mark downlink packets so the gNB knows their QoS priority?**
**A:** The UPF embeds the QFI (QoS Flow Identifier) directly into the GTP-U extension header before sending the packet over the NG-U interface.

---
*Last updated: 2026-08-08*
