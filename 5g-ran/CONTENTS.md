# 5G RAN — Table of Contents & Study Plan

> **Status**: Active | **Note format**: Topic notes + interview Q&A  
> This file tracks the detailed syllabus and links to notes as they are created.

---

## 0. Foundations & Context

> *Overview and background material that sets the stage for the technical deep dives.*

| Subtopic | Key Concepts | Notes |
|----------|--------------|-------|
| **0.1 Market Trends & Features** | Operator-demanded features, network sharing, mobility, IoT, AI-RAN | [📝 0.1](./0.1-market-trends-and-features.md) |
| **0.2 3GPP & Releases** | 3GPP working groups, spec numbering, release feature map (R99 → 6G) | [📝 0.2a](./0.2a-3gpp-organization-and-releases.md)<br>[📝 0.2b (L3 Specs)](./0.2b-key-3gpp-specs-for-layer-3.md) |
| **0.3 Telecom Evolution** | 1G to 6G history, 5G vs LTE comparison | [📝 0.3](./0.3-telecom-evolution-1g-to-6g.md) |
| **0.4 5G Spectrum & Bands** | FR1 vs FR2, Sub-6GHz vs mmWave, FDD vs TDD | |
| **0.5 ITU-R Usage Scenarios** | eMBB, URLLC, mMTC and their KPIs | |

---

## Phase 1 — Architecture & PHY

### 1. Architecture & Fundamentals

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **1.1 5G System Architecture** | - SA vs NSA deployment options (Option 3, 3a, 3x, 2)<br>- E2E architecture: UE → gNB → 5GC (AMF, SMF, UPF)<br>- Control plane vs User plane separation (CUPS)<br>- Service-Based Architecture (SBA) in 5GC | |
| **1.2 gNB Architecture & Functional Split** | - Monolithic gNB vs Disaggregated (CU-CP, CU-UP, DU, RU)<br>- O-RAN 7.2x split — what runs where<br>- F1 interface (F1-C, F1-U) between CU and DU<br>- E1 interface between CU-CP and CU-UP<br>- Fronthaul (eCPRI) between DU and RU | [📝 1.2a (CU-CP HA)](./1.2a-cucp-resiliency-and-ha.md)<br>[📝 1.2b (Redis in RAN)](./1.2b-redis-in-cloud-native-ran.md) |
| **1.3 Network Interfaces** | - NG interface (NG-C / N2, NG-U / N3) — gNB ↔ 5GC<br>- Xn interface (Xn-C, Xn-U) — gNB ↔ gNB<br>- F1, E1, F2 — internal gNB interfaces<br>- SCTP, GTP-U — transport protocols used | |
| **1.4 Protocol Stack Overview** | - Control plane stack: RRC → PDCP → RLC → MAC → PHY<br>- User plane stack: SDAP → PDCP → RLC → MAC → PHY<br>- Logical, Transport, Physical channel mapping<br>- User data packet flow from core to air | |

### 2. Physical Layer

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **2.1 OFDM & Waveform** | - CP-OFDM (DL & UL), DFT-s-OFDM (UL)<br>- Why OFDM (multipath, ISI)<br>- Cyclic prefix — normal vs extended<br>- Subcarrier spacing and its impact | |
| **2.2 Numerology & Frame Structure** | - Subcarrier spacings: 15, 30, 60, 120, 240 kHz<br>- Slots, symbols, subframes, radio frames<br>- Slot configurations (14 symbols, mini-slots)<br>- TDD slot formats & patterns (DDDSU, etc.) | |
| **2.3 Resource Grid** | - Resource Element (RE), Resource Block (RB)<br>- Point A, CRB, PRB, VRB<br>- Resource allocation Type 0 vs Type 1<br>- Frequency domain: interleaved vs non-interleaved | |
| **2.4 Physical Channels — Downlink** | - **PDSCH** — DL data, DMRS, rate matching, TBS<br>- **PDCCH** — DCI formats, CCE, aggregation levels, CORESET, search spaces<br>- **PBCH** — MIB, SSB structure, beam sweeping | |
| **2.5 Physical Channels — Uplink** | - **PUSCH** — UL data, grant-based vs configured grant<br>- **PUCCH** — UCI (HARQ-ACK, SR, CSI), formats 0-4<br>- **PRACH** — preamble formats, occasion configuration | |
| **2.6 Physical Signals** | - **SSB** (PSS + SSS + PBCH)<br>- **DMRS** — channel estimation<br>- **CSI-RS** — channel quality measurement<br>- **SRS** — UL channel sounding<br>- **PTRS, TRS** | |
| **2.7 Bandwidth Part (BWP)** | - What is BWP, power saving, device capability<br>- Initial, active, default BWP<br>- BWP switching (timer/DCI-based) | |
| **2.8 Modulation & Coding** | - QPSK, 16QAM, 64QAM, 256QAM<br>- LDPC codes (data) vs Polar codes (control)<br>- MCS table, CQI table, TBS determination | |

