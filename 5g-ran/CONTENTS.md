# 5G RAN Syllabus

This directory covers deep, interview-level knowledge of 5G Radio Access Network (RAN), with a special focus on the RRC Layer, CU architecture, and critical mobility flows. Notes are ordered as a **chronological narrative** — from gNB boot to UE attach to handover to failure recovery.

## Phase 0: Foundation
> *"What is 5G and how did we get here?"*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 01 | [Market Trends and Features](./01-market-trends-and-features.md) | Medium | 5G Triangles, MOCN, CHO, RedCap, NTN | Completed |
| 02 | [3GPP Organization and Releases](./02-3gpp-organization-and-releases.md) | Low | TSGs, WGs, Rel-15 through Rel-19 | Completed |
| 03 | [Key 3GPP Specs for Layer 3](./03-key-3gpp-specs-for-layer-3.md) | High | 38.331, 38.401, 38.413, 38.473 | Completed |
| 04 | [Telecom Evolution 1G to 6G](./04-telecom-evolution-1g-to-6g.md) | Medium | AMPS to AI-native 6G | Completed |

## Phase 1: 5G RAN Architecture
> *"How is the 5G network designed?"*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 05 | [5G Network Architecture](./05-5g-network-architecture.md) | High | NG-RAN, 5GC, SA vs NSA, NG/Xn interfaces | Completed |
| 06 | [5G Physical Layer Foundations](./06-5g-physical-layer-foundations.md) | High | FR1 vs FR2, Numerology, Massive MIMO, SSB | Completed |
| 07 | [5G NR Protocol Stack](./07-5g-nr-protocol-stack.md) | Very High | AS vs NAS, RRC/SDAP/PDCP/RLC/MAC/PHY, Channels | Completed |
| 08 | [CU-DU Separation (F1 Interface)](./08-cu-du-separation.md) | High | Option 2 split, F1-C/F1-U, One CU to Many DUs | Completed |
| 09 | [CU-CP and CU-UP Split (E1 Interface)](./09-cu-cp-and-cu-up-split.md) | Very High | E1AP, Bearer Context management | Not Started |
| 10 | [O-RAN and Network Management](./10-o-ran-and-network-management.md) | High | RIC, E2, O1, RRM, UECC, SON | Completed |
| 11 | [5G Interfaces Deep Dive](./11-5g-interfaces.md) | High | NG, Xn, F1, E1, X2 — protocols and comparison | Not Started |
| 12 | [Network Sharing (MOCN, MORAN)](./12-network-sharing.md) | Medium | MOCN, MORAN, GWCN, multi-PLMN | Not Started |

## Phase 2: RRC Fundamentals
> *"The building blocks you must know before any call flow makes sense."*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 13 | [Identities (RNTIs, Cell IDs, PLMN)](./13-identities-rntis-and-cell-ids.md) | High | C-RNTI, RA-RNTI, PCI, NCGI, SUPI/SUCI | Completed |
| 14 | [Radio Bearers (SRBs and DRBs)](./14-radio-bearers-srbs-and-drbs.md) | Very High | SRB0/1/2/3, DRB, channel chains, RLC modes | Completed |
| 15 | [System Information (MIB, SIB1, OSI)](./15-system-information.md) | High | MIB fields, SIB1 contents, On-Demand SI | Completed |
| 16 | [RRC States and Transitions](./16-rrc-states-and-transitions.md) | Very High | IDLE, CONNECTED, INACTIVE, state diagram | Completed |
| 17 | [RRC Timers Reference](./17-rrc-timers-reference.md) | Very High | T300, T301, T304, T310, T311, N310/N311 | Completed |
| 18 | [RRC Measurements and Events](./18-rrc-measurements-and-events.md) | Very High | A1-A6, B1-B2, TTT, RSRP/RSRQ/SINR | Completed |

## Phase 3: Call Flows (The Story)
> *"What actually happens step-by-step, from gNB boot to UE data transfer."*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 19 | [gNB Bringup (F1/E1/NG Setup)](./19-gnb-bringup.md) | High | Boot sequence, F1/E1/NG Setup messages | Completed |
| 20 | [UE Power On, Cell Search & Selection](./20-ue-power-on-and-cell-selection.md) | Very High | SSB structure, PSS/SSS, PLMN selection, S-Criterion | Completed |
| 21 | [Random Access Procedure (RACH)](./21-random-access-procedure.md) | Very High | 4-step/2-step, CBRA/CFRA, power ramping, SSB-to-RO | Completed |
| 22 | [UE Initial Registration (Attach)](./22-ue-initial-registration.md) | Very High | Full call flow with IE detail, AS/NAS security | Completed |
| 23 | [Paging and DRX](./23-paging-and-drx.md) | High | PO/PF calculation, I-DRX, C-DRX, eDRX | Completed |
| 24 | [Cell Reselection](./24-cell-reselection.md) | High | R-Criterion, priority-based, intra/inter-freq | Completed |

## Phase 4: Mobility & Recovery
> *"The UE is connected and moving. What happens?"*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 25 | [Xn Handover (Inter-gNB)](./25-xn-handover.md) | Very High | Prep/Exec/Complete, SN Status Transfer, T304 | Completed |
| 26 | [N2 Handover (AMF-Routed)](./26-n2-handover.md) | High | When Xn doesn't exist, HO Required/Command | Completed |
| 27 | [Intra-gNB HO & Conditional HO (CHO)](./27-intra-gnb-ho-and-cho.md) | Very High | Inter-DU via F1AP, CHO conditions, DAPS | Completed |
| 28 | [Radio Link Failure & Re-establishment](./28-rlf-and-re-establishment.md) | Very High | RLF detection, T310/T311/T301, shortMAC-I | Completed |

## Phase 5: Cloud-Native & Advanced Topics
> *"How 5G runs in the real world."*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 29 | [CU-CP Resiliency and HA](./29-cucp-resiliency-and-ha.md) | High | Active/Standby, SCTP failover, state sync | Completed |
| 30 | [Redis in Cloud-Native RAN](./30-redis-in-cloud-native-ran.md) | Medium | In-memory state, hiredis, stateless CU-CP | Completed |
| 31 | [5G QoS Architecture (SDAP & QFI)](./31-5g-qos-architecture.md) | High | 5QI, QoS Flows to DRB mapping | Not Started |
| 32 | [Network Slicing in NG-RAN](./32-network-slicing.md) | Very High | S-NSSAI, resource isolation | Not Started |
| 33 | [Non-Terrestrial Networks (NTN)](./33-ntn.md) | Medium | LEO/GEO satellite, propagation delay | Not Started |

## Phase 6: Advanced Protocols & Features
> *"Deep-dives into specific protocols that come up in real bugs and interviews."*

| NN | Topic | Interview Heat | Key Concepts | Status |
|----|-------|----------------|--------------|--------|
| 34 | [NRPPa & 5G NR Positioning](./34-nrppa-positioning.md) | Very High | NRPPa (TS 38.455), LMF, DL-TDOA, Multi-RTT, UL-TDOA, PRS, RSTD, TRP, LPP tunneling, LTE vs NR positioning comparison | Completed |
