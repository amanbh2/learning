# 5G Interfaces Deep Dive

## Overview
A 5G network is essentially a collection of network functions (nodes) communicating over standardized interfaces. Understanding these interfaces and their protocol stacks is fundamental to troubleshooting and tracing call flows.

## 1. Interface Summary Map

| Interface | Connects | Purpose | Protocol |
|-----------|----------|---------|----------|
| **NG-C (N2)** | gNB ↔ AMF | Control Plane to the Core. Mobility, session management. | NGAP over SCTP |
| **NG-U (N3)** | gNB ↔ UPF | User Plane to the Core. Data payload. | GTP-U over UDP |
| **Xn-C** | gNB ↔ gNB | Inter-gNB Control Plane. Handover preparation, Dual Connectivity. | XnAP over SCTP |
| **Xn-U** | gNB ↔ gNB | Inter-gNB User Plane. Data forwarding during handover. | GTP-U over UDP |
| **F1-C** | CU-CP ↔ DU | Internal Control Plane. DU management, UE context setup. | F1AP over SCTP |
| **F1-U** | CU-UP ↔ DU | Internal User Plane. Data transfer from PDCP to RLC. | GTP-U over UDP |
| **E1** | CU-CP ↔ CU-UP | Control Plane for the UP. Bearer context management. | E1AP over SCTP |
| **Uu** | UE ↔ gNB | The Air Interface. | RRC, PHY/MAC/RLC/PDCP/SDAP |

## 2. SCTP (Stream Control Transmission Protocol)
In 5G, **all terrestrial Control Plane interfaces (NG-C, Xn-C, F1-C, E1) use SCTP** at the transport layer, not TCP or UDP.

### Why SCTP?
1. **Multi-homing:** An SCTP association can be bound to multiple IP addresses on both ends. If the primary IP/link fails, SCTP seamlessly fails over to the backup IP without dropping the connection. (Crucial for high availability).
2. **Multi-streaming:** SCTP allows multiple independent streams within one connection. If one message is dropped in Stream 1, it only blocks Stream 1 (no Head-of-Line blocking). Stream 2 continues unaffected.
3. **Message-oriented:** Like UDP, it preserves message boundaries (unlike TCP which is a continuous byte stream), making it easier to parse discrete signaling messages (like ASN.1 encoded NGAP).

## 3. GTP-U (GPRS Tunnelling Protocol - User Plane)
In 5G, **all terrestrial User Plane interfaces (NG-U, Xn-U, F1-U) use GTP-U over UDP**.

### Why GTP-U?
It encapsulates IP packets (from the user) inside another IP/UDP header (from the network) so they can be routed between network nodes. 
Every GTP-U header contains a **TEID (Tunnel Endpoint Identifier)**. This TEID tells the receiving node exactly which UE and which specific Radio Bearer this data packet belongs to.

## 4. Tracing a Packet via TEIDs

When you download a file, the data traverses multiple GTP-U tunnels. Each node allocates its own incoming TEID and tells the sender to use it.
- **UPF** allocates a TEID for NG-U downlink. It tells the gNB (CU-UP).
- **CU-UP** allocates a TEID for NG-U uplink, and another for F1-U downlink.
- **DU** allocates a TEID for F1-U uplink.

During a call flow (e.g., Initial Attach), you will see TEIDs being exchanged in the Control Plane messages (like F1AP UE Context Setup, or E1AP Bearer Context Setup) so the User Plane can be established.

## Interview Q&A

**Q: What transport protocol is used for Xn-C and why?**
**A:** SCTP over IP. SCTP provides reliable, message-oriented delivery with multi-homing (for link redundancy) and multi-streaming (to prevent head-of-line blocking).

**Q: How does a gNB differentiate data packets for 1,000 different UEs arriving on the same IP port from the UPF?**
**A:** Using the TEID (Tunnel Endpoint Identifier) in the GTP-U header. The UPF embeds a specific TEID assigned to a specific UE's QoS flow, and the gNB uses that TEID to map the packet to the correct PDCP entity and Data Radio Bearer (DRB).

**Q: In NSA (Option 3x), what is the interface between the 4G eNB and 5G gNB called?**
**A:** The **X2** interface. It uses X2AP. Xn is only used between two 5G gNBs, or between an eNB and gNB connected to the 5G Core.

---
*Last updated: 2026-08-08*
