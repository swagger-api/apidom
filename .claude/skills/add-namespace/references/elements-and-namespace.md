# Elements, Namespace, Predicates and Exports

Templates for element classes and the files that register and expose them. Read this before Phase 3
steps 3.2-3.5, 3.8 and 3.9. Step numbers match the workflow in `SKILL.md`.

Remember the critical rule: when extending a parent version, element classes only add fields that are
NEW in this version — never redefine fields the parent element already has.

## Contents

- 3.2 Element Class Template (+ element/property type mappings)
- 3.3 namespace.ts
- 3.4 predicates.ts (+ primitive type mapping)
- 3.5 media-types.ts
- 3.8 registration.ts
- 3.9 index.ts (main export)
- Element Naming Conventions
- CSS Classes for Specialized Elements
- Named Collection Elements (NCEs)

## 3.2 Element Class Template

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

## 3.3 namespace.ts

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

## 3.4 predicates.ts

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

## 3.5 media-types.ts

Media types are a class extending `MediaTypes<string>` from `apidom-core`, not a plain object. The
`generic` format is the vendor media type without a `+json`/`+yaml` suffix, never
`application/json`. Copy `apidom-ns-arazzo-1/src/media-types.ts` (or `apidom-ns-a2a-1/src/media-types.ts`)
and adapt the vendor string and versions:

```typescript
import { last } from 'ramda';
import { MediaTypes } from '@swagger-api/apidom-core';

/**
 * @public
 */
export type Format = 'generic' | 'json' | 'yaml';

/**
 * @public
 */
export class {SpecName}MediaTypes extends MediaTypes<string> {
  filterByFormat(format: Format = 'generic') {
    const effectiveFormat = format === 'generic' ? '{vendorType};version' : format;
    return this.filter((mediaType) => mediaType.includes(effectiveFormat));
  }

  findBy(version = '{latestVersion}', format: Format = 'generic') {
    const search =
      format === 'generic'
        ? `vnd.{vendorType};version=${version}`
        : `vnd.{vendorType}+${format};version=${version}`;
    const found = this.find((mediaType) => mediaType.includes(search));

    return found || this.unknownMediaType;
  }

  latest(format: Format = 'generic') {
    return last(this.filterByFormat(format)) as string;
  }
}

/**
 * @public
 */
const mediaTypes = new {SpecName}MediaTypes(
  'application/vnd.{vendorType};version={version}',
  'application/vnd.{vendorType}+json;version={version}',
  'application/vnd.{vendorType}+yaml;version={version}',
  // one generic/json/yaml triple per supported patch version, oldest first
);

export default mediaTypes;
```

`{vendorType}` is the vendor tag plus type, e.g. `oai.workflows` for Arazzo
(`application/vnd.oai.workflows+json;version=1.0.1`) or `a2a` for A2A. List every supported patch
version in ascending order, because `latest()` returns the last entry of the filtered list. If the
spec has no IANA-registered media type, follow the `application/vnd.{vendor}.{type};version={ver}`
convention and say so in the doc comment, as `apidom-ns-a2a-1` does. When extending a parent version,
look at how the parent's `media-types.ts` builds its strings (OpenAPI uses
`application/vnd.oai.openapi+json;version=3.2.0`) and follow the same scheme.

## 3.8 registration.ts

Attach a `refract` function to every element class, then re-export the classes. `src/index.ts` exports
elements from this file (not from `src/elements/`) so that consumers always get classes with `refract`
attached.

```typescript
import {RootElementName}Element from '../elements/{RootElementName}.ts';
import {ElementName}Element from '../elements/{ElementName}.ts';
// Import all elements...
import { createRefractor } from './index.ts';

{RootElementName}Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  '{RootObjectName}',
  '$visitor',
]);
{ElementName}Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  '{ElementName}',
  '$visitor',
]);
// Register all elements...

export {
  {RootElementName}Element,
  {ElementName}Element,
  // Export all elements...
};
```

The path usually ends in `'$visitor'`. An element that is refracted as a single fixed field of another
object points at that field instead (Arazzo:
`['visitors', 'document', 'objects', 'ArazzoSpecification', 'fixedFields', 'arazzo']` for
`ArazzoSpecElement`). NCE classes (see below) are not registered here.

## 3.9 index.ts (main export)

Mirror the sibling package's `src/index.ts` (`apidom-ns-arazzo-1` or `apidom-ns-a2a-1` for a brand-new
spec, the parent's newest child such as `apidom-ns-openapi-3-2` when extending). The shape for a
brand-new spec:

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

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';

