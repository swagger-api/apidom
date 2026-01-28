---
name: add-namespace
description: Creates a new namespace package for a new API specification version in the ApiDOM monorepo
disable-model-invocation: false
user-invocable: true
---

# Add Namespace Package Skill

**Skill Name:** `add-namespace`
**Description:** Creates a new namespace package for a new API specification version in the ApiDOM monorepo.

## Overview

This skill guides you through creating a complete namespace package (`apidom-ns-{spec}-{version}`) for a new API specification version. It automates the creation of all required files and directories following ApiDOM's established patterns.

## When to Use

Use this skill when:
- Adding support for a completely new API specification (e.g., RAML, API Blueprint)
- Adding a new major/minor version of an existing specification (e.g., OpenAPI 4.0, OpenAPI 3.3, AsyncAPI 4.0)
- The specification can be serialized in JSON or YAML format

**Recent Example**: OpenAPI 3.2.0 support was added using these patterns, introducing features like:
- New HTTP methods (QUERY)
- Dynamic operations (additionalOperations)
- Reusable media types (components.mediaTypes)
- Global JSON Schema dialect (jsonSchemaDialect)

## Prerequisites

Before running this skill:
1. **Understand the specification**: Read and analyze the specification document thoroughly
2. **Determine parent namespace**: Identify if you can base your implementation on an existing namespace (e.g., AsyncAPI 3 based on AsyncAPI 2)
3. **Identify all elements**: List all object types defined in the specification
4. **Map specification structure**: Understand the hierarchical relationships between elements

## Skill Instructions

### Phase 1: Gather Information

Ask the user for the following information:

1. **Specification Name**: The name of the specification (e.g., 'openapi', 'asyncapi', 'arazzo')
2. **Specification Version**: The version string (e.g., '3-1', '2', '4-0')
3. **Package Description**: Short description for package.json
4. **Parent Namespace** (optional): If basing on existing namespace, which one? (e.g., '@swagger-api/apidom-ns-asyncapi-2')
5. **Specification Elements**: List of all element types in the specification with their properties

   For each element, collect:
   - Element name (PascalCase, e.g., 'Workflow', 'Info', 'Server')
   - Element type: 'object' | 'array' | 'string' | 'number' | 'boolean'
   - Properties (for object types):
     - Property name (camelCase)
     - Property type (StringElement, ArrayElement, ObjectElement, or custom element type)
     - Whether it's a fixed field or patterned field
   - CSS classes (optional, for specialized element identification)
   - Whether it's the root specification element

### Phase 2: Create Package Structure

Create the following directory structure:

```
packages/apidom-ns-{spec}-{version}/
├── src/
│   ├── elements/
│   │   ├── nces/              # Named Collection Elements
│   │   └── {ElementName}.ts
│   ├── refractor/
│   │   ├── visitors/
│   │   │   ├── generics/
│   │   │   │   ├── FixedFieldsVisitor.ts
│   │   │   │   ├── PatternedFieldsVisitor.ts
│   │   │   │   └── MapVisitor.ts
│   │   │   ├── {spec}-{version}/
│   │   │   │   ├── {element-name}/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── FallbackVisitor.ts
│   │   │   ├── SpecificationExtensionVisitor.ts
│   │   │   ├── SpecificationVisitor.ts
│   │   │   └── Visitor.ts
│   │   ├── plugins/
│   │   ├── index.ts
│   │   ├── registration.ts
│   │   ├── specification.ts
│   │   ├── predicates.ts
│   │   └── toolbox.ts
│   ├── traversal/
│   │   └── visitor.ts
│   ├── index.ts
│   ├── namespace.ts
│   ├── predicates.ts
│   └── media-types.ts
├── test/
│   ├── refractor/
│   │   ├── elements/
│   │   │   └── {ElementName}/
│   │   │       ├── index.ts
│   │   │       └── __snapshots__/
│   │   └── plugins/
│   ├── fixtures/
│   ├── mocha-bootstrap.ts
│   ├── predicates.ts
│   └── tsconfig.json
├── config/
│   ├── api-extractor/
│   │   └── api-extractor.json
│   └── webpack/
│       └── browser.config.js
├── package.json
├── tsconfig.json
├── tsconfig.declaration.json
└── README.md
```

### Phase 3: Generate Core Files

#### 3.1 package.json

