# 5G RAN Syllabus

This directory covers deep, interview-level knowledge of 5G Radio Access Network (RAN), with a special focus on the RRC Layer, CU architecture, and critical mobility flows. Notes are ordered from **beginner → master** — starting with "Why 5G?" and building up through architecture, protocols, call flows, mobility, advanced features, NTN, and cloud-native operations.

## Phase 0: The Big Picture
> *"Why does 5G exist? How did we get here?"*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 01 | [Telecom Evolution 1G to 6G](./01-telecom-evolution-1g-to-6g.md) | Medium | AMPS → GSM → UMTS → LTE → NR → 6G |
| 02 | [4G vs 5G — Key Differences](./02-4g-vs-5g-key-differences.md) | Very High | SBA vs EPC, gNB vs eNB, numerology, BWP, SDAP, RRC states, security |
| 03 | [SA vs NSA Deployment Options](./03-sa-vs-nsa-deployment-options.md) | Very High | Option 3/3a/3x (EN-DC), Option 2 (SA), MN/SN roles, migration |
| 04 | [3GPP Organization and Releases](./04-3gpp-organization-and-releases.md) | Low | TSGs, WGs, Rel-15 through Rel-19 feature map |
| 05 | [Key 3GPP Specs for Layer 3](./05-key-3gpp-specs-for-layer-3.md) | High | 38.331, 38.401, 38.413, 38.473, 38.423 |
| 06 | [Market Trends and Features](./06-market-trends-and-features.md) | Medium | 5G Triangle, RedCap, NTN, private 5G, Open RAN |

## Phase 1: 5G RAN Architecture
> *"How is the 5G network designed?"*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 07 | [5G Network Architecture (NG-RAN & 5GC)](./07-5g-network-architecture.md) | High | gNB, ng-eNB, AMF, UPF, SMF, SBA |
| 08 | [5G NR Protocol Stack](./08-5g-nr-protocol-stack.md) | Very High | AS vs NAS, RRC/SDAP/PDCP/RLC/MAC/PHY, Channel mapping |
| 09 | [5G Physical Layer Foundations](./09-5g-physical-layer-foundations.md) | High | FR1/FR2, Numerology (μ), BWP, Massive MIMO, SSB, beam management |
| 10 | [HARQ in 5G NR](./10-harq-in-5g-nr.md) | Very High | HARQ process count, async DL/UL, CBG-based, NDI, CC/IR, LTE vs NR |
| 11 | [CU-DU Separation (F1 Interface)](./11-cu-du-separation.md) | High | Option 2 split, F1-C/F1-U, F1AP procedures, one CU many DUs |
| 12 | [CU-CP and CU-UP Split (E1 Interface)](./12-cu-cp-and-cu-up-split.md) | Very High | E1AP, Bearer Context management, PDCP split |
| 13 | [5G Interfaces Deep Dive (NG, Xn, F1, E1)](./13-5g-interfaces.md) | High | NG-C/NG-U, Xn-C/Xn-U, F1-C/F1-U, E1, X2 — protocols and transport |
| 14 | [O-RAN and Network Management](./14-o-ran-and-network-management.md) | High | O-RAN Alliance, RIC (near-RT/non-RT), E2, O1, A1, rApps/xApps |

