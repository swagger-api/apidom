# apidom-reference Resolve, Dereference and Bundle Strategies (Phase 3)

Based on the OpenAPI 3.2.0 implementation (`packages/apidom-reference/src/{resolve,dereference,bundle}/strategies/openapi-3-2/`). The fastest correct path is to copy the parent version's folders (e.g. `openapi-3-1` → `openapi-3-2`) and rename the version identifiers; the templates below show the required shape.

Key facts:
- All strategies of a spec version use the **same plain name** `'{spec}-{version}'` (e.g. `'openapi-3-2'`); never add `-dereference` / `-bundle` suffixes. The resolve strategy looks up the dereference strategy by this name.
- Each strategy extends **its own base class**: `ResolveStrategy`, `DereferenceStrategy`, `BundleStrategy`. Resolve and bundle do **not** extend the dereference strategy.
- The dereference folder is flat: `index.ts`, `visitor.ts`, `util.ts`, `selectors/` directly inside `dereference/strategies/{spec}-{version}/`. There is no `visitors/` subdirectory.

Template variables (in addition to those in `reference-parsers.md`):
- `{SpecName}{Version}`: class prefix, e.g. `OpenAPI3_2`
- `{specName}{Version}Namespace`: namespace default import, e.g. `openApi3_2Namespace`
- `{RootElement}`: root element class, e.g. `OpenApi3_2Element`

## Contents

- 3.1 Create Resolve Strategy
- 3.2 Create Dereference Strategy
- 3.3 Create Dereference Visitor
- 3.4 Create util.ts and Selectors
- 3.5 Create Bundle Strategy
- 3.6 Register Strategies and Add `exports` Subpaths (`saturated.ts`, `package.json` `exports`)
- 3.7 Create Tests for Reference Strategies
- 3.8 JSON Schema Dialects (schema as the document root, `$dynamicRef`, compound documents)
- When strategies are needed (end of file)

## 3.1 Create Resolve Strategy

Create `packages/apidom-reference/src/resolve/strategies/{spec}-{version}/index.ts`:

```typescript
import ResolveStrategy, { ResolveStrategyOptions } from '../ResolveStrategy.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import File from '../../../File.ts';
import { merge as mergeOptions } from '../../../options/util.ts';
import UnmatchedDereferenceStrategyError from '../../../errors/UnmatchedDereferenceStrategyError.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

// Copy the block of `export type { ... }` re-exports verbatim from
// src/resolve/strategies/openapi-3-2/index.ts (needed by api-extractor).

/**
 * @public
 */
export interface {SpecName}{Version}ResolveStrategyOptions extends Omit<ResolveStrategyOptions, 'name'> {}

/**
 * @public
 */
class {SpecName}{Version}ResolveStrategy extends ResolveStrategy {
  constructor(options?: {SpecName}{Version}ResolveStrategyOptions) {
    super({ ...(options ?? {}), name: '{spec}-{version}' });
  }

  canResolve(file: File, options: ReferenceOptions): boolean {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === '{spec}-{version}',
    );

    if (dereferenceStrategy === undefined) {
      return false;
    }

    return dereferenceStrategy.canDereference(file, options);
  }

  async resolve(file: File, options: ReferenceOptions) {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === '{spec}-{version}',
    );

    if (dereferenceStrategy === undefined) {
      throw new UnmatchedDereferenceStrategyError(
        '"{spec}-{version}" dereference strategy is not available.',
      );
    }

    const refSet = new ReferenceSet();
    const mergedOptions = mergeOptions(options, {
      resolve: { internal: false },
      dereference: { refSet },
    });

    await dereferenceStrategy.dereference(file, mergedOptions);

    return refSet;
  }
}

export default {SpecName}{Version}ResolveStrategy;
```

## 3.2 Create Dereference Strategy

Create `packages/apidom-reference/src/dereference/strategies/{spec}-{version}/index.ts`:

```typescript
import { propEq } from 'ramda';
import { createNamespace, visit, Element, cloneDeep } from '@swagger-api/apidom-core';
import {specName}{Version}Namespace, {
  getNodeType,
  is{RootElement},
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-{spec}-{version}';

import DereferenceStrategy, { DereferenceStrategyOptions } from '../DereferenceStrategy.ts';
import File from '../../../File.ts';
import Reference from '../../../Reference.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import {SpecName}{Version}DereferenceVisitor from './visitor.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

// Copy the block of `export type { ... }` re-exports verbatim from
// src/dereference/strategies/openapi-3-2/index.ts, renaming the visitor options type.

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

/**
 * @public
 */
export interface {SpecName}{Version}DereferenceStrategyOptions
  extends Omit<DereferenceStrategyOptions, 'name'> {}

/**
 * @public
 */
class {SpecName}{Version}DereferenceStrategy extends DereferenceStrategy {
  constructor(options?: {SpecName}{Version}DereferenceStrategyOptions) {
    super({ ...(options ?? {}), name: '{spec}-{version}' });
  }

  canDereference(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    return is{RootElement}(file.parseResult?.result);
  }

  async dereference(file: File, options: ReferenceOptions): Promise<Element> {
    const namespace = createNamespace({specName}{Version}Namespace);
    // ... copy the body verbatim from openapi-3-2/index.ts:
    // immutable/mutable refSet handling, then
    // const visitor = new {SpecName}{Version}DereferenceVisitor({ reference, namespace, options });
    // const dereferencedElement = await visitAsync(refSet.rootRef!.value, visitor, {
    //   keyMap,
    //   nodeTypeGetter: getNodeType,
    // });
    // ... immutable replay and refSet cleanup, return dereferencedElement
  }
}

export { {SpecName}{Version}DereferenceVisitor };
export {
  resolveSchema$refField,
  resolveSchema$idField,
  maybeRefractToSchemaElement,
} from './util.ts';

export default {SpecName}{Version}DereferenceStrategy;
```

## 3.3 Create Dereference Visitor

Create `packages/apidom-reference/src/dereference/strategies/{spec}-{version}/visitor.ts` (a sibling of `index.ts`, not in a `visitors/` subfolder).

The visitor is a large, spec-specific class (`OpenAPI3_2DereferenceVisitor` is ~1650 lines) with one async method per referencable element type (`ReferenceElement`, `PathItemElement`, `LinkElement`, `ExampleElement`, `SchemaElement`, ...). Do not write it from scratch:

1. Copy `visitor.ts` from the parent version (e.g. `openapi-3-1/visitor.ts`).
2. Change the namespace import to `@swagger-api/apidom-ns-{spec}-{version}` and rename `{RootElement}` / `is{RootElement}`.
3. Rename the class to `{SpecName}{Version}DereferenceVisitor` and the options interface to `{SpecName}{Version}DereferenceVisitorOptions`; keep the exported `mutationReplacer`.
4. Add handling for any element type that became referencable in the new version (e.g. new component maps), and add tests for it.

Shape of the file:

```typescript
import { /* ... */ } from '@swagger-api/apidom-core';
import { /* element classes and predicates */ } from '@swagger-api/apidom-ns-{spec}-{version}';

import { isAnchor, uriToAnchor, evaluate as $anchorEvaluate } from './selectors/$anchor.ts';
import { evaluate as uriEvaluate } from './selectors/uri.ts';
import { resolveSchema$refField, maybeRefractToSchemaElement } from './util.ts';
// ... errors, parse, Reference, ReferenceSet, File, Resolver, AncestorLineage

/**
 * @public
 */
export const mutationReplacer = (/* ... */) => { /* ... */ };

/**
 * @public
 */
export interface {SpecName}{Version}DereferenceVisitorOptions { /* ... */ }

/**
 * @public
 */
class {SpecName}{Version}DereferenceVisitor {
  // ...
  public async ReferenceElement(/* ... */) { /* ... */ }
  // ... one method per referencable element type
}

export default {SpecName}{Version}DereferenceVisitor;
```

## 3.4 Create util.ts and Selectors

Needed when the spec embeds JSON Schema 2020-12 style schemas (`$id`, `$anchor`), as OpenAPI 3.1/3.2 do. Specs without them (e.g. AsyncAPI 2/3, whose dereference folders contain only `index.ts` and `visitor.ts`) skip this step.

Copy from the parent version and only change the namespace import (`@swagger-api/apidom-ns-{spec}-{version}`); for OpenAPI 3.1 → 3.2 these files are otherwise identical:

- `dereference/strategies/{spec}-{version}/util.ts`: exports `resolveSchema$refField`, `resolveSchema$idField`, `refractToSchemaElement`, `maybeRefractToSchemaElement`
- `dereference/strategies/{spec}-{version}/selectors/$anchor.ts`: exports `isAnchor`, `uriToAnchor`, `parse`, `evaluate` and re-exports the `$anchor` error classes
- `dereference/strategies/{spec}-{version}/selectors/uri.ts`: exports `evaluate` (JSON Schema `$id` + JSON Pointer / `$anchor` evaluation, imports `resolveSchema$idField` from `../util.ts`) and re-exports the URI error classes

## 3.5 Create Bundle Strategy

Create `packages/apidom-reference/src/bundle/strategies/{spec}-{version}/index.ts`. Like the `openapi-3-1` and `openapi-3-2` strategies it is modelled on, this template returns the parse result unchanged: it makes the version bundleable without embedding anything. For a spec whose plan needs real bundling (JSON Schema compound documents), see 3.8.

```typescript
import { ParseResultElement } from '@swagger-api/apidom-core';
import { mediaTypes, is{RootElement} } from '@swagger-api/apidom-ns-{spec}-{version}';

import File from '../../../File.ts';
import BundleStrategy, { BundleStrategyOptions } from '../BundleStrategy.ts';

// Copy the block of `export type { ... }` re-exports verbatim from
// src/bundle/strategies/openapi-3-2/index.ts.

/**
 * @public
 */
export interface {SpecName}{Version}BundleStrategyOptions extends Omit<BundleStrategyOptions, 'name'> {}

/**
 * @public
 */
class {SpecName}{Version}BundleStrategy extends BundleStrategy {
  constructor(options?: {SpecName}{Version}BundleStrategyOptions) {
    super({ ...(options ?? {}), name: '{spec}-{version}' });
  }

  canBundle(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    return is{RootElement}(file.parseResult?.result);
  }

  async bundle(file: File): Promise<ParseResultElement> {
    return file.parseResult!;
  }
}

export default {SpecName}{Version}BundleStrategy;
```

## 3.6 Register Strategies and Add `exports` Subpaths

### saturated.ts

Update `packages/apidom-reference/src/configuration/saturated.ts`:

```typescript
import {SpecName}{Version}ResolveStrategy from '../resolve/strategies/{spec}-{version}/index.ts';
import {SpecName}{Version}DereferenceStrategy from '../dereference/strategies/{spec}-{version}/index.ts';
import {SpecName}{Version}BundleStrategy from '../bundle/strategies/{spec}-{version}/index.ts';

options.resolve.strategies = [
  // ... OpenAPI2, OpenAPI3_0, OpenAPI3_1 ...
  new {SpecName}{Version}ResolveStrategy(), // right after the parent version
  // ... AsyncAPI2 ...
  new ApiDOMResolveStrategy(), // always last
];

options.dereference.strategies = [
  // ... OpenAPI2, OpenAPI3_0, OpenAPI3_1 ...
  new {SpecName}{Version}DereferenceStrategy(), // right after the parent version
  // ... AsyncAPI2, AsyncAPI3 ...
  new ApiDOMDereferenceStrategy(), // always last
];

options.bundle.strategies = [
  // ... OpenAPI3_1 ...
  new {SpecName}{Version}BundleStrategy(),
];
```

Import lines follow the same grouping as the existing ones (resolve strategy imports at the top with the other resolve strategies, dereference and bundle strategy imports after the parser imports).

### package.json `exports`

Add a subpath export for each strategy (and each dereference selector) to `packages/apidom-reference/package.json`, next to the parent version's entries:

```json
{
  "exports": {
    "./resolve/strategies/{spec}-{version}": {
      "import": "./src/resolve/strategies/{spec}-{version}/index.mjs",
      "require": "./src/resolve/strategies/{spec}-{version}/index.cjs",
      "types": "./types/resolve/strategies/{spec}-{version}/index.d.ts"
    },
    "./dereference/strategies/{spec}-{version}": {
      "import": "./src/dereference/strategies/{spec}-{version}/index.mjs",
      "require": "./src/dereference/strategies/{spec}-{version}/index.cjs",
      "types": "./types/dereference/strategies/{spec}-{version}/index.d.ts"
    },
    "./dereference/strategies/{spec}-{version}/selectors/$anchor": {
      "import": "./src/dereference/strategies/{spec}-{version}/selectors/$anchor.mjs",
      "require": "./src/dereference/strategies/{spec}-{version}/selectors/$anchor.cjs",
      "types": "./types/dereference/strategies/{spec}-{version}/selectors/$anchor.d.ts"
    },
    "./dereference/strategies/{spec}-{version}/selectors/uri": {
      "import": "./src/dereference/strategies/{spec}-{version}/selectors/uri.mjs",
      "require": "./src/dereference/strategies/{spec}-{version}/selectors/uri.cjs",
      "types": "./types/dereference/strategies/{spec}-{version}/selectors/uri.d.ts"
    },
    "./bundle/strategies/{spec}-{version}": {
      "import": "./src/bundle/strategies/{spec}-{version}/index.mjs",
      "require": "./src/bundle/strategies/{spec}-{version}/index.cjs",
      "types": "./types/bundle/strategies/{spec}-{version}/index.d.ts"
    }
  }
}
```

Omit the selector entries if the strategy has no `selectors/` (see 3.4).

## 3.7 Create Tests for Reference Strategies

Create tests in `packages/apidom-reference/test/`, mirroring the parent version's layout (one folder per object type, each with `index.ts` and `fixtures/`):

- `test/dereference/strategies/{spec}-{version}/` - e.g. `reference-object/`, `schema-object/`, `path-item-object/`, plus folders for anything new in the version
- `test/bundle/strategies/{spec}-{version}/` - e.g. `reference-object/`
- `test/resolve/strategies/{spec}-{version}/` - optional; mirror `test/resolve/strategies/openapi-3-1/` if added

**Example dereference test structure** (from `test/dereference/strategies/openapi-3-2/reference-object/index.ts`):
```typescript
import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-{spec}-{version}';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers.ts';
import { dereference } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('{spec}-{version}', function () {
      context('Reference Object', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });
      });
    });
  });
});
```

## 3.8 JSON Schema Dialects

A JSON Schema dialect's document root is itself a schema (element `JSONSchema202012` for 2020-12), and every reference is a schema keyword. The OAS 3.1 strategy already dereferences schemas; copy only that part, with `{spec}-{version}` = `json-schema-{dialect}`.

**Dereference** (`dereference/strategies/json-schema-{dialect}/`):

- `util.ts` and `selectors/` (3.4) from `openapi-3-1`, with `SchemaElement` replaced by the dialect's `JSONSchemaElement`. `resolveSchema$refField` and `resolveSchema$idField` read the `ancestorsSchemaIdentifiers` meta that the JSON Schema refractor sets on every schema (`apidom-ns-json-schema-draft-4/src/refractor/visitors/json-schema/index.ts`), so they work unchanged.
- `visitor.ts` from `openapi-3-1/visitor.ts`: keep the shared machinery (constructor, `toReference`, `toAncestorLineage`, `indirections`, error handling and propagation) and the `SchemaElement` method, renamed to the dialect's traversal key (`JSONSchema202012Element`, from `keyMap` in the namespace's `src/traversal/visitor.ts`). Drop `ReferenceElement`, `PathItemElement`, `LinkElement`, `ExampleElement`, `MemberElement` and the `allOfDiscriminatorMapping` state: they serve OAS objects and discriminators.
- Boolean schemas: the JSON Schema refractor tags them with the `boolean-json-schema` class (`apidom-ns-json-schema-draft-6`), but only the OAS and AsyncAPI namespaces export `isBooleanJsonSchemaElement`. Add the predicate to the dialect namespace, shaped like `apidom-ns-openapi-3-1/src/predicates.ts`, rather than importing it from OpenAPI.
- `index.ts` (3.2): `canDereference` by the dialect's `mediaTypes` or `isJSONSchemaElement` on the parse result's root.

**`$dynamicRef`** ([2020-12 core §8.2.3.2](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.3.2)): resolved against the current base URI, it gives an initial target, and "this initial resolution is safe to perform on schema load". If that target's fragment was created by `$dynamicAnchor`, the final target is the outermost schema resource in the dynamic scope with the same `$dynamicAnchor`: it is known only during evaluation and can differ per evaluation path. Otherwise `$dynamicRef` behaves exactly like `$ref`. No code in the repo handles it, so there is no template. Put the options to the user and record the answer in the tracking doc:

1. Leave every `$dynamicRef` in place; consumers evaluate them.
2. Dereference a `$dynamicRef` whose initial target isn't a `$dynamicAnchor` fragment, exactly like `$ref`, and leave the others in place. This is the load-time resolution the spec calls safe; recommend it unless a consumer needs more.
3. Also resolve `$dynamicAnchor` targets against the dynamic scope the visitor has entered (schema resources along the path, including through `$ref`). The same subschema can then dereference differently per path, and recursive schemas, the main use of `$dynamicRef`, produce cycles that the `dereference.circular` options must handle.

Test the chosen behaviour with schemas from the JSON Schema Test Suite's [`tests/draft2020-12/dynamicRef.json`](https://github.com/json-schema-org/JSON-Schema-Test-Suite/blob/main/tests/draft2020-12/dynamicRef.json). Those are validation tests, so take their schemas as fixtures and write the expected dereferenced output by hand. Cover at least a `$dynamicRef` to a plain fragment and one to a `$dynamicAnchor`.

**Bundle** ([2020-12 core §9.3.1](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-9.3)): the OAS bundle strategies return the parse result unchanged (3.5), so the specification is the only model. A Compound Schema Document embeds each externally referenced schema resource, identified by its `$id` (absolute URI recommended), under `$defs` at the root; it never changes a reference and never replaces or wraps the referencing schema. Assemble it from existing parts:

1. **Collect** with the dialect's resolve strategy (3.1). Like `openapi-3-1`'s, it runs the dereference strategy with `resolve.internal: false` into a fresh `ReferenceSet` and returns it: `refs` holds every document reached, transitively, each with its `uri` and parse result, and `rootRef` is the document being bundled. No new reference walking is needed.
2. **Embed** the root schema (`reference.value.result`) of every other reference, copied with `cloneDeep` from `@swagger-api/apidom-core` so the `ReferenceSet` stays intact. Give it an `$id` with its absolute retrieval URI when it has none, and add it to the root's `$defs` under that URI, once per URI.
3. **Anchor the root.** Give it an absolute `$id` when it has none; otherwise a relative `$ref` resolves against wherever the bundled file is opened next and misses the embedded `$id`s.
4. **Leave every `$ref` and `$dynamicRef` unchanged.** That is also why bundling needs no cycle handling and doesn't depend on the `$dynamicRef` decision.

Put these to the user and record the answers in the tracking doc:

- Root `$id` for a local file (it would be a `file://` URI): recommend a bundle option for a canonical base URI, falling back to the retrieval URI.
- An external document whose own `$id` differs from the URI it was referenced by: the unchanged `$ref` no longer matches the embedded `$id`. Recommend an error naming both URIs.
- An external document in another dialect (§9.3.2 allows embedding it with its own `$schema`): recommend an error while cross-dialect references are out of scope.
- A `$defs` key the root already uses: recommend an error, since renaming would change references.

Tests: every `$ref` of the bundled document resolves inside it, every embedded resource has an `$id`, and every `$ref` and `$dynamicRef` string is unchanged. Dereference the bundled document with the external files absent (bundle into a directory without them) and compare each dereferenced target with the original's, apart from the added `$id`s. `resolve.external: false` doesn't prove this: the copied visitor finds an embedded `$id` in the current document, but counts a reference whose absolute URI differs from the document's as external and skips it.

If a release ships without bundling, keep the 3.5 no-op and record the gap in the tracking doc.

**Resolve** (3.1): copy from `openapi-3-1`, with the dialect's `mediaTypes` and root predicate.

**When strategies are needed**: without them, `$ref`s in documents of the new version are neither resolved, dereferenced nor bundled. A new version of a spec that already has strategies needs the same set as its parent (OpenAPI 3.2.0 shipped resolve, dereference and bundle from the start, like 3.1). Specs without Reference Objects or `$ref` (A2A) ship parsers only. Arazzo has Reference Objects but currently ships parsers only too. Current coverage: resolve for `openapi-2`, `openapi-3-0`, `openapi-3-1`, `openapi-3-2`, `asyncapi-2`; dereference for those plus `asyncapi-3`; bundle only for `openapi-3-1` and `openapi-3-2`, both returning the parse result unchanged.
