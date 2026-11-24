# System Information (MIB, SIB1, and All SIB Types)

## Overview
System Information (SI) is the mechanism by which a gNB continuously broadcasts its identity, radio resource configuration, and supported features to every User Equipment (UE) in the cell. Without reading System Information, a UE cannot perform cell selection, evaluate reselection, initiate random access, or access specialized services (e.g., NTN, Sidelink, RedCap).

This note provides an architectural breakdown of the 5G SI delivery mechanism (**Minimum SI vs. Other SI** / On-Demand SI), the **Master Information Block (MIB)**, **SIB1 (RMSI)**, and an exhaustive master reference of **all 3GPP 5G NR SIB types (SIB1 through SIB27 and SIBpos)**—detailing when each was introduced (Rel-15 through Rel-19) and its exact operational purpose.

---

## Content

### 1. 5G SI Delivery Framework: Minimum SI vs. Other SI (OSI)

In LTE, all System Information Blocks were periodically broadcast over the air, consuming substantial radio energy even in empty cells. 5G NR redesigned SI into a flexible two-tier hierarchy:

```
[System Information Architecture]
├── Minimum SI (Always Broadcast Periodically)
│   ├── MIB (Carried on PBCH within the SSB)
│   └── SIB1 / RMSI (Carried on PDSCH, scheduled by PDCCH with SI-RNTI)
│
└── Other SI / OSI (Broadcast Periodically OR Provided On-Demand)
    ├── SIB2 to SIB9 (Core mobility, public warning, time)
    ├── SIB10 to SIB18 (NPN, measurements, sidelink, slicing, NR-U)
    ├── SIB19, SIB26, SIB27 (NTN satellite assistance & service areas)
    ├── SIB20, SIB21, SIB24 (Multicast/Broadcast Services - MBS)
    ├── SIB22, SIB23 (ATG, Sidelink Positioning)
    └── SIBpos (Dedicated Positioning Assistance Data)
```

| Dimension | Minimum SI | Other SI (OSI) |
| :--- | :--- | :--- |
| **Components** | MIB + SIB1 | SIB2 through SIB27+, `SIBpos` |
| **Transmission Mode** | Always periodically broadcast | Periodically broadcast OR **On-Demand** |
| **Physical Channel** | PBCH (MIB), PDSCH (SIB1) | PDSCH (bundled into `SystemInformation` messages) |
| **Trigger Mechanism** | Autonomous UE decode upon cell search | Configured in SIB1; requested by UE via Msg1 or Msg3 RACH |

---

### 2. Master Information Block (MIB)

* **Physical Channel:** PBCH (Physical Broadcast Channel), occupying the central 20 RBs of the SSB.
* **Periodicity:** 80 ms (repeated every 20 ms within that window for beam-sweeping robustness).
* **Role:** Provides the bare minimum physical-layer parameters to locate and decode SIB1.

| MIB Field | Bit Width | Purpose & Technical Significance |
| :--- | :--- | :--- |
| `systemFrameNumber` | 6 bits (MSBs) | Most Significant Bits of the 10-bit SFN. The 4 LSBs are conveyed implicitly by the PBCH transport block timing. |
| `subCarrierSpacingCommon` | 1 bit | Subcarrier spacing for SIB1, Msg2 (RAR), and Msg4: `15/30 kHz` for FR1, `60/120 kHz` for FR2. |
| `ssb-SubcarrierOffset` ($k_{SSB}$) | 4 bits | Subcarrier offset of the SSB relative to the common subcarrier grid (CRB 0). Identifies carrier center. |
| `dmrs-TypeA-Position` | 1 bit | Time-domain position of the first DMRS symbol (`pos2` or `pos3`) for PDSCH/PUSCH demodulation. |
| `pdcch-ConfigSIB1` | 8 bits | **The Critical Link:** 4 MSBs configure CORESET#0; 4 LSBs configure SearchSpace#0. Enables UE to decode the PDCCH that schedules SIB1. |
| `cellBarred` | 1 bit | `barred` or `notBarred`. If barred, UEs cannot camp or perform access. |
| `intraFreqReselection` | 1 bit | If cell is barred, indicates whether UE is allowed to reselect to other cells on the same carrier frequency. |

---

### 3. System Information Block Type 1 (SIB1 / RMSI)

* **Physical Channel:** PDSCH (scheduled by PDCCH using `SI-RNTI = 0xFFFF`).
* **Periodicity:** 160 ms (typically repeated every 20 ms).
* **Role:** The gateway to network access. SIB1 dictates whether a UE is allowed to camp on the cell, provides cell selection thresholds, common RACH and BWP configurations, and schedules all other SIBs.

