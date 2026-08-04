# CU-CP Resiliency & High Availability (HA)

## Overview
High Availability (HA) and resiliency in the 5G RAN, specifically focusing on the Central Unit - Control Plane (CU-CP). This note covers the architectural challenges of running multiple CU-CP instances (Active/Standby or Active/Active), state synchronization, SCTP handling, and how it fits into modern cloud-native vRAN/O-RAN deployments.

## Content

### 1. Where Does This Fit in the Architecture?
In the 3GPP/O-RAN split architecture, the **CU-CP** is the absolute brain of the gNB. It terminates:
- **RRC** (Radio Resource Control) for all UEs.
- **NGAP** (to the AMF in the 5G Core).
- **F1AP** (to all connected DUs).
- **E1AP** (to all connected CU-UPs).
- **XnAP** (to neighbor gNBs for mobility).

Because it holds the control plane state for thousands of UEs and manages multiple critical interfaces, a CU-CP failure without HA means a massive outage (all UEs drop, all DUs disconnect).

In our syllabus, this fits squarely under **Topic 1.2 (gNB Architecture & Functional Split)** and touches heavily on cloud-native deployments.

### 2. The Core Challenge of CU-CP HA
If you are bringing up two CU-CPs for a PoC, you are tackling the hardest problem in disaggregated RAN: **State Management**.

Unlike a stateless web server, a CU-CP is highly stateful. It maintains:
- **UE Contexts:** Security keys (K_gNB), DRB configurations, measurement configurations, current RRC state (CONNECTED/INACTIVE).
- **Interface State:** SCTP associations with AMF, DUs, and CU-UPs. F1/E1 setup configurations.

If CU-CP "A" dies and CU-CP "B" takes over, "B" must instantly know the state of every UE and every interface, or else all calls drop.

### 3. HA Architectures

#### A. Active/Standby (Traditional Telco approach)
- **How it works:** One CU-CP processes all traffic. The other sits idle, receiving continuous state updates.
- **State Sync:** The Active node synchronously or asynchronously replicates UE contexts and call states to the Standby node via a dedicated synchronization link.
- **Failover:** If Active dies, Standby assumes the VIP (Virtual IP) using protocols like VRRP/Keepalived or BGP. 
- **The Catch:** Synchronous replication adds latency to every RRC procedure. Asynchronous replication risks losing the last few messages if a crash happens, leading to "hanging" UEs that the new Active node thinks are in a different state.

#### B. Active/Active (Cloud-Native / Stateless approach)
- **How it works:** Both CU-CP instances actively process traffic simultaneously.
- **State Sync:** The CU-CP application itself is made "stateless." State is pushed out to an ultra-fast, distributed In-Memory Data Grid (IMDG) or Key-Value store (e.g., Redis). 
- **Failover:** If a pod dies, Kubernetes just routes the next F1AP/NGAP message to a surviving pod. The surviving pod pulls the UE context from the external database, processes the message, and writes the new state back.
- **The Catch:** Latency to the external DB must be sub-millisecond, otherwise tight timers (like Handover preparation) will expire.

### 4. Handling SCTP in HA Scenarios

SCTP (Stream Control Transmission Protocol) is the transport for NGAP, F1AP, E1AP, and XnAP. It is very sensitive to endpoint failures. When doing a two-CU-CP PoC, you must handle the SCTP connection behavior:

1. **SCTP Multi-homing:** SCTP natively supports binding multiple IP addresses to a single association. The DU connects to `IP1` (CU-CP A) and `IP2` (CU-CP B). If the path to `IP1` fails, SCTP switches to `IP2` without dropping the association. However, this only handles *path* failure, not application crash. If CU-CP A crashes, the association still drops unless state is shared perfectly.
2. **Transparent Failover (Virtual IP):** The DU connects to a Virtual IP. When CU-CP A crashes, CU-CP B takes over the IP. But because SCTP uses sequence numbers and connection chunks, the OS kernel on CU-CP B doesn't have the SCTP socket state. The association will drop, and the DU will attempt to reconnect.
3. **The Reality:** In most Active/Standby PoCs, a failover causes a brief SCTP drop. The DUs, CU-UPs, and AMFs detect the drop and immediately reconnect. The real test of your PoC is: **When the DU reconnects to the new CU-CP, does the new CU-CP remember the UEs, or does it force a full network re-attach?**

### 5. What to test in your PoC

If you are bringing up two CU-CPs, here is how you prove your HA works (the interview/expert level test plan):

- **F1 Setup Survival:** Kill the active CU-CP. Verify the DU reconnects and the F1 Setup procedure completes quickly without manual intervention.
- **UE Context Survival (Idle):** Kill the active CU-CP. Page a UE in RRC_IDLE. The standby CU-CP should know the UE exists and successfully complete the RRC Connection.
- **UE Context Survival (Connected):** While a UE is actively downloading data (or in a VoNR call), kill the active CU-CP. 
    - *Expected behavior if perfect HA:* The call barely stutters. The new CU-CP takes over the F1-C and E1-C links, the CU-UP continues forwarding data untouched.
    - *Expected behavior if basic HA:* The UE drops to idle (RRC Connection Release) and immediately reconnects, but doesn't have to fully re-register with the AMF.
- **Split Brain:** Break the network link *between* the two CU-CPs so they can't see each other, but both can see the DU. Ensure you don't end up with two active CU-CPs fighting over the same F1AP connection.

## Key Takeaways
- CU-CP HA is fundamentally a **state management and synchronization** problem.
- In modern vRAN, this is moving from monolithic Active/Standby VMs to cloud-native Active/Active microservices using external state databases.
- SCTP behavior during failover dictates the user experience. The goal is to preserve UE contexts so that an SCTP reconnect doesn't force a UE network re-attach.
- The beauty of the 3GPP split is that the user plane (CU-UP and DU PHY/MAC) can theoretically continue pumping data for a few seconds even while the CU-CP crashes and restarts, *if* the state is preserved.

---
*Last updated: 2026-07-27*
