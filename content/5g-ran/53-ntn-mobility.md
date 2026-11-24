# NTN Mobility & Feeder Link Switching

## Overview
Satellite mobility introduces unique challenges not present in terrestrial networks. This note covers how handover works when the base station itself is moving (LEO satellites), Earth-fixed vs Earth-moving cell concepts, and feeder link switching between ground stations.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - Earth-fixed cells: satellite beams are steered to keep cells geographically fixed (cell doesn't move with satellite)
> - Earth-moving cells: cells move with the satellite — simpler satellite but UE must handle cell changes frequently
> - Satellite handover: UE transitions between beams of the same or different satellites
>   - Intra-satellite beam HO: beam steering changes, UE moves to adjacent beam
>   - Inter-satellite HO: UE moves from one satellite's coverage to another's
> - Feeder link switching: satellite switches its ground station connection as it orbits
>   - Impact on latency and routing
>   - Signaling during feeder link switch
> - Predictable mobility: satellite orbits are known → handover can be pre-planned
> - Conditional Handover for NTN: pre-configured HO based on time/position rather than measurements
> - Service continuity challenges: maintaining PDU sessions across satellite switches
> - Timer and counter adaptations: T304, T310 extended for NTN propagation delays
> - Comparison with terrestrial mobility: predictable (NTN) vs unpredictable (terrestrial)

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