---

## Phase 2 — Protocol Layers (L2/L3)

### 3. MAC Layer

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **3.1 MAC Architecture & Functions** | - MAC entity structure, logical channel priorities<br>- Logical → Transport → Physical mapping<br>- Multiplexing, MAC PDU structure | |
| **3.2 MAC Control Elements (MAC CE)** | - Timing Advance, DRX, SCell activation<br>- BSR, PHR, C-RNTI, Configured Grant Confirmation | |
| **3.3 Scheduling** | - DL scheduling (K0) vs UL scheduling (K2)<br>- Dynamic vs SPS vs Configured Grant<br>- Scheduler design (proportional fair, RR)<br>- BSR, SR, PHR | |
| **3.4 HARQ** | - HARQ processes, stop-and-wait<br>- K1 timing, NDI toggle<br>- Codebook types (Type 1 vs Type 2)<br>- CBG-based retransmission | |
| **3.5 DRX (Discontinuous Reception)** | - DRX cycle: on-duration, inactivity timer<br>- Short DRX vs Long DRX<br>- DRX with HARQ interaction | |
| **3.6 Random Access (RACH)** | - 4-step RACH vs 2-step RACH<br>- Contention-based vs contention-free<br>- Preamble groups, power ramping<br>- RA-RNTI calculation, use cases | |

### 4. RLC Layer

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **4.1 RLC Modes** | - TM (Transparent Mode) - CCCH/BCCH<br>- UM (Unacknowledged Mode) - VoNR<br>- AM (Acknowledged Mode) - TCP | |
| **4.2 Segmentation & Reassembly** | - RLC SDU → RLC PDU segmentation<br>- Re-segmentation, SO field | |
| **4.3 ARQ in RLC AM** | - Polling mechanism, STATUS PDU<br>- t-Reassembly, t-PollRetransmit timers<br>- Max retransmission limit → RLF | |

### 5. PDCP Layer

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **5.1 PDCP Functions** | - Header compression (ROHC)<br>- Ciphering & Integrity protection<br>- Sequence numbering, Duplicate detection | |
| **5.2 PDCP in Handover** | - Data forwarding (source to target)<br>- Lossless handover, PDCP re-establishment | |
| **5.3 PDCP in Dual Connectivity** | - Split bearer (PDCP at MN, RLC at MN & SN)<br>- Routing & duplication | |

### 6. SDAP Layer

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **6.1 QoS Framework** | - QoS Flow, QFI, 5QI<br>- GBR vs Non-GBR vs Delay-Critical GBR<br>- QoS parameters (PDB, PER) | |
| **6.2 QoS Flow ↔ DRB Mapping** | - SDAP header, QFI mapping<br>- Reflective QoS<br>- Default DRB, dedicated DRB | |

### 7. RRC Layer

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **7.1 RRC States** | - RRC_IDLE, RRC_INACTIVE, RRC_CONNECTED<br>- State transitions, suspend/resume | |
| **7.2 Key RRC Procedures** | - RRC Setup, Reject, Reconfiguration<br>- RRC Reestablishment, Release | |
| **7.3 System Information** | - MIB, SIB1, SIB2-SIB9<br>- System information update, paging | |
| **7.4 Paging** | - Paging occasions, PF/PO calculation<br>- DRX in IDLE/INACTIVE | |
| **7.5 Measurement & Reporting** | - Objects, report configs, IDs<br>- SS-RSRP/RSRQ/SINR<br>- Events A1-A6, B1-B2 | |
| **7.6 Security** | - Key hierarchy, AS security activation<br>- Key refresh vs key change | |

