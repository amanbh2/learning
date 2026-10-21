# UE Context Modification & RRC Reconfiguration

## Overview
RRCReconfiguration is the **most versatile RRC message** — used for bearer setup, measurement config, handover, security update, and more. This note covers when and why the CU-CP sends reconfiguration, the corresponding F1AP/E1AP procedures, and common patterns seen in production.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - RRCReconfiguration message structure and major IEs
> - When is Reconfiguration sent: bearer add/modify/release, meas config update, handover, SCell add, security key refresh
> - F1AP UE Context Modification Request/Response
> - E1AP Bearer Context Modification Request/Response
> - The "delta" signaling concept — only changed IEs are sent
> - reconfigurationWithSync (used for handover, PSCell change)
> - fullConfig (when UE must replace all stored config)
> - Transaction ID handling and failure scenarios
> - RRCReconfigurationComplete — what if it's never received?
> - Comparison with LTE: RRCConnectionReconfiguration

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
