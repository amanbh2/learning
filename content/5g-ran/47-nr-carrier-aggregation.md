# NR Carrier Aggregation (CA)

## Overview
Carrier Aggregation (CA) allows a UE to simultaneously use multiple component carriers (CCs) to increase throughput. Understanding PCell, SCell, PSCell, SpCell, and cross-carrier scheduling is essential for any L3 engineer. CA is distinct from Dual Connectivity.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - CA concept: aggregate multiple CCs for higher throughput
> - Component Carrier types:
>   - PCell (Primary Cell): always active, carries critical signaling (PUCCH, PRACH)
>   - SCell (Secondary Cell): added/removed dynamically, carries additional data
>   - PSCell (Primary SCell): anchor cell of SCG in Dual Connectivity
>   - SpCell concept: PCell for MCG, PSCell for SCG
> - SCell activation/deactivation: MAC CE based, SCell deactivation timer
> - Cross-carrier scheduling: PDCCH on one CC schedules PDSCH/PUSCH on another CC (CIF field)
> - CA vs DC: CA = one MAC entity, multiple CCs; DC = two MAC entities, two cell groups
> - Maximum CCs: up to 16 in NR (Rel-15: up to 16 DL, 16 UL)
> - Intra-band CA (contiguous and non-contiguous) vs inter-band CA
> - Timing Advance Groups (TAGs): SCells may have different TA
> - Band combinations: defined in UE capability
> - CA-specific RRC IEs: sCellToAddModList, sCellToReleaseList
> - LTE vs NR CA: similar concept, but NR adds BWP per CC, more flexible numerology

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
