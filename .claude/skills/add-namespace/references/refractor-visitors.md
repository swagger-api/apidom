# Refractor: Visitors and Specification Object

Visitor templates, the `specification.ts` structure, inheritance from a parent namespace, and common
specification features learned from OpenAPI 3.2.0. Read this before Phase 3 steps 3.6 and 3.7, and
whenever you need to decide which visitor type a field needs.

## Contents

- 3.6 Visitor Templates
  - Fixed Fields Visitor
  - Map Visitor
  - Reference-or-object collections (`isReferenceLikeElement`)
  - Patterned Fields Visitor
  - Which visitor to pick
  - Extending a parent's visitor
- 3.7 specification.ts
  - Brand-new spec
  - Extending a parent version
- Visitor Naming Conventions
- Specification Extensions Support
- Common Specification Features to Support

The templates below are taken from `apidom-ns-arazzo-1` (brand-new spec) and `apidom-ns-openapi-3-2`
(extends 3.1). When in doubt, open the sibling's file for the same kind of field and copy it.

## 3.6 Visitor Templates

### Fixed Fields Visitor

For each object element, create `src/refractor/visitors/{spec}-{version}/{element-name}/index.ts`
(from `apidom-ns-arazzo-1/src/refractor/visitors/arazzo-1/info/index.ts`):

```typescript
import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import {ElementName}Element from '../../../../elements/{ElementName}.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface {ElementName}VisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

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

Set `canSupportSpecificationExtensions` to `true` only if the spec allows `x-*` fields on that object.

### Map Visitor

For a map whose values are all the same object type (from
`apidom-ns-arazzo-1/src/refractor/visitors/arazzo-1/components/InputsVisitor.ts`). The map gets an NCE
class as its element, and `specPath` points at the value type:

```typescript
import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import {CollectionName}Element from '../../../../elements/nces/{CollectionName}.ts';
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
  declare public readonly element: {CollectionName}Element;

  declare protected readonly specPath: SpecPath<['document', 'objects', '{ValueElement}']>;

  constructor(options: {CollectionName}VisitorOptions) {
    super(options);
    this.element = new {CollectionName}Element();
    this.specPath = always(['document', 'objects', '{ValueElement}']);
  }
}

export default {CollectionName}Visitor;
```

Some maps don't need an NCE: OpenAPI 3.2's `PathItem.additionalOperations`
(`apidom-ns-openapi-3-2/src/refractor/visitors/open-api-3-2/path-item/AdditionalOperationsVisitor.ts`)
is exactly this template with `this.element = new ObjectElement()` and
`specPath = always(['document', 'objects', 'Operation'])`, nothing more.

If the values should carry their map key (OpenAPI's `webhook-name`, `runtime-expression`), override
`ObjectElement`, call `MapVisitor.prototype.ObjectElement.call(this, objectElement)` and set the meta
property on each value; see `apidom-ns-openapi-3-1/src/refractor/visitors/open-api-3-1/WebhooksVisitor.ts`.

### Reference-or-object collections

Only for specs with a Reference Object (`$ref`). When a value can be either a Reference Object or a
concrete object, `specPath` is a function of the element: `isReferenceLikeElement` (from
`src/refractor/predicates.ts`, or from the parent namespace) picks the Reference path for objects with
a `$ref` key. After refracting, every resulting `ReferenceElement` is tagged with `referenced-element`
so apidom-reference knows what the `$ref` points at. From
`apidom-ns-openapi-3-2/src/refractor/visitors/open-api-3-2/components/MediaTypesVisitor.ts`:

```typescript
import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsMediaTypesElement from '../../../../elements/nces/ComponentsMediaTypes.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface MediaTypesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MediaTypesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsMediaTypesElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'MediaType']
  >;

  constructor(options: MediaTypesVisitorOptions) {
    super(options);
    this.element = new ComponentsMediaTypesElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'MediaType'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      // @ts-ignore
      referenceElement.setMetaProperty('referenced-element', 'mediaType');
    });

    return result;
  }
}

