# Inter-RAT Handover (5G ↔ 4G)

## Overview
Inter-RAT handover between NR and LTE is a critical mobility procedure — every commercial 5G network must support fallback to LTE for coverage and voice. This note covers NR→LTE and LTE→NR handover flows, B1/B2 event triggers, EPS Fallback, and the SRVCC mechanism.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - When inter-RAT HO happens: NR coverage loss, voice call (EPS Fallback), load balancing
> - B1 event: inter-RAT neighbor becomes better than threshold → trigger HO to LTE
> - B2 event: serving becomes worse than threshold1 AND inter-RAT neighbor better than threshold2
> - NR → LTE HO flow: MeasReport(B1/B2) → NGAP Handover Required → AMF → MME (N26 interface) → Target eNB
> - LTE → NR HO flow: MeasReport(B1) → S1AP Handover Required → MME → AMF → Target gNB
> - MeasObjectEUTRA: how NR UE is configured to measure LTE cells (EARFCN, PCI list)
> - Redirect vs Handover: when does the network use RRC Release with redirectCarrierInfo vs full HO?
> - N26 interface: MME ↔ AMF interworking for inter-RAT mobility
> - SRVCC (Single Radio Voice Call Continuity): voice HO from VoNR to VoLTE
> - Context transfer between EPC and 5GC
> - Inter-RAT cell reselection (IDLE mode) vs handover (CONNECTED mode)

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
