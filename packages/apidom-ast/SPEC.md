---
id: apidom-ast
type: module-design
status: active
title: apidom-ast
parent: apidom-architecture
---

## Responsibility

Format-level syntax trees for JSON and YAML (AST nodes) and traversal algorithms over CST and AST. It knows nothing of API semantics.

## Boundary

Depends only on `apidom-error`. Consumed by core, the base parser adapters and namespaces that need AST access. Must not import ApiDOM elements or any namespace.
