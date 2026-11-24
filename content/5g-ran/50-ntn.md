# Non-Terrestrial Networks (NTN) — NR-NTN Architecture & SIB19

## Overview
Introduced in **3GPP Release 17** (and enhanced in Rel-18/Rel-19), **Non-Terrestrial Networks (NTN)** brings standard 5G New Radio (NR) to satellite and airborne vehicles (LEO, MEO, GEO, and HAPS). 

Unlike terrestrial base stations that are stationary and serve small geographic radii, satellite-borne networks break standard cellular assumptions: propagation delays are measured in tens or hundreds of milliseconds, satellites travel at high orbital velocities (~7.56 km/s for LEO) causing severe Doppler shifts, and cell footprints span hundreds of kilometers across borders. 

This note covers the core NTN architectural modes, the physical/MAC timing adaptations ($K_{offset}$, $K_{mac}$), the **SIB19** information elements, satellite ephemeris modeling, and the autonomous GNSS-based synchronization framework. For geographic cell modeling, Ellipsoid Points, and Point-in-Polygon algorithms, see [NTN Geographic Cell Modeling & Algorithms](./51-ntn-geographic-cell-modeling.md).

---

## Content

### 1. NTN Architectures: Transparent vs. Regenerative

3GPP defines two primary payload architectures for satellite gNB deployments:

```
[Transparent / Bent-Pipe]
 UE <--- Service Link ---> [ Satellite RF Transponder ] <--- Feeder Link ---> [ Ground gNB ] <--- NG ---> [ 5GC ]
                                (Frequency Shift & Amp)

[Regenerative / On-board Processing]
 UE <--- Service Link ---> [ Satellite with gNB / DU ] <--- Feeder Link ---> [ Ground Station / CU ] <--- NG ---> [ 5GC ]
                                (Baseband Decoded in Space)
```

| Dimension | Transparent (Bent-Pipe) | Regenerative (On-Board gNB/DU) |
| :--- | :--- | :--- |
| **Satellite Role** | Analog RF repeater (frequency translation + amplification) | Digital baseband processing (PHY/MAC/RLC/RRC or DU) |
| **gNB Physical Location** | On Earth (Ground Station / Gateway) | In Space (Onboard Satellite) |
| **Propagation Path** | UE $\leftrightarrow$ Satellite $\leftrightarrow$ Gateway $\leftrightarrow$ gNB (Double hop) | UE $\leftrightarrow$ Satellite (Single hop for radio layer) |
| **Delay Profile** | Higher RTT: $RTT_{total} = RTT_{service} + RTT_{feeder}$ | Lower RTT: $RTT_{total} = RTT_{service}$ |
| **Satellite Complexity** | Low cost, low power, long operational lifespan | High cost, high power, radiation-hardened compute needed |
| **Inter-Satellite Links (ISL)** | Not supported; requires continuous ground gateway line-of-sight | Supported via optical/RF ISL for space routing without ground station |

---

### 2. SIB19: The Backbone of NTN Assistance Data

In terrestrial 5G, the gNB measures uplink timing offsets and commands the UE via MAC Control Elements (MAC CE Timing Advance Commands). In NTN, the propagation delay is so large that by the time the network commands the UE, the satellite has already moved hundreds of meters.

Therefore, **NTN inverts the synchronization paradigm**:
> **The UE autonomously calculates and pre-compensates Timing Advance (TA) and Doppler frequency shift** before sending RACH `Msg1` (PRACH).

To enable this open-loop autonomous calculation, 3GPP Rel-17 introduced **SIB19 (SystemInformationBlockType19)** in TS 38.331.

#### SIB19-r17 Top-Level ASN.1 Structure
```asn.1
SystemInformationBlockType19-r17 ::= SEQUENCE {
    ntn-Config-r17                 NTN-Config-r17                 OPTIONAL, -- Need R
    t-Service-r17                  INTEGER (0..549755813887)      OPTIONAL, -- Need R
    referenceLocation-r17          ReferenceLocation-r17          OPTIONAL, -- Need R
    distanceThresh-r17             INTEGER (0..65525)             OPTIONAL, -- Need R
    ntn-NeighCellConfigList-r17    NTN-NeighCellConfigList-r17    OPTIONAL, -- Need R
    lateNonCriticalExtension       OCTET STRING                   OPTIONAL,
    ...
}
```

#### Detailed Breakdown of `NTN-Config-r17` IEs

