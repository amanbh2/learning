# HARQ in 5G NR

## Overview
Hybrid Automatic Repeat Request (HARQ) is a fundamental error-correction mechanism in the MAC layer. 5G NR HARQ differs significantly from LTE HARQ — asynchronous in both DL and UL, support for CBG-based retransmission, and flexible timing. This is a **guaranteed interview question**.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - HARQ basics: Stop-and-wait ARQ, combining (Chase Combining vs Incremental Redundancy)
> - NR HARQ process count: up to 16 per UE (DL and UL)
> - Asynchronous HARQ in NR: both DL and UL are asynchronous (LTE DL was async, UL was sync)
> - NDI (New Data Indicator) bit: how toggling indicates new vs retransmission
> - HARQ-ACK codebook: Type 1 (semi-static), Type 2 (dynamic) — interview favorite
> - CBG-based HARQ (Code Block Group): retransmit only failed CBGs instead of entire TB
> - HARQ timing: K0 (DL scheduling to PDSCH), K1 (PDSCH to HARQ feedback), K2 (UL grant to PUSCH)
> - HARQ disabling: scenarios (NTN, broadcast) where HARQ feedback is disabled
> - HARQ entity, HARQ process, TB-to-CW mapping
> - HARQ in TDD: timing relationships across slots
> - LTE vs NR HARQ differences (sync vs async UL, CBG, process count, timing flexibility)

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