```json
{
  "name": "@swagger-api/apidom-ns-{spec}-{version}",
  "version": "1.0.0",
  "description": "{Specification Name} {Version} namespace for ApiDOM.",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  },
  "type": "module",
  "sideEffects": [
    "./src/refractor/registration.mjs",
    "./src/refractor/registration.cjs"
  ],
  "unpkg": "./dist/apidom-ns-{spec}-{version}.browser.min.js",
  "main": "./src/index.cjs",
  "exports": {
    "types": "./types/apidom-ns-{spec}-{version}.d.ts",
    "import": "./src/index.mjs",
    "require": "./src/index.cjs"
  },
  "types": "./types/apidom-ns-{spec}-{version}.d.ts",
  "scripts": {
    "build": "npm run clean && run-p --max-parallel ${CPU_CORES:-2} typescript:declaration build:es build:cjs build:umd:browser",
    "build:es": "cross-env BABEL_ENV=es babel src --out-dir src --extensions '.ts' --out-file-extension '.mjs' --root-mode 'upward'",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --out-dir src --extensions '.ts' --out-file-extension '.cjs' --root-mode 'upward'",
    "build:umd:browser": "cross-env BABEL_ENV=browser webpack --config config/webpack/browser.config.js --progress",
    "lint": "eslint ./",
    "lint:fix": "eslint ./ --fix",
    "clean": "rimraf --glob 'src/**/*.mjs' 'test/**/*.mjs' ./dist ./types",
    "test": "NODE_ENV=test ts-mocha --exit",
    "test:update-snapshots": "cross-env UPDATE_SNAPSHOT=1 BABEL_ENV=cjs mocha",
    "typescript:check-types": "tsc --noEmit && tsc -p ./test/tsconfig.json --noEmit",
    "typescript:declaration": "tsc -p tsconfig.declaration.json && api-extractor run -l -c ./config/api-extractor/api-extractor.json",
    "prepack": "copyfiles -u 3 ../../LICENSES/* LICENSES && copyfiles -u 2 ../../NOTICE .",
    "postpack": "rimraf NOTICE LICENSES"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/swagger-api/apidom.git"
  },
  "author": "SmartBear",
  "license": "Apache-2.0",
  "dependencies": {
    "@babel/runtime-corejs3": "^7.26.10",
    "@swagger-api/apidom-core": "^1.2.2",
    "@types/ramda": "~0.30.0",
    "ramda": "~0.30.0",
    "ramda-adjunct": "^5.0.0",
    "ts-mixer": "^6.0.3"
  },
  "files": [
    "src/**/*.mjs",
    "src/**/*.cjs",
    "dist/",
    "types/apidom-ns-{spec}-{version}.d.ts",
    "LICENSES",
    "NOTICE",
    "README.md",
    "CHANGELOG.md"
  ]
}
```

**Note**: Add parent namespace to dependencies if extending an existing namespace.

#### 3.2 Element Class Template

For each element, create `src/elements/{ElementName}.ts`:

```typescript
import {
  ObjectElement,
  ArrayElement,
  StringElement,
  NumberElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class {ElementName} extends {BaseElementType} {
  constructor(content?: {ContentType}, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = '{elementName}';

    // Add CSS classes if needed
    // this.classes.push('{className}');
  }

  // Generate getter/setter pairs for each property
  get {propertyName}(): {PropertyType} | undefined {
    return this.get('{propertyName}');
  }

  set {propertyName}({propertyName}: {PropertyType} | undefined) {
    this.set('{propertyName}', {propertyName});
  }
}

export default {ElementName};
```

**Element Type Mapping**:
- Object elements → `extends ObjectElement`, content type: `Record<string, unknown>`
- Array elements → `extends ArrayElement`, content type: `Array<unknown>`
- String elements → `extends StringElement`, content type: `string`
- Number elements → `extends NumberElement`, content type: `number`
- Boolean elements → `extends BooleanElement`, content type: `boolean`

**Property Type Mapping**:
- Use `StringElement` for string properties
- Use `NumberElement` for number properties
- Use `BooleanElement` for boolean properties
- Use `ArrayElement` for array properties
- Use `ObjectElement` for generic object properties
- Use custom element types for typed objects (e.g., `InfoElement`, `ServerElement`)

#### 3.3 namespace.ts

