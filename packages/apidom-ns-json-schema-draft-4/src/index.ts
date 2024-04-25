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

export { default as mediaTypes, JSONSchemaDraft4MediaTypes } from './media-types';

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

export { isJSONReferenceLikeElement } from './refractor/predicates';

export { default as Visitor } from './refractor/visitors/Visitor';
export type { VisitorOptions } from './refractor/visitors/Visitor';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor';
export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor';
export type { AlternatingVisitorOptions } from './refractor/visitors/generics/AlternatingVisitor';
export { default as ParentSchemaAwareVisitor } from './refractor/visitors/json-schema/ParentSchemaAwareVisitor';
export type { ParentSchemaAwareVisitorOptions } from './refractor/visitors/json-schema/ParentSchemaAwareVisitor';

export type {
  default as JSONReferenceVisitor,
  JSONReferenceVisitorOptions,
} from './refractor/visitors/json-schema/json-reference';
export type {
  default as JSONReference$RefVisitor,
  $RefVisitorOptions as JSONReference$RefVisitorOptions,
} from './refractor/visitors/json-schema/json-reference/$RefVisitor';
export type {
  default as LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from './refractor/visitors/json-schema/link-description';
export type {
  default as MediaVisitor,
  MediaVisitorOptions,
} from './refractor/visitors/json-schema/media';
export type {
  default as AllOfVisitor,
  AllOfVisitorOptions,
} from './refractor/visitors/json-schema/AllOfVisitor';
export type {
  default as AnyOfVisitor,
  AnyOfVisitorOptions,
} from './refractor/visitors/json-schema/AnyOfVisitor';
export type {
  default as DefinitionsVisitor,
  DefinitionsVisitorOptions,
} from './refractor/visitors/json-schema/DefinitionsVisitor';
export type {
  default as DependenciesVisitor,
  DependenciesVisitorOptions,
} from './refractor/visitors/json-schema/DependenciesVisitor';
export type {
  default as EnumVisitor,
  EnumVisitorOptions,
} from './refractor/visitors/json-schema/EnumVisitor';
export type {
  default as JSONSchemaVisitor,
  JSONSchemaVisitorOptions,
} from './refractor/visitors/json-schema';
export type {
  default as ItemsVisitor,
  ItemsVisitorOptions,
} from './refractor/visitors/json-schema/ItemsVisitor';
export type {
  default as SchemaOrReferenceVisitor,
  SchemaOrReferenceVisitorOptions,
} from './refractor/visitors/json-schema/JSONSchemaOrJSONReferenceVisitor';
export type {
  default as LinksVisitor,
  LinksVisitorOptions,
} from './refractor/visitors/json-schema/LinksVisitor';
export type {
  default as OneOfVisitor,
  OneOfVisitorOptions,
} from './refractor/visitors/json-schema/OneOfVisitor';
export type {
  default as PatternPropertiesVisitor,
  PatternPropertiesVisitorOptions,
} from './refractor/visitors/json-schema/PatternPropertiesVisitor';
export type {
  default as PropertiesVisitor,
  PropertiesVisitorOptions,
} from './refractor/visitors/json-schema/PropertiesVisitor';
export type {
  default as RequiredVisitor,
  RequiredVisitorOptions,
} from './refractor/visitors/json-schema/RequiredVisitor';
export type {
  default as TypeVisitor,
  TypeVisitorOptions,
} from './refractor/visitors/json-schema/TypeVisitor';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor';

export { keyMap, getNodeType } from './traversal/visitor';

/**
 * JSON Schema Draft 4 specification elements.
 */
export {
  JSONSchemaElement,
  JSONReferenceElement,
  MediaElement,
  LinkDescriptionElement,
} from './refractor/registration';
