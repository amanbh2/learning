# 5G RAN Best Practices & Study Guidelines

This document tracks standard idioms, patterns, and conventions used throughout this knowledge base to ensure consistency and readability.

## 1. Note Structure
Every note must adhere to the following structure:
1. **Title:** Clean, descriptive H1 (`# Topic Title`).
2. **Overview:** A 1-2 sentence summary of what the note covers and why it matters.
3. **Core Content:** Use numbered sections (`## 1. Topic`). Avoid massive walls of text. Use bullet points and tables extensively.
4. **PlantUML Diagrams:** Required for *any* call flow or state machine. Use `skinparam backgroundColor white`.
5. **Comparison Tables:** Whenever applicable, include an "LTE vs 5G Comparison" section.
6. **Interview Q&A:** At the bottom, include 2-4 critical interview questions and answers.
7. **Footer:** `---` followed by `*Last updated: YYYY-MM-DD*`.

## 2. Terminology and Formatting
- **Protocols:** Always capitalize protocol names (e.g., RRC, PDCP, NGAP).
- **Messages:** Use camelCase or exact 3GPP names for messages (e.g., `RRCReconfiguration`, `MeasurementReport`). Enclose them in backticks or bold them.
- **Information Elements (IEs):** Enclose in backticks (e.g., `reconfigurationWithSync`, `t310`).

## 3. Explaining Call Flows (The "Why")
When documenting a message exchange, do not just list the messages. Follow the **What / Contains / Why** pattern:
- **What:** The message name (e.g., `XnAP: Handover Request`).
- **Contains:** Key IEs (e.g., Source-to-Target Container, PDU session info).
- **Why:** The human-readable purpose (e.g., "Source asks target: 'can you admit this UE?'").

## 4. 5G vs LTE Comparisons
Interviewers constantly ask for differences. Focus on structural differences rather than just speed:
- e.g., Flow-based QoS (5G) vs Bearer-based QoS (LTE).
- e.g., CU/DU split (5G) vs Monolithic eNB (LTE).
- e.g., RRC_INACTIVE state (5G) vs just IDLE/CONNECTED (LTE).

## 5. PlantUML Best Practices
- Define participants clearly at the top.
- Use `note right` or `note left` to explain the contents of a message directly on the flow line.
- Use `== Section Name ==` to break long flows into logical phases (Preparation, Execution, Completion).
