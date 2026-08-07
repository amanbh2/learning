# Interview Q&A: 5G Network Architecture

*(Companion to [Note 05](../05-5g-network-architecture.md))*

**Q: What is the primary difference between Standalone (SA) and Non-Standalone (NSA) 5G deployments?**
**A:** 
- **NSA (Non-Standalone):** The 5G gNB relies on the 4G EPC (Evolved Packet Core) and a 4G eNB (Master Node) for control plane signaling. The UE is dual-connected to both 4G and 5G (EN-DC). It is primarily used to provide higher data rates without upgrading the core network.
- **SA (Standalone):** The 5G gNB connects directly to the 5G Core (5GC). There is no dependency on the 4G network. It enables advanced 5G features like Network Slicing and URLLC.

**Q: Which interfaces connect the gNB to the 5G Core?**
**A:** 
- **NG-C:** Connects the gNB to the AMF for control plane signaling (using SCTP/NGAP).
- **NG-U:** Connects the gNB to the UPF for user plane data (using GTP-U).

**Q: What is the Xn interface used for?**
**A:** The Xn interface connects NG-RAN nodes (gNBs) to each other. It is primarily used for Xn-based handover (passing UE context and forwarding data to minimize packet loss) and Dual Connectivity operations.

**Q: In an NSA Option 3x deployment, which node handles the RRC connection to the UE?**
**A:** The 4G eNB (acting as the Master Node) handles the RRC connection and control plane signaling. The 5G gNB acts as a Secondary Node providing additional user plane bandwidth.