---

## Phase 3 — Mobility, Beamforming & Advanced

### 8. Mobility & Handover

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **8.1 Intra & Inter-gNB Handover** | - Prep → Execution → Completion<br>- RACH-based vs RACH-less | |
| **8.2 Xn vs NG Handover** | - Xn (direct) vs NG (via AMF)<br>- Path switch | |
| **8.3 Measurement Events** | - A1-A6, B1-B2 thresholds and triggers | |
| **8.4 Advanced Mobility** | - CHO (Conditional Handover)<br>- DAPS (Dual Active Protocol Stack)<br>- LTM (L1/L2 Triggered Mobility)<br>- RLF detection (N310, T310, N311) | |

### 9. Beamforming & MIMO

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **9.1 Beamforming Fundamentals** | - Analog vs Digital vs Hybrid<br>- Beam sweeping | |
| **9.2 Beam Management** | - P1, P2, P3 procedures<br>- TCI states, QCL | |
| **9.3 Beam Failure** | - BFD, BFRQ on PRACH/PUCCH | |
| **9.4 MIMO Schemes** | - SU-MIMO, MU-MIMO<br>- Codebook vs non-codebook precoding<br>- Rank Indicator (RI), PMI, CQI | |

### 10. Carrier Aggregation & DC

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **10.1 Carrier Aggregation (CA)** | - PCell, PSCell, SCell<br>- Cross-carrier scheduling | |
| **10.2 Dual Connectivity (DC)** | - EN-DC, NR-DC, NE-DC<br>- MCG, SCG, Split bearer | |

### 11. Power Control

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **11.1 Uplink Power Control** | - Open-loop vs closed-loop<br>- P0, alpha, TPC, PUSCH/PUCCH/SRS<br>- PRACH power ramping | |
| **11.2 Downlink Power Allocation** | - EPRE, Power boosting | |

### 12. O-RAN

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **12.1 O-RAN Architecture** | - O-CU, O-DU, O-RU, SMO | |
| **12.2 RIC (RAN Intelligent Controller)** | - Near-RT (xApps) vs Non-RT (rApps) | |
| **12.3 O-RAN Interfaces** | - E2, A1, O1, O2, Open Fronthaul (7.2x) | |

### 13. Network Slicing

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **13.1 RAN Perspective** | - S-NSSAI, slice-aware scheduling<br>- Resource isolation, NSAG | |

### 14. Advanced & Emerging

| Subtopic | Detailed Concepts | Notes |
|----------|-------------------|-------|
| **14.1 DSS** | - Dynamic Spectrum Sharing (LTE/NR) | |
| **14.2 SUL** | - Supplementary Uplink | |
| **14.3 NR-U** | - Unlicensed Spectrum, LBT | |
| **14.4 IAB** | - Integrated Access & Backhaul | |
| **14.5 RedCap** | - Reduced capability UEs | |
| **14.6 NTN (Non-Terrestrial Networks)** | - L3 impacts: Ephemeris data in SIBs, RRC timers for high propagation delay, Earth-fixed vs moving beams, satellite handover | |
| **14.7 Positioning** | - TDOA, Multi-RTT, AoD/AoA | |
| **14.8 URLLC & IIoT** | - Mini-slots, DL Pre-emption, TSN | |
| **14.9 Private 5G (NPN)** | - SNPN vs PNI-NPN, CAG | |
| **14.10 V2X & Sidelink** | - PC5 interface, Mode 1 vs Mode 2 | |
| **14.11 AI/ML in RAN** | - AI/ML for Beam Management, CSI, Positioning | |
| **14.12 ISAC** | - Integrated Sensing and Communication | |
| **14.13 VoNR & EPS Fallback** | - 5G Voice architecture, QoS flows for SIP/RTP | |
| **14.14 NB-IoT & eMTC (L3 Focus)** | - LTE vs NB-IoT, CP/UP CIoT optimizations, eDRX, PSM (Power Saving Mode), SIB changes, L3 timers | |

---

*This file is auto-maintained. It updates whenever a new note is added.*
