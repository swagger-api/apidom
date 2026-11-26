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

The bundle stage is a pluggable extension point. Every current bundle strategy (OpenAPI 3.0, OpenAPI 3.1, OpenAPI 3.2, JSON Schema 2020-12) returns the document unchanged, so nothing produces a compound document yet.

## Boundary

Depends on core and error at the package level; specification support (namespaces and adapters) is wired in per version as strategies and parsers, so a new specification version must be registered here to have its references handled. Must not depend on the language service.

## OpenAPI 3.0 dereference options

Opt-in `dereference.strategyOpts['openapi-3-0']` options; defaults keep the behaviour unchanged.

- `internalScope: 'document' | 'entry'` decides what `resolve.internal` / `resolve.external` treat as internal: refs into the document being traversed (default), or only refs into the entry document, so refs internal to external documents count as external.
- `fragmentTransformer({ fragment, document, uri, referencedElementType })` runs on every referenced fragment (Reference Objects and Path Item `$ref`s) before refraction and transclusion. Its result is cached per fragment and element type; that cache is what keeps cycle detection working when a fragment is reached again.
- `dereferenceExamples: false` / `dereferenceLinks: false` skip Example `externalValue` and Link `operationRef` handling entirely.
- Refs a visitor deliberately leaves unresolved (because of `resolve.internal` / `resolve.external`) are shared with nested visitors and never re-resolved by a visitor with a different base URI (an inlined Path Item is traversed again by the outer visitor so the referencing Path Item's own fields are processed). The record lives in visitor state, not element meta, so a caller's document isn't marked when `immutable` is `false`.

## HTTP resolvers

`HTTPResolver` accepts an optional `urlAllowList` (RegExps or minimatch globs, like `FileResolver.fileAllowList`). Undefined means any http(s) URL; an empty list allows none. `canRead` checks the URL, and `HTTPResolverAxios` checks every redirect (Node.js) and still calls a `beforeRedirect` configured in `axiosConfig`. The check is per request, so the list also applies when set per call through `resolve.resolverOpts`, which is copied onto a per-call resolver clone.