```asn.1
NTN-Config-r17 ::= SEQUENCE {
    epochTime-r17                  EpochTime-r17                  OPTIONAL, -- Need R
    ntn-UlSyncValidityDuration-r17 ENUMERATED {s5, s10, s15, s20, s25, s30, s35,
                                               s40, s45, s50, s55, s60, s120, 
                                               s180, s240, s900} OPTIONAL, -- Cond SIB19
    cellSpecificKoffset-r17        INTEGER (1..1023)              OPTIONAL, -- Need R
    kmac-r17                       INTEGER (1..512)               OPTIONAL, -- Need R
    ta-Info-r17                    TA-Info-r17                    OPTIONAL, -- Need R
    ephemerisInfo-r17              EphemerisInfo-r17              OPTIONAL, -- Need R
    ntn-PolarizationDL-r17         ENUMERATED {rhcp, lhcp, linear} OPTIONAL, -- Need R
    ntn-PolarizationUL-r17         ENUMERATED {rhcp, lhcp, linear} OPTIONAL, -- Need R
    ta-Report-r17                  ENUMERATED {enabled}           OPTIONAL, -- Need R
    ...
}
```

1. **`epochTime-r17`**:
   The exact reference time anchor (expressed as System Frame Number `sfn` and subframe number) at which the satellite ephemeris parameters are valid. The UE propagates the orbit forward from this snapshot in time.

2. **`ntn-UlSyncValidityDuration-r17`**:
   A validity timer (from 5s up to 900s). Once this timer expires after the epoch, the UE's orbital extrapolation errors exceed link tolerances, forcing the UE to re-acquire SIB19 or cease uplink transmissions.

3. **`cellSpecificKoffset-r17` ($K_{offset}$)**:
   In terrestrial NR, DL scheduling to UL transmission (e.g., PDCCH grant to PUSCH transmission, or PDSCH to PUCCH HARQ ACK/NACK) has tight slot offsets ($K_0, K_1, K_2$). In NTN, the round-trip propagation delay can exceed dozens of slots.
   $K_{offset}$ is an integer number of slots added to the standard scheduling timeline:
   $$\text{Scheduling Delay} = K_2 + K_{offset}$$
   This ensures the gNB's scheduler and the UE's transmitter remain synchronized across huge space delays.

4. **`kmac-r17`**:
   Scheduling offset (in slots) applied to MAC procedures, particularly the Random Access Response (RAR) window and Contention Resolution timer.

5. **`ta-Info-r17` (Common Timing Advance)**:
   Contains:
   - `ta-Common-r17`: Common component of the propagation delay shared by all UEs in the cell (typically the delay from the ground gateway to the satellite, plus the delay from the satellite to a cell reference point).
   - `ta-CommonDrift-r17`: First derivative of the common delay over time ($d(\text{delay})/dt$ in $\mu s/s$).
   - `ta-CommonDriftVariant-r17`: Second derivative of common drift.

6. **`ephemerisInfo-r17`**:
   Provides satellite orbital trajectories in one of two formats:
   - **`positionVelocity-r17` (ECEF Cartesian State Vectors):**
     Specifies $X, Y, Z$ positions (in meters, resolution ~1.3m) and velocity vectors $V_x, V_y, V_z$ (in mm/s) in the Earth-Centered Earth-Fixed frame. Best for short-term accuracy in LEO.
   - **`orbital-r17` (Keplerian Orbital Elements):**
     Classical 6 Keplerian parameters: semi-major axis ($a$), eccentricity ($e$), inclination ($i$), longitude of ascending node ($\Omega$), argument of periapsis ($\omega$), and mean anomaly ($M$) at epoch. Better for longer validity durations and GEO/MEO satellites.

7. **`ntn-PolarizationDL-r17` / `ntn-PolarizationUL-r17`**:
   Indicates antenna polarization: `rhcp` (Right-Hand Circular), `lhcp` (Left-Hand Circular), or `linear`. Satellite communications rely on circular polarization to avoid signal loss caused by **Faraday Rotation** as the radio wave traverses Earth's ionosphere.

8. **`t-Service-r17`**:
   A UTC-based 39-bit timestamp broadcasted in SIB19. It indicates the exact moment when the current satellite beam will cease serving this geographic region (crucial for planned handovers in quasi-Earth-fixed systems).

---

### 3. Open-Loop Timing and Frequency Pre-Compensation

```
              Satellite (Known Orbit via SIB19 Ephemeris)
                    🛰️
                   /  \
      Feeder Link /    \  Service Link
                 /      \
                v        v
          Ground gNB     UE (Known Location via GNSS)
```

The total Timing Advance required for an NTN uplink transmission consists of two components:
$$T_{TA} = T_{common} + T_{UE-specific}$$

* **$T_{common}$ (Broadcasting by gNB in SIB19 `ta-Info`):**
  Represents the common delay between the ground gateway/gNB and the satellite (the feeder link), plus optionally the delay between the satellite and a common cell reference point.
