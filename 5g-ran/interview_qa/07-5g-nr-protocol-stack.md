# Interview Q&A: 5G NR Protocol Stack (L1, L2, L3)

*(Companion to [Note 07](../07-5g-nr-protocol-stack.md))*

**Q: Explain the flow of a user data packet through the 5G NR L2 protocol stack from top to bottom.**
**A:** When a user plane IP packet enters the gNB from the core network, it passes through Layer 2 in this order:
1. **SDAP (Service Data Adaptation Protocol):** Evaluates the QoS Flow ID and maps the packet to the appropriate Data Radio Bearer (DRB).
2. **PDCP (Packet Data Convergence Protocol):** Encrypts the packet, applies integrity protection, and adds a sequence number.
3. **RLC (Radio Link Control):** Segments the packet if it's too large for the MAC transport block, and queues it up. (It also handles ARQ retransmissions if previous packets failed).
4. **MAC (Medium Access Control):** The scheduler decides exactly when to transmit the packet, multiplexes it with other traffic, and passes it to the PHY layer.

**Q: Which protocol layer is completely new in 5G compared to 4G LTE, and why was it introduced?**
**A:** The **SDAP (Service Data Adaptation Protocol)** layer is new in 5G. It was introduced because 5G changed how Quality of Service (QoS) is handled. 4G LTE mapped QoS directly to rigid "EPS Bearers" in the core. 5G introduced a much more granular "QoS Flow" system in the 5G Core. The SDAP layer was created in the RAN specifically to map these new 5G Core QoS Flows down into the Radio Bearers.

**Q: In which layer does HARQ (Hybrid ARQ) operate, and in which layer does standard ARQ operate?**
**A:** This is a classic trick question to test L2 knowledge:
- **HARQ (Hybrid ARQ)** operates at the **MAC layer**. It is extremely fast, operating at the physical millisecond scheduling level to correct minor radio errors using soft-combining.
- **ARQ (Automatic Repeat Request)** operates at the **RLC layer**. It is slightly slower but highly reliable, re-requesting missing segments if HARQ fails to recover them.

**Q: Is RRC present in the User Plane?**
**A:** No. RRC (Radio Resource Control) is strictly a Layer 3 **Control Plane** protocol. It handles signaling and configuration, never user data (like web browsing or video streaming).

**Q: How does the protocol stack differ when an NB-IoT device transmits data compared to a standard 5G smartphone?**
**A:** Because NB-IoT data payloads are exceptionally small, pushing them through the full User Plane stack (SDAP/PDCP/RLC/MAC) is highly inefficient. Instead, NB-IoT often uses **Data over NAS (DoNAS)** via Control Plane CIoT EPS Optimization. The device encrypts the tiny data payload inside an RRC/NAS signaling message, entirely bypassing the User Plane data bearers. Therefore, SDAP is absent and User Plane PDCP is bypassed.
