# 5G RAN — Table of Contents

> **Status**: Active | **Note format**: Topic notes + interview Q&A  
> Notes are linked inline under their relevant topic section. The notes table at the bottom provides a flat index.

---

## Topics & Subtopics

### 0. Foundations & Context

> *Overview and background material that sets the stage for the technical deep dives.*

| Note | Title | What It Covers |
|------|-------|---------------|
| 📝 01 | [Market Trends & Top Features](./01-market-trends-and-features.md) | Full landscape of operator-demanded features: network sharing, mobility, capacity, IoT, energy saving, O-RAN, AI-RAN, emerging tech |
| 📝 02 | [3GPP Organization & Releases](./02-3gpp-organization-and-releases.md) | How 3GPP works, spec numbering (38.xxx/36.xxx), TSGs & WGs, release-by-release feature map (R99 → Rel-19 → 6G) |
| 📝 03 | [Telecom Evolution: 1G to 6G](./03-telecom-evolution-1g-to-6g.md) | Generation-by-generation history, what each added, 5G vs LTE comparison, 6G outlook |

---

### 1. Architecture & Fundamentals

#### 1.1 5G System Architecture
- SA vs NSA deployment options (Option 3, 3a, 3x, 2)
- E2E architecture: UE → gNB → 5GC (AMF, SMF, UPF)
- Control plane vs User plane separation (CUPS)
- Service-Based Architecture (SBA) in 5GC

#### 1.2 gNB Architecture & Functional Split
- Monolithic gNB vs Disaggregated (CU-CP, CU-UP, DU, RU)
- O-RAN 7.2x split — what runs where
- F1 interface (F1-C, F1-U) between CU and DU
- E1 interface between CU-CP and CU-UP
- Fronthaul (eCPRI) between DU and RU
- Real-world deployment: what companies put in CU vs DU
- 📝 *Note 04: [CU-CP Resiliency & High Availability](./04-cucp-resiliency-and-ha.md)*
- 📝 *Note 05: [Redis in Cloud-Native RAN](./05-redis-in-cloud-native-ran.md)*

#### 1.3 Network Interfaces
- NG interface (NG-C / N2, NG-U / N3) — gNB ↔ 5GC
- Xn interface (Xn-C, Xn-U) — gNB ↔ gNB
- F1, E1, F2 — internal gNB interfaces
- SCTP, GTP-U — transport protocols used

#### 1.4 Protocol Stack Overview
- Control plane stack: RRC → PDCP → RLC → MAC → PHY
- User plane stack: SDAP → PDCP → RLC → MAC → PHY
- Logical, Transport, Physical channel mapping
- How a user data packet flows from core to air (and back)

---

### 2. Physical Layer

#### 2.1 OFDM & Waveform
- CP-OFDM (DL & UL), DFT-s-OFDM (UL)
- Why OFDM — multipath, ISI, frequency-domain equalization
- Cyclic prefix — normal vs extended
- Subcarrier spacing and its impact

#### 2.2 Numerology & Frame Structure
- Subcarrier spacings: 15, 30, 60, 120, 240 kHz
- Slots, symbols, subframes, radio frames
- Slot configurations (14 symbols, mini-slots)
- TDD slot formats & patterns (DDDSU, DDSUU, etc.)
- Flexible symbols, guard period, timing advance

#### 2.3 Resource Grid
- Resource Element (RE), Resource Block (RB)
- Point A, CRB, PRB, VRB
- Resource allocation Type 0 vs Type 1
- Frequency domain: interleaved vs non-interleaved

#### 2.4 Physical Channels — Downlink
- **PDSCH** — DL data, DMRS, rate matching, TBS calculation
- **PDCCH** — DCI formats (0_0, 0_1, 1_0, 1_1), CCE, aggregation levels, CORESET, search spaces
- **PBCH** — MIB, SSB structure, SSB beam sweeping

#### 2.5 Physical Channels — Uplink
- **PUSCH** — UL data, grant-based vs configured grant (Type 1, Type 2)
- **PUCCH** — UCI (HARQ-ACK, SR, CSI), formats 0-4, long vs short PUCCH
- **PRACH** — preamble formats (long: 0-3, short: A1-C2), occasion configuration

#### 2.6 Physical Signals
- **SSB** (PSS + SSS + PBCH) — cell search, beam sweeping, periodicity
- **DMRS** — channel estimation, type 1 vs type 2, additional positions, front-loaded
- **CSI-RS** — channel quality measurement, ZP vs NZP, periodicity & resource mapping
- **SRS** — UL channel sounding, usage (codebook, non-codebook, antenna switching, beam management)
- **PTRS** — phase tracking for high frequencies
- **TRS** — tracking reference signal for time/frequency tracking

