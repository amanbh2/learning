# 3GPP: Organization, Specifications & Releases

## Overview
How 3GPP works as a standards body, how specifications are structured and numbered, and what each major release brought to the table — from GSM all the way to 5G-Advanced and the road to 6G.

## Content

### 1. What is 3GPP?

3GPP (3rd Generation Partnership Project) is a collaboration of 7 regional telecom standards bodies (ETSI, ARIB, ATIS, CCSA, TTA, TTC, TSDSI) that produces the technical specifications governing mobile networks globally.

**Key point:** 3GPP doesn't build products. It writes specifications (TS) and reports (TR) that vendors (Ericsson, Nokia, Samsung, etc.) implement.

### 2. How 3GPP is Organized

#### Technical Specification Groups (TSGs)

| TSG | Full Name | What It Covers |
|-----|-----------|---------------|
| **TSG RAN** | Radio Access Network | Air interface (PHY, MAC, RLC, PDCP, RRC), RAN architecture, RF performance, conformance testing |
| **TSG SA** | Service & System Aspects | Overall architecture (5GC), security, codecs, QoS framework, management |
| **TSG CT** | Core Network & Terminals | Core network protocols (NAS, GTP, Diameter), SIM/USIM, terminal interfaces |

#### RAN Working Groups (Most Relevant for You)

| WG | Focus | Key Specs | What They Decide |
|----|-------|-----------|-----------------|
| **RAN1** | Physical Layer | 38.211, 38.212, 38.213, 38.214 | Waveform, modulation, coding, HARQ, MIMO, scheduling grants |
| **RAN2** | L2 & L3 Protocols | 38.321 (MAC), 38.322 (RLC), 38.323 (PDCP), 38.331 (RRC) | Protocol procedures, state machines, message formats, IEs |
| **RAN3** | Architecture & Interfaces | 38.401, 38.413 (NGAP), 38.423 (XnAP), 38.473 (F1AP) | gNB architecture, CU/DU split, inter-node interfaces |
| **RAN4** | RF & RRM | 38.101, 38.104, 38.133 | Tx/Rx requirements, band definitions, RRM measurement requirements |
| **RAN5** | Conformance Testing | 38.508, 38.521 | Test cases for UE conformance |

**Interview tip:** If someone asks "where would I find the definition of HARQ-ACK codebook?" → RAN1 specs (38.213). "Where is RRC Reconfiguration defined?" → RAN2 spec (38.331). Knowing which WG owns what shows deep understanding.

### 3. Specification Numbering

```
TS 38.331 V17.4.0
│  │  │    │
│  │  │    └── Version: Release.Major.Minor
│  │  └─────── Spec number within series
│  └────────── Series (38 = NR, 36 = LTE, 25 = UMTS, 23 = Architecture)
└───────────── TS = Technical Specification (vs TR = Technical Report)
```

**Key series for a RAN engineer:**

| Series | Technology | Example Specs |
|--------|-----------|---------------|
| **38.xxx** | 5G NR (NG-RAN) | 38.211 (PHY channels), 38.331 (RRC), 38.321 (MAC) |
| **36.xxx** | LTE (E-UTRA) | 36.211 (PHY), 36.331 (RRC), 36.321 (MAC) |
| **37.xxx** | Multi-RAT | 37.340 (EN-DC/MR-DC), 37.213 (physical layer for MR-DC) |
| **23.xxx** | Architecture | 23.501 (5GS architecture), 23.502 (procedures) |
| **25.xxx** | UMTS/WCDMA | 25.331 (RRC), 25.214 (PHY) |
| **33.xxx** | Security | 33.501 (5G security architecture) |

**Interview tip:** When a spec says "Rel-17", it means the feature was first introduced or significantly changed in that release. The version number (e.g., V17.4.0) tells you the exact revision.

### 4. How Releases Work

A "Release" is a coherent set of features that are developed, specified, and frozen together. The timeline:

1. **Study Phase** — TSG produces Technical Reports (TR) exploring feasibility.
2. **Work Item Phase** — Approved features become Work Items, and Technical Specifications (TS) are written/updated.
3. **Freeze** — The release is "frozen" — no new features added, only bug fixes (called ASN.1 and functional freeze, then protocol freeze).
4. **Maintenance** — Corrections and clarifications continue for years after freeze.

### 5. Release-by-Release: What Came When

#### Pre-4G Era (Context)

| Release | Year Frozen | Generation | Key Milestone |
|---------|-------------|-----------|--------------|
| R99 | 2000 | 3G (UMTS) | First WCDMA spec, 384 kbps |
| Rel-4 | 2001 | 3G | All-IP core network concept |
| Rel-5 | 2002 | 3.5G | **HSDPA** (DL up to 14 Mbps) |
| Rel-6 | 2005 | 3.5G | **HSUPA** (UL up to 5.7 Mbps) |
| Rel-7 | 2007 | 3.75G | HSPA+ (64QAM DL, MIMO) |

#### 4G LTE Era

| Release | Year Frozen | Key Features |
|---------|-------------|-------------|
| **Rel-8** | 2008 | **LTE launch** — OFDMA DL, SC-FDMA UL, flat architecture (eNB only, no RNC), up to 300 Mbps DL |
| **Rel-9** | 2009 | eMBMS (broadcast), eICIC (inter-cell interference), dual-layer beamforming |
| **Rel-10** | 2011 | **LTE-Advanced** — Carrier Aggregation (up to 5CC), enhanced MIMO (8x8 DL), Relay nodes, eICIC |
| **Rel-11** | 2012 | CoMP (Coordinated Multi-Point), further CA enhancements, FeICIC |
| **Rel-12** | 2014 | Dual Connectivity, D2D (Device-to-Device), MTC enhancements, small cell enhancements |
| **Rel-13** | 2015 | **LTE-Advanced Pro** — LAA (Licensed-Assisted Access), LTE-M, NB-IoT, 256QAM DL, massive CA (32CC) |
| **Rel-14** | 2017 | V2X (Vehicle-to-everything), eLAA, further NB-IoT/LTE-M enhancements, MBMS improvements |

