# Version Directory, Target Specs and Config Wiring Reference

Read this during **Phase 4** (target spec symbol), at the start of **Phase 5** (directory layout, step 5.1) and when generating `meta.ts` (step 5.7), and during **Phase 7** (registering the version in the main config files).

### Target Spec Naming Convention

- **OpenAPI**: `OpenAPI{major}{minor}` (e.g., `OpenAPI32` for 3.2)
- **AsyncAPI**: `AsyncAPI{major}` (e.g., `AsyncAPI3` for 3.x)
- **Arazzo**: `Arazzo{major}_{minor}` (e.g., `Arazzo1_0` for 1.0)

### Version Directory Naming

- Use lowercase with underscore: `openapi3_2`, `asyncapi3`, `arazzo1_0`
- Must match the pattern used in other version directories

#### 4.1 Update target-specs.ts

Location: `packages/apidom-ls/src/config/{spec}/target-specs.ts`

Add the new version constant if it doesn't exist:

```typescript
export const {SpecCamelCase}{VersionNoUnderscore} = Symbol.for('{spec}{version}');
```

Example:
```typescript
export const OpenAPI32 = Symbol.for('openapi3.2');
```

Update the `targetSpecs` array to include the new symbol.

#### 5.1 Create Version Directory Structure

```
packages/apidom-ls/src/config/{spec}/{version}/
├── completion.ts        # Autocomplete configuration
├── documentation.ts     # Hover documentation
├── lint/               # Validation rules directory
│   ├── allowed-fields.ts
│   ├── {element}--type.ts
│   └── index.ts
└── meta.ts             # Aggregates all configs
```

#### 5.7 Generate meta.ts

Aggregates completion, documentation, and lint configs.

**Template:**
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

Add import and export for the new version config:

```typescript
import {version}Meta from './{version}/meta.ts';

// In the exports or config object:
export { {version}Meta };
```

#### 7.2 Update config/{spec}/symbols.ts

If new element types were introduced, add symbols:

```typescript
export const {element}Symbol = Symbol.for('{namespace}.{element}');
```
