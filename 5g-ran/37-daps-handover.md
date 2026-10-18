# DAPS Handover (Dual Active Protocol Stack) — Rel-16

## Overview
DAPS (Dual Active Protocol Stack) is a Rel-16 feature that enables **make-before-break** handover — the UE maintains active connections to both source and target cells simultaneously during handover. This achieves near-zero interruption time, critical for URLLC and VoNR.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - The problem: standard HO has interruption time (break-before-make)
> - DAPS concept: UE Tx/Rx to source AND target simultaneously
> - DAPS protocol stack: two separate PDCP/RLC/MAC/PHY stacks (one per cell)
> - DAPS call flow: HO prep → UE connects to target while maintaining source → target confirmed → source released
> - Data forwarding in DAPS: source keeps forwarding data until release
> - UE complexity: dual radio chains required, higher power consumption
> - DAPS + CHO combination: pre-configured DAPS handover with conditional execution
> - Bearer-level DAPS: not all bearers need DAPS (only those needing zero interruption)
> - DAPS-specific IEs in RRCReconfiguration
> - When DAPS is used vs standard HO (trade-off: UE complexity vs interruption time)
> - Comparison with LTE: No equivalent in LTE
> - Comparison with Dual Connectivity: DAPS is temporary (during HO), DC is persistent

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
