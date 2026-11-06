---
id: apidom-goal
type: goal-and-requirements
status: active
title: ApiDOM goal and requirements
---

## Goal

ApiDOM gives every API description language (OpenAPI, AsyncAPI, Arazzo, JSON Schema, and others) and every serialization format (JSON, YAML) one shared, semantic document structure, so tool builders consume one structure instead of one per format.

## Problem and audience

API tooling (editors, linters, dereferencers, converters, documentation) is reimplemented per language and per format. Audience: tool builders who need to parse, query, transform, resolve and generate API descriptions. Primary consumers appear to be the Swagger tooling ecosystem (unconfirmed).

## Capabilities

- Parse JSON and YAML sources into a generic ApiDOM, then refract it into specification-specific (semantic) ApiDOM for OpenAPI 2.0/3.0/3.1/3.2, AsyncAPI 2/3, Arazzo 1, A2A 1, API Design Systems and JSON Schema (draft 4, 6, 7, 2019-09, 2020-12).
- Detect which format and specification a source is, and dispatch to the matching parser.
- Traverse, transform, query (JSON Pointer, relative JSON Pointer, JSONPath) and serialize ApiDOM back to JSON/YAML.
- Resolve and dereference references across files and HTTP.
- Convert between specification versions: OpenAPI 3.1 to 3.0.3, and JSON Schema 2020-12 (and other JSON Schema dialects) used in OpenAPI 3.0 documents to OpenAPI 3.0 Schema Objects.
- Provide an LSP-compliant language service (validation, completion, hover documentation, semantic highlighting) over supported specifications.
- Source-map information lets elements be traced back to source positions.
- Run in Node.js, browsers and web workers.

## Principles

- One structure for many formats: semantics live in the element, never in the serialization.
- Newer specification versions extend their parent version rather than redefining it.
- Generation preserves semantics, not style (whitespace and comments are lost).

## Non-goals

- Round-trip preservation of formatting or comments.