```typescript
import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import {ElementName}Element from './elements/{ElementName}.ts';
// Import all element classes...

/**
 * @public
 */
const {specName}{version} = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    // Register all elements
    base.register('{elementName}', {ElementName}Element);
    // Register remaining elements...

    return base;
  },
};

export default {specName}{version};
```

#### 3.4 predicates.ts

```typescript
import { createPredicate } from '@swagger-api/apidom-core';

import {ElementName}Element from './elements/{ElementName}.ts';
// Import all element classes...

/**
 * @public
 */
export const is{ElementName}Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is {ElementName}Element =>
      element instanceof {ElementName}Element ||
      (hasBasicElementProps(element) &&
        isElementType('{elementName}', element) &&
        primitiveEq('{primitiveType}', element));
        // Add hasClass checks if element has CSS classes:
        // && hasClass('{className}', element));
  },
);

// Create predicates for all elements...
```

**Primitive Type Mapping**:
- ObjectElement → `'object'`
- ArrayElement → `'array'`
- StringElement → `'string'`
- NumberElement → `'number'`
- BooleanElement → `'boolean'`

#### 3.5 media-types.ts

```typescript
/**
 * @public
 */
export interface {SpecName}MediaTypes {
  latest: (format: Format) => string;
  generic: (format: Format) => string;
}

/**
 * @public
 */
export type Format = 'json' | 'yaml';

const jsonMediaType = (version: string) =>
  `application/vnd.{spec}.{version}+json`;

const yamlMediaType = (version: string) =>
  `application/vnd.{spec}.{version}+yaml`;

const mediaTypes: {SpecName}MediaTypes = {
  latest: (format = 'json') =>
    format === 'json' ? jsonMediaType('{version}') : yamlMediaType('{version}'),
  generic: (format = 'json') =>
    format === 'json' ? 'application/json' : 'application/yaml',
};

export default mediaTypes;
```

#### 3.6 Visitor Templates

**Standard Fixed Fields Visitor** (for most object elements):

For each element, create `src/refractor/visitors/{spec}-{version}/{element-name}/index.ts`:

```typescript
import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import {ElementName}Element from '../../../../elements/{ElementName}.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface {ElementName}VisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class {ElementName}Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: {ElementName}Element;

  declare protected readonly specPath: SpecPath<['document', 'objects', '{ElementName}']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: {ElementName}VisitorOptions) {
    super(options);
    this.element = new {ElementName}Element();
    this.specPath = always(['document', 'objects', '{ElementName}']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default {ElementName}Visitor;
```

**Note**: Set `canSupportSpecificationExtensions` to `true` if the element supports extension fields (e.g., `x-*` properties).

**Map Visitor** (for dynamic key-value objects like components.mediaTypes, additionalOperations):

```typescript
import { Mixin } from 'ts-mixer';
import { T as stubTrue, always } from 'ramda';
import { isStringElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface {CollectionName}VisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class {CollectionName}Visitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: {CollectionElement};

  declare protected readonly specPath: SpecPath<['document', 'objects', '{ParentObject}']>;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: {CollectionName}VisitorOptions) {
    super(options);
    this.element = new {CollectionElement}();
    this.specPath = always(['document', 'objects', '{ParentObject}']);
    this.canSupportSpecificationExtensions = false;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // Decorate each child element if needed
    // Example: Mark elements as references or operations
    this.element.forEach((value: Element, key: Element) => {
      // Add metadata to help identify element types
      if (isStringElement(key)) {
        value.setMetaProperty('{metadata-name}', key.toValue());
      }
    });

    this.copyMetaAndAttributes(objectElement, result);
    return result;
  }
}

export default {CollectionName}Visitor;
```

**Dynamic Type Detection Visitor** (for fields that can be Reference OR specific type):

```typescript
import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, isStringElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceElement } from '../../../..';

/**
 * Handles fields that can contain either Reference objects or specific element types.
 * Decorates with metadata to help dereference strategies.
 *
 * @public
 */
class {CollectionName}Visitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: {CollectionElement};

  declare protected readonly specPath: SpecPath<['document', 'objects', '{ParentObject}']>;

  constructor(options: {CollectionName}VisitorOptions) {
    super(options);
    this.element = new {CollectionElement}();
    this.specPath = always(['document', 'objects', '{ParentObject}']);
    this.canSupportSpecificationExtensions = false;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // Detect and decorate elements based on their structure
    this.element.forEach((value: Element, key: Element, memberElement: MemberElement) => {
      // Determine if this is a Reference or actual element
      if (isObjectElement(value)) {
        const hasRef = value.hasKey('$ref');

        if (hasRef) {
          // It's a reference - decorate with referenced element type
          memberElement.setMetaProperty('referenced-element', '{elementType}');
        }
      }

      // Add identifying metadata
      if (isStringElement(key)) {
        value.setMetaProperty('{name-property}', key.toValue());
      }
    });

    this.copyMetaAndAttributes(objectElement, result);
    return result;
  }
}

export default {CollectionName}Visitor;
```

