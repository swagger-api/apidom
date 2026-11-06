---
id: apidom-parser
type: module-design
status: active
title: apidom-parser
parent: apidom-architecture
depends-on: [apidom-core]
---

## Responsibility

A unified parse entry point: given a source string it finds a compatible parser adapter (by `detect` or media type) and delegates to it.

## Boundary

Depends on core and error; adapters are supplied to it and consumed through the `detect`/`parse`/`mediaTypes` shape, never by concrete type. Contains no format or specification logic.
