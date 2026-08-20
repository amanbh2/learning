# Cell Reselection

## Overview
Cell Reselection is the UE-autonomous mobility mechanism in `RRC_IDLE` and `RRC_INACTIVE`. The UE continuously evaluates its serving cell and neighbor cells using rules provided in the System Information, and silently moves to a better cell without notifying the network (unless crossing a Tracking Area boundary).

## 1. Types of Cell Reselection

| Type | Description | Rules From | Example |
|------|-------------|-----------|---------|
| **Intra-frequency** | Same frequency, different cell | SIB2, SIB3 | 2100 MHz Cell A → 2100 MHz Cell B |
| **Inter-frequency** | Different NR frequency | SIB2, SIB4 | 2100 MHz → 3500 MHz |
| **Inter-RAT** | Different technology (5G → LTE) | SIB2, SIB5 | NR → E-UTRA |

> [!NOTE]
> **"Inter-frequency" does NOT mean FR1 → FR2 specifically.** It means any change to a different carrier frequency, even within the same band (e.g., 3500 MHz → 3600 MHz). FR1 → FR2 is one case of inter-frequency.

## 2. Cell Reselection Criteria

### Intra-frequency: R-Criterion (Cell Ranking)
For intra-frequency, the UE uses **ranking** (not thresholds) to compare serving and neighbor cells:

```
Rs = Q_meas,s + Q_hyst                        (serving cell rank)
Rn = Q_meas,n - Q_offset                      (neighbor cell rank)
```
- If `Rn > Rs` for duration **Treselection** → reselect to neighbor
- `Q_hyst` = hysteresis to prevent ping-pong (0-24 dB, from SIB2)
- `Q_offset` = per-cell offset (from SIB3)
- `Treselection` = time the neighbor must be better (0-7 seconds, from SIB2)

### Inter-frequency / Inter-RAT: Priority-Based Reselection
For inter-frequency and inter-RAT, the network assigns **frequency priorities** (0-7, where 7 is highest):

| Scenario | Reselection Rule |
|----------|-----------------|
| Neighbor has **higher priority** than serving | Reselect if neighbor `Srxlev > ThreshX,HighP` for Treselection |
| Neighbor has **equal priority** | Use R-Criterion (ranking) — same as intra-frequency |
| Neighbor has **lower priority** than serving | Reselect only if serving `Srxlev < ThreshServing,LowP` AND neighbor `Srxlev > ThreshX,LowP` for Treselection |

> [!TIP]
> **Interview insight:** The priority system allows the operator to steer UEs. Example: Set 3500 MHz (C-band) as priority 6 and 700 MHz (low-band) as priority 4. UEs will prefer C-band for capacity. But if C-band signal drops below ThreshServing,LowP, they fall back to 700 MHz for coverage.

## 3. When Does the UE Measure Neighbors?

To save battery, the UE doesn't measure neighbors all the time:

| Condition | Action |
|-----------|--------|
| Serving cell `Srxlev > SIntraSearchP` AND `Squal > SIntraSearchQ` | ❌ Don't measure intra-frequency neighbors (serving is fine) |
| Serving cell drops below SIntraSearch thresholds | ✅ Start measuring intra-frequency neighbors |
| Higher-priority frequency exists | ✅ Always measure it (regardless of serving quality) |
| Lower-priority frequency exists | ✅ Measure only if serving is below ThreshServing,LowP |

## 4. Speed-Dependent Reselection
- The UE can use speed-dependent scaling of `Treselection` and `Q_hyst`
- **High-speed UE** (e.g., in a train): Shorter Treselection → faster reselection to avoid coverage gaps
- **Stationary UE**: Longer Treselection → prevents unnecessary ping-pong
- Speed is estimated by counting cell reselections within a time window

## 5. Cell Reselection vs Cell Selection

| Aspect | Cell Selection | Cell Reselection |
|--------|---------------|-----------------|
| **When** | UE has no cell (first boot or all cells lost) | UE is already camped on a cell |
| **Criterion** | S-Criterion (absolute thresholds) | R-Criterion (relative ranking) or priority-based |
| **Scope** | Any available cell on any frequency | Specific neighbors configured in SIB3/4/5 |
| **Decision** | "Is this cell good enough?" | "Is this neighbor better than my serving cell?" |

## 6. LTE vs 5G Comparison

| Aspect | LTE | 5G NR |
|--------|-----|-------|
| Reselection criteria | R-Criterion, priority-based (same) | Same concepts |
| S-Criterion | Srxlev only | Srxlev + **Squal** (quality-based) |
| Inter-RAT targets | GERAN, UTRAN, CDMA2000, NR | **EUTRA (LTE)** only |
| Speed-dependent | ✅ Supported | ✅ Supported (same) |
| INACTIVE state | ❌ Not applicable | ✅ Cell reselection works in INACTIVE too |

## Interview Q&A

**Q: What is the difference between the S-Criterion and the R-Criterion?**
**A:**
- **S-Criterion** (Selection) is an absolute threshold: "Is this cell's signal above the minimum?" Used for initial cell selection.
- **R-Criterion** (Ranking) is a relative comparison: "Is this neighbor better than my serving cell by enough margin for long enough?" Used for intra-frequency cell reselection.

**Q: How does the network steer UEs to prefer certain frequencies?**
**A:** Via **frequency priorities** in SIB2/SIB4. The network assigns each frequency a priority (0-7). UEs always prefer higher-priority frequencies. Operators use this to steer UEs toward capacity layers (C-band) and away from coverage layers (700 MHz) when signal is strong.

**Q: What triggers a Tracking Area Update?**
**A:** When the UE reselects to a cell whose TAC is not in its registered TA list (provided during Registration), the UE must send a NAS `Registration Request` (type = Mobility Registration Update) to inform the AMF of its new location. This requires a full RRC Setup + NAS exchange.

---
*Last updated: 2026-08-08*
