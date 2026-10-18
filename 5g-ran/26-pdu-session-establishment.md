# PDU Session Establishment

## Overview
After UE Registration (attach), the UE has NAS connectivity but no data path. PDU Session Establishment creates the end-to-end data tunnel — from UE through the gNB to the UPF and out to the internet. This is the **"other half"** of the attach story and is always asked separately in interviews.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - PDU Session types: IPv4, IPv6, IPv4v6, Ethernet, Unstructured
> - NAS flow: UE → AMF (PDU Session Establishment Request) → SMF (session creation) → UPF (tunnel setup)
> - RAN flow: AMF → gNB (NGAP PDU Session Resource Setup Request) → gNB creates DRBs
> - QoS flow to DRB mapping: how 5QI determines DRB parameters
> - AN Tunnel Info: GTP-U tunnel between gNB and UPF
> - E1AP: Bearer Context Setup at CU-UP
> - F1AP: UE Context Modification at DU (add DRBs)
> - RRCReconfiguration to UE with DRB configuration
> - PDU Session Modification and Release flows
> - Comparison with LTE: Default/Dedicated bearer vs QoS flows
> - SSC Modes (Session and Service Continuity): SSC Mode 1, 2, 3

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
