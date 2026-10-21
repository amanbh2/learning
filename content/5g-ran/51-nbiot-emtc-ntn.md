# NB-IoT & eMTC over NTN (IoT-NTN)

## Overview
IoT-NTN, introduced in Rel-17, extends satellite connectivity to NB-IoT and eMTC (LTE-M) devices. This is a distinct specification track from NR-NTN, targeting massive IoT use cases where devices need global coverage but have extremely limited power and bandwidth.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - Why IoT-NTN: billions of IoT devices need coverage in remote areas (agriculture, maritime, logistics)
> - NB-IoT over satellite:
>   - Bandwidth: 180 kHz (same as terrestrial NB-IoT)
>   - GNSS-based Timing Advance pre-compensation
>   - Extended HARQ RTT to accommodate satellite delay
>   - Coverage Enhancement (CE) levels adaptation for satellite link budget
> - eMTC over satellite:
>   - Bandwidth: 1.08 MHz
>   - Similar challenges as NB-IoT NTN but with higher data rates
> - Store-and-forward: satellite stores data when not in view of ground station
> - Coverage classes: how IoT-NTN handles varying link budgets
> - Doppler pre-compensation: UE uses GNSS + ephemeris data
> - Power saving: eDRX and PSM (Power Saving Mode) in NTN context
> - Comparison with NR-NTN: different target devices, different bandwidth, different 3GPP specs
> - 3GPP specs: TS 36.331 amendments for NTN, TS 36.300 NTN architecture
> - Key satellite operators and deployments (Skylo, Qualcomm, MediaTek partnerships)

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
