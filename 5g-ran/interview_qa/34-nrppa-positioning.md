# Interview Q&A — NRPPa & 5G Positioning

*Based on TS 38.455, TS 38.305, TS 23.273*

---

## Q1: Was positioning introduced in 5G or did LTE have it too?

**Answer:** LTE had positioning from **Release 9** onwards.
LTE positioning included OTDOA, E-CID, A-GNSS, using **LPPa** (TS 36.455)
between eNB and E-SMLC, and **LPP** (TS 36.355) between UE and E-SMLC.

5G NR introduced positioning in **Release 16** with new methods
(DL-TDOA, UL-TDOA, Multi-RTT, DL-AoD, UL-AoA), a new protocol (**NRPPa**, TS 38.455),
and a new core network function (**LMF**), enabling sub-meter accuracy.

**Interviewer trap**: Don't say "positioning is new in 5G." The *methods* and
*accuracy* are new. The *concept* is from LTE.

---

## Q2: What is NRPPa and between which nodes does it operate?

**Answer:** NRPPa (NR Positioning Protocol A, TS 38.455) is the protocol that carries
positioning-related signaling between the **gNB and the LMF** (Location Management Function).

It is **not carried on a new dedicated interface**. NRPPa PDUs are **tunneled
inside NGAP messages** on the N2 interface (gNB ↔ AMF), and the **AMF relays
them transparently to/from the LMF** via the NLs interface.

```
gNB ──[NGAP: UplinkUEAssociatedNRPPaTransport]──► AMF ──[NLs]──► LMF
gNB ◄──[NGAP: DownlinkUEAssociatedNRPPaTransport]── AMF ◄──[NLs]── LMF
```

AMF does **not** interpret NRPPa content — it only reads the NGAP header to know
where to route the message.

---

## Q3: What is the difference between NRPPa and LPP? Why do we need both?

**Answer:**

| Protocol | Between | Purpose |
|----------|---------|---------|
| **NRPPa** | gNB ↔ LMF (via AMF) | Network-side positioning: fetch PRS config, request UL measurements from TRPs, get TRP info |
| **LPP** | UE ↔ LMF (via AMF + RRC tunnel) | UE-side positioning: give UE assistance data, request UE measurements (RSTD, GNSS, etc.) |

They serve different roles and are independent. In a DL-TDOA session:
- **NRPPa** fetches the PRS configuration from the gNB (what PRS the TRPs are transmitting)
- **LPP** delivers that PRS configuration to the UE and collects the UE's RSTD measurements

---

## Q4: What does the OTDOA Information Request/Response do in NRPPa?

**Answer:** `OTDOA Information Request` is sent by the LMF to the gNB to request
the **PRS (Positioning Reference Signal) configuration** of the TRPs managed by
that gNB. The response (`OTDOA Information Response`) contains:

- PRS frequency resource configuration (ARFCN, bandwidth)
- PRS comb size and starting subcarrier
- PRS slot offset and periodicity
- Number of symbols and OFDM symbol offset
- TRP geographic coordinates (optional, if known)
- Transmission timing (DL PRS reference timing)

The LMF needs this information to **tell the UE exactly what to look for** when
measuring DL-TDOA RSTD. It is then passed to the UE via LPP "Provide Assistance Data."

Despite the name "OTDOA" (inherited from LTE), in NR this carries **NR PRS config**
and is used for **DL-TDOA**.

---

## Q5: What is the difference between DL-TDOA and Multi-RTT? When would you use each?

**Answer:**

| | DL-TDOA | Multi-RTT |
|--|---------|-----------|
| Signals used | DL PRS only | DL PRS + UL SRS |
| Who measures | UE measures RSTD | UE measures DL timing, gNB measures UL-RTOA |
| Clock sync required | Yes — gNBs must be synchronized | **No** — clock offset cancels in RTT |
| Accuracy | ~1–5m with good sync | ~0.5–2m |
| UE power impact | Moderate (UE receives PRS) | Higher (UE also transmits SRS) |

**Use DL-TDOA** when: gNBs are tightly synchronized (e.g., GPS-synced network).
**Use Multi-RTT** when: inter-gNB synchronization is imperfect or unavailable —
the round-trip measurement cancels out the clock offset.

---

## Q6: Is NRPPa used in NSA (EN-DC) deployments?

**Answer: No.** In NSA (Option 3x), the LTE eNB is the master node and the 5G
gNB is the secondary. The anchor for core network connectivity is the **EPC** (4G core).
Location services still use **LPPa** (TS 36.455) between the eNB and **E-SMLC**,
over the S1 interface.