export default MediaTypesVisitor;
```

In a brand-new spec, import `MapVisitor`, `FallbackVisitor` and `SpecPath` from the local
`../../generics/` and `../../FallbackVisitor.ts` files and `isReferenceLikeElement` from
`../../../predicates.ts` instead. For arrays the same idea is written in the visitor's
`ArrayElement` method (`apidom-ns-arazzo-1/src/refractor/visitors/arazzo-1/step/ParametersVisitor.ts`):

```typescript
ArrayElement(arrayElement: ArrayElement) {
  arrayElement.forEach((item: Element): void => {
    const specPath = isReferenceLikeElement(item)
      ? ['document', 'objects', 'Reference']
      : ['document', 'objects', 'Parameter'];
    const element = this.toRefractedElement(specPath, item);

    if (isReferenceElement(element)) {
      element.setMetaProperty('referenced-element', 'parameter');
    }

    this.element.push(element);
  });

  this.copyMetaAndAttributes(arrayElement, this.element);

  return BREAK;
}
```

Set `referenced-element` to the element name of the target (`mediaType`, `parameter`, `server`),
never to a name for the collection or the field (`channel-servers`, `operation-reply-address`). The
dereference strategy copies the value onto the resolved element, and apidom-ls rules match on it
(`apilintElementOrClass`): with a collection name, a rule for the field has to list both the element
name and the meta value (`[['server', 'channel-servers']]` in AsyncAPI 3). Use the same value in every
visitor that refracts references to the same object; AsyncAPI 3 sets `operationReplyAddress` in one
visitor and `operation-reply-address` in another (FOLLOW-UPS 5.10).

That visitor extends `Mixin(SpecificationVisitor, FallbackVisitor)` and creates the array's NCE in its
constructor. Arrays of a single object type use the same shape without the reference branch
(`workflow/StepsVisitor.ts`).

### Patterned Fields Visitor

For objects whose keys must match a pattern (OpenAPI's Callback and Responses objects). The pattern is
set in the visitor as `this.fieldPatternPredicate`, not in `specification.ts`; see
`apidom-ns-openapi-3-0/src/refractor/visitors/open-api-3-0/callback/index.ts`.

### Which visitor to pick

- **FixedFieldsVisitor**: objects with a Fixed Fields table (Info, Server, License, Step)
- **MapVisitor** (`specPath` = `always([...])`): maps of one object type (Arazzo `components.inputs`,
  OAS 3.2 `additionalOperations`)
- **MapVisitor with `isReferenceLikeElement`**: maps whose values may be Reference Objects
  (OAS `components.mediaTypes`, `webhooks`)
- **SpecificationVisitor with `ArrayElement`**: arrays of objects, with or without references
- **PatternedFieldsVisitor**: objects whose field names follow a pattern

### Extending a parent's visitor

When extending a parent version, an element that exists in the parent gets a visitor that subclasses
the parent's visitor (taken from the parent's specification object) and only swaps in the new element
class (from `apidom-ns-openapi-3-2/src/refractor/visitors/open-api-3-2/info/index.ts`):

```typescript
import {
  specificationObj as OpenApi3_1Specification,
  InfoVisitorOptions,
  InfoVisitor as InfoVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import InfoElement from '../../../../elements/Info.ts';

/**
 * @public
 */
export const BaseInfoVisitor: typeof InfoVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Info.$visitor;

export type { InfoVisitorOptions };

/**
 * @public
 */
class InfoVisitor extends BaseInfoVisitor {
  declare public readonly element: InfoElement;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
```

New fields are added in `specification.ts`, not in the visitor.

## 3.7 specification.ts

### Brand-new spec

Shape of `apidom-ns-arazzo-1/src/refractor/specification.ts`:

```typescript
import {RootName}Visitor from './visitors/{spec}-{version}/index.ts';
import {ElementName}Visitor from './visitors/{spec}-{version}/{element-name}/index.ts';
import {CollectionName}Visitor from './visitors/{spec}-{version}/{CollectionName}Visitor.ts';
// Import all visitors...
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor.ts';
import FallbackVisitor from './visitors/FallbackVisitor.ts';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 * @public
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        {RootObjectName}: {
          $visitor: {RootName}Visitor,
          fixedFields: {
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            {collectionField}: {CollectionName}Visitor,
          },
        },
        {ElementName}: {
          $visitor: {ElementName}Visitor,
          fixedFields: {
            // primitive values
            {propertyName}: { $ref: '#/visitors/value' },
            // nested object
            {nestedProperty}: { $ref: '#/visitors/document/objects/{NestedElement}' },
            // array or map: the field's own visitor class
            {collectionProperty}: {CollectionName}Visitor,
          },
        },
        // One entry per object in the spec...
      },
      // Only if the spec has x-* extensions:
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
} as const;

