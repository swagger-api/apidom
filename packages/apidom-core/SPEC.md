---
id: apidom-core
type: module-design
status: active
title: apidom-core
parent: apidom-architecture
depends-on: [apidom-ast]
---

## Responsibility

The base ApiDOM namespace (elements with `element`, `meta`, `attributes`, `content`), predicates, refract/transform/traverse algorithms (`visit`), source-map support and serialization (JSON/YAML generation). It is the vocabulary every other package speaks.

## Boundary

Depends only on `apidom-ast` and `apidom-error`. Must not know any specific API specification; specification semantics belong to `apidom-ns-*`. Changes here cascade to every downstream package.
