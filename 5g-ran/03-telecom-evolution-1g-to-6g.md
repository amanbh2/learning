# Telecom Evolution: 1G to 6G

## Overview
A concise history of how mobile telecom evolved generation by generation — what each generation introduced, the key technologies, and where we're heading with 6G. Essential context for understanding *why* 5G NR is designed the way it is.

## Content

### 1G — Analog Voice (1980s)

| Aspect | Detail |
|--------|--------|
| **Standard** | AMPS (Advanced Mobile Phone System), NMT, TACS |
| **Technology** | Analog FM (Frequency Modulation) |
| **What it did** | Voice calls only — no data |
| **Data rate** | 2.4 kbps (essentially none) |
| **Key limitation** | No encryption, no roaming standards, poor spectrum efficiency, easy to eavesdrop |
| **Cell concept** | Introduced the **cellular architecture** — frequency reuse across geographic cells |

**Why it matters:** The fundamental idea of dividing geography into cells with frequency reuse was born here. Every generation since builds on this concept.

---

### 2G — Digital Voice & SMS (1990s)

| Aspect              | Detail                                                       |
| ------------------- | ------------------------------------------------------------ |
| **Standard**        | GSM (Europe), IS-95/cdmaOne (US)                             |
| **Technology**      | Digital modulation — TDMA (GSM) or CDMA (IS-95)              |
| **What it added**   | Digital voice, SMS, basic data (circuit-switched)            |
| **Data rate**       | 9.6–14.4 kbps (GSM), up to 64 kbps (IS-95)                   |
| **Key innovations** | SIM card, encryption (A5 cipher), international roaming, SMS |

**Evolution within 2G:**
- **GPRS (2.5G)** — Packet-switched data overlay on GSM. Up to 114 kbps. Introduced the concept of "always-on" data.
- **EDGE (2.75G)** — Enhanced data rates using 8PSK modulation. Up to 384 kbps.

**Why it matters:** The shift from analog to digital was the most fundamental leap. GSM's architecture (BTS → BSC → MSC) established the hierarchical RAN model. GPRS introduced packet switching — the foundation of all mobile data.

---

### 3G — Mobile Broadband Begins (2000s)

| Aspect              | Detail                                                                 |
| ------------------- | ---------------------------------------------------------------------- |
| **Standard**        | UMTS (WCDMA) — 3GPP, cdma2000 — 3GPP2                                  |
| **Technology**      | Wideband CDMA (5 MHz channels)                                         |
| **What it added**   | Video calling, mobile internet, app stores                             |
| **Data rate**       | 384 kbps (R99) → 14.4 Mbps DL (HSDPA) → 42 Mbps (HSPA+)                |
| **Key innovations** | Soft handover, RAKE receiver, power control, variable spreading factor |
| **Architecture**    | Node B → RNC → CN (added RNC as radio controller)                      |

**Evolution within 3G:**
- **HSDPA (Rel-5, 3.5G)** — Moved scheduling from RNC to Node B. Introduced HARQ, AMC, short TTI (2ms). Up to 14.4 Mbps DL.
- **HSUPA (Rel-6)** — Same for uplink. Up to 5.76 Mbps UL.
- **HSPA+ (Rel-7/8)** — 64QAM, MIMO, dual-carrier. Up to 42 Mbps DL.

**Why it matters:** HSDPA was a pivotal moment — it proved that moving intelligence *closer to the air interface* (Node B scheduling instead of RNC scheduling) dramatically improves latency and throughput. This lesson directly shaped LTE's flat architecture.

---

### 4G — LTE & True Mobile Internet (2010s)

| Aspect | Detail |
|--------|--------|
| **Standard** | LTE (Rel-8), LTE-Advanced (Rel-10), LTE-Advanced Pro (Rel-13) |
| **Technology** | OFDMA (DL), SC-FDMA (UL) |
| **What it added** | HD video streaming, VoLTE, app economy explosion |
| **Data rate** | 100 Mbps (Rel-8) → 1 Gbps (Rel-10 with CA+MIMO) → 3 Gbps (Rel-13) |
| **Key innovations** | OFDM, flat architecture (eNB only, no RNC), all-IP, MIMO, CA |
| **Architecture** | eNB → EPC (flat — no RNC!) |

**Revolutionary changes in LTE:**
- **Flat architecture** — Eliminated the RNC entirely. eNB handles all radio resource management. This reduced latency from ~100ms (3G) to ~10ms.
- **OFDMA** — Replaced CDMA. Each user gets a subset of subcarriers, eliminating intra-cell interference. Much simpler receiver design.
- **All-IP** — No more circuit-switched voice (eventually). Everything is packets.
- **MIMO** — 2x2, 4x4, 8x8 antenna configurations for spatial multiplexing.
- **Carrier Aggregation (Rel-10)** — Combine up to 5 carriers (later 32) to increase bandwidth.

**Why it matters:** LTE established the design principles that 5G NR directly inherits — OFDM, flat architecture, HARQ at MAC, AMC, MIMO, all-IP. Understanding LTE deeply makes 5G NR intuitive.

---

### 5G — NR: Performance, Flexibility & Verticals (2020s)

