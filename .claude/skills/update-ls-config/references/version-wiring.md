# Version Directory, Target Specs and Config Wiring Reference

Read this during **Phase 4** (target specs), at the start of **Phase 5** (directory layout, step 5.1) and when generating `meta.ts` (step 5.7), and during **Phase 7** (registering the version in the main config files).

The real files are the source of truth; open them before editing:
- `packages/apidom-ls/src/config/openapi/target-specs.ts`, `config.ts`, `symbols.ts`
- `packages/apidom-ls/src/config/asyncapi/target-specs.ts`, `config.ts`, `symbols.ts`
- `packages/apidom-ls/src/config/a2a/target-specs.ts`, `config.ts` (A2A has no `symbols.ts`)

### Target Spec Naming Convention

A target spec is an **array of `{ namespace, version }` objects**, not a symbol. The language service compares each entry with the document's namespace and exact version (see `getMetadataPropertyCompletions` in `services/completion/completion-service.ts`), so every released patch version needs an entry.

- One constant per released version, named after the spec and the version digits without dots: `OpenAPI310`, `OpenAPI311`, `AsyncAPI300`, `A2A100`, `A2A101`.
- Aggregate constants spread the per-version constants for a minor or major line: `OpenAPI31`, `OpenAPI3` (all of 3.0, 3.1 and 3.2), `AsyncAPI2`, `AsyncAPI3`, `A2A1`.
- When a line has only one released version so far, the aggregate is defined directly (`export const OpenAPI32 = [{ namespace: 'openapi', version: '3.2.0' }];`).

### Version Directory Naming

- Lowercase spec name plus version, with an underscore between major and minor when the directory is per minor version: `openapi3_0`, `openapi3_1`, `openapi3_2`, `asyncapi2`, `asyncapi3`, `a2a1`.
- Match the pattern already used by sibling version directories of the same spec.

#### 4.1 Update target-specs.ts

Location: `packages/apidom-ls/src/config/{spec}/target-specs.ts`

Add one constant per new released version, then add it to the aggregates that should include it. Excerpt from `config/openapi/target-specs.ts`:

```typescript
export const OpenAPI310 = [{ namespace: 'openapi', version: '3.1.0' }];
export const OpenAPI311 = [{ namespace: 'openapi', version: '3.1.1' }];
export const OpenAPI312 = [{ namespace: 'openapi', version: '3.1.2' }];

export const OpenAPI31 = [...OpenAPI310, ...OpenAPI311, ...OpenAPI312];
export const OpenAPI32 = [{ namespace: 'openapi', version: '3.2.0' }];
export const OpenAPI3 = [...OpenAPI30, ...OpenAPI31, ...OpenAPI32];
```

For a brand-new spec, create the file with the same shape (from `config/a2a/target-specs.ts`):

```typescript
export const A2A100 = [{ namespace: 'a2a', version: '1.0.0' }];
export const A2A101 = [{ namespace: 'a2a', version: '1.0.1' }];

export const A2A1 = [...A2A100, ...A2A101];
```

The `namespace` string must match the content-language namespace the language service detects (the `contentLanguage.namespace` branches in `packages/apidom-ls/src/parser-factory.ts`, e.g. `'a2a'`). The `version` string is compared with the value of the document's version field (`getSpecVersion` in `utils/utils.ts`), so it must be the exact version string a document declares, such as `'3.1.1'`.

Adding a version to an aggregate such as `OpenAPI3` widens every existing rule, completion item and documentation entry that uses it. That is what you want for fields that are unchanged in the new version; fields removed or changed in the new version must use a narrower constant (see "Target Spec Scoping" in the `review-ls-changes` skill).

Rule files combine constants with spreads: `targetSpecs: [...OpenAPI31, ...OpenAPI32]`.

#### 5.1 Create Version Directory Structure

The version directory holds the root object's config only. Every other spec object has its own element directory next to it (e.g. `config/openapi/info/`, `config/a2a/agent-capabilities/`), shared by all versions and scoped with `targetSpecs`.

```
packages/apidom-ls/src/config/{spec}/{version}/
├── completion.ts        # Completion items for the root object's fields
├── documentation.ts     # Hover documentation for the root object's fields
├── lint/                # Rules for the root object's fields (flat, one file per rule)
│   ├── allowed-fields.ts
│   ├── {field}--type.ts
│   ├── {field}--required.ts
│   └── index.ts
└── meta.ts              # Aggregates completion, documentation and lint
```

#### 5.7 Generate meta.ts

Aggregates completion, documentation, and lint configs. This is the exact content of `config/openapi/openapi3_2/meta.ts` and `config/a2a/a2a1/meta.ts`:

```typescript
import lint from './lint/index.ts';
import completion from './completion.ts';
import documentation from './documentation.ts';
import { FormatMeta } from '../../../apidom-language-types.ts';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
```

## Update Main Config Files (Phase 7)

#### 7.1 Update config/{spec}/config.ts

`config/{spec}/config.ts` default-exports one object that maps **element names** to their metas. The language service looks up config by the element name of the node under the cursor, so the key must be exactly the value of `this.element` in the namespace element class (e.g. `this.element = 'openApi3_2'` in `apidom-ns-openapi-3-2/src/elements/OpenApi3-2.ts`).

Import the version meta and add it as a key next to the other root elements. From `config/openapi/config.ts`:

```typescript
import openapi3_1Meta from './openapi3_1/meta.ts';
import openapi3_2Meta from './openapi3_2/meta.ts';

export default {
  // ...
  openApi3_1: openapi3_1Meta,
  openApi3_2: openapi3_2Meta,
  // ...
};
```

Element directories are registered the same way (`info: infoMeta`, `agentCapabilities: agentCapabilitiesMeta`). For A2A the root element is `a2aAgentCard1`, so `config/a2a/config.ts` has `a2aAgentCard1: a2a1Meta`.

For a brand-new spec, also create `config/{spec}/config.ts` with the `'*'` entry for duplicate keys (copy it from `config/a2a/config.ts`) and register it in `metadataMaps` in `packages/apidom-ls/src/config/config.ts` under the namespace name used in `target-specs.ts`.

#### 7.2 Update config/{spec}/symbols.ts (only when needed)

`config/{spec}/symbols.ts` is a plain list of element names and class names, merged in `config/symbols.ts` and passed to the language service as `metadata.symbols`. `DefaultSymbolsService` (`services/symbols/symbols-service.ts`) uses it to decide which elements appear as document symbols (the outline). It has nothing to do with lint, completion or hover.

Add a name only if the new element should show in the outline, by appending the element name to the existing list:

```typescript
const openAPI3symbols = [
  'parameter',
  'info',
  'operation',
  'pathItem',
  // ...
];
```

Most new versions need no change here, because their elements reuse names that are already listed. A2A has no `symbols.ts` at all, so A2A documents have no outline entries; a new spec only needs one if outline support is in scope (then also import it in `config/symbols.ts`).