#### 5G NR Era

| Release | Year Frozen | Key Features |
|---------|-------------|-------------|
| **Rel-15** | 2018 | **5G Phase 1** — NR air interface (CP-OFDM, flexible numerology), NSA (Option 3x) then SA (Option 2), eMBB focus, gNB architecture, new channel structures (SSB, CORESET, BWP), LDPC/Polar codes, beam management |
| **Rel-16** | 2020 | **5G Phase 2** — URLLC enhancements, NR V2X, NR-U (unlicensed), IAB, MIMO enhancements (multi-TRP), power saving (PDCCH-based adaptation), 2-step RACH, positioning, IIoT/TSN support |
| **Rel-17** | 2022 | NTN (satellite), RedCap, NR sidelink enhancements, multi-SIM, expanded MIMO (up to FR2 codebook enhancements), small data transmission (SDT), dynamic spectrum sharing enhancements, NR multicast/broadcast, coverage enhancements (PUSCH/PUCCH repetition) |

#### 5G-Advanced Era

| Release | Year Frozen | Key Features |
|---------|-------------|-------------|
| **Rel-18** | 2024 | **5G-Advanced Phase 1** — AI/ML for air interface (CSI, beam management, positioning), further MIMO evolution (multi-panel, 8Tx UL), L1/L2 triggered mobility (LTM), network energy saving framework, XR enhancements, RedCap evolution (eRedCap), NTN enhancements, sidelink evolution, duplex evolution (SBFD) |
| **Rel-19** | 2025-2026 | **5G-Advanced Phase 2** — Integrated Sensing & Communication (ISAC), AI/ML air interface phase 2, advanced NTN (regenerative payloads), ambient IoT, further LTM enhancements, XR phase 2, advanced positioning |

#### Road to 6G

| Release | Timeline | Expected Focus |
|---------|----------|---------------|
| **Rel-20** | ~2027 | Last 5G-Advanced release, 6G study items begin |
| **Rel-21** | ~2029 | **First 6G release** — sub-THz, AI-native, cell-free MIMO, digital twin, ISAC native, possibly new waveforms |

### 6. Feature-to-Release Quick Reference

For interviews, you often need to know "which release introduced X?":

| Feature | Release | Notes |
|---------|---------|-------|
| NR air interface (basic) | Rel-15 | CP-OFDM, LDPC/Polar, BWP, SSB |
| NSA (EN-DC) | Rel-15 | Option 3/3a/3x |
| SA (standalone 5G) | Rel-15 | Option 2 |
| 2-step RACH | Rel-16 | MsgA + MsgB |
| NR-U (unlicensed) | Rel-16 | LBT-based channel access |
| IAB | Rel-16 | Self-backhauling |
| URLLC (full) | Rel-16 | Mini-slot scheduling, duplication |
| Positioning (NR) | Rel-16 | DL-TDOA, Multi-RTT |
| Multi-TRP | Rel-16 | Single/multi-DCI |
| NTN | Rel-17 | LEO/GEO satellite access |
| RedCap | Rel-17 | 20MHz BW, 1Rx/2Rx |
| SDT | Rel-17 | Data in RRC_INACTIVE |
| CHO | Rel-16 | Conditional handover |
| DAPS HO | Rel-16 | Dual active protocol stack |
| DSS | Rel-15/16 | LTE-NR coexistence |
| MOCN | Rel-15 (NR) | Multi-PLMN in gNB |
| AI/ML air interface | Rel-18 | CSI, beam, positioning |
| LTM (L1/L2 mobility) | Rel-18 | Fast cell switching |
| eRedCap | Rel-18 | Further reduced capability |
| ISAC | Rel-19 | Sensing + communication |

### 7. How to Read a 3GPP Spec (Practical Tips)

1. **Start with 38.300** — it's the overall NR architecture description. Great for context.
2. **Use the ASN.1** — RRC messages in 38.331 are defined in ASN.1. Learn to read `RRCReconfiguration ::= SEQUENCE { ... }`.
3. **Search by section number** — specs are heavily cross-referenced. If 38.321 says "see clause 5.1.4 of 38.213", go read it.
4. **Track CRs** — Change Requests (CRs) show what changed between releases. Very useful for understanding feature evolution.
5. **Use 3GPP Portal** — https://portal.3gpp.org lets you search specs, CRs, and meeting documents.

## Key Takeaways
- 3GPP organizes work into **TSGs** (RAN, SA, CT) and **Working Groups** (RAN1-RAN5). For a RAN engineer, RAN1-RAN4 are your daily bread.
- Specs follow a `<series>.<number>` pattern: **38.xxx = NR**, **36.xxx = LTE**, **23.xxx = architecture**.
- **Rel-15** = basic 5G, **Rel-16** = URLLC/V2X/full feature set, **Rel-17** = NTN/RedCap/SDT, **Rel-18/19** = 5G-Advanced (AI/ML, ISAC, LTM).
- Knowing which release introduced a feature is a common interview question — the quick reference table above is your cheat sheet.
- The ability to navigate and read 3GPP specs (especially 38.331, 38.321, 38.211-214) is what separates a "knows 5G" engineer from a "works with 5G" engineer.

---
*Last updated: 2026-07-27*