#### 2.7 Bandwidth Part (BWP)
- What is BWP, why it exists (power saving, device capability)
- Initial BWP, active BWP, default BWP
- BWP switching — timer-based, DCI-based
- Up to 4 BWPs configured, only 1 active at a time

#### 2.8 Modulation & Coding
- Modulation schemes: QPSK, 16QAM, 64QAM, 256QAM
- LDPC codes (data channels) vs Polar codes (control channels)
- MCS table, CQI table, TBS determination
- Code rate, spectral efficiency

---

### 3. MAC Layer

#### 3.1 MAC Architecture & Functions
- MAC entity structure, logical channel priorities
- Logical channels → Transport channels → Physical channels mapping
- Multiplexing, demultiplexing
- MAC PDU structure, MAC subheaders, MAC SDU

#### 3.2 MAC Control Elements (MAC CE)
- Timing Advance, DRX, SCell activation/deactivation
- BSR, PHR, C-RNTI, Configured Grant Confirmation
- Padding BSR, truncated BSR

#### 3.3 Scheduling
- DL scheduling: DCI → PDSCH, K0 timing
- UL scheduling: DCI → PUSCH, K2 timing
- Dynamic scheduling vs Semi-Persistent Scheduling (SPS) vs Configured Grant
- Scheduler design considerations: proportional fair, round robin, max throughput
- Buffer Status Report (BSR) — short, long, truncated, trigger conditions
- Scheduling Request (SR) — when and how UE requests UL grant
- Power Headroom Report (PHR) — Type 1 (single entry), Type 3 (multiple entries)

#### 3.4 HARQ
- HARQ process overview — stop-and-wait ARQ per process
- DL HARQ: PDSCH → HARQ-ACK on PUCCH/PUSCH, K1 timing
- UL HARQ: PUSCH → PHICH (LTE) vs DCI-based in NR
- Number of HARQ processes (up to 16)
- HARQ-ACK codebook: semi-static (Type 1) vs dynamic (Type 2)
- CBG-based retransmission
- HARQ-ACK bundling, multiplexing
- NDI (New Data Indicator) toggle

#### 3.5 DRX (Discontinuous Reception)
- DRX cycle: on-duration, inactivity timer, retransmission timer
- Short DRX vs Long DRX
- DRX with HARQ interaction
- Connected mode DRX (C-DRX)
- Power saving impact

#### 3.6 Random Access (RACH) — Detailed
- 4-step RACH: Msg1 (preamble) → Msg2 (RAR) → Msg3 (RRC) → Msg4 (contention resolution)
- 2-step RACH: MsgA → MsgB
- Contention-based vs contention-free RACH
- RACH occasions, SSB-to-RO mapping
- Preamble groups (Group A, Group B), power ramping
- RA-RNTI calculation
- RACH use cases: initial access, handover, beam failure recovery, link re-establishment

---

### 4. RLC Layer

#### 4.1 RLC Modes
- **TM** (Transparent Mode) — used for CCCH, BCCH, PCCH
- **UM** (Unacknowledged Mode) — used for delay-sensitive bearers (VoNR)
- **AM** (Acknowledged Mode) — used for reliable data transfer (TCP-based services)

#### 4.2 Segmentation & Reassembly
- RLC SDU → RLC PDU segmentation
- Re-segmentation of retransmitted PDUs
- SO (Segment Offset) field
- How segmentation interacts with MAC multiplexing

#### 4.3 ARQ in RLC AM
- Polling mechanism — poll bit, poll triggers (PDU count, byte count, timer)
- STATUS PDU — ACK/NACK reporting
- t-Reassembly, t-PollRetransmit, t-StatusProhibit timers
- Retransmission and max retransmission limit (maxRetxThreshold → RLC failure → RLF)

---

### 5. PDCP Layer

#### 5.1 PDCP Functions
- Header compression (ROHC) — profile negotiation
- Ciphering (NEA algorithms: NEA0, 128-NEA1, 128-NEA2, 128-NEA3)
- Integrity protection (NIA algorithms) — mandatory for SRBs, optional for DRBs
- Sequence numbering (12-bit or 18-bit SN)
- Duplicate detection & reordering (t-Reordering timer)

#### 5.2 PDCP in Handover
- Data forwarding from source to target gNB
- PDCP SN-based in-order delivery
- Lossless handover for AM bearers
- PDCP re-establishment, COUNT handling

#### 5.3 PDCP in Dual Connectivity
- Split bearer — PDCP at MN, RLC at both MN & SN
- Routing & duplication
- PDCP data recovery

---

### 6. SDAP Layer

#### 6.1 QoS Framework
- QoS Flow, QFI (QoS Flow Identifier)
- 5QI — standardized & non-standardized
- GBR vs Non-GBR vs Delay-Critical GBR
- QoS parameters: priority, packet delay budget, packet error rate, MFBR, AMBR