| Aspect | Detail |
|--------|--------|
| **Standard** | NR (Rel-15 onwards) |
| **Technology** | CP-OFDM (DL & UL), DFT-s-OFDM (UL option) |
| **What it added** | eMBB, URLLC, mMTC, network slicing, mmWave, O-RAN |
| **Data rate** | 10-20 Gbps (peak theoretical) |
| **Latency** | 1ms (URLLC target), ~4ms (typical eMBB) |
| **Key innovations** | Flexible numerology, massive MIMO, beamforming, BWP, mini-slot, CU/DU split |
| **Architecture** | gNB (CU/DU/RU) → 5GC |

**What 5G NR changed vs LTE:**

| Aspect | LTE | 5G NR |
|--------|-----|-------|
| Waveform | OFDMA DL, SC-FDMA UL | CP-OFDM both DL & UL (DFT-s-OFDM optional UL) |
| Subcarrier spacing | Fixed 15 kHz | Flexible: 15, 30, 60, 120, 240 kHz |
| Spectrum | Sub-6 GHz only | Sub-6 GHz (FR1) + mmWave 24-52 GHz (FR2) |
| Channel coding | Turbo codes (data), TBCC (control) | LDPC (data), Polar (control) |
| Architecture | Monolithic eNB | Disaggregated CU/DU/RU |
| Duplex | FDD or TDD | Flexible TDD (dynamic slot formats) |
| HARQ | Synchronous (fixed timing) | Asynchronous (flexible K1 timing) |
| Control channel | PDCCH in first 1-3 symbols | CORESET — flexible time/freq placement |
| Reference signals | CRS (always-on, cell-specific) | DMRS (UE-specific, on-demand) — no CRS overhead |
| Beamforming | Basic (limited TM modes) | Native beam management (SSB sweep, CSI-RS, TCI states) |
| Network slicing | Not natively supported | First-class citizen (S-NSSAI, slice-aware scheduling) |

**The three pillars of 5G:**
- **eMBB** (enhanced Mobile Broadband) — High throughput for video, AR/VR.
- **URLLC** (Ultra-Reliable Low-Latency Communication) — 1ms latency, 99.999% reliability for industrial control, autonomous driving.
- **mMTC** (massive Machine-Type Communication) — 1 million devices/km² for IoT.

---

### 5G-Advanced (Rel-18/19) — The Bridge to 6G

| Focus Area | Key Enhancements |
|-----------|-----------------|
| **AI/ML native** | AI in CSI feedback, beam prediction, scheduling, energy management |
| **MIMO evolution** | Multi-panel, 8Tx UL, distributed MIMO |
| **Mobility** | L1/L2 triggered mobility (LTM), enhanced CHO |
| **Sustainability** | Network energy saving framework, adaptive TRP management |
| **New use cases** | XR optimization, ISAC (sensing + communication), ambient IoT |
| **Coverage** | NTN (satellite) maturity, RedCap evolution, advanced positioning |

---

### 6G — What to Expect (~2030+)

| Aspect | Expected Direction |
|--------|-------------------|
| **Timeline** | Rel-21 (~2029) expected as first 6G release. Commercial deployments ~2030-2032. |
| **Data rate** | 100 Gbps – 1 Tbps peak |
| **Latency** | Sub-0.1ms |
| **Frequency** | Sub-THz (100 GHz – 300 GHz), terahertz bands |
| **AI** | Fully AI-native — AI not just optimizing the network, but *being* the network |
| **Architecture** | Cell-free / Distributed MIMO — no cell boundaries, UEs served by a "cloud" of access points |
| **Sensing** | ISAC native — radio network doubles as a radar/sensing platform |
| **Digital twin** | Real-time digital replica of the physical network for simulation, optimization |
| **Sustainability** | Zero-energy devices (energy harvesting from RF), carbon-neutral operation |
| **New capabilities** | Holographic communication, telepresence, brain-computer interfaces, universal coverage (terrestrial + satellite + airborne) |

**Interview insight:** When asked "what's coming after 5G?", the strong answer isn't just "faster speeds." It's: cell-free architecture, AI-native operation, ISAC, sub-THz bands, and digital twins. These show you think architecturally, not just incrementally.

---

### The Generational Pattern

```
1G → 2G:  Analog → Digital (fundamental shift)
2G → 3G:  Voice → Data (CDMA, mobile internet)
3G → 4G:  CDMA → OFDM (flat architecture, all-IP, real broadband)
4G → 5G:  Flexibility (numerology, slicing, mmWave, verticals)
5G → 6G:  Intelligence (AI-native, sensing, cell-free, sub-THz)
```

Each generation took ~10 years from standardization to mass adoption. 5G is in its growth phase now, with 5G-Advanced (Rel-18/19) bridging toward 6G.

## Key Takeaways
- Every generation solved a specific problem: 1G=mobility, 2G=digital, 3G=data, 4G=broadband, 5G=flexibility+verticals, 6G=intelligence+sensing.
- **LTE's flat architecture** (killing the RNC) was the most impactful architectural decision — 5G NR builds directly on it.
- **5G NR vs LTE** — the key differences are: flexible numerology, LDPC/Polar codes, no CRS (DMRS-only), CORESET-based PDCCH, native beam management, CU/DU split, and network slicing.
- **5G-Advanced** (Rel-18/19) is where the industry is NOW — AI/ML, LTM, energy saving, ISAC.
- **6G** = cell-free MIMO + AI-native + ISAC + sub-THz + digital twin. First specs ~2029.

---
*Last updated: 2026-07-27*
