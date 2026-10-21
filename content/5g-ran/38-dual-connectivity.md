# Dual Connectivity (EN-DC, NR-DC, NE-DC)

## Overview
Dual Connectivity (DC) allows a UE to simultaneously connect to two cell groups — a Master Cell Group (MCG) and a Secondary Cell Group (SCG). EN-DC (E-UTRA–NR Dual Connectivity) is how most 5G networks operate today in NSA mode. This is a **massive interview topic** and a core mechanism in real-world 5G.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - DC architecture: MN (Master Node), SN (Secondary Node), MCG, SCG
> - EN-DC (Option 3/3x): LTE eNB as MN, NR gNB as SN, connected to EPC
>   - Bearer types: MCG bearer, SCG bearer, MCG split bearer, SCG split bearer
>   - X2-C interface for MN-SN signaling (SgNB Addition/Modification/Release)
>   - Data flow: split bearer → PDCP at MN splits data to both MCG and SCG
> - NR-DC (Option 4): NR gNB as MN, NR gNB as SN, connected to 5GC
>   - Xn interface for MN-SN signaling
> - NE-DC (Option 7): NR gNB as MN, LTE ng-eNB as SN, connected to 5GC
> - SN Addition procedure: MN decides to add SN, sends SgNB Addition Request
> - SN Modification procedure: reconfigure SCG bearers
> - SN Release procedure: remove SN
> - PSCell (Primary SCell in SCG): the anchor cell in the secondary cell group
> - SCG failure handling: SN sends SCG Failure Information to MN, MN decides recovery
> - SCG RLF vs MCG RLF: different handling
> - Fast SN change vs SN change with MN involvement
> - SpCell concept: PCell (MCG) and PSCell (SCG) together
> - Measurement config for DC: MN configures measurements, SN can also configure
> - Power control and PHR in DC: dual PHR (MCG + SCG)

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