export default specification;
```

A field's value is either `{ $ref: '#/visitors/...' }` (resolved when the refractor dereferences the
specification object) or a visitor class. There are no per-field functions; anything that depends on
the content of the value (reference or object, which subtype) is decided by the field's visitor via
`specPath`, as shown above. Arazzo reuses the JSON Schema 2020-12 visitors by destructuring them from
`@swagger-api/apidom-ns-json-schema-2020-12`'s `specificationObj`.

### Extending a parent version

Every object the new version defines an element class for gets the new version's own `$visitor`, so
refracting produces the new version's element classes. Two patterns do this; neither spreads the
parent's `objects`. Listing suits specs with many objects (OpenAPI, AsyncAPI); patching suits specs
with few objects and a small change (JSON Schema dialects).

#### Listing every object

`apidom-ns-openapi-3-2/src/refractor/specification.ts` lists every object again with the new
version's own `$visitor`, and fills `fixedFields` field by field:

- an inherited, unchanged primitive or parent-specific visitor: reuse the parent's entry,
  `ParentSpecification.visitors.document.objects.{Object}.fixedFields.{field}`
- a field pointing at another object: `{ $ref: '#/visitors/document/objects/{Object}' }`, so it
  resolves to this version's object and element
- a new field: `{ $ref: '#/visitors/value' }` or a new visitor, marked with `// {Spec} {version} addition`

```typescript
import { specificationObj as ParentSpecification } from '@swagger-api/apidom-ns-{parent}';

import ServerVisitor from './visitors/{spec}-{version}/server/index.ts';
// Import every visitor of this version...

const specification = {
  visitors: {
    value: ParentSpecification.visitors.value,
    document: {
      objects: {
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: ParentSpecification.visitors.document.objects.Server.fixedFields.url,
            description: ParentSpecification.visitors.document.objects.Server.fixedFields.description,
            variables: ParentSpecification.visitors.document.objects.Server.fixedFields.variables,
            // OpenAPI 3.2 addition
            name: { $ref: '#/visitors/value' },
          },
        },
        // Every other object of the spec, listed the same way...
      },
      extension: {
        $visitor: ParentSpecification.visitors.document.extension.$visitor,
      },
    },
  },
} as const;
```

Spreading is used only for whole visitor definitions borrowed from another namespace
(`...JSONSchemaVisitor.fixedFields` for the Schema object). Listing fields explicitly is what makes
reviewers' "is this field inherited or new?" question answerable from the file, and what keeps a
spread from silently pulling parent visitors that build the parent's element classes.

#### Patching the parent

The JSON Schema namespaces (`apidom-ns-json-schema-draft-6` to `apidom-ns-json-schema-2020-12`) have
four objects, define their own element class for two of them (`JSONSchema`, `LinkDescription`; the
`JSONReference` and `Media` elements are re-exported from draft-4) and change a few fields per
version, so they patch the parent's `specificationObj` instead of listing it. Shape of
`apidom-ns-json-schema-2020-12/src/refractor/specification.ts`:

```typescript
import { pipe, assocPath, dissocPath } from 'ramda';
import { specificationObj } from '@swagger-api/apidom-ns-json-schema-2019-09';

import JSONSchemaVisitor from './visitors/json-schema/index.ts';
import JSONSchemaLinkDescriptionVisitor from './visitors/json-schema/link-description/index.ts';

const specification = pipe(
  assocPath(['visitors', 'document', 'objects', 'JSONSchema', '$visitor'], JSONSchemaVisitor),
  // removed in this version
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$recursiveRef']),
  // new in this version
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$dynamicRef'],
    specificationObj.visitors.value,
  ),
  // inherited, but its value is the parent's visitor class
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'not'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', '$visitor'],
    JSONSchemaLinkDescriptionVisitor,
  ),
  // ...
)(specificationObj);

export default specification as typeof specificationObj;
```

- `assocPath` the `$visitor` of every object this version defines an element class for. An object
  you skip keeps the parent's visitor and builds the parent's element, and nothing in the file shows
  it. Only objects whose element is reused from the parent (`JSONReference`, `Media`) keep it.
- An inherited field whose value is a visitor class (not a `{ $ref }`) still builds the parent's
  element; reassign it, as 2020-12 does for `not`, `if`, `items`, `contains` and the other subschema
  fields. `{ $ref }` entries resolve against the patched object and need no change.
- `dissocPath` what the new version removes (2019-09 drops `definitions` and `JSONReference`'s
  `$visitor`).
- When the spec has more than a handful of objects, list them instead: the `assocPath` chain gets
  longer than the listing and hides which fields are inherited.

## Visitor Naming Conventions
- Visitor class names: `{ElementName}Visitor`
- Visitor directories: kebab-case (e.g., `source-description/`, `success-action/`)
- A field visitor used by one element only (e.g. the `extensions` array of Agent Capabilities, the `schemes` map of Security Requirement) lives in that element's directory: `visitors/{spec}-{version}/agent-capabilities/ExtensionsVisitor.ts`. Only visitors shared by several elements go to a shared directory.

## Specification Extensions Support
Only when the spec allows `x-*` extension properties on that object:
1. Set `canSupportSpecificationExtensions = true` in the visitor
2. Use the `FixedFieldsVisitor` mixin (it handles extensions automatically)
3. Register `extension: { $visitor: SpecificationExtensionVisitor }` in `specification.ts`

Every supported spec that has extensions prefixes them with `x-`, and each namespace's extension predicate (`isOpenApiExtension`, `isAsyncApiExtension`, `isArazzoSpecificationExtension`, ...) checks exactly that. A spec with another prefix only needs a different predicate: the generic `FixedFieldsVisitor` and `PatternedFieldsVisitor` take it through their `specificationExtensionPredicate` option.

If the spec has no extensions at all (A2A), drop `SpecificationExtensionVisitor`, the extension predicate and the extension branches from the copied generic visitors. Same for references: no Reference Object / `$ref` in the spec means no `isReferenceLikeElement` and no reference visitors.

## Common Specification Features to Support

Based on learnings from OpenAPI 3.2.0 and other implementations, watch for these common patterns:

1. **New HTTP Methods or Operations**:
   - Example: OpenAPI 3.2 added `query` as a standard HTTP method
   - Add as fixed fields in PathItem-like objects
   - Map to same visitor as other operations (GET, POST, etc.)

2. **Dynamic Operation Collections**:
   - Example: OpenAPI 3.2's `PathItem.additionalOperations` maps custom HTTP method names to Operation Objects
   - A plain `MapVisitor` with `specPath = always(['document', 'objects', 'Operation'])`; Operation Objects can't be `$ref`s, so there is no reference handling

3. **Reusable Component Types**:
   - Example: OpenAPI 3.2's `components.mediaTypes` for reusable media type definitions
   - Add to Components as a map visitor using `isReferenceLikeElement`, since component values may be Reference Objects (`MediaTypesVisitor` above)

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
