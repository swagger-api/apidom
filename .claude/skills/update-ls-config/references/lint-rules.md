# Lint Rules Reference

Read this during **Phase 5** when generating `lint/allowed-fields.ts` (step 5.4), `lint/{element}--type.ts` files (step 5.5) and `lint/index.ts` (step 5.6), and in **Phase 6** when generating element-level lint rules.

> Final `message` values follow the patterns in SKILL.md "Critical Rules" and `packages/apidom-ls/CLAUDE.md`. Copy 2-3 existing rules of the same kind and match them. Never include `'reference'` in `linterParams`.

## Contents

- 5.4 Generate lint/allowed-fields.ts
- 5.5 Generate lint/{element}--type.ts files (template, linter functions, Linter Function Mapping, coverage, Info example)
- 5.6 Generate lint/index.ts

#### 5.4 Generate lint/allowed-fields.ts

Defines which fields are allowed in the root element.

**Template:**
```typescript
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { {TargetSpecConstant} } from '../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    '{field1}',
    '{field2}',
    // ... list all allowed fields
  ],
  marker: 'key',
  targetSpecs: {TargetSpecConstant},
};

export default allowedFieldsLint;
```

#### 5.5 Generate lint/{element}--type.ts files

For each element type, create a type validation lint rule. Based on OpenAPI 3.2.0, create comprehensive coverage:

**Standard Type Validation Template:**
```typescript
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { {TargetSpecConstant} } from '../../target-specs.ts';

const {element}TypeLint: LinterMeta = {
  code: ApilintCodes.{SPEC}_{VERSION}_{ELEMENT}_TYPE,
  source: 'apilint',
  message: "'{element}' must be a {expectedType}",
  severity: DiagnosticSeverity.Error,
  linterFunction: '{linterFunction}',
  linterParams: ['{expectedElementType}'],
  marker: 'value',
  target: '{propertyName}',
  data: {
    quickFix: [
      {
        message: "replace it with {expectedType}",
        action: 'replaceWith',
        functionParams: ['{defaultValue}'],
      },
    ],
  },
  targetSpecs: {TargetSpecConstant},
};

export default {element}TypeLint;
```

**Linter functions by validation type:**

1. **Element Type Validation** - `apilintElementOrClass`:
   ```typescript
   linterFunction: 'apilintElementOrClass',
   linterParams: ['{ElementType}Element'],  // e.g., 'InfoElement', 'ServerElement'
   ```

2. **Value Type Validation** - `apilintType`:
   ```typescript
   linterFunction: 'apilintType',
   linterParams: ['string'],  // 'string', 'array', 'object', 'number', 'boolean'
   ```

3. **Required Field Validation** - `hasRequiredField`:
   ```typescript
   linterFunction: 'hasRequiredField',
   linterParams: ['{requiredFieldName}'],
   message: "should always have a '{requiredFieldName}'",
   ```

4. **Allowed Values Validation** - `apilintValueOrArray`:
   ```typescript
   linterFunction: 'apilintValueOrArray',
   linterParams: ['{allowedValue1}', '{allowedValue2}'],
   message: "'{element}' must be one of: {allowedValue1}, {allowedValue2}",
   ```

5. **Allowed Fields Validation** - `allowedFields`:
   ```typescript
   linterFunction: 'allowedFields',
   linterParams: ['field1', 'field2', 'field3', ...],
   message: "Object includes not allowed fields",
   ```

For arrays of elements and maps of elements (`apilintArrayOfElementsOrClasses`, `apilintChildrenOfElementsOrClasses`), see section 3 of `packages/apidom-ls/CLAUDE.md`.

### Linter Function Mapping

| Validation Type | linterFunction | linterParams |
|----------------|----------------|--------------|
| Element type | apilintElementOrClass | ['ElementName'] |
| Value type | apilintType | ['string'\|'array'\|'object'\|'number'\|'boolean'] |
| Required field | hasRequiredField | ['fieldName'] |
| Allowed fields | allowedFields | [...fieldNames] |

**Comprehensive Lint Coverage** (as seen in OpenAPI 3.2.0):

Create lint files for:
- **Root element** validation (type, required fields, allowed fields)
- **Each nested element** (Info, Server, License, Contact, etc.)
- **Each array element** (servers, tags, security, etc.)
- **Each collection element** (paths, components, webhooks, etc.)
- **Special validations** (media types, HTTP methods, JSON Schema dialects)

**Example: Complete lint structure for Info element**:
```
lint/
├── info/
│   ├── allowed-fields.ts      # Validate only specified fields
│   ├── title--type.ts         # title must be string
│   ├── title--required.ts     # title is required
│   ├── version--type.ts       # version must be string
│   ├── version--required.ts   # version is required
│   ├── description--type.ts   # description must be string
│   ├── summary--type.ts       # summary must be string (new in 3.2)
│   ├── contact--type.ts       # contact must be Contact element
│   ├── license--type.ts       # license must be License element
│   └── index.ts               # Export all lint rules
```

**OpenAPI 3.2.0 Pattern**: Created 56+ lint rule directories covering every element type and their properties comprehensively.

#### 5.6 Generate lint/index.ts

Aggregates all lint rules.

**Template:**
```typescript
import allowedFieldsLint from './allowed-fields.ts';
import {element1}TypeLint from './{element1}--type.ts';
import {element2}TypeLint from './{element2}--type.ts';
// ... import all lint rules

const lints = [
  allowedFieldsLint,
  {element1}TypeLint,
  {element2}TypeLint,
  // ... list all lint rules
];

export default lints;
```
