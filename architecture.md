---
id: apidom-architecture
type: architecture-design
status: active
title: ApiDOM architecture
parent: apidom-goal
---

## Drivers

Many specification versions times two formats must share one traversal, query and reference machinery, and must be usable in any JavaScript runtime.

## Topology

A lerna/nx monorepo of npm packages under `packages/`. The pipeline has three stages: **parse** (source string to tree-sitter CST to generic ApiDOM), **refract** (generic ApiDOM to semantic ApiDOM, optionally via plugins) and **generate** (ApiDOM back to JSON/YAML). Parsing is direct (CST to ApiDOM, default) or indirect (CST to JSON AST to ApiDOM).

Package families, in dependency order (a package may depend only on families listed before it, except where noted):

1. **Foundation**: `apidom-error`, `apidom-logging`, [apidom-ast](packages/apidom-ast/SPEC.md), [apidom-core](packages/apidom-core/SPEC.md).
2. **Query**: `apidom-json-pointer`, `apidom-json-pointer-relative`, `apidom-json-path` (depend on core and error).
3. **Namespaces** `apidom-ns-*`: one per specification version; each owns element classes, predicates, visitors and a refractor. They depend on core and on their parent namespace. Inheritance chains: JSON Schema draft 4 to 6 to 7 to 2019-09 to 2020-12; OpenAPI 3.0 to 3.1 to 3.2; AsyncAPI 2 to 3; OpenAPI 2 and 3.0 build on JSON Schema draft 4; AsyncAPI 2 on draft 7; OpenAPI 3.1/3.2 and Arazzo on 2020-12; API Design Systems on OpenAPI 3.1.
4. **Base parser adapters** `apidom-parser-adapter-json` and `-yaml-1-2`: lexical and syntactic analysis into generic ApiDOM.
5. **Specification parser adapters** `apidom-parser-adapter-{spec}-{json|yaml}-{version}`: wrap a base adapter plus a namespace; each exposes `detect`, `parse`, `mediaTypes`. They never depend on one another.
6. [apidom-parser](packages/apidom-parser/SPEC.md): format/spec detection and dispatch to adapters.
7. [apidom-reference](packages/apidom-reference/SPEC.md): parse, resolve, dereference, bundle.
8. **Consumers**: `apidom-converter` (uses core, namespaces, reference), [apidom-ls](packages/apidom-ls/SPEC.md) and `apidom-playground` (an app, not a library).

## Invariants

- Dependencies point downward only; foundation never imports a namespace, adapter or consumer.
- A new specification version adds only fields new in that version and inherits the rest from its parent namespace.
- Parser adapters are interchangeable behind the `detect`/`parse`/`mediaTypes` shape; consumers rely on that shape, not on a concrete adapter.
- Every package ships CJS, ESM and browser (UMD) builds; code must not assume Node-only APIs.
- The monorepo must be built before tests run (package topology resolves through build output).
- Source files import with explicit `.ts` extensions.

## Decisions

- Direct parsing is the default because it needs one traversal instead of two; indirect parsing is retained for analyses needing a JSON AST. Rationale beyond this is unconfirmed.
- Packages are split per specification version and per format, so consumers pull in only what they use (inferred, unconfirmed).
