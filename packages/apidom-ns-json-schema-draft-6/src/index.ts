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

export { default as mediaTypes, JSONSchemaDraft6MediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element';

export { default as refract, createRefractor } from './refractor';
export { default as specificationObj } from './refractor/specification';

export {
  isJSONReferenceElement,
  isJSONSchemaElement,
  isLinkDescriptionElement,
  isMediaElement,
} from './predicates';

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
  AllOfVisitorOptions,
  AnyOfVisitorOptions,
  DefinitionsVisitorOptions,
  DependenciesVisitorOptions,
  OneOfVisitorOptions,
  PatternPropertiesVisitorOptions,
  PropertiesVisitorOptions,
  SchemaOrReferenceVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export type {
  default as LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from './refractor/visitors/json-schema/link-description';
export type {
  default as JSONSchemaVisitor,
  JSONSchemaVisitorOptions,
} from './refractor/visitors/json-schema';
export type {
  default as ExamplesVisitor,
  ExamplesVisitorOptions,
} from './refractor/visitors/json-schema/ExamplesVisitor';
export type {
  default as ItemsVisitor,
  ItemsVisitorOptions,
} from './refractor/visitors/json-schema/ItemsVisitor';

export { keyMap, getNodeType } from './traversal/visitor';

/**
 * JSON Schema Draft 6 specification elements.
 */
export { JSONSchemaElement, LinkDescriptionElement } from './refractor/registration';
export { JSONReferenceElement, MediaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';