#### Key Functional Groups in SIB1
1. **`cellAccessRelatedInfo`**: Carries `plmn-IdentityList`, `trackingAreaCode` (24 bits), `cellIdentity` (NCI, 36 bits), and cell reservation/barring flags for slicing and NPNs.
2. **`cellSelectionInfo`**: Minimum RF signal thresholds ($Q_{rxlevmin}, Q_{qualmin}$) required to satisfy the **S-Criterion** (TS 38.304).
3. **`si-SchedulingInfo`**: Contains the SI-window length (5, 10, 20, 40, 80 ms), periodicities, and mapping of SIBs into `SystemInformation` transport blocks. It explicitly flags whether each SIB is **broadcast** or **on-demand**.
4. **`servingCellConfigCommon`**: Configures `initialDownlinkBWP` and `initialUplinkBWP`, including PRACH configuration (`rach-ConfigCommon`), preamble formats, SSB-to-RO mapping, and default PUSCH/PUCCH parameters.

---

### 4. Master Reference Table: All 5G NR SIB Types

Below is the complete catalog of all System Information Blocks standardized in **3GPP TS 38.331** from Release 15 through Release 19:

| SIB Type | 3GPP Release | Primary Category | Purpose & Technical Scope |
| :--- | :---: | :--- | :--- |
| **MIB** | Rel-15 | Physical Broadcast | Bootstrap data: SFN MSBs, $k_{SSB}$, and `pdcch-ConfigSIB1` (CORESET#0/SearchSpace#0). |
| **SIB1** | Rel-15 | Minimum SI (RMSI) | Cell access parameters (PLMN, TAC, NCI), cell selection thresholds, initial BWP, SI scheduling. |
| **SIB2** | Rel-15 | Cell Reselection | Common cell reselection configuration: thresholds ($S_{intraSearchP/Q}$, $S_{nonIntraSearchP/Q}$), reselection timers ($T_{reselection}$), and hysteresis ($Q_{hyst}$). |
| **SIB3** | Rel-15 | Intra-Freq Reselection | Neighbor cell list, cell-specific offsets ($Q_{offset\_s,n}$), and blacklisted cells on the serving frequency. |
| **SIB4** | Rel-15 | Inter-Freq Reselection | Neighbor carrier frequencies, cell reselection priority ($0\text{--}7$), search thresholds, and blacklists. |
| **SIB5** | Rel-15 | Inter-RAT Reselection | Neighbor E-UTRA (LTE) carrier frequencies, priorities, and thresholds for 5G $\to$ 4G cell reselection. |
| **SIB6** | Rel-15 | Public Warning | **ETWS Primary Notification:** Earthquake & Tsunami Warning System urgent alert type. |
| **SIB7** | Rel-15 | Public Warning | **ETWS Secondary Notification:** Detailed warning text and disaster recovery information. |
| **SIB8** | Rel-15 | Public Warning | **CMAS Notification:** Commercial Mobile Alert System (presidential alerts, amber alerts, extreme weather). |
| **SIB9** | Rel-15 | System Time | GPS time, Coordinated Universal Time (UTC), and local time offset/leap seconds. |
| **SIB10** | Rel-16 | Non-Public Networks | Human-Readable Network Names (**HRNN**) for Stand-alone Non-Public Networks (SNPN). |
| **SIB11** | Rel-16 | Idle/Inactive RRM | Configuration for idle/inactive measurements (`measIdleConfigSIB`) to support early measurement reporting. |
| **SIB12** | Rel-16 | Sidelink / V2X | NR Sidelink (PC5 interface) communication and discovery configurations. |
| **SIB13** | Rel-16 | Sidelink / V2X | NR Sidelink resource pool configurations, synchronization reference priority, and SL-SSB settings. |
| **SIB14** | Rel-16 | Sidelink / V2X | Sidelink geographical area configurations (mapping zone IDs for resource allocation). |
| **SIB15** | Rel-17 | Emergency / Resiliency | **Disaster Roaming:** Lists PLMNs where disaster conditions apply, permitting inbound emergency roaming. |
| **SIB16** | Rel-17 | Network Slicing | **Slice-Based Cell Reselection:** Frequency priority lists associated with Network Slice Access Groups (NSAGs). |
| **SIB17** | Rel-16 | Unlicensed (NR-U) | Channel access configurations, Listen-Before-Talk (LBT) parameters, and energy detection thresholds for 5GHz/6GHz. |
| **SIB18** | Rel-16 | Non-Public Networks | Closed Access Group (**CAG**) selection information for SNPNs and Public Network Integrated NPNs. |
| **SIB19** | Rel-17 | Non-Terrestrial (NTN) | Satellite assistance: Ephemeris (position/velocity or orbital), common TA, drift, $K_{offset}$, polarization, cell coverage. |
| **SIB20** | Rel-17 | Multicast/Broadcast | **MBS Control:** MCCH (Multicast Control Channel) configuration and Point-to-Multipoint (PTM) scheduling. |
| **SIB21** | Rel-17 | Multicast/Broadcast | **MBS Continuity:** Frequency Selection Area Identity (FSAI) lists for maintaining broadcast reception across cells. |
| **SIB22** | Rel-18 | Air-to-Ground (ATG) | Parameters for airborne UEs connecting to dedicated ground base stations (high-speed Doppler/TA). |
| **SIB23** | Rel-18 | Sidelink Positioning | Resource pool and allocation parameters for Sidelink Positioning Reference Signals (SL-PRS). |
| **SIB24** | Rel-18 | MBS in Inactive | Acquisition of multicast control (MCCH/MTCH) while the UE remains in `RRC_INACTIVE` state. |
| **SIB25** | Rel-18 | Sidelink Relay | Sidelink UE-to-Network relay discovery and service authorization parameters. |
| **SIB26** | Rel-18 | NTN Enhancements | Extended ephemeris parameters, high-accuracy orbit extrapolation, and multi-satellite assistance. |
| **SIB27** | Rel-19 | NTN MBS Coverage | **Intended Service Area (ISA):** Geographic bounds (circles and 3-15 sided polygons) for satellite broadcast services. |
| **SIBpos** | Rel-16/17 | Positioning (LCS) | Dedicated assistance data (`SIBpos1-1` to `SIBpos5-1`) for DL-PRS, RTK, and SSR corrections (TS 37.355). |

---

### 5. On-Demand SI Request Mechanism

When SIB1 flags an OSI block as `notBroadcast`, a UE needing that SIB triggers an on-demand SI acquisition procedure:

```
    UE                                                               gNB
    |                                                                 |
    |---- 1. Msg1: Dedicated PRACH Preamble (or Msg3 SI Request) ---->|
    |                                                                 |
    |<--- 2. Msg2: Random Access Response (PDCCH/PDSCH) --------------|
    |                                                                 |
    |<--- 3. Broadcast of Requested SIB within SI-Window ------------|
```

1. **Dedicated Preamble Method (Msg1-based):**
   * If SIB1 configures dedicated PRACH preambles mapped to specific SIBs or SI messages, the UE transmits the corresponding preamble in Msg1.
   * Lowest latency, minimal overhead; gNB detects the preamble and broadcasts the requested SIB in the next SI-window.
2. **Message 3 Method (Msg3-based):**
   * If no dedicated preambles are provided, the UE executes a contention-based RACH and delivers an `RRCSystemInfoRequest` message in Msg3, explicitly listing the requested SIBs.

---

### Interview Traps & Gotchas

🪤 **Trap 1: "In LTE, SIB10 and SIB11 carried ETWS. Do they do the same in 5G NR?"**
- **Gotcha:** Engineers with LTE backgrounds assume SIB numbers are identical across generations.
- **Answer:** **No!** In 5G NR, ETWS is carried strictly by **SIB6 (Primary)** and **SIB7 (Secondary)**. 
  In 5G NR, **SIB10** is repurposed for Human-Readable Network Names (HRNN) in Non-Public Networks, and **SIB11** carries Idle/Inactive measurement configurations (`measIdleConfigSIB`).

🪤 **Trap 2: "Can a UE in RRC_CONNECTED receive SIB updates via dedicated signaling?"**
- **Gotcha:** Assuming UEs must always decode broadcast channels to get updated SIBs.
- **Answer:** If a cell's system information changes, the gNB notifies connected UEs via a `Short Message` on PDCCH (or paging). However, when reconfiguring connected UEs for mobility, the network can supply serving cell common parameters (`ServingCellConfigCommon`) directly inside dedicated `RRCReconfiguration` messages, avoiding the need for the UE to pause unicast reception to decode broadcast SI.

🪤 **Trap 3: "Why doesn't 5G just broadcast SIB19, SIB20, and SIBpos to all devices?"**
- **Gotcha:** Underestimating broadcast overhead.
- **Answer:** SIBs like SIB19 (satellite ephemeris), SIB20 (multicast broadcast), and SIBpos (positioning correction grids) contain massive payloads (multiple transport blocks). Continuously broadcasting them would congest PDSCH capacity. Configuring them as **On-Demand** ensures they are only transmitted when interested UEs are actively present.

---

## Key Takeaways
- **Minimum SI vs OSI:** Minimum SI (MIB + SIB1) is always broadcast periodically; Other SI (SIB2 to SIB27+) can be broadcast or delivered on-demand via RACH.
- **MIB's Sole Duty:** Tells the UE where to locate CORESET#0 / SearchSpace#0 via `pdcch-ConfigSIB1` to decode SIB1.
- **SIB1's Critical Duty:** Carries cell access rules, TAC, cell identity, cell selection criteria ($S$-criterion), initial BWP parameters, and the SI-window scheduling table.
- **Generational Numbering Shift:** LTE SIB allocations do not match 5G NR. ETWS moved to SIB6/SIB7, while SIB10+ in NR covers NPN, Sidelink, Slicing, NTN, MBS, and ATG.
- **Specialized Modern SIBs:** SIB15 (Disaster Roaming), SIB16 (Slice Reselection), SIB19 (NTN Ephemeris), SIB20/21 (MBS), SIB22 (ATG), SIB27 (NTN MBS Polygons).

---
*Last updated: 2026-10-30*
