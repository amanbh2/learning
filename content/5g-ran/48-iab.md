# Integrated Access and Backhaul (IAB)

## Overview
IAB enables a gNB node to use the NR radio interface for both access (serving UEs) and backhaul (connecting to the donor gNB). This eliminates the need for fiber to every cell site — critical for dense small cell and mmWave deployments.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - IAB architecture: IAB-donor (fiber-connected gNB) and IAB-node (wireless backhaul)
> - BAP (Backhaul Adaptation Protocol) layer: new layer between RLC and IP for routing
> - Multi-hop topology: IAB-node can relay through other IAB-nodes
> - IAB-node setup: how an IAB-node discovers and connects to the donor
> - Topology adaptation: rerouting backhaul when an IAB-node fails
> - Resource multiplexing: TDM between access and backhaul on the same spectrum
> - Half-duplex constraint: IAB-node can't receive on backhaul and transmit on access simultaneously
> - IAB-MT (Mobile Termination) and IAB-DU: functional split within IAB-node
> - Use cases: dense urban small cells, mmWave coverage extension
> - 3GPP specs: TS 38.401 (architecture), TS 38.340 (BAP)
> - Rel-16 vs Rel-17 enhancements

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
