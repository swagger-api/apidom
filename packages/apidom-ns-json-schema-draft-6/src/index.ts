import './refractor/registration';

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
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export { keyMap, getNodeType } from './traversal/visitor';

/**
 * JSON Schema Draft 6 specification elements.
 */
export { default as JSONSchemaElement } from './elements/JSONSchema';
export { default as LinkDescriptionElement } from './elements/LinkDescription';
export { JSONReferenceElement, MediaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';
