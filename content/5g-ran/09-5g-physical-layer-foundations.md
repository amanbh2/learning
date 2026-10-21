# 5G Physical Layer Foundations

## Overview
While the 5G Core Network (5GC) brings major routing and architectural changes, the true "magic" of 5G's speed and low latency happens at the Radio interface (the "New Radio" or NR). This note explores the foundational physical layer concepts of 5G NR: Frequency Ranges (FR1/FR2), Subcarrier Spacing (SCS), and Massive MIMO.

## Content

### 1. Frequency Ranges (FR1 vs FR2)
The 3GPP has split the 5G NR spectrum into two distinct regimes.

#### FR1 (Sub-6 GHz)
- **Range:** 410 MHz to 7.125 GHz.
- **Role:** The "workhorse" of 5G. It provides the optimal balance between coverage (distance/penetration) and capacity.
- **Bandwidth:** Supports carrier bandwidths up to **100 MHz** (compared to LTE's max of 20 MHz).
- **Comparison to LTE:** FR1 overlaps heavily with existing LTE frequencies but uses them much more efficiently due to advanced filtering (reducing the need for large guard bands).

#### FR2 (mmWave / Millimeter Wave)
- **Range:** 24.25 GHz to 52.6 GHz (extended up to 71 GHz in later releases).
- **Role:** Extreme capacity in dense areas (stadiums, downtowns). 
- **Bandwidth:** Supports massive carrier bandwidths up to **400 MHz**.
- **Challenges:** Extremely poor propagation. mmWave signals are easily blocked by walls, windows, and even rain/foliage. It requires strict line-of-sight and aggressive beamforming.

### 2. Flexible Numerology & Subcarrier Spacing (SCS)
In OFDM (Orthogonal Frequency-Division Multiplexing) systems, the frequency band is chopped into tiny slices called "subcarriers."

- **LTE's Rigid Approach:** LTE uses a fixed Subcarrier Spacing of **15 kHz**. 
- **5G NR's Flexible Approach:** 5G introduces "scalable numerology," allowing the SCS to grow exponentially: $15 \times 2^\mu$ kHz.
  - $\mu = 0 \rightarrow 15$ kHz
  - $\mu = 1 \rightarrow 30$ kHz
  - $\mu = 2 \rightarrow 60$ kHz
  - $\mu = 3 \rightarrow 120$ kHz
  - $\mu = 4 \rightarrow 240$ kHz

#### Why does 5G need Flexible Numerology?
1. **Fighting Phase Noise:** At FR2 (mmWave) frequencies, radio hardware suffers from "phase noise" which distorts the signal. Wider subcarriers (e.g., 120 kHz) are much less susceptible to phase noise. You physically cannot use 15 kHz spacing at 28 GHz!
2. **Ultra-Low Latency (URLLC):** In OFDM physics, frequency and time are inversely related. If you double the width of the subcarrier in the frequency domain (e.g., from 15 kHz to 30 kHz), the time duration of that OFDM symbol is cut in half. Thus, using 120 kHz SCS means symbols are transmitted much faster, drastically reducing radio latency.

### 3. Beamforming and Massive MIMO
In LTE, antennas broadcast Cell-Specific Reference Signals (CRS) across the entire sector like a floodlight. This guarantees coverage but causes significant interference with neighboring cells.

5G NR is built on a different philosophy: **"Ultra-Lean Design."**
There is no CRS. Instead, 5G utilizes **Massive MIMO (Multiple Input, Multiple Output)** arrays. These are antenna arrays with dozens or hundreds of tiny antenna elements (e.g., 64T64R).

By carefully adjusting the phase and amplitude of the signal emitted by each tiny antenna element, the 5G gNB can perform **3D Beamforming**. 
- It shapes the radio wave into a tightly focused "laser beam" pointed directly at a specific UE.
- It tracks the UE as it moves.
- It can serve multiple UEs simultaneously on the same frequency by pointing distinct beams at them (MU-MIMO).
- Even the foundational synchronization signals (SSB) are not floodlit; they are transmitted in narrow beams that rapidly "sweep" across the cell sector to announce the cell's presence.

### 4. Comparison with NB-IoT (Interview Focus)
NB-IoT (Narrowband IoT) was introduced in LTE Advanced Pro (Rel-13) and continues to be supported within the 5G ecosystem (via `ng-eNB` or in-band NR deployments). Interviewers often test your knowledge of extreme opposites (Massive 5G vs tiny NB-IoT).
- **Bandwidth:** While NR FR1 supports 100 MHz and FR2 supports 400 MHz, NB-IoT is restricted to an extraordinarily narrow **180 kHz** bandwidth (exactly one LTE Physical Resource Block).
- **Subcarrier Spacing (SCS):** NB-IoT uses LTE's standard **15 kHz** SCS for downlink, but uniquely introduces a **3.75 kHz** SCS option for the uplink to drastically increase coverage and signal penetration at the cost of data speed.
- **Frequency Range:** NB-IoT operates strictly in low-band frequencies (usually sub-1 GHz) to maximize deep indoor penetration (e.g., reaching smart water meters in basements). It never operates in FR2 mmWave.

## Key Takeaways
- **FR1** = Sub-6 GHz (Coverage). **FR2** = mmWave (Extreme capacity, poor penetration).
- **Flexible Numerology** allows subcarrier spacing to scale from 15 kHz up to 240 kHz, which combats mmWave phase noise and reduces latency.
- **5G is Ultra-Lean:** No CRS floodlighting. Everything relies on directional beams using **Massive MIMO**.
- **NB-IoT** sits at the opposite extreme: 180 kHz bandwidth and unique 3.75 kHz SCS for deep coverage.

## Interview Q&A

**Q: Why does 5G use different Subcarrier Spacings instead of one like LTE?**
**A:** Two reasons: (1) High-frequency mmWave hardware suffers from phase noise — wider subcarriers (120 kHz) are less susceptible. (2) Wider SCS = shorter OFDM symbol duration = lower latency, essential for URLLC.

**Q: Contrast 5G NR (FR2) with NB-IoT at the physical layer level.**
**A:** 5G FR2 uses up to 400 MHz bandwidth with 120 kHz SCS at 28+ GHz. NB-IoT uses 180 kHz bandwidth with 3.75 kHz SCS at sub-1 GHz. They represent the absolute extremes of the 3GPP spectrum.

**Q: Why doesn't 5G use Cell-Specific Reference Signals (CRS) like LTE?**
**A:** CRS is always-on across the entire cell, causing constant interference to neighbors. 5G uses "ultra-lean design" — reference signals (DMRS) are UE-specific and only transmitted when needed, and SSB is transmitted in directional beams. This dramatically reduces inter-cell interference.

---
*Last updated: 2026-08-08*

