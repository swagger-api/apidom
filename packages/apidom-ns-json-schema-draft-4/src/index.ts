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
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor';
export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor';
export { default as ParentSchemaAwareVisitor } from './refractor/visitors/json-schema/ParentSchemaAwareVisitor';

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