**Use Cases:**
- **FixedFieldsVisitor**: Standard objects with known properties (Info, Server, License)
- **MapVisitor**: Dynamic collections (components.schemas, components.mediaTypes, additionalOperations)
- **Dynamic Detection**: Collections that can contain references or actual elements (webhooks, paths)

#### 3.7 specification.ts

```typescript
import FallbackVisitor from './visitors/FallbackVisitor.ts';
import {ElementName}Visitor from './visitors/{spec}-{version}/{element-name}/index.ts';
import {DynamicCollection}Visitor from './visitors/{spec}-{version}/{collection-name}/index.ts';
// Import all visitors...

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 *
 * @public
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        {ElementName}: {
          $visitor: {ElementName}Visitor,
          fixedFields: {
            // Simple value fields (string, number, boolean)
            {propertyName}: { $ref: '#/visitors/value' },

            // Nested object references
            {nestedProperty}: { $ref: '#/visitors/document/objects/{NestedElement}' },

            // Array fields with specific visitor
            {arrayProperty}: {ArrayVisitor},

            // Dynamic collections (maps with unknown keys)
            {dynamicCollection}: {
              $visitor: {DynamicCollection}Visitor,
              // Define what visitor handles the values in the map
              value: { $ref: '#/visitors/document/objects/{ValueElement}' },
            },

            // Collections that can be Reference OR specific element
            {mixedCollection}: {
              $visitor: {MixedCollection}Visitor,
              value(element: Element) {
                // Dynamically determine visitor based on element structure
                if (isObjectElement(element) && element.hasKey('$ref')) {
                  // It's a reference
                  return { $ref: '#/visitors/value' };
                }
                // It's an actual element
                return { $ref: '#/visitors/document/objects/{ActualElement}' };
              },
            },
          },
        },
        // Define all element structures...
      },
    },
  },
};

export default specification;
```

**Advanced Specification Patterns:**

1. **Inheriting from Parent Version** (e.g., OpenAPI 3.2 extending 3.1):
```typescript
import { specificationObj as parentSpec } from '@swagger-api/apidom-ns-{parent}';

const specification = {
  visitors: {
    ...parentSpec.visitors,
    document: {
      objects: {
        ...parentSpec.visitors.document.objects,
        // Override root element with new fields
        {RootElement}: {
          $visitor: {RootElement}Visitor,
          fixedFields: {
            ...parentSpec.visitors.document.objects.{RootElement}.fixedFields,
            // Add new fields
            {newField}: { $ref: '#/visitors/value' },
          },
        },
        // Add completely new elements
        {NewElement}: {
          $visitor: {NewElement}Visitor,
          fixedFields: {
            // ...
          },
        },
      },
    },
  },
};
```

2. **Patterned Fields** (for fields with dynamic keys matching a pattern):
```typescript
{
  $visitor: PatternedFieldsVisitor,
  patternedFields: {
    // Keys starting with 'x-' are extensions
    '^x-': { $ref: '#/visitors/value' },
  },
}
```

3. **Conditional Visitors** (different handling based on content):
```typescript
{
  value(element: Element) {
    if (isConditionMet(element)) {
      return { $ref: '#/visitors/document/objects/{ElementA}' };
    }
    return { $ref: '#/visitors/document/objects/{ElementB}' };
  },
}
```

#### 3.8 registration.ts

```typescript
import {ElementName}Element from '../elements/{ElementName}.ts';
// Import all elements...
import { createRefractor } from './index.ts';

{ElementName}Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  '{ElementName}',
  '$visitor',
]);

// Register all elements...
```

#### 3.9 index.ts (main export)

