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

export type {
  default as JSONSchemaVisitor,
  JSONSchemaVisitorOptions,
} from './refractor/visitors/json-schema/index.ts';
export type {
  default as LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from './refractor/visitors/json-schema/link-description/index.ts';
export type {
  default as $defsVisitor,
  $defsVisitorOptions,
} from './refractor/visitors/json-schema/$defsVisitor.ts';
export type {
  default as $refVisitor,
  $refVisitorOptions,
} from './refractor/visitors/json-schema/$refVisitor.ts';
export type {
  default as $vocabularyVisitor,
  $vocabularyVisitorOptions,
} from './refractor/visitors/json-schema/$vocabularyVisitor.ts';
export type {
  default as AllOfVisitor,
  AllOfVisitorOptions,
} from './refractor/visitors/json-schema/AllOfVisitor.ts';
export type {
  default as AnyOfVisitor,
  AnyOfVisitorOptions,
} from './refractor/visitors/json-schema/AnyOfVisitor.ts';
export type {
  default as DependentRequiredVisitor,
  DependentRequiredVisitorOptions,
} from './refractor/visitors/json-schema/DependentRequiredVisitor.ts';
export type {
  default as DependentSchemasVisitor,
  DependentSchemasVisitorOptions,
} from './refractor/visitors/json-schema/DependentSchemasVisitor.ts';
export type {
  default as ItemsVisitor,
  ItemsVisitorOptions,
} from './refractor/visitors/json-schema/ItemsVisitor.ts';
export type {
  default as OneOfVisitor,
  OneOfVisitorOptions,
} from './refractor/visitors/json-schema/OneOfVisitor.ts';
export type {
  default as PatternPropertiesVisitor,
  PatternPropertiesVisitorOptions,
} from './refractor/visitors/json-schema/PatternPropertiesVisitor.ts';
export type {
  default as PropertiesVisitor,
  PropertiesVisitorOptions,
} from './refractor/visitors/json-schema/PropertiesVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

/**
 * JSON Schema 2019-09 specification elements.
 */
export { JSONSchemaElement, LinkDescriptionElement } from './refractor/registration.ts';
