# Non-Terrestrial Networks (NTN)

## Overview
Introduced prominently in 3GPP Rel-17, **NTN (Non-Terrestrial Networks)** extends 5G coverage from the ground to space. It allows standard 5G UEs (like smartphones) to communicate directly with satellites or high-altitude platforms (HAPS), eliminating dead zones globally.

## 1. NTN Architectures

### Transparent Payload (Bent Pipe)
The satellite acts purely as an RF relay in the sky.
- **Flow:** UE ↔ Satellite (RF Relay) ↔ Ground Station ↔ gNB
- The gNB is physically located on the ground. The satellite just reflects the analog radio wave. This is simpler for the satellite but introduces higher latency.

### Regenerative Payload (gNB in Space)
The satellite actually runs the gNB software (or parts of it).
- **Flow:** UE ↔ Satellite (gNB) ↔ Ground Station ↔ 5G Core
- The satellite processes the RRC, MAC, and PHY layers. This reduces latency because ARQ/HARQ retransmissions happen locally between the UE and satellite, rather than traveling all the way back to Earth.

## 2. Key Technical Challenges in NTN

Putting a base station 600km to 36,000km away breaks many fundamental assumptions of terrestrial 5G.

### 1. Extreme Propagation Delay
- **Terrestrial 5G:** Signals travel a few kilometers. Delay is a few microseconds.
- **LEO (Low Earth Orbit):** ~600km high. Round Trip Time (RTT) is ~10-25 ms.
- **GEO (Geostationary Orbit):** ~35,786km high. RTT is ~540 ms.
- **Impact on protocol:** The MAC layer's HARQ (Hybrid ARQ) is designed for 1-4 ms turnarounds. In NTN, the HARQ timers must be massively extended (or HARQ disabled entirely for GEO) because the UE would time out waiting for an ACK.

### 2. Extreme Doppler Shift
- LEO satellites orbit Earth at roughly 7.5 km/second.
- This creates massive Doppler shifts (frequency changes) in the radio signal.
- **Impact on protocol:** The UE must constantly pre-compensate its uplink transmission frequency based on the satellite's known orbit (ephemeris data) broadcasted in SIBs.

### 3. Large Cell Sizes
- A single satellite beam can cover hundreds of kilometers.
- Different UEs in the same cell can have vastly different distances to the satellite, requiring huge Timing Advance (TA) adjustments.

## 3. NTN Enhancements in RRC

To solve these issues, 3GPP added new System Information Blocks (SIBs):
- **SIB19 (Rel-17):** Broadcasts the satellite's Ephemeris Data (exact position and velocity in orbit). The UE uses this to calculate its own distance, Timing Advance, and Doppler pre-compensation *before* attempting RACH.

## Interview Q&A

**Q: Why does a UE need to know the satellite's ephemeris data before initiating RACH?**
**A:** Because LEO satellites move extremely fast and are very far away. If the UE transmitted a standard terrestrial RACH preamble, it would arrive at the wrong time (due to propagation delay) and on the wrong frequency (due to Doppler shift). By reading the ephemeris data in SIB19, the UE pre-calculates and applies a massive Timing Advance and frequency shift so the Msg1 preamble arrives perfectly aligned at the satellite.

**Q: How does NTN impact the MAC layer's HARQ mechanism?**
**A:** Standard terrestrial HARQ expects an ACK/NACK within a few milliseconds. In NTN, especially GEO, the round-trip time is over 500ms. 3GPP adapted HARQ by extending the timer windows (increasing the number of HARQ processes) or, for GEO, allowing HARQ to be completely disabled to rely purely on RLC ARQ for error correction.

**Q: What is the difference between a Transparent and Regenerative satellite payload?**
**A:** A Transparent payload is a "dumb mirror" — it receives the RF signal from the UE, amplifies it, and beams it down to a gNB on Earth. A Regenerative payload is a "smart satellite" — it contains the actual baseband processing (the gNB or at least the DU) onboard the spacecraft itself.

---
*Last updated: 2026-08-08*
