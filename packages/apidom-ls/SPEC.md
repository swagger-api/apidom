---
id: apidom-ls
type: module-design
status: active
title: apidom-ls
parent: apidom-architecture
depends-on: [apidom-parser, apidom-reference, apidom-core]
---

## Responsibility

An LSP-compliant language service: validation (lint rules), completion, hover documentation, semantic highlighting and dereferencing, driven by per-specification configuration under `src/config`. Detailed lint-rule guidance lives in `packages/apidom-ls/CLAUDE.md`.

## Boundary

Top of the dependency stack: may depend on parser, reference, core, query packages, and the namespaces and adapters it supports. Nothing in the monorepo depends on it. Supporting a new specification version requires configuration here in addition to its namespace, adapters and reference support.
