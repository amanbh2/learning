# Measurement Gaps and Measurement Objects

## Overview
This note covers how a UE measures inter-frequency and inter-RAT cells while connected. Measurement gaps, gap patterns, SMTC windows, and the MeasConfig structure (MeasObject, ReportConfig, MeasId) are critical for understanding mobility — and a frequent interview deep-dive.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - Why measurement gaps are needed (UE has one Rx chain, can't receive on two frequencies simultaneously)
> - Gap patterns: per-UE gaps vs per-FR gaps (Rel-16)
> - Gap Pattern IDs: gp0 (6ms every 40ms), gp1 (6ms every 80ms), etc.
> - SMTC (SS/PBCH Block Measurement Timing Configuration): when to look for SSBs on neighbor frequencies
> - MeasConfig structure: MeasObjectNR, MeasObjectEUTRA, ReportConfigNR, MeasId linking
> - MeasObject: carrier frequency, SSB subcarrier spacing, SMTC, cell lists (whitelist/blacklist)
> - ReportConfig: event type (A1-A6, B1-B2), trigger quantity, trigger time (TTT), report amount
> - Autonomous gaps (Rel-17): UE can create its own gaps for measurements
> - Measurement without gaps: when serving and neighbor are on same frequency (intra-freq)
> - Gap sharing: how UE shares gap time between inter-freq NR and inter-RAT measurements

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
