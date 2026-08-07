# Interview Q&A: CU-DU Separation (F1 Interface)

*(Companion to [Note 08](../08-cu-du-separation.md))*

**Q: In the 5G NR architecture, what is the functional split between the CU and the DU? Which 3GPP Option defines this?**
**A:** The 5G gNB is split into a Central Unit (CU) and a Distributed Unit (DU) based on **3GPP Split Option 2**. 
- The split occurs exactly between the PDCP and RLC layers.
- The **CU** hosts the higher-layer protocols: RRC, SDAP, and PDCP.
- The **DU** hosts the lower-layer, real-time protocols: RLC, MAC, and PHY.

**Q: What is the F1 interface, and what are its two components?**
**A:** The F1 interface connects the gNB-CU to the gNB-DU. It is divided into:
- **F1-C (Control Plane):** Uses SCTP and carries F1AP messages (for cell management and transporting RRC messages).
- **F1-U (User Plane):** Uses GTP-U over UDP and carries the actual user data (PDCP PDUs).

**Q: Why was the gNB split into a CU and DU rather than keeping it as a monolithic node like the LTE eNB?**
**A:** 
1. **Virtualization/Cloudification:** The heavy control-plane logic (RRC) and packet processing (PDCP ciphering) in the CU are not strictly time-sensitive, meaning they can be virtualized and run on standard cloud servers in a regional data center.
2. **Coordination:** A single centralized CU can manage multiple DUs, improving coordination for Carrier Aggregation and Dual Connectivity.
3. **Cost Reduction:** DUs only handle the real-time MAC/PHY tasks, making them cheaper to deploy in high volumes at cell sites.

**Q: Does a DU generate RRC messages?**
**A:** No. The RRC protocol resides entirely in the CU. When the CU generates an RRC message (e.g., an RRCReconfiguration), it sends it over the F1-C interface down to the DU. The DU simply treats it as a payload, passing it down through RLC, MAC, and PHY to transmit it over the air to the UE.

**Q: 3GPP evaluated 8 different options for splitting the protocol stack. What are Option 2 and Option 7?**
**A:** 
- **Option 2:** Splits the stack between PDCP and RLC. This is the 3GPP-standardized split between the **CU and DU**.
- **Option 7:** Splits the stack intra-PHY (between high-PHY and low-PHY). This is the O-RAN standardized split between the **DU and RU (Radio Unit)**.

**Q: Why is the architecture designed so that one CU can connect to dozens of DUs? Doesn't that just complicate the gNB?**
**A:** Having one CU manage multiple DUs provides two massive advantages:
1. **Mobility Masking:** If a UE moves between two DUs controlled by the same CU, the CU executes an "Intra-CU Handover" using F1AP. The 5G Core is completely unaware, preventing signaling storms in the core network.
2. **Coordination:** A single CU can easily aggregate data streams across multiple DUs, allowing a UE to maintain Dual Connectivity (receiving data from two different cell sites simultaneously) with centralized PDCP ciphering and routing.

**Q: In commercial gNB software, you often see a "DU Manager" or "CU Manager" module, but these aren't in the 3GPP specs. What are they?**
**A:** 3GPP defines the communication protocols (RRC, PDCP, RLC) but not how the software itself is operated. "Managers" are vendor-specific OAM (Operations, Administration, and Maintenance) modules. They handle booting the software, managing Kubernetes pods/containers, hardware alarms, and communicating with the centralized Network Management System (NMS). They are mandatory for a real-world deployment, even if they aren't standard 3GPP protocols.

**Q: You are looking at a 5G gNB's protocol stack in an NSA (Non-Standalone) deployment, and the SDAP layer is completely missing. Why?**
**A:** The SDAP (Service Data Adaptation Protocol) layer's sole purpose is to map 5G QoS flows to Data Radio Bearers (DRBs). In an NSA Option 3x deployment, the gNB is connected to the 4G Core (EPC). The EPC uses EPS bearers, not 5G QoS flows. Therefore, the SDAP layer has no function in NSA mode and is often bypassed or absent. It only activates in SA (Standalone) mode when connected to the 5GC.
