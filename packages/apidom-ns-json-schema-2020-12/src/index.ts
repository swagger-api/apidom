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

export { default as mediaTypes, JSONSchema202012MediaTypes } from './media-types.ts';
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
} from '@swagger-api/apidom-ns-json-schema-2019-09';
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
} from '@swagger-api/apidom-ns-json-schema-2019-09';

export { default as JSONSchemaVisitor } from './refractor/visitors/json-schema/index.ts';
export type { JSONSchemaVisitorOptions } from './refractor/visitors/json-schema/index.ts';
export { default as LinkDescriptionVisitor } from './refractor/visitors/json-schema/link-description/index.ts';
export type { LinkDescriptionVisitorOptions } from './refractor/visitors/json-schema/link-description/index.ts';
export { $defsVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { $defsVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { $refVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { $refVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { $vocabularyVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { $vocabularyVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { AllOfVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { AllOfVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { AnyOfVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { AnyOfVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { DependentRequiredVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { DependentRequiredVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { DependentSchemasVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { DependentSchemasVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { ItemsVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { ItemsVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { OneOfVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { OneOfVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { PatternPropertiesVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { PatternPropertiesVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { PropertiesVisitor } from '@swagger-api/apidom-ns-json-schema-2019-09';
export type { PropertiesVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2019-09';
export { default as PrefixItemsVisitor } from './refractor/visitors/json-schema/PrefixItemsVisitor.ts';
export type { PrefixItemsVisitorOptions } from './refractor/visitors/json-schema/PrefixItemsVisitor.ts';

/**
 * JSON Schema 2020-12 specification elements.
 */
export { JSONSchemaElement, LinkDescriptionElement } from './refractor/registration.ts';
