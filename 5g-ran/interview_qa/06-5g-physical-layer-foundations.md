# Interview Q&A: 5G Physical Layer Foundations

*(Companion to [Note 06](../06-5g-physical-layer-foundations.md))*

**Q: What is the fundamental difference between the 5G NR (New Radio) and 4G LTE radio interfaces, specifically regarding frequencies and spectrum?**
**A:** There are several massive leaps from LTE to NR, which interviewers frequently test:

| Feature | 4G LTE | 5G NR |
| :--- | :--- | :--- |
| **Frequency Range** | Sub-3 GHz (up to 6 GHz in LAA) | **FR1:** Sub-6 GHz (410 MHz - 7.125 GHz)<br>**FR2:** mmWave (24.25 GHz - 71 GHz) |
| **Max Channel Bandwidth** | 20 MHz per carrier | **FR1:** 100 MHz per carrier<br>**FR2:** 400 MHz per carrier |
| **Subcarrier Spacing (SCS)** | Fixed: 15 kHz | Flexible: 15, 30, 60, 120, 240 kHz |
| **Reference Signals** | **Always-on CRS** (Cell-Specific Reference Signals) broadcasted across the entire cell | **No CRS ("Ultra-Lean")**. Synchronization (SSB) and reference signals are transmitted via directional beams |
| **Spectral Efficiency** | ~90% (Large 10% guard band) | **~99%** (Advanced filtering allows much smaller guard bands) |

**Q: Why does 5G use different Subcarrier Spacings (15, 30, 120 kHz) instead of just one like LTE?**
**A:** There are two main reasons:
1. **To combat phase noise at high frequencies.** High frequency mmWave (FR2) hardware introduces severe phase noise. Wide subcarriers (like 120 kHz) are much less susceptible to phase noise corruption than 15 kHz subcarriers.
2. **To reduce latency.** In physics, frequency and time are inversely proportional. By increasing the frequency width of a subcarrier from 15 kHz to 30 kHz or 120 kHz, the time duration of that OFDM symbol shrinks significantly. Shorter symbols mean data can be transmitted and processed much faster, enabling 5G URLLC (Ultra-Reliable Low Latency Communications).

**Q: Contrast the massive physical layer capabilities of 5G NR (FR2) with the extreme minimalism of NB-IoT.**
**A:** Interviewers love testing the extremes of the spectrum:
- **Bandwidth:** 5G FR2 can utilize massive channels up to **400 MHz** wide. NB-IoT is restricted to an incredibly narrow **180 kHz** (exactly one standard LTE resource block).
- **Subcarrier Spacing:** 5G scales SCS up to **240 kHz** for extreme low latency. NB-IoT scales down, uniquely offering a **3.75 kHz** uplink SCS to maximize signal penetration and range at the expense of data speed.
- **Spectrum:** 5G pushes into the mmWave spectrum (up to 71 GHz). NB-IoT strictly operates in low-band sub-1 GHz frequencies to ensure its signal can reach devices buried deep indoors or underground.