NRPPa and the LMF are **5G SA (Standalone) only** concepts, because they require
the 5G Core (5GC).

---

## Q7: What is a TRP and how does it differ from a gNB?

**Answer:**
- A **gNB** is a logical node (can include CU + one or more DUs).
- A **TRP (Transmission/Reception Point)** is a **physical transmission point** — essentially
  a radio unit / antenna panel that can independently transmit PRS or receive SRS.
- A single gNB can manage **multiple TRPs** (e.g., 3 sectors, remote radio units).

In NRPPa, the `TRP Information Request/Response` is used to get per-TRP details
(geographic coordinates, PRS resources). The `OTDOA Information Request` also returns
PRS config **per TRP** so that the LMF knows which TRP is transmitting what.

The explicit TRP concept is **NR-specific** — LTE positioning treated each eNB/cell
as a single source.

---

## Q8: What NRPPa messages are involved in a UL-TDOA/Multi-RTT session?

**Answer:** For uplink measurements:

1. **`Positioning Information Request`** (LMF → gNB): Checks if the gNB can configure
   SRS resources for positioning, what measurement gap patterns are supported.
2. **`Positioning Information Response`** (gNB → LMF): Reports SRS positioning capability.
3. *(LPP via RRC)*: LMF instructs UE to configure SRS for positioning.
4. **`Measurement Request`** (LMF → gNB): Asks the gNB/TRP to measure the UE's SRS.
5. **`Measurement Response`** (gNB → LMF): Returns **UL-RTOA** (for UL-TDOA/Multi-RTT)
   or **UL-AoA** (for UL angle measurement).
6. **`Measurement Abort`** (LMF → gNB): Terminates an ongoing measurement session.

---

## Q9: How is LPP delivered to the UE? What RRC messages are used?

**Answer:** LPP is transported between the UE and LMF over the air using RRC as a
transparent transport (a "pipe"). The LMF sends an LPP PDU, it reaches AMF, then:

```
LMF → AMF → gNB: NGAP DLInformationTransfer (contains LPP PDU)
gNB → UE: RRC DLInformationTransfer (LPP PDU embedded in dedicatedNAS-Message IE)
```

In the uplink direction:
```
UE → gNB: RRC ULInformationTransfer
gNB → AMF: NGAP ULInformationTransfer
AMF → LMF: (NLs)
```

Neither the gNB nor AMF interpret the LPP content — they only relay it. This
is the same relay pattern as NAS transport.

---

## Q10: What is RSTD and how does DL-TDOA compute position from it?

**Answer:** **RSTD (Reference Signal Time Difference)** is the difference in
arrival time of PRS received from two different TRPs at the UE.

If TRP1 is the reference and TRP2 is a neighbour:
```
RSTD(1,2) = T_arrival_TRP2 - T_arrival_TRP1
```

Each RSTD measurement defines a **hyperbola** in 2D space where the UE could be
(equal time-difference points). With **three or more TRP pairs** (minimum 3 TRPs),
the hyperbolas intersect at the UE's location — this is **multilateration**.

The accuracy depends on:
- PRS bandwidth (wider → finer timing resolution)
- Number of TRPs
- Inter-TRP synchronization quality
- Multipath environment

---

## Q11: What causes NRPPa Positioning Information Request to fail?

**Common causes (from TS 38.455 cause IEs):**
- `no-UE-context` — the UE context no longer exists (UE released or moved)
- `unspecified` — generic failure
- `measurement-not-possible` — UE is in a state where measurements cannot be configured
  (e.g., in idle, insufficient resources)
- `srs-configuration-failure` — the gNB could not configure SRS on the UE (RRC failure,
  UE rejection, or capability mismatch)

When debugging: check the **Cause IE** in the Failure message, then cross-reference
whether the UE was in CONNECTED state and whether the SRS config was applied in RRC.

---

## Q12: What is the difference between UE-based and UE-assisted positioning?

**Answer:**

| Mode | Who computes location | What UE reports |
|------|----------------------|-----------------|
| **UE-assisted** | LMF | Raw measurements (RSTD, GNSS pseudoranges) |
| **UE-based** | UE | Final position (lat/long) — UE has all assistance data |

In **UE-assisted** (most common in NR): UE measures and reports, LMF computes.
In **UE-based**: UE is given all reference data and computes its own location —
reduces signaling load and latency, but requires UE to have the compute capability.

NR supports both modes via LPP.

---
*Last updated: 2026-08-18*
