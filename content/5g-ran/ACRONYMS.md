# 5G RAN Acronym Glossary

| Acronym | Full Form | Description |
| :--- | :--- | :--- |
| **3GPP** | 3rd Generation Partnership Project | The standards body that develops protocols for mobile telecommunications (LTE, 5G, etc.). |
| **5GC** | 5G Core | The core network for 5G (SA), featuring Service-Based Architecture. |
| **AMF** | Access and Mobility Management Function | The 5GC control plane node (similar to 4G MME). Handles UE registration and mobility. |
| **ARQ** | Automatic Repeat Request | Error control method for data transmission (used in RLC layer). |
| **CHO** | Conditional Handover | A feature where the UE receives handover commands early but only executes them if radio conditions drop below a threshold. |
| **CPRI / eCPRI** | (enhanced) Common Public Radio Interface | Fronthaul interface connecting the baseband unit to the radio unit. |
| **CRS** | Cell-Specific Reference Signal | An always-on reference signal in LTE. Eliminated in 5G NR. |
| **CU** | Central Unit | The higher-layer portion of the gNB hosting RRC, SDAP, and PDCP. |
| **CU-CP** | Central Unit - Control Plane | Hosts the RRC and the control-plane part of PDCP. |
| **CU-UP** | Central Unit - User Plane | Hosts the SDAP and the user-plane part of PDCP. |
| **DRB** | Data Radio Bearer | A bearer used to transport user plane data over the air. |
| **DU** | Distributed Unit | The lower-layer portion of the gNB hosting RLC, MAC, and PHY. |
| **EN-DC** | E-UTRA-NR Dual Connectivity | The formal name for NSA Option 3x (UE connects to 4G Master Node and 5G Secondary Node). |
| **EPC** | Evolved Packet Core | The 4G Core Network. |
| **FR1 / FR2** | Frequency Range 1 / 2 | FR1 is Sub-6 GHz. FR2 is mmWave (above 24 GHz). |
| **gNB** | gNodeB (Next Generation Node B) | The 5G base station. |
| **HARQ** | Hybrid Automatic Repeat Request | Fast, physical-layer error correction using soft-combining (used in MAC layer). |
| **MIMO** | Multiple Input Multiple Output | Use of multiple antennas at the transmitter and receiver to improve performance. |
| **ng-eNB** | Next-Generation eNodeB | An upgraded 4G base station that connects to the 5G Core. |
| **NSA** | Non-Standalone | 5G deployment relying on a 4G core and 4G master radio node. |
| **OAM** | Operations, Administration, and Maintenance | The processes and software (e.g., DU Manager) used to manage network fault, performance, and configuration. |
| **O-RAN** | Open RAN | An architecture standardizing open interfaces (like E2 and O1) to disaggregate the gNB. |
| **PDCP** | Packet Data Convergence Protocol | Protocol layer handling ciphering, integrity protection, and sequence numbering. |
| **QFI** | QoS Flow Identifier | Identifies a QoS flow in the 5G system. |
| **RACH** | Random Access Channel | Procedure used by UE to gain initial uplink synchronization with the network. |
| **RIC** | RAN Intelligent Controller | An O-RAN server hosting AI/ML apps (xApps/rApps) to optimize the radio network. |
| **RLC** | Radio Link Control | Protocol layer handling segmentation, reassembly, and error correction (ARQ). |
| **RRC** | Radio Resource Control | Layer 3 protocol handling connection setup, mobility, and signaling. |
| **RRM** | Radio Resource Management | The algorithmic intelligence that makes decisions on load balancing, admission control, and handovers. |
| **SA** | Standalone | True 5G deployment where gNB connects directly to the 5G Core. |
| **SBA** | Service-Based Architecture | The API-driven architecture of the 5G Core. |
| **SCS** | Subcarrier Spacing | The frequency width of a single OFDM subcarrier (e.g., 15 kHz, 120 kHz). |
| **SDAP** | Service Data Adaptation Protocol | 5G protocol mapping QoS flows to Data Radio Bearers (DRBs). |
| **SMF** | Session Management Function | The 5GC node that allocates IP addresses and manages PDU sessions. |
| **SON** | Self-Organizing Networks | Automation technology for self-configuring, self-optimizing, and self-healing the network. |
| **SRB** | Signaling Radio Bearer | A bearer used to transport control plane RRC and NAS signaling. |
| **UECC** | UE Control Client / Context Control | A vendor-specific software module in the CU-CP that manages the state machine for a connected UE. |
| **UPF** | User Plane Function | The 5GC node that routes data packets to the external Data Network. |
| **URLLC** | Ultra-Reliable Low-Latency Communication | 5G use-case focusing on mission-critical, low-latency applications. |

*(This list will grow as we progress through the syllabus)*
