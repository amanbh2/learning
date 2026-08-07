# Interview Q&A: O-RAN and Network Management

*(Companion to [Note 10](../10-o-ran-and-network-management.md))*

**Q: What is the fundamental difference between RRC (Radio Resource Control) and RRM (Radio Resource Management)?**
**A:** 
- **RRM** is the algorithmic decision-making engine. It constantly monitors cell load and interference. It makes decisions like "This cell is too congested, I must reject the next UE that tries to connect" or "This UE's signal is dropping, I need to hand it over to cell B."
- **RRC** is the protocol that actually executes those decisions. It generates the standardized 3GPP signaling messages (like `RRCReconfiguration`) and transmits them to the UE. 
- *Analogy:* RRM is the general making battle plans; RRC is the radio operator transmitting the orders to the troops.

**Q: When reading commercial gNB source code, you see a module called UECC. What is it, and why isn't it in the 3GPP specs?**
**A:** UECC (UE Control Client / UE Context Control) is a vendor-specific software module that lives in the CU-CP. 3GPP defines the external messages that go over the air, but it does not define how a vendor writes their internal C++ software. UECC is the state machine that manages the lifecycle of a specific UE. It allocates memory for the UE context, coordinates internally with RRM to see if the UE can attach, and triggers the RRC encoder module to build the actual 3GPP messages.

**Q: What is the purpose of the RIC (RAN Intelligent Controller) in the O-RAN architecture?**
**A:** In legacy networks, RRM and SON algorithms were closed-source and locked inside the vendor's proprietary base station software. The RIC extracts that intelligence into a separate, open server platform. It allows operators to install 3rd-party AI/ML applications (xApps/rApps) to intelligently optimize network performance (e.g., advanced AI load balancing) across different vendor equipment.

**Q: How does the RIC communicate with the CU and DU?**
**A:** The Near-Real-Time RIC communicates with the CU and DU using the **E2 interface**. The RIC uses E2 to subscribe to telemetry metrics from the gNB nodes, and then uses E2 to send policy commands back down to enforce its AI-driven decisions.

**Q: What is the O1 interface used for in O-RAN?**
**A:** The O1 interface connects all RAN nodes (CU, DU, RU) to the centralized Service Management and Orchestration (SMO) framework. It is used for standard OAM (Operations, Administration, and Maintenance) tasks like configuring the node, reading performance counters, and reporting hardware alarms.