```typescript
export {
  isRefElement,
  isLinkElement as isLinkPrimitiveElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, {SpecName}MediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';

// Export visitor base classes
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type {
  FixedFieldsVisitorOptions,
  SpecPath,
} from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';

// Export visitor types
export type {
  default as {ElementName}Visitor,
  {ElementName}VisitorOptions,
} from './refractor/visitors/{spec}-{version}/{element-name}/index.ts';
// Export all visitor types...

// Export predicates
export {
  is{ElementName}Element,
  // Export all predicates...
} from './predicates.ts';

// Export elements
export { {ElementName}Element } from './refractor/registration.ts';
// Export all elements...
```

#### 3.10 tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "include": ["src/**/*"],
  "compilerOptions": {
    "composite": true
  }
}
```

#### 3.11 tsconfig.declaration.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./types"
  }
}
```

### Phase 4: Copy Supporting Files

Copy the following files from a similar namespace package (e.g., `apidom-ns-arazzo-1`):

1. `src/refractor/visitors/generics/FixedFieldsVisitor.ts`
2. `src/refractor/visitors/generics/PatternedFieldsVisitor.ts`
3. `src/refractor/visitors/generics/MapVisitor.ts`
4. `src/refractor/visitors/FallbackVisitor.ts`
5. `src/refractor/visitors/SpecificationExtensionVisitor.ts`
6. `src/refractor/visitors/SpecificationVisitor.ts`
7. `src/refractor/visitors/Visitor.ts`
8. `src/refractor/index.ts` (createRefractor function)
9. `src/refractor/toolbox.ts`
10. `src/refractor/predicates.ts`
11. `src/traversal/visitor.ts`
12. `test/mocha-bootstrap.ts`
13. `config/api-extractor/api-extractor.json` (update package name)
14. `config/webpack/browser.config.js` (update package name)

### Phase 5: Generate Tests

For each element, create a test file `test/refractor/elements/{ElementName}/index.ts`:

```typescript
import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { {ElementName}Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('{ElementName}Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const {elementName}Element = {ElementName}Element.refract({
          {propertyName}: 'value',
          // Add sample data...
        });

        expect(sexprs(elementName)).toMatchSnapshot();
      });
    });
  });
});
```

Create `test/predicates.ts`:

```typescript
import { expect } from 'chai';

import { {ElementName}Element, is{ElementName}Element } from '../src/index.ts';

describe('predicates', function () {
  context('is{ElementName}Element', function () {
    context('when element is {ElementName}Element', function () {
      specify('should return true', function () {
        const element = new {ElementName}Element();

        expect(is{ElementName}Element(element)).to.be.true;
      });
    });

    context('when element is not {ElementName}Element', function () {
      specify('should return false', function () {
        expect(is{ElementName}Element({})).to.be.false;
        expect(is{ElementName}Element(null)).to.be.false;
        expect(is{ElementName}Element(undefined)).to.be.false;
      });
    });
  });
});
```

Create `test/tsconfig.json`:

```json
{
  "extends": "../../../tsconfig.test.json",
  "compilerOptions": {
    "types": ["mocha", "chai", "node"]
  },
  "include": ["./**/*"],
  "references": [{ "path": ".." }]
}
```

### Phase 6: Build and Test

1. **Build the monorepo** (required before testing):
   ```bash
   npm run build
   ```

2. **Run tests for the new package**:
   ```bash
   cd packages/apidom-ns-{spec}-{version}
   npm run test
   ```

3. **Run type checking**:
   ```bash
   npm run typescript:check-types
   ```

4. **Run linting**:
   ```bash
   npm run lint
   ```

### Phase 7: Update Root Configuration

1. **Add to root package.json workspaces** (if not already included by glob pattern)

2. **Update root tsconfig.json** with project reference:
   ```json
   {
     "references": [
       { "path": "./packages/apidom-ns-{spec}-{version}" }
     ]
   }
   ```

3. **Update CHANGELOG.md** in the package root

## Important Patterns

### Common Specification Features to Support

Based on learnings from OpenAPI 3.2.0 and other implementations, watch for these common patterns:

1. **New HTTP Methods or Operations**:
   - Example: OpenAPI 3.2 added `query` as a standard HTTP method
   - Add as fixed fields in PathItem-like objects
   - Map to same visitor as other operations (GET, POST, etc.)

2. **Dynamic Operation Collections**:
   - Example: OpenAPI 3.2's `additionalOperations` allows custom HTTP methods
   - Use MapVisitor + dynamic type detection
   - Decorate with `referenced-element` metadata for references

