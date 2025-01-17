export {
  isRefElement,
  isLinkElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, JSONSchemaDraft6MediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';

export {
  isJSONReferenceElement,
  isJSONSchemaElement,
  isLinkDescriptionElement,
  isMediaElement,
} from './predicates.ts';

export {
  isJSONReferenceLikeElement,
  SpecificationVisitor,
  FallbackVisitor,
  FixedFieldsVisitor,
  PatternedFieldsVisitor,
  MapVisitor,
  AlternatingVisitor,
  ParentSchemaAwareVisitor,
  Visitor,
} from '@swagger-api/apidom-ns-json-schema-draft-4';
export type {
  SpecificationVisitorOptions,
  FallbackVisitorOptions,
  FixedFieldsVisitorOptions,
  PatternedFieldsVisitorOptions,
  MapVisitorOptions,
  AlternatingVisitorOptions,
  ParentSchemaAwareVisitorOptions,
  VisitorOptions,
  AllOfVisitor,
  AllOfVisitorOptions,
  AnyOfVisitor,
  AnyOfVisitorOptions,
  DefinitionsVisitor,
  DefinitionsVisitorOptions,
  DependenciesVisitor,
  DependenciesVisitorOptions,
  OneOfVisitor,
  OneOfVisitorOptions,
  PatternPropertiesVisitor,
  PatternPropertiesVisitorOptions,
  PropertiesVisitor,
  PropertiesVisitorOptions,
  SchemaOrReferenceVisitor,
  SchemaOrReferenceVisitorOptions,
  SpecPath,
  ItemsVisitor as JSONSchemaDraft4ItemsVisitor,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export type {
  default as LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from './refractor/visitors/json-schema/link-description/index.ts';
export { default as JSONSchemaVisitor } from './refractor/visitors/json-schema/index.ts';
export type { JSONSchemaVisitorOptions } from './refractor/visitors/json-schema/index.ts';
export type {
  default as ExamplesVisitor,
  ExamplesVisitorOptions,
} from './refractor/visitors/json-schema/ExamplesVisitor.ts';
export type {
  default as ItemsVisitor,
  ItemsVisitorOptions,
} from './refractor/visitors/json-schema/ItemsVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

/**
 * JSON Schema Draft 6 specification elements.
 */
export { JSONSchemaElement, LinkDescriptionElement } from './refractor/registration.ts';
export { JSONReferenceElement, MediaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';
