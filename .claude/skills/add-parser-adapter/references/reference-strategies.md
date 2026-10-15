# apidom-reference Resolve, Dereference and Bundle Strategies (Phase 7)

Based on the OpenAPI 3.2.0 implementation (`packages/apidom-reference/src/{resolve,dereference,bundle}/strategies/openapi-3-2/`). The fastest correct path is to copy the parent version's folders (e.g. `openapi-3-1` → `openapi-3-2`) and rename the version identifiers; the templates below show the required shape.

Key facts:
- All three strategies use the **same plain name** `'{spec}-{version}'` (e.g. `'openapi-3-2'`); never add `-dereference` / `-bundle` suffixes. The resolve strategy looks up the dereference strategy by this name.
- Each strategy extends **its own base class**: `ResolveStrategy`, `DereferenceStrategy`, `BundleStrategy`. Resolve and bundle do **not** extend the dereference strategy.
- The dereference folder is flat: `index.ts`, `visitor.ts`, `util.ts`, `selectors/` directly inside `dereference/strategies/{spec}-{version}/`. There is no `visitors/` subdirectory.

Template variables (in addition to those in `reference-parsers.md`):
- `{SpecName}{Version}`: class prefix, e.g. `OpenAPI3_2`
- `{specName}{Version}Namespace`: namespace default import, e.g. `openApi3_2Namespace`
- `{RootElement}`: root element class, e.g. `OpenApi3_2Element`

## 7.1 Create Resolve Strategy

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

## 7.2 Create Dereference Strategy

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

## 7.3 Create Dereference Visitor

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

## 7.4 Create util.ts and Selectors

Needed when the spec embeds JSON Schema 2020-12 style schemas (`$id`, `$anchor`), as OpenAPI 3.1/3.2 do. Specs without them (e.g. AsyncAPI 2/3, whose dereference folders contain only `index.ts` and `visitor.ts`) skip this step.

Copy from the parent version and only change the namespace import (`@swagger-api/apidom-ns-{spec}-{version}`); for OpenAPI 3.1 → 3.2 these files are otherwise identical:

- `dereference/strategies/{spec}-{version}/util.ts`: exports `resolveSchema$refField`, `resolveSchema$idField`, `refractToSchemaElement`, `maybeRefractToSchemaElement`
- `dereference/strategies/{spec}-{version}/selectors/$anchor.ts`: exports `isAnchor`, `uriToAnchor`, `parse`, `evaluate` and re-exports the `$anchor` error classes
- `dereference/strategies/{spec}-{version}/selectors/uri.ts`: exports `evaluate` (JSON Schema `$id` + JSON Pointer / `$anchor` evaluation, imports `resolveSchema$idField` from `../util.ts`) and re-exports the URI error classes

## 7.5 Create Bundle Strategy

Create `packages/apidom-reference/src/bundle/strategies/{spec}-{version}/index.ts`:

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

## 7.6 Register Strategies and Add `exports` Subpaths

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

Omit the selector entries if the strategy has no `selectors/` (see 7.4).

## 7.7 Create Tests for Reference Strategies

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

**Important Note**: The reference strategy implementation (Phase 7) is optional for basic parser adapter functionality but **highly recommended** for production use. OpenAPI 3.2.0 included complete reference integration from the start. If skipping initially, create a follow-up task to add these strategies.
