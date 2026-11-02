---
id: apidom-reference
type: module-design
status: active
title: apidom-reference
parent: apidom-architecture
depends-on: [apidom-core]
---

## Responsibility

Parse, resolve, dereference and bundle API descriptions: pluggable parse, resolve (filesystem/HTTP), dereference (transclude `$ref`s) and bundle (multi-file to compound document) components, with per-specification strategies.

## Boundary

Depends on core and error at the package level; specification support (namespaces and adapters) is wired in per version as strategies and parsers, so a new specification version must be registered here to have its references handled. Must not depend on the language service.
