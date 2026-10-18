# RRC Connection Release, Suspend & Resume

## Overview
This note covers the lifecycle beyond CONNECTED state — how the network releases a UE, how it suspends to INACTIVE state, and how resume works. The RRC_INACTIVE state and RNA (RAN Notification Area) concept are 5G-specific and frequently asked in interviews.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - RRC Release: when and why (inactivity, load, HO failure)
> - Release with redirectCarrierInfo: redirect UE to another frequency/RAT
> - Release with suspend: transition UE to RRC_INACTIVE
>   - suspendConfig: I-RNTI, resumeMAC-I, RNA configuration
>   - UE stores AS context (security keys, bearer config) — can resume without full setup
> - RRC_INACTIVE state: UE is known to RAN but not actively scheduled
>   - RNA (RAN Notification Area): area within which UE doesn't need to notify network
>   - RAN paging: gNB pages UE within RNA (not AMF paging — that's for IDLE)
>   - RNA update: UE moves outside RNA, sends RRC Resume Request for RNA update only
> - RRC Resume procedure:
>   - Full resume: UE wants to become CONNECTED again (data arrives)
>   - Fallback to RRC Setup: if CU can't find stored context
>   - Resume with RNA update: just update location, stay INACTIVE
> - I-RNTI (Inactive-RNTI): identity used in INACTIVE state
> - Comparison with LTE: LTE had no INACTIVE state — only IDLE and CONNECTED
> - Use case: IoT devices with infrequent data — INACTIVE saves battery while keeping fast resume

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
