# 5G RAN Syllabus

This directory covers deep, interview-level knowledge of 5G Radio Access Network (RAN), with a special focus on the RRC Layer, CU architecture, and critical mobility flows.

## Phase 0: Introduction and Evolution
| NN | Topic Title | Interview Heat | Key Concepts | Status |
|----|-------------|----------------|--------------|--------|
| 01 | [Market Trends and Features](./01-market-trends-and-features.md) | Medium | 5G Triangles (eMBB, URLLC, mMTC) | Completed |
| 02 | [3GPP Organization and Releases](./02-3gpp-organization-and-releases.md) | Low | TSGs, WGs, Rel-15/16/17 | Completed |
| 03 | [Key 3GPP Specs for Layer 3](./03-key-3gpp-specs-for-layer-3.md) | High | 38.331, 38.401, 38.473 | Completed |
| 04 | [Telecom Evolution 1G to 6G](./04-telecom-evolution-1g-to-6g.md) | Medium | AMPS to AI-native 6G | Completed |

## Phase 1: 5G RAN Architecture & Concepts
| NN | Topic Title | Interview Heat | Key Concepts | Status |
|----|-------------|----------------|--------------|--------|
| 05 | [5G Network Architecture](./05-5g-network-architecture.md) | High | NG-RAN vs 5GC, SA vs NSA | Completed |
| 06 | [5G Physical Layer Foundations](./06-5g-physical-layer-foundations.md) | High | FR1 vs FR2, Numerology, Massive MIMO | Completed |
| 07 | [5G NR Protocol Stack (L1, L2, L3)](./07-5g-nr-protocol-stack.md) | Very High | RRC, SDAP, PDCP, RLC, MAC, PHY | Completed |
| 08 | [CU-DU Separation (F1 Interface)](./08-cu-du-separation.md) | High | High-layer vs Low-layer split | Completed |
| 09 | [CU-CP and CU-UP Split (E1 Interface)](./09-cu-cp-and-cu-up-split.md) | Very High | Control/User plane separation, Bearer management | Not Started |
| 10 | [O-RAN and Network Management](./10-o-ran-and-network-management.md) | High | SON, RIC, E2, O1, RRM, UECC | Completed |
| 11 | [5G QoS Architecture (SDAP & QFI)](./11-5g-qos-architecture.md) | High | 5QI, QoS Flows to DRB Mapping | Not Started |
| 12 | [Network Slicing in NG-RAN](./12-network-slicing-in-ng-ran.md) | Very High | S-NSSAI, Resource Isolation | Not Started |
| 13 | [CUCP Resiliency and HA](./13-cucp-resiliency-and-ha.md) | High | Stateless vs Stateful, K8s HA | Completed |
| 14 | [Redis in Cloud-Native RAN](./14-redis-in-cloud-native-ran.md) | Medium | State storage, DB sync | Completed |

## Phase 2: RRC Layer (Layer 3) Deep Dive
| NN | Topic Title | Interview Heat | Key Concepts | Status |
|----|-------------|----------------|--------------|--------|
| 15 | [RRC States](./15-rrc-states.md) | Very High | Idle, Connected, Inactive transitions | Not Started |
| 16 | [Signaling Radio Bearers (SRBs)](./16-srb-signaling-radio-bearers.md) | High | SRB0, SRB1, SRB2, SRB3 | Not Started |
| 17 | [RRC Setup and Reconfiguration](./17-rrc-setup-and-reconfiguration.md) | Very High | Message contents, Master/Secondary Cell Group | Not Started |
| 18 | [System Information](./18-system-information.md) | Medium | MIB, SIB1, OSI | Not Started |
| 19 | [NG Identities (RNTIs and Cell IDs)](./19-ng-identities.md) | High | C-RNTI, RA-RNTI, P-RNTI, NCGI | Not Started |
| 20 | [RRC Measurements and Reporting](./20-rrc-measurements-and-reporting.md) | High | A-Events, B-Events, Measurement objects | Not Started |

## Phase 3: Call Flows, Mobility & Error Handling
| NN | Topic Title | Interview Heat | Key Concepts | Status |
|----|-------------|----------------|--------------|--------|
| 21 | [Random Access Procedure (RACH)](./21-random-access-procedure.md) | Very High | 2-step vs 4-step, CFRA vs CBRA | Not Started |
| 22 | [UE Initial Attach (SA)](./22-ue-initial-attach-sa.md) | Very High | Step-by-step Call Flow | Not Started |
| 23 | [Paging and DRX](./23-paging-and-drx.md) | High | PO calculation, C-DRX, eDRX | Not Started |
| 24 | [Handover Mechanisms](./24-handover-mechanisms.md) | Very High | Xn vs N2 Handover, Prep/Exec/Complete phases | Not Started |
| 25 | [Conditional Handover (CHO)](./25-conditional-handover-cho.md) | High | Triggers, Execution, Benefits over standard HO | Not Started |
| 26 | [Radio Link Failure (RLF) and Recovery](./26-radio-link-failure-and-recovery.md) | Very High | Detection, Re-establishment, Timers | Not Started |
