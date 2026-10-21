# UE Capability Transfer & Enquiry

## Overview
Before the network can configure a UE with advanced features (CA, MIMO layers, BWP, etc.), it must know what the UE supports. UE Capability Transfer is how this happens. Understanding capability filtering, feature groups, and band combinations is essential for CU-CP developers and comes up in interviews.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - UECapabilityEnquiry message: what the gNB asks (RAT type, frequency band list, feature set filter)
> - UECapabilityInformation message: what the UE responds with
> - Capability filtering: how the network requests only relevant capabilities (band combos for deployed bands)
> - Feature groups and feature sets: how NR capabilities are structured
> - Band combinations (BandCombination): CA and DC band support
> - R15/R16/R17 capability container evolution
> - MRDC capabilities (for EN-DC/NR-DC)
> - UE capability caching at CU-CP
> - When capability enquiry happens in the call flow (after security activation)
> - Capability ID and capability coordination (Rel-17)

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