3. **Reusable Component Types**:
   - Example: OpenAPI 3.2's `components.mediaTypes` for reusable media type definitions
   - Add to Components object as map visitor
   - Update allowed fields validation

4. **Global Configuration Fields**:
   - Example: OpenAPI 3.2's `jsonSchemaDialect` sets default JSON Schema dialect
   - Add as simple string/URI field to root element
   - Document purpose and valid values

5. **Webhook/Callback Patterns**:
   - Example: OpenAPI 3.2's `webhooks` (inverted API calls)
   - Similar structure to main paths/operations
   - Decorate with identifying metadata (e.g., `webhook-name`)

6. **Self-Reference Fields**:
   - Example: OpenAPI 3.2's `$self` for document URI
   - Simple string field for URI reference
   - Used for relative reference resolution

7. **Extended Metadata Fields**:
   - Example: OpenAPI 3.2's `Server.name` and `License.identifier`
   - Add to existing objects as optional fields
   - Update parent version's element definitions

### Element Naming Conventions
- Element class names: PascalCase (e.g., `WorkflowElement`, `InfoElement`, `JsonSchemaDialectElement`)
- Element type names (registered in namespace): camelCase (e.g., `'workflow'`, `'info'`, `'jsonSchemaDialect'`)
- File names: Match class names (e.g., `Workflow.ts`, `Info.ts`, `JsonSchemaDialect.ts`)

### Visitor Naming Conventions
- Visitor class names: `{ElementName}Visitor`
- Visitor directories: kebab-case (e.g., `source-description/`, `success-action/`)

### CSS Classes for Specialized Elements
Add CSS classes to elements that need specialized identification:
```typescript
constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
  super(content, meta, attributes);
  this.element = 'workflow';
  this.classes.push('workflow-outputs');
}
```

### Named Collection Elements (NCEs)
For specialized array types, create NCE classes in `src/elements/nces/`:
```typescript
import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class WorkflowSteps extends ArrayElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'array';
    this.classes.push('workflow-steps');
  }
}

export default WorkflowSteps;
```

### Specification Extensions Support
For elements supporting `x-*` extension properties:
1. Set `canSupportSpecificationExtensions = true` in visitor
2. Use `FixedFieldsVisitor` mixin (handles extensions automatically)

### Parent Namespace Inheritance
When basing on existing namespace:
1. Import parent specification object
2. Extend/override only changed elements
3. Reuse parent visitors where possible

Example:
```typescript
import { specificationObj as parentSpecification } from '@swagger-api/apidom-ns-{parent}';

const specification = {
  visitors: {
    ...parentSpecification.visitors,
    document: {
      objects: {
        ...parentSpecification.visitors.document.objects,
        // Override only changed elements
        {ElementName}: {
          $visitor: {ElementName}Visitor,
          // ...
        },
      },
    },
  },
};
```

## Next Steps After Namespace Creation

After completing the namespace package, you'll need to:

1. **Create parser adapters** for the specification (separate packages):
   - `apidom-parser-adapter-{spec}-json-{version}`
   - `apidom-parser-adapter-{spec}-yaml-{version}`

2. **Add support to apidom-reference**:
   - Parse plugins
   - Dereference strategies
   - Resolution strategies

3. **Add support to apidom-ls** (Language Server):
   - Validation rules
   - Documentation on hover
   - Completion providers
   - Semantic tokens

4. **Update swagger-editor** (if applicable):
   - Import new namespace
   - Add preview plugin

## Troubleshooting

### Build Errors
- Ensure all imports use `.ts` extension
- Check that all element classes are properly exported
- Verify TypeScript configuration is correct

### Test Failures
- Run `npm run test:update-snapshots` to update snapshots after changes
- Ensure test data matches specification structure
- Check that all predicates are properly exported

### Type Errors
- Verify all visitor interfaces extend correct base interfaces
- Check that element content types match base class expectations
- Ensure all visitor options are properly typed

## References

- **PDF Instructions**: Section on "Adding a completely new specification"
- **Example Packages**:
  - Simple: `apidom-ns-arazzo-1` (26 elements, workflow-focused)
  - Medium: `apidom-ns-openapi-3-1` (34 elements, JSON Schema integration)
  - Complex: `apidom-ns-asyncapi-3` (131 elements, protocol bindings)
- **Architecture**: See CLAUDE.md "Three-Stage Processing Pipeline"