// Generic visitor base classes
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type {
  FixedFieldsVisitorOptions,
  SpecPath,
} from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor.ts';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor.ts';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';
// Only if the spec has x-* extensions:
export { default as SpecificationExtensionVisitor } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export type { SpecificationExtensionVisitorOptions } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';

// Element visitors
export type {
  default as {ElementName}Visitor,
  {ElementName}VisitorOptions,
} from './refractor/visitors/{spec}-{version}/{element-name}/index.ts';
// Export all visitor types...

// Predicates
export {
  is{ElementName}Element,
  // Export all predicates...
} from './predicates.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

// Elements (with .refract attached via registration)
export {
  {RootElementName}Element,
  {ElementName}Element,
  // Export all elements...
} from './refractor/registration.ts';

// NCE element classes
export { default as {NceName}Element } from './elements/nces/{NceName}.ts';
```

When extending a parent, the generic visitors (`FixedFieldsVisitor`, `MapVisitor`, `FallbackVisitor`,
...) are re-exported from the parent package instead of local files, e.g.
`export { MapVisitor } from '@swagger-api/apidom-ns-openapi-3-1';`, and every refractor plugin the
parent exports is exported again from the new package (see `apidom-ns-openapi-3-2/src/index.ts`).

## Element Naming Conventions
- Element class names: PascalCase (e.g., `WorkflowElement`, `InfoElement`, `JsonSchemaDialectElement`)
- Element type names (registered in namespace): camelCase (e.g., `'workflow'`, `'info'`, `'jsonSchemaDialect'`)
- File names: Match class names (e.g., `Workflow.ts`, `Info.ts`, `JsonSchemaDialect.ts`)
- **Root element**: the registered element name identifies the spec and major version across namespaces: `openApi3_1` (`OpenApi3_1Element`), `asyncApi3`, `arazzoSpecification1` (`ArazzoSpecification1Element`), `a2aAgentCard1`. Not the bare object name (`agentCard`). The class name can stay the spec's object name: A2A's root class is `AgentCardElement` and only its `this.element` is `'a2aAgentCard1'`.
- Abbreviations follow the closest existing namespace: `oauthFlows`, `OAuthFlowsElement` as in OpenAPI.

## Reserved Field Names

Some spec field names clash with properties every ApiDOM element already has. A getter named after them would shadow the element's own property and break refracting, traversal or serialization. Use a suffixed accessor that reads the member, as `apidom-ns-json-schema-draft-4/src/elements/JSONSchema.ts` does for `id`:

```typescript
get idProp(): StringElement | undefined {
  return this.get('id');
}

set idProp(idProp: StringElement | undefined) {
  this.set('id', idProp);
}
```

| Spec field | Accessor |
|------------|----------|
| `id` | `idProp` |
| `element`, `meta`, `attributes`, `content`, `classes`, `children`, `parent`, `length`, `value` | `{name}Prop` |

The field itself is still refracted under its real key: list it in `specification.ts` fixed fields as usual. Don't skip the field (PR #5182 first dropped `AgentSkill.id` because of the clash).

## CSS Classes for Specialized Elements

Some elements push classes in the constructor so predicates and tooling can identify them beyond the
element name. From `apidom-ns-arazzo-1/src/elements/ArazzoSpec.ts`:

```typescript
constructor(content?: string, meta?: Meta, attributes?: Attributes) {
  super(content, meta, attributes);
  this.element = 'arazzoSpec';
  this.classes.push('spec-version');
  this.classes.push('version');
}
```

Collection-specific classes such as `workflow-outputs` or `workflow-steps` belong on the NCE for that
collection, not on the owning object element.

## Named Collection Elements (NCEs)

A field holding an array or map of a specific object type gets its own class in `src/elements/nces/`.
It does not set `this.element` (it stays `array` or `object`); it is identified by its
`static primaryClass`. From `apidom-ns-arazzo-1/src/elements/nces/WorkflowSteps.ts`:

```typescript
import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class WorkflowSteps extends ArrayElement {
  static primaryClass = 'workflow-steps';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(WorkflowSteps.primaryClass);
  }
}

export default WorkflowSteps;
```

Map-valued collections extend `ObjectElement` with `content?: Record<string, unknown>` instead (see
`nces/WorkflowOutputs.ts`, `primaryClass = 'workflow-outputs'`). Their predicates check the class with
`hasClass(...)`, and the array or map visitor creates the NCE as its `this.element`.
