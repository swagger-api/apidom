---
id: apidom-reference
type: module-design
status: active
title: apidom-reference
parent: apidom-architecture
depends-on: [apidom-core]
---

## Responsibility

Parse, resolve, dereference and bundle API descriptions: pluggable parse, resolve (filesystem/HTTP), dereference (transclude `$ref`s) and bundle components, with per-specification strategies.

The bundle stage is a pluggable extension point. Every current bundle strategy (OpenAPI 3.1, OpenAPI 3.2, JSON Schema 2020-12) returns the document unchanged, so nothing produces a compound document yet.

## Boundary

Depends on core and error at the package level; specification support (namespaces and adapters) is wired in per version as strategies and parsers, so a new specification version must be registered here to have its references handled. Must not depend on the language service.
