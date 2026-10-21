# Voice over NR (VoNR) & EPS Fallback

## Overview
Voice remains a fundamental service. In 5G SA, voice calls use VoNR (Voice over NR via IMS). However, many networks still fall back to LTE for voice using EPS Fallback. Understanding both mechanisms — and when each is used — is critical for L3 interviews.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - VoNR: IMS-based voice over 5G NR SA
>   - QoS: 5QI=1 (conversational voice), GBR bearer
>   - Dedicated DRB for voice with strict QoS parameters
>   - IMS registration over 5G NR PDU session
>   - Emergency calls over VoNR
> - EPS Fallback: redirect to LTE for voice when VoNR not available
>   - Method 1: RRC Release with redirectCarrierInfo to LTE (redirection-based)
>   - Method 2: Handover to LTE (HO-based EPS Fallback)
>   - Method 3: Redirection with N26 (with core network interworking)
>   - Call setup delay comparison between methods
> - SRVCC (Single Radio Voice Call Continuity):
>   - Mid-call HO from VoNR to VoLTE when NR coverage is lost
>   - SRVCC preparation at AMF
> - VoLTE vs VoNR comparison
> - Why EPS Fallback exists: many operators don't have full NR coverage for voice yet
> - Network configuration: how gNB decides VoNR vs EPS Fallback per UE

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
