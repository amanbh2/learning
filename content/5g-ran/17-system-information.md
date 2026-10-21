# System Information (MIB, SIB1, OSI)

## Overview
System Information is the mechanism by which a gNB continuously broadcasts its identity and configuration to every UE in the cell. Without reading System Information, a UE cannot access the network. It is the gNB's "public notice board."

## 1. The 5G Paradigm: Minimum SI vs Other SI

| Category | Contents | Broadcast? | Channel |
|----------|----------|-----------|---------|
| **Minimum SI** | MIB + SIB1 | ✅ Always broadcast periodically | PBCH (MIB), PDSCH (SIB1) |
| **Other SI (OSI)** | SIB2 through SIB9+ | ⚠️ Can be broadcast OR **on-demand** | PDSCH |

> [!IMPORTANT]
> **On-Demand SI (5G exclusive):** In LTE, ALL SIBs are periodically broadcast, wasting energy. In 5G, the gNB can mark certain SIBs as "on-demand." If no UE needs SIB4, the gNB doesn't broadcast it at all. A UE that needs it must explicitly request it via a RACH procedure. This saves massive energy in low-traffic cells.

## 2. Master Information Block (MIB)

- **Carried on:** PBCH (Physical Broadcast Channel), inside the SSB
- **Periodicity:** 80 ms (repeated every 20 ms within that window for robustness)
- **Purpose:** The absolute bare minimum to find and decode SIB1