#### 6.2 QoS Flow ↔ DRB Mapping
- SDAP header, QFI mapping to DRB
- Reflective QoS — UL mapping based on DL mapping
- Default DRB, dedicated DRB

---

### 7. RRC Layer

#### 7.1 RRC States
- **RRC_IDLE**: cell reselection, paging, no context at gNB
- **RRC_INACTIVE**: UE context at gNB, RNA-based mobility, fast resume
- **RRC_CONNECTED**: full connection, handover-based mobility
- State transitions, suspend/resume

#### 7.2 Key RRC Procedures
- RRC Setup / RRC Reject
- RRC Reconfiguration (the workhorse — adds/modifies bearers, handover, measurement config)
- RRC Reestablishment (triggered by RLF, HO failure, integrity check failure)
- RRC Release (with/without redirect, with suspend)

#### 7.3 System Information
- MIB — on PBCH, periodicity 80ms
- SIB1 — on PDSCH, scheduling info for other SIBs, cell access info
- SIB2-SIB9 — on-demand SIBs, triggered by SI-request
- System information update — paging with systemInfoModification

#### 7.4 Paging
- Paging occasions, PF/PO calculation (UE ID-based hashing)
- DRX in IDLE/INACTIVE
- Paging for incoming call, system info change, ETWS/CMAS

#### 7.5 Measurement & Reporting
- Measurement objects, report configs, measurement IDs
- SS-RSRP, SS-RSRQ, SS-SINR
- L1/L3 filtering
- Event-triggered reporting: A1-A6, B1-B2
- Periodical reporting
- Gap-based vs gap-free measurement

#### 7.6 Security
- Key hierarchy: K_AMF → K_gNB → K_RRCenc, K_RRCint, K_UPenc, K_UPint
- AS security activation — SecurityModeCommand
- Key refresh (intra-gNB) vs key change (inter-gNB)
- Horizontal vs vertical key derivation during handover

---

### 8. Mobility & Handover

#### 8.1 Intra-gNB & Inter-gNB Handover
- Handover preparation → execution → completion
- Measurement report → handover decision → RRC Reconfiguration
- Source gNB, target gNB roles
- RACH-based vs RACH-less handover

#### 8.2 Xn Handover vs NG Handover
- Xn: direct gNB-to-gNB, faster
- NG: via AMF, used when no Xn interface, inter-AMF
- Path switch after handover (UPF update)

#### 8.3 Measurement Events
- **A1**: serving > threshold → stop inter-freq measurement
- **A2**: serving < threshold → start inter-freq measurement
- **A3**: neighbor > serving + offset → handover trigger
- **A4**: neighbor > threshold
- **A5**: serving < threshold1 AND neighbor > threshold2
- **A6**: neighbor > SCell + offset (for CA)
- **B1/B2**: inter-RAT events (NR ↔ LTE)
- Time-to-trigger, hysteresis, offset

#### 8.4 Advanced Mobility
- Conditional Handover (CHO) — pre-configured handover, UE autonomy
- DAPS (Dual Active Protocol Stack) Handover — make-before-break
- Handover failure → RRC Reestablishment
- Radio Link Failure (RLF) detection: N310, T310, N311

---

### 9. Beamforming & MIMO

#### 9.1 Beamforming Fundamentals
- Analog beamforming (phase shifters)
- Digital beamforming (precoding per antenna)
- Hybrid beamforming (practical for mmWave)
- Beam sweeping, beam width vs gain tradeoff

#### 9.2 Beam Management
- P1 (beam selection), P2 (beam refinement — gNB), P3 (beam refinement — UE)
- SSB-based vs CSI-RS-based beam management
- L1-RSRP reporting
- Beam indication — TCI states, QCL (Quasi Co-Location)

#### 9.3 Beam Failure Detection & Recovery
- Beam failure detection — L1-RSRP below threshold, BFD RS
- Beam failure recovery — BFRQ on PRACH/PUCCH, candidate beam selection
- Contention-based vs contention-free BFR

#### 9.4 MIMO Schemes
- SU-MIMO (single user, multiple layers)
- MU-MIMO (multiple users, spatial multiplexing)
- Codebook-based precoding (Type I, Type II CSI)
- Non-codebook based precoding (SRS-based)
- Rank Indicator (RI), PMI, CQI
- Max 4 layers DL (per UE), up to 4 layers UL

---

### 10. Carrier Aggregation & Dual Connectivity

#### 10.1 Carrier Aggregation (CA)
- PCell, PSCell, SCell — roles and differences
- SCell addition, activation, deactivation (MAC CE-based)
- Cross-carrier scheduling (CIF field in DCI)
- CA bandwidth class (A, B, C, D, etc.)
- Timing Advance Groups (TAGs) in CA

