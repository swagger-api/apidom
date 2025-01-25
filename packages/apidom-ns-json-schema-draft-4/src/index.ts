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

export { default as mediaTypes, JSONSchemaDraft4MediaTypes } from './media-types.ts';
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

export { isJSONReferenceLikeElement } from './refractor/predicates.ts';
export type { JSONReferenceLikeElement } from './refractor/predicates.ts';

export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor.ts';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor.ts';
export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor.ts';
export type {
  AlternatingVisitorOptions,
  Alternator,
} from './refractor/visitors/generics/AlternatingVisitor.ts';
export { default as ParentSchemaAwareVisitor } from './refractor/visitors/json-schema/ParentSchemaAwareVisitor.ts';
export type { ParentSchemaAwareVisitorOptions } from './refractor/visitors/json-schema/ParentSchemaAwareVisitor.ts';

export type {
  default as JSONReferenceVisitor,
  JSONReferenceVisitorOptions,
} from './refractor/visitors/json-schema/json-reference/index.ts';
export type {
  default as JSONReference$RefVisitor,
  $RefVisitorOptions as JSONReference$RefVisitorOptions,
} from './refractor/visitors/json-schema/json-reference/$RefVisitor.ts';
export { default as LinkDescriptionVisitor } from './refractor/visitors/json-schema/link-description/index.ts';
export type { LinkDescriptionVisitorOptions } from './refractor/visitors/json-schema/link-description/index.ts';
export type {
  default as MediaVisitor,
  MediaVisitorOptions,
} from './refractor/visitors/json-schema/media/index.ts';
export type {
  default as AllOfVisitor,
  AllOfVisitorOptions,
} from './refractor/visitors/json-schema/AllOfVisitor.ts';
export type {
  default as AnyOfVisitor,
  AnyOfVisitorOptions,
} from './refractor/visitors/json-schema/AnyOfVisitor.ts';
export type {
  default as DefinitionsVisitor,
  DefinitionsVisitorOptions,
} from './refractor/visitors/json-schema/DefinitionsVisitor.ts';
export type {
  default as DependenciesVisitor,
  DependenciesVisitorOptions,
} from './refractor/visitors/json-schema/DependenciesVisitor.ts';
export type {
  default as EnumVisitor,
  EnumVisitorOptions,
} from './refractor/visitors/json-schema/EnumVisitor.ts';
export { default as JSONSchemaVisitor } from './refractor/visitors/json-schema/index.ts';
export type { JSONSchemaVisitorOptions } from './refractor/visitors/json-schema/index.ts';
export { default as ItemsVisitor } from './refractor/visitors/json-schema/ItemsVisitor.ts';
export type { ItemsVisitorOptions } from './refractor/visitors/json-schema/ItemsVisitor.ts';
export type {
  default as SchemaOrReferenceVisitor,
  SchemaOrReferenceVisitorOptions,
} from './refractor/visitors/json-schema/JSONSchemaOrJSONReferenceVisitor.ts';
export type {
  default as LinksVisitor,
  LinksVisitorOptions,
} from './refractor/visitors/json-schema/LinksVisitor.ts';
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
export type {
  default as RequiredVisitor,
  RequiredVisitorOptions,
} from './refractor/visitors/json-schema/RequiredVisitor.ts';
export type {
  default as TypeVisitor,
  TypeVisitorOptions,
} from './refractor/visitors/json-schema/TypeVisitor.ts';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

/**
 * JSON Schema Draft 4 specification elements.
 */
export {
  JSONSchemaElement,
  JSONReferenceElement,
  MediaElement,
  LinkDescriptionElement,
} from './refractor/registration.ts';
