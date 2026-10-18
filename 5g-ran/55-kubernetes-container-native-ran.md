# Kubernetes & Container-Native RAN

## Overview
Modern 5G RAN software (CU-CP, CU-UP) runs as containerized workloads on Kubernetes. Understanding the cloud-native deployment model — pods, services, liveness probes, and the CNF (Cloud-Native Network Function) paradigm — is essential for anyone working on real-world CU-CP software.

## Content

> **TODO:** This note needs to be filled with detailed content covering:
> - CNF vs VNF: Cloud-Native Network Function vs Virtual Network Function
> - CU-CP as a Kubernetes pod: deployment model, resource limits, scheduling
> - Pod lifecycle: init containers, readiness/liveness probes, graceful shutdown
> - SCTP in Kubernetes: challenges with SCTP load balancing, multus, host networking
> - Helm charts for RAN deployment: parameterized deployment
> - ConfigMaps and Secrets: how CU-CP gets its configuration
> - Horizontal scaling: multiple CU-CP pods, UECC distribution
> - Service mesh considerations for RAN workloads
> - Persistent storage: where state lives (Redis, etcd, local volumes)
> - Monitoring: Prometheus metrics, Grafana dashboards for RAN KPIs
> - Upgrade strategies: rolling update, blue-green, canary for RAN pods
> - Real-world challenges: latency requirements, DPDK, SR-IOV for user plane

## Key Takeaways
- TBD

---
*Last updated: 2026-10-18*