### MIB Contents (Field-by-Field)
| Field | Size | What It Tells the UE |
|-------|------|---------------------|
| `systemFrameNumber` | 6 bits (MSBs) | Upper bits of the System Frame Number. Combined with PBCH payload bits for full 10-bit SFN. |
| `subCarrierSpacingCommon` | 1 bit | SCS for SIB1 and Msg2/Msg4: either 15/30 kHz (FR1) or 60/120 kHz (FR2) |
| `ssb-SubcarrierOffset` | 4 bits | Frequency offset of SSB within the carrier — helps UE find the exact carrier center |
| `dmrs-TypeA-Position` | 1 bit | Position of the first DMRS symbol (pos2 or pos3) — needed to decode PDSCH |
| `pdcch-ConfigSIB1` | 8 bits | **The key field** — tells the UE where to find the PDCCH that schedules SIB1 (CORESET#0 and SearchSpace#0 config) |
| `cellBarred` | 1 bit | If set, UE must NOT camp on this cell |
| `intraFreqReselection` | 1 bit | Whether intra-frequency reselection is allowed when this cell is barred |

## 3. System Information Block Type 1 (SIB1 / RMSI)

- **Carried on:** PDSCH (scheduled by PDCCH using SI-RNTI = 65535)
- **Periodicity:** 160 ms
- **Also called:** RMSI (Remaining Minimum System Information)

### SIB1 Contents (Key Fields)
| Field Group | Key Fields | What It Tells the UE |
|-------------|-----------|---------------------|
| **Cell Access Related Info** | `plmn-IdentityInfoList`, `trackingAreaCode`, `cellIdentity (NCI)` | Who owns this cell (PLMN), what TA it belongs to, and its unique identity |
| **Cell Selection Info** | `q-RxLevMin`, `q-QualMin` | Minimum signal level and quality thresholds for the S-Criterion |
| **Frequency Band Info** | `frequencyBandList` | Which bands the cell operates on |
| **SI Scheduling Info** | `si-SchedulingInfo` | Which other SIBs are broadcast, their periodicity, and their SI-window parameters |
| **RACH Config Common** | `initialULBWP` → `rach-ConfigCommon` | **Critical** — PRACH configuration index, preamble formats, power ramping step, RA-response window, SSB-to-RO mapping |
| **UL Config Common** | `initialULBWP` | Initial uplink bandwidth part config, PUCCH/PUSCH resources |
| **Serving Cell Config Common** | `downlinkConfigCommon`, `uplinkConfigCommon` | DL/UL bandwidth, SCS, slot format |

## 4. Other SIBs (OSI)

| SIB | Purpose | When Needed |
|-----|---------|-------------|
| **SIB2** | Common cell reselection parameters (thresholds, timers) | When UE needs to evaluate neighbors |
| **SIB3** | **Intra-frequency** neighbor cell reselection info | Cell reselection on same frequency |
| **SIB4** | **Inter-frequency** neighbor cell list and reselection params | Cell reselection on different frequency |
| **SIB5** | **Inter-RAT** (e.g., 5G → LTE) cell reselection info | Fallback to LTE |
| **SIB6** | ETWS primary notification | Earthquake/Tsunami warning |
| **SIB7** | ETWS secondary notification | Detailed warning text |
| **SIB8** | CMAS (Commercial Mobile Alert System) | Amber alerts, presidential alerts |
| **SIB9** | GPS/GNSS time info | Time synchronization for positioning |

## 5. How On-Demand SI Request Works
1. SIB1 indicates that SIB4 is "not broadcast" (on-demand).
2. UE needs SIB4 for inter-frequency reselection.
3. UE performs RACH:
   - If dedicated preambles are configured for SI request → UE sends the specific preamble (Msg1)
   - Otherwise → UE sends standard RACH with `RRCSystemInfoRequest` in Msg3
4. gNB broadcasts the requested SIB in the next available SI-window.

## 6. SI-Window and Scheduling
- SIBs are grouped into **SI messages** (each SI message can bundle multiple SIBs).
- Each SI message has a **periodicity** (e.g., 160 ms) and an **SI-window** within which it is transmitted.
- `SI-window length` is configured in SIB1 (5, 10, 20, 40, 80 ms).
- UE knows exactly when to wake up and decode each SI message based on this scheduling.

## 7. LTE vs 5G Comparison

| Aspect | LTE | 5G NR |
|--------|-----|-------|
| MIB periodicity | 40 ms | 80 ms |
| SIB1 name | SIB1 | SIB1 / RMSI |
| SIB1 periodicity | 80 ms | 160 ms |
| On-demand SI | ❌ Not supported | ✅ gNB can skip broadcasting unused SIBs |
| MIB channel | PBCH (center 6 PRBs) | PBCH (inside SSB beam) |
| SIB1 scheduling | Fixed position in subframe | Scheduled by PDCCH using CORESET#0 |
| Number of SIBs | SIB1-SIB19+ | SIB1-SIB9 (simplified in Rel-15) |

## Interview Q&A

**Q: A UE just powered on. What is the exact sequence of broadcast information it reads?**
**A:**
1. **PSS/SSS** (inside SSB) → derives PCI and achieves time/frequency synchronization
2. **MIB** (inside PBCH, also part of SSB) → learns how to find SIB1
3. **SIB1** (on PDSCH, scheduled by PDCCH using SI-RNTI) → learns PLMN, cell selection params, RACH config

**Q: What is the difference between MIB and SIB1 in terms of what they enable?**
**A:** MIB enables the UE to **find** SIB1 (it contains the PDCCH config for SIB1). SIB1 enables the UE to **access** the cell (it contains PLMN identity, cell selection thresholds, and RACH parameters).

**Q: If a cell is barred in the MIB, can a UE make emergency calls on it?**
**A:** No. If `cellBarred = barred` in MIB, the UE must leave this cell immediately. It cannot use the cell for any purpose including emergency calls. The UE should search for another cell.

**Q: How does a UE request an SIB that is configured as on-demand?**
**A:** The UE performs a RACH procedure. If the gNB has configured dedicated PRACH preambles for SI requests, the UE uses those specific preambles in Msg1. Otherwise, the UE completes the standard RACH and sends an `RRCSystemInfoRequest` in Msg3, specifying which SIBs it needs.

---
*Last updated: 2026-08-08*
