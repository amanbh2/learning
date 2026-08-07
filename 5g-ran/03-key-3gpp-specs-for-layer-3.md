# Key 3GPP Specifications for Layer 3 Engineers

## Overview
While 38.300 provides the high-level architecture of the 5G NR radio access network, a Layer 3 / RRM engineer spends most of their time in specific protocol and interface specifications. This note breaks down the 38.3xx series (Layer 2 and Layer 3), 38.4xx series (Interfaces), and 24.xxx series (NAS), detailing what each covers.

## Content

### The 38.3xx Series: Layer 2 and Layer 3 Radio Protocols

The `38.3xx` series is the bible for the RAN control plane. 

| Specification | Layer     | What it covers                                            | Why L3 engineers care                                                                                                                                                   |
| ------------- | --------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TS 38.300** | Overall   | Overall description of NG-RAN architecture and protocols. | The "entry point" spec. Explains concepts like CUPS, QoS framework, and high-level procedures before diving into ASN.1.                                                 |
| **TS 38.304** | Idle Mode | UE procedures in Idle mode and RRC Inactive state.        | Cell selection, cell reselection criteria (S-criteria, R-criteria), and paging reception rules. Critical for mobility optimization.                                     |
| **TS 38.306** | UE Caps   | User Equipment (UE) radio access capabilities.            | Defines how the UE reports its feature support (e.g., band combinations, MIMO layers, RedCap support) via `UECapabilityInformation`.                                    |
| **TS 38.321** | MAC       | Medium Access Control protocol.                           | Even though it's L2, L3 engineers must know MAC CEs (BSR, PHR, TA) because RRC configures how MAC behaves (e.g., DRX timers, SR configs).                               |
| **TS 38.322** | RLC       | Radio Link Control protocol.                              | AM/UM/TM modes. RRC configures `t-Reassembly` and `maxRetxThreshold` (which triggers RLF if exceeded).                                                                  |
| **TS 38.323** | PDCP      | Packet Data Convergence Protocol.                         | ROHC, ciphering, integrity protection, and SN sizes. Critical for handover data forwarding behaviors.                                                                   |
| **TS 38.324** | SDAP      | Service Data Adaptation Protocol.                         | QoS flow to DRB mapping and reflective QoS. Bridges the 5GC QoS model to the radio bearers.                                                                             |
| **TS 38.331** | RRC       | Radio Resource Control protocol.                          | **The absolute core for L3.** Contains the exact ASN.1 definitions of all RRC messages (SIBs, RRCReconfiguration), timers (T310, T304), and measurement events (A1-A6). |

### The 38.4xx Series: NG-RAN Interfaces

Layer 3 engineers debug call traces, meaning you must understand the signaling on the wire between nodes.

| Specification | Interface | What it covers | Why L3 engineers care |
|---------------|-----------|----------------|------------------------|
| **TS 38.413** | NGAP (N2) | NG Application Protocol (gNB ↔ AMF). | Initial UE messages, PDU session resource setup, NG-based handover signaling, and paging from the core. |
| **TS 38.423** | XnAP (Xn) | Xn Application Protocol (gNB ↔ gNB). | Xn handover preparation (Handover Request/Acknowledge), UE context retrieval during RRC Resume, and dual connectivity (SN Addition/Modification). |
| **TS 38.473** | F1AP (F1) | F1 Application Protocol (CU ↔ DU). | In a disaggregated gNB, RRC is in the CU, but MAC/PHY is in the DU. F1AP carries `UE Context Setup` and encapsulates RRC messages to be sent over the air. |
| **TS 38.463** | E1AP (E1) | E1 Application Protocol (CU-CP ↔ CU-UP). | Bearer context management. The CU-CP tells the CU-UP how to handle the user plane (encryption keys, QoS). |

### The 24.xxx Series: Non-Access Stratum (NAS)

RRC carries NAS messages as opaque payloads. As a Layer 3 engineer, you must know what the UE and AMF are saying to each other.

| Specification | Protocol | What it covers | Why L3 engineers care |
|---------------|----------|----------------|------------------------|
| **TS 24.501** | 5GMM / 5GSM | 5G NAS protocol for EPS and 5GS. | Registration, PDU Session Establishment, Authentication, and 5G Mobility Management state machines. |

### The 36.xxx Series: LTE Equivalents (Crucial for NSA / EN-DC)

Because NSA (Option 3x) uses LTE as the master node, you still need the LTE specs.
- **TS 36.331**: LTE RRC (Contains the `RRCConnectionReconfiguration` that encapsulates the 5G `RRCReconfiguration` in EN-DC).
- **TS 36.323 / 36.322 / 36.321**: LTE PDCP/RLC/MAC.

### The 38.1xx / 38.2xx Series (Honorable Mention for L3)

While these are PHY / RF specs, L3 engineers need them for configuration parameters.
- **TS 38.133**: Requirements for support of RRM. Defines *exactly* how long a UE has to measure a neighbor cell, or how long a handover should take (interruption times). Very important for L3 mobility KPI debugging.
- **TS 38.213**: Physical layer procedures for control. Defines RACH procedures, PUCCH resource allocation, and HARQ timing, which you configure via RRC.

## Key Takeaways
- **38.331 (RRC)** and **38.413 (NGAP)** are the most critical specifications for a 5G Layer 3 engineer. 
- You do not read these front-to-back. You search them by ASN.1 message name (e.g., `MeasurementReport`) or procedure (e.g., `5.3.5 RRC reconfiguration`).
- When debugging mobility, you must cross-reference **38.331** (for the RRC triggers) with **38.133** (for the physical execution time limits and RRM requirements).

---
*Last updated: 2026-08-04*