## Phase 2: RRC Fundamentals
> *"The building blocks you must know before any call flow makes sense."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 15 | [Identities (RNTIs, Cell IDs, PLMN)](./15-identities-rntis-and-cell-ids.md) | High | C-RNTI, RA-RNTI, PCI, NCGI, gNB-ID, SUPI/SUCI, 5G-S-TMSI |
| 16 | [Radio Bearers (SRBs and DRBs)](./16-radio-bearers-srbs-and-drbs.md) | Very High | SRB0/1/2/3, DRB, QoS flow→DRB mapping, RLC modes (TM/UM/AM) |
| 17 | [System Information (MIB, SIB1, OSI)](./17-system-information.md) | High | MIB fields, SIB1 contents, SIB2-SIB9, On-Demand SI, SI scheduling |
| 18 | [RRC States and Transitions](./18-rrc-states-and-transitions.md) | Very High | IDLE, CONNECTED, INACTIVE, state machine, LTE vs NR states |
| 19 | [RRC Timers and Constants Reference](./19-rrc-timers-reference.md) | Very High | T300-T311, T319, N310/N311, timer-triggered procedures |
| 20 | [RRC Measurements and Events (A1–A6, B1–B2)](./20-rrc-measurements-and-events.md) | Very High | A1–A6, B1–B2, RSRP/RSRQ/SINR, TTT, hysteresis, offset, filter coeff |
| 21 | [Measurement Gaps and Measurement Objects](./21-measurement-gaps-and-objects.md) | High | Gap patterns, SMTC, MeasConfig, MeasObject, ReportConfig, MeasId |

## Phase 3: UE Lifecycle — Call Flows
> *"From power-on to data transfer — the complete UE story."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 22 | [gNB Bringup (F1/E1/NG Setup)](./22-gnb-bringup.md) | High | Boot sequence, F1/E1/NG Setup messages, gNB config update |
| 23 | [UE Power On, Cell Search & Selection](./23-ue-power-on-and-cell-selection.md) | Very High | SSB detection, PSS/SSS, MIB decode, PLMN selection, S-Criterion |
| 24 | [Random Access Procedure (RACH)](./24-random-access-procedure.md) | Very High | 4-step/2-step, CBRA/CFRA, power ramping, Msg1-Msg4, SSB-to-RO |
| 25 | [UE Initial Registration (Full Attach Flow)](./25-ue-initial-registration.md) | Very High | End-to-end call flow, RRC Setup/Security/Reconfig, NAS Registration |
| 26 | [PDU Session Establishment](./26-pdu-session-establishment.md) | Very High | NAS→SMF→UPF, DRB setup, QoS flow binding, SSC modes |
| 27 | [UE Context Modification & RRC Reconfiguration](./27-ue-context-modification.md) | High | Reconfiguration triggers, F1AP/E1AP mod, delta signaling, fullConfig |
| 28 | [Paging and DRX](./28-paging-and-drx.md) | High | PO/PF calculation, I-DRX, C-DRX, eDRX, short DRX |
| 29 | [Cell Reselection](./29-cell-reselection.md) | High | R-criterion, SnonIntraSearch, priority-based, intra/inter-freq |
| 30 | [UE Capability Transfer & Enquiry](./30-ue-capability-transfer.md) | High | UECapabilityEnquiry/Information, feature groups, band combos, filtering |

## Phase 4: Mobility & Handovers
> *"The UE is connected and moving — the heart of L3 mobility."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 31 | [Handover Overview & Classification](./31-handover-overview-and-classification.md) | Very High | Taxonomy: intra/inter-freq, intra/inter-gNB, Xn/N2, intra/inter-RAT |
| 32 | [Intra-gNB Handover (Inter-DU via F1AP)](./32-intra-gnb-handover.md) | High | F1AP UE Context Setup, no Xn/AMF, PDCP stays in CU |
| 33 | [Xn Handover (Inter-gNB)](./33-xn-handover.md) | Very High | Prep/Exec/Complete, SN Status Transfer, T304, data forwarding |
| 34 | [N2 Handover (AMF-Routed)](./34-n2-handover.md) | High | When Xn unavailable, HO Required/Command, AMF relocation |
| 35 | [Inter-RAT Handover (5G ↔ 4G)](./35-inter-rat-handover.md) | Very High | NR→LTE, LTE→NR, B1/B2 triggers, SRVCC, N26 interface |
| 36 | [Conditional Handover (CHO) — Rel-16](./36-conditional-handover.md) | Very High | condReconfigToApply, execution conditions, CHO vs legacy HO |
| 37 | [DAPS Handover — Rel-16](./37-daps-handover.md) | Very High | Dual Active Protocol Stack, make-before-break, DAPS+CHO combo |
| 38 | [Dual Connectivity (EN-DC, NR-DC, NE-DC)](./38-dual-connectivity.md) | Very High | MN/SN roles, MCG/SCG bearers, split bearers, SCG failure, PSCell |
| 39 | [Radio Link Failure & RRC Re-establishment](./39-rlf-and-re-establishment.md) | Very High | RLF detection, T310/T311/T301, shortMAC-I, RLF report |
| 40 | [RRC Connection Release, Suspend & Resume](./40-rrc-release-suspend-resume.md) | High | Release with redirect/suspend, INACTIVE state, RNA, I-RNTI, resume |