* **$T_{UE-specific}$ (Calculated autonomously by the UE):**
  The UE computes its geometric line-of-sight distance $d_{sat}$ to the satellite:
  $$d_{sat} = \|\mathbf{r}_{sat}(t) - \mathbf{r}_{UE}\|$$
  $$T_{UE-specific} = \frac{2 \cdot d_{sat}}{c}$$
  where $\mathbf{r}_{sat}(t)$ is extrapolated from SIB19 ephemeris at transmission time $t$, and $\mathbf{r}_{UE}$ is the UE's 3D GNSS position.

Similarly, the Doppler frequency shift $\Delta f_D$ is pre-compensated by the UE:
$$\Delta f_D = -\frac{f_c}{c} \cdot \left( \frac{\mathbf{r}_{sat} - \mathbf{r}_{UE}}{\|\mathbf{r}_{sat} - \mathbf{r}_{UE}\|} \cdot (\mathbf{v}_{sat} - \mathbf{v}_{UE}) \right)$$

---

### Interview Traps & Gotchas

🪤 **Trap 1: "Why can't the gNB simply send Timing Advance Commands to NTN UEs like in LTE/NR?"**
- **Gotcha:** Propagation delay over LEO is ~10–25 ms one-way, and over GEO is ~270 ms. By the time a gNB receives PRACH, computes a TA offset, and delivers a RAR TA Command, the satellite has moved kilometers (LEO travels 750 meters every 100 ms). Standard closed-loop TA would always lag behind reality.
- **Answer:** NTN mandates **UE-autonomous open-loop pre-compensation**. The UE reads the satellite ephemeris from SIB19, takes its own GNSS position fix, calculates the geometric distance to the satellite, and pre-advances its PRACH Msg1 so it arrives perfectly time-aligned at the satellite receiver.

🪤 **Trap 2: "What is the difference between `positionVelocity` and `orbital` ephemeris format in SIB19?"**
- **Gotcha:** Candidates assume both formats behave the same.
- **Answer:** 
  - `positionVelocity` provides Earth-Centered Earth-Fixed (ECEF) Cartesian coordinates ($X, Y, Z, V_x, V_y, V_z$). It requires simpler math on the UE baseband but has a shorter validity window because higher-order orbital perturbations degrade accuracy over time.
  - `orbital` provides 6 Keplerian orbital elements (semi-major axis, eccentricity, inclination, argument of periapsis, RAAN, mean anomaly). It requires heavier orbital mechanics math (solving Kepler's equation) on the UE, but remains accurate over much longer validity windows and is ideal for GEO/MEO.

🪤 **Trap 3: "Why does SIB19 include polarization information (`rhcp`, `lhcp`)?"**
- **Gotcha:** Cellular engineers are accustomed to linear polarization ($\pm 45^\circ$ cross-pol).
- **Answer:** Linearly polarized radio waves passing through the ionosphere experience **Faraday Rotation**—the polarization angle rotates uncontrollably depending on electron density and Earth's magnetic field. If linear polarization were used, signal fading could reach complete nulls. Circular polarization (RHCP/LHCP) rotates continuously and is immune to Faraday polarization tilt.

🪤 **Trap 4: "How does NTN prevent HARQ stall under extreme round-trip delay?"**
- **Gotcha:** Assuming 5G NR always relies on MAC-layer retransmissions.
- **Answer:** In GEO satellites with ~540 ms RTT, traditional 16-process stop-and-wait HARQ causes severe stalls. 3GPP Rel-17 introduced:
  1. Increasing the number of HARQ processes up to 32.
  2. Disabling HARQ feedback per UE / per bearer (via `harq-FeedbackEnabler`), allowing RLC Acknowledged Mode (AM) to handle retransmissions without pausing the physical layer.

---

## Key Takeaways
- **Transparent vs. Regenerative:** Transparent acts as an analog RF relay in space (gNB on ground, higher RTT); Regenerative runs the gNB/DU baseband onboard the satellite (lower RTT, supports Inter-Satellite Links).
- **SIB19 Purpose:** Broadcasts satellite ephemeris (`ephemerisInfo`), epoch time, validity timers, common TA parameters (`ta-Info`), scheduling offset ($K_{offset}$), and cell reference location.
- **Autonomous Synchronization:** The UE combines SIB19 satellite ephemeris with its own GNSS location to autonomously pre-compensate Timing Advance and Doppler shift before sending PRACH.
- **$K_{offset}$ Scheduling Shift:** Adds an integer slot offset ($K_2 + K_{offset}$) to compensate for space propagation delay between PDCCH grant and PUSCH transmission.
- **Polarization:** Uses RHCP/LHCP circular polarization to neutralize ionospheric Faraday rotation.

---
*Last updated: 2026-10-30*
