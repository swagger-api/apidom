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

export { default as mediaTypes, JSONSchema201909MediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';

export { isJSONSchemaElement, isLinkDescriptionElement } from './predicates.ts';

export {
  SpecificationVisitor,
  FallbackVisitor,
  FixedFieldsVisitor,
  PatternedFieldsVisitor,
  MapVisitor,
  AlternatingVisitor,
  ParentSchemaAwareVisitor,
  Visitor,
} from '@swagger-api/apidom-ns-json-schema-draft-7';
export type {
  SpecificationVisitorOptions,
  FallbackVisitorOptions,
  FixedFieldsVisitorOptions,
  PatternedFieldsVisitorOptions,
  MapVisitorOptions,
  AlternatingVisitorOptions,
  ParentSchemaAwareVisitorOptions,
  VisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

export { default as JSONSchemaVisitor } from './refractor/visitors/json-schema/index.ts';
export type { JSONSchemaVisitorOptions } from './refractor/visitors/json-schema/index.ts';
export { default as LinkDescriptionVisitor } from './refractor/visitors/json-schema/link-description/index.ts';
export type { LinkDescriptionVisitorOptions } from './refractor/visitors/json-schema/link-description/index.ts';
export { default as $defsVisitor } from './refractor/visitors/json-schema/$defsVisitor.ts';
export type { $defsVisitorOptions } from './refractor/visitors/json-schema/$defsVisitor.ts';
export { default as $refVisitor } from './refractor/visitors/json-schema/$refVisitor.ts';
export type { $refVisitorOptions } from './refractor/visitors/json-schema/$refVisitor.ts';
export { default as $vocabularyVisitor } from './refractor/visitors/json-schema/$vocabularyVisitor.ts';
export type { $vocabularyVisitorOptions } from './refractor/visitors/json-schema/$vocabularyVisitor.ts';
export { default as AllOfVisitor } from './refractor/visitors/json-schema/AllOfVisitor.ts';
export type { AllOfVisitorOptions } from './refractor/visitors/json-schema/AllOfVisitor.ts';
export { default as AnyOfVisitor } from './refractor/visitors/json-schema/AnyOfVisitor.ts';
export type { AnyOfVisitorOptions } from './refractor/visitors/json-schema/AnyOfVisitor.ts';
export { default as DependentRequiredVisitor } from './refractor/visitors/json-schema/DependentRequiredVisitor.ts';
export type { DependentRequiredVisitorOptions } from './refractor/visitors/json-schema/DependentRequiredVisitor.ts';
export { default as DependentSchemasVisitor } from './refractor/visitors/json-schema/DependentSchemasVisitor.ts';
export type { DependentSchemasVisitorOptions } from './refractor/visitors/json-schema/DependentSchemasVisitor.ts';
export { default as ItemsVisitor } from './refractor/visitors/json-schema/ItemsVisitor.ts';
export type { ItemsVisitorOptions } from './refractor/visitors/json-schema/ItemsVisitor.ts';
export { default as OneOfVisitor } from './refractor/visitors/json-schema/OneOfVisitor.ts';
export type { OneOfVisitorOptions } from './refractor/visitors/json-schema/OneOfVisitor.ts';
export { default as PatternPropertiesVisitor } from './refractor/visitors/json-schema/PatternPropertiesVisitor.ts';
export type { PatternPropertiesVisitorOptions } from './refractor/visitors/json-schema/PatternPropertiesVisitor.ts';
export { default as PropertiesVisitor } from './refractor/visitors/json-schema/PropertiesVisitor.ts';
export type { PropertiesVisitorOptions } from './refractor/visitors/json-schema/PropertiesVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

/**
 * JSON Schema 2019-09 specification elements.
 */
export { JSONSchemaElement, LinkDescriptionElement } from './refractor/registration.ts';
