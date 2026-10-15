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

## 3.8 registration.ts

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

## 3.9 index.ts (main export)

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

## Element Naming Conventions
- Element class names: PascalCase (e.g., `WorkflowElement`, `InfoElement`, `JsonSchemaDialectElement`)
- Element type names (registered in namespace): camelCase (e.g., `'workflow'`, `'info'`, `'jsonSchemaDialect'`)
- File names: Match class names (e.g., `Workflow.ts`, `Info.ts`, `JsonSchemaDialect.ts`)
- **Root element**: name it after the spec and major version so it identifies the document type across namespaces: `openApi3_1` (`OpenApi3_1Element`), `asyncApi3`, `arazzoSpecification1`, `a2aAgentCard1` (`A2aAgentCard1Element`). Not the bare object name (`agentCard`).
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
Add CSS classes to elements that need specialized identification:
```typescript
constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
  super(content, meta, attributes);
  this.element = 'workflow';
  this.classes.push('workflow-outputs');
}
```

## Named Collection Elements (NCEs)
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