## Phase 5: 3GPP Features & Protocols
> *"The features that differentiate products and come up in advanced interviews."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 41 | [Network Sharing (MOCN, MORAN, GWCN)](./41-network-sharing.md) | High | MOCN vs MORAN, PLMN-specific configs, shared spectrum, cell barring |
| 42 | [5G QoS Architecture (5QI, QoS Flows, SDAP)](./42-5g-qos-architecture.md) | High | 5QI table (GBR/non-GBR), QoS flow→DRB mapping, reflective QoS |
| 43 | [Network Slicing in NG-RAN](./43-network-slicing.md) | Very High | S-NSSAI (SST+SD), NSAG, AMF slice selection, RAN vs core slicing |
| 44 | [NRPPa & 5G NR Positioning](./44-nrppa-positioning.md) | Very High | NRPPa (TS 38.455), LMF, DL-TDOA, Multi-RTT, PRS, LPP tunneling |
| 45 | [NR Sidelink & V2X (PC5 Interface)](./45-nr-sidelink-and-v2x.md) | Medium | Mode 1/Mode 2, SL-BWP, SCI, V2X QoS, LTE V2X vs NR V2X |
| 46 | [RedCap (Reduced Capability NR) — Rel-17](./46-redcap.md) | High | 20MHz FR1, 1Rx, half-duplex FDD, IoT/wearables, eRedCap (Rel-18) |
| 47 | [NR Carrier Aggregation (CA)](./47-nr-carrier-aggregation.md) | High | PCell/SCell/PSCell, SCell activation, cross-carrier scheduling, CA vs DC |
| 48 | [Integrated Access and Backhaul (IAB)](./48-iab.md) | Medium | IAB-node, IAB-donor, BAP layer, multi-hop, topology adaptation |
| 49 | [Voice over NR (VoNR) & EPS Fallback](./49-vonr-and-eps-fallback.md) | High | IMS over NR, 5QI=1, EPS Fallback (redirect vs HO), SRVCC |

## Phase 6: Non-Terrestrial & IoT
> *"The frontier — satellite 5G and IoT over space."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 50 | [Non-Terrestrial Networks (NTN) — NR-NTN](./50-ntn.md) | High | LEO/MEO/GEO, transparent vs regenerative, SIB19, Doppler, HARQ disabling |
| 51 | [NB-IoT & eMTC over NTN (IoT-NTN)](./51-nbiot-emtc-ntn.md) | High | IoT-NTN (Rel-17), GNSS-based TA, store-and-forward, coverage classes |
| 52 | [NTN Mobility & Feeder Link Switching](./52-ntn-mobility.md) | Medium | Earth-fixed vs Earth-moving cells, satellite HO, feeder link switch |

## Phase 7: Cloud-Native RAN & Operations
> *"How 5G actually runs in production."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 53 | [CU-CP Resiliency and High Availability](./53-cucp-resiliency-and-ha.md) | High | Active/Standby, SCTP failover, state checkpointing, UECC model |
| 54 | [Redis in Cloud-Native RAN](./54-redis-in-cloud-native-ran.md) | Medium | In-memory state store, hiredis, stateless CU-CP design |
| 55 | [Kubernetes & Container-Native RAN](./55-kubernetes-container-native-ran.md) | Medium | Pod lifecycle, liveness/readiness probes, CNF vs VNF, Helm |

---
*Last updated: 2026-10-18*
