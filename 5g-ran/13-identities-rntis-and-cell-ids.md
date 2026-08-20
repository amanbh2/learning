# Identities in 5G NR (RNTIs, Cell IDs, PLMN)

## Overview
Before understanding any 5G call flow, you must understand the identifiers used to address UEs, cells, and networks. Every message on the air interface uses these identities, and interviewers love asking about them.

## 1. PLMN Identity
- **What:** Public Land Mobile Network Identifier = **MCC + MNC**
  - MCC = Mobile Country Code (3 digits, e.g., 310 = USA)
  - MNC = Mobile Network Code (2-3 digits, e.g., 410 = AT&T)
- **Where used:** SIB1 broadcasts a list of PLMN IDs. The UE picks one based on its SIM.
- **LTE vs 5G:** Same concept. No change.

## 2. Cell Identities

| Identity | Full Name               | Size       | What It Identifies                                                                                        |
| -------- | ----------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| **PCI**  | Physical Cell Identity  | 0-1007     | The physical radio cell. Derived from PSS (0-2) × SSS (0-335). Not globally unique — reused across cells. |
| **NCI**  | NR Cell Identity        | 36 bits    | Globally unique cell ID within a PLMN. Composed of `gNB ID + Cell ID`.                                    |
| **NCGI** | NR Cell Global Identity | PLMN + NCI | Absolutely globally unique. Used in core network signaling (NGAP).                                        |
| **TAC**  | Tracking Area Code      | 24 bits    | Groups cells into Tracking Areas. UE monitors paging within its registered TA list.                       |

> [!TIP]
> **Interview Trap:** PCI is NOT globally unique. There are only 1008 PCIs. Two neighbor gNBs can accidentally use the same PCI, causing **PCI collision** (UE can't distinguish them) or **PCI confusion** (network routes to wrong cell). PCI planning is critical.

## 3. RNTIs (Radio Network Temporary Identifiers)
RNTIs are 16-bit identifiers used by the MAC layer to address UEs on the PDCCH. The gNB uses the RNTI to scramble the DCI (Downlink Control Information) so that only the intended UE can decode it.

| RNTI | Full Name | Value Range | Purpose | When Assigned |
|------|-----------|-------------|---------|---------------|
| **RA-RNTI** | Random Access RNTI | 1-15 | Identifies RACH occasion. UE monitors PDCCH for RAR (Msg2) using this. | Calculated from PRACH time/freq slot |
| **TC-RNTI** | Temporary C-RNTI | 1-65519 | Temporary identity during RACH contention resolution. | Assigned in RAR (Msg2) |
| **C-RNTI** | Cell RNTI | 1-65519 | **The main UE identity** in `RRC_CONNECTED`. All DL/UL grants are addressed to this. | After contention resolution (TC-RNTI is promoted) or via RRC Setup |
| **SI-RNTI** | System Information RNTI | 65535 (fixed) | All UEs use this to decode SIB1 on PDCCH. | Pre-configured |
| **P-RNTI** | Paging RNTI | 65534 (fixed) | All UEs in `RRC_IDLE`/`RRC_INACTIVE` monitor this for paging. | Pre-configured |
| **CS-RNTI** | Configured Scheduling RNTI | 1-65519 | Used for Semi-Persistent Scheduling (SPS) grants. | Configured via RRC |
| **I-RNTI** | Inactive RNTI | 1-65519 | Identifies a UE in `RRC_INACTIVE` state across cells. Used in RRC Resume. | Assigned when entering INACTIVE |

### RA-RNTI Calculation
The RA-RNTI is not assigned by anyone — it is **calculated deterministically** by both the UE and the gNB:
```
RA-RNTI = 1 + s_id + 14 × t_id + 14 × 80 × f_id + 14 × 80 × 8 × ul_carrier_id
```
- `s_id` = first OFDM symbol index of the PRACH occasion (0-13)
- `t_id` = first slot index of the PRACH occasion (0-79)
- `f_id` = frequency-domain index of the PRACH occasion (0-7)

## 4. UE NAS Identities

| Identity      | Full Name                                 | Layer   | Purpose                                                                                      |
| ------------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| **SUPI**      | Subscription Permanent Identifier         | NAS     | The permanent identity (like the old IMSI). Never sent over the air in 5G.                   |
| **SUCI**      | Subscription Concealed Identifier         | NAS     | Encrypted version of SUPI. Sent during initial registration to protect privacy.              |
| **5G-GUTI**   | 5G Globally Unique Temporary Identifier   | NAS     | Temporary identity assigned by the AMF after registration. Used instead of SUPI for privacy. |
| **5G-S-TMSI** | 5G S-Temporary Mobile Subscriber Identity | NAS/RRC | Short form of 5G-GUTI. Used in RRC Setup Request and Paging to identify the UE.              |

> [!IMPORTANT]
> **5G Privacy Enhancement vs LTE:** In LTE, the IMSI could be sent in plaintext during initial attach (privacy risk — IMSI catchers). In 5G, the SUPI is **never** sent unencrypted. The UE encrypts it into SUCI using the operator's public key before sending.

## 5G vs LTE Identity Comparison

| Concept              | LTE         | 5G NR                  |
| -------------------- | ----------- | ---------------------- |
| Permanent ID         | IMSI        | SUPI                   |
| Temporary ID (core)  | GUTI        | 5G-GUTI                |
| Temporary ID (radio) | C-RNTI      | C-RNTI (same)          |
| Cell global ID       | ECGI        | NCGI                   |
| Physical cell ID     | PCI (0-503) | PCI (0-1007, doubled!) |
| Paging ID            | S-TMSI      | 5G-S-TMSI              |

## Interview Q&A

**Q: A UE just powered on. In what order does it encounter these identities?**
**A:** 
1. **PCI** — derived from PSS/SSS during cell search
2. **SI-RNTI** — used to decode SIB1 on PDCCH
3. **PLMN ID** — read from SIB1 to select network
4. **RA-RNTI** — calculated when performing RACH (to monitor for RAR)
5. **TC-RNTI** — received in RAR (Msg2)
6. **C-RNTI** — TC-RNTI promoted after contention resolution
7. **5G-GUTI** — assigned by AMF after NAS Registration

**Q: What is the difference between RA-RNTI, TC-RNTI, and C-RNTI during the RACH procedure?**
**A:** 
- **RA-RNTI** is used for Msg2 (RAR). It identifies the RACH occasion, not the UE.
- **TC-RNTI** is a temporary UE identity assigned in Msg2. Used for Msg3 and Msg4 scheduling.
- **C-RNTI** is the permanent cell-level UE identity. The TC-RNTI becomes the C-RNTI after successful contention resolution (Msg4).

**Q: Why does 5G have 1008 PCIs while LTE only has 504?**
**A:** 5G doubled the PCI range because of cell densification (many more small cells, especially in FR2/mmWave). More PCIs reduce the probability of PCI collision in dense deployments.

---
*Last updated: 2026-08-08*
