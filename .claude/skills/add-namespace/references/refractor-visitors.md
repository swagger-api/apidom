# Refractor: Visitors and Specification Object

Visitor templates, the `specification.ts` structure, inheritance from a parent namespace, and common
specification features learned from OpenAPI 3.2.0. Read this before Phase 3 steps 3.6 and 3.7, and
whenever you need to decide which visitor type a field needs.

## Contents

- 3.6 Visitor Templates
  - Standard Fixed Fields Visitor
  - Map Visitor
  - Dynamic Type Detection Visitor
  - Use Cases (which visitor to pick)
- 3.7 specification.ts
  - Advanced Specification Patterns (parent inheritance, patterned fields, conditional visitors)
- Visitor Naming Conventions
- Specification Extensions Support
- Parent Namespace Inheritance
- Common Specification Features to Support

## 3.6 Visitor Templates

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
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * Handles fields that can contain either Reference objects or specific element types.
 * Decorates with metadata to help dereference strategies.
 *
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

## 3.7 specification.ts

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

## Visitor Naming Conventions
- Visitor class names: `{ElementName}Visitor`
- Visitor directories: kebab-case (e.g., `source-description/`, `success-action/`)

## Specification Extensions Support
For elements supporting `x-*` extension properties:
1. Set `canSupportSpecificationExtensions = true` in visitor
2. Use `FixedFieldsVisitor` mixin (handles extensions automatically)

## Parent Namespace Inheritance
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

## Common Specification Features to Support

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
   - Example: OpenAPI 3.1's `jsonSchemaDialect` sets default JSON Schema dialect (inherited by 3.2; only the default dialect URL changes)
   - Add as simple string/URI field to root element
   - Document purpose and valid values

5. **Webhook/Callback Patterns**:
   - Example: OpenAPI 3.1's `webhooks` (inverted API calls; inherited by 3.2)
   - Similar structure to main paths/operations
   - Decorate with identifying metadata (e.g., `webhook-name`)

6. **Self-Reference Fields**:
   - Example: OpenAPI 3.2's `$self` for document URI
   - Simple string field for URI reference
   - Used for relative reference resolution

7. **Extended Metadata Fields**:
   - Example: OpenAPI 3.2's `Server.name` and `Tag.summary` (`License.identifier` was added in 3.1)
   - Add to the new version's subclass of the existing element as optional fields
   - Never edit the parent version's element definitions for a field the parent spec doesn't have