#### 10.2 Dual Connectivity (DC)
- EN-DC (E-UTRA–NR) — LTE as master, NR as secondary
- NR-DC (NR–NR) — both legs NR
- NE-DC (NR–E-UTRA) — NR as master
- MCG, SCG — master cell group, secondary cell group
- Split bearer, MCG bearer, SCG bearer
- SCG failure handling, SCG change

---

### 11. Power Control

#### 11.1 Uplink Power Control
- Open-loop vs closed-loop power control
- P0, alpha (path loss compensation), TPC commands
- PUSCH, PUCCH, SRS power control — separate formulas
- PRACH power ramping, preambleReceivedTargetPower
- Power headroom, Pcmax calculation

#### 11.2 Downlink Power Allocation
- EPRE (Energy Per Resource Element)
- Power boosting for PDCCH, SSB
- SSB power indication (ssb-pbch-BlockPower)
- powerControlOffset for PDSCH

---

### 12. O-RAN

#### 12.1 O-RAN Architecture
- O-RAN Alliance overview, WGs
- O-CU, O-DU, O-RU — mapping to 3GPP
- SMO (Service Management & Orchestration)
- Cloud-native RAN, containerization

#### 12.2 RIC (RAN Intelligent Controller)
- Near-RT RIC — xApps, E2 interface, 10ms–1s control loop
- Non-RT RIC — rApps, A1 interface, >1s control loop
- R1 interface, ML model management

#### 12.3 O-RAN Interfaces
- E2 (near-RT RIC ↔ O-CU/O-DU) — E2AP, E2SM (KPM, RC, NI)
- A1 (non-RT RIC ↔ near-RT RIC) — policy, enrichment info
- O1 (SMO ↔ O-RAN nodes) — FCAPS, NETCONF/YANG
- O2 (SMO ↔ O-Cloud) — infrastructure management
- Open Fronthaul (O-DU ↔ O-RU) — 7.2x split, eCPRI, S/C/U/M planes

---

### 13. Network Slicing (RAN perspective)

- S-NSSAI (SST + SD), NSSF
- Slice-aware cell selection & reselection
- Slice-aware scheduling & resource partitioning
- Inter-slice SLA guarantees
- Slice-specific RRM policies
- NSAG (Network Slice Admission Group)

---

### 14. Advanced & Emerging Topics

#### 14.1 DSS (Dynamic Spectrum Sharing)
- LTE–NR coexistence on same carrier
- Rate matching around LTE CRS
- MBSFN subframe utilization

#### 14.2 SUL (Supplementary Uplink)
- Why SUL — UL coverage with low-band, DL on high-band
- SUL carrier configuration, switching criteria

#### 14.3 NR-U (Unlicensed Spectrum)
- Listen Before Talk (LBT) — Cat 1-4
- Channel access procedures
- Frame-based equipment (FBE) vs Load-based equipment (LBE)

#### 14.4 IAB (Integrated Access & Backhaul)
- IAB architecture — IAB-donor, IAB-node
- BH RLC channels, BAP layer
- Topology adaptation, route management

#### 14.5 RedCap / NR-Light
- Reduced capability UEs — use cases (wearables, sensors)
- Reduced BW (20MHz FR1, 100MHz FR2), fewer Rx antennas
- Initial UL BWP for RedCap, separate initial access

#### 14.6 NTN (Non-Terrestrial Networks)
- LEO, MEO, GEO satellite access
- Propagation delay handling, timing advance
- Earth-fixed vs Earth-moving beams

#### 14.7 Positioning & Location Services
- DL-TDOA, UL-TDOA, Multi-RTT, DL-AoD, UL-AoA
- PRS (Positioning Reference Signal)
- LMF (Location Management Function)

---

## Notes Index

| # | Topic | Topic Section | Description |
|---|-------|--------------|-------------|
| 01 | [Market Trends & Top Features](./01-market-trends-and-features.md) | [0. Foundations](#0-foundations--context) | Full landscape of operator-demanded features |
| 02 | [3GPP Organization & Releases](./02-3gpp-organization-and-releases.md) | [0. Foundations](#0-foundations--context) | How 3GPP works, spec numbering, release-by-release map |
| 03 | [Telecom Evolution: 1G to 6G](./03-telecom-evolution-1g-to-6g.md) | [0. Foundations](#0-foundations--context) | Generation-by-generation history, 5G vs LTE, 6G outlook |
| 04 | [CU-CP Resiliency & HA](./04-cucp-resiliency-and-ha.md) | [1.2 gNB Architecture](#12-gnb-architecture--functional-split) | Active/Standby vs Active/Active, state sync, SCTP failover |
| 05 | [Redis in Cloud-Native RAN](./05-redis-in-cloud-native-ran.md) | [1.2 gNB Architecture](#12-gnb-architecture--functional-split) | Why Redis is used for RAN state, how to code for it in C |

---

*This file is auto-maintained. It updates whenever a new note is added.*
