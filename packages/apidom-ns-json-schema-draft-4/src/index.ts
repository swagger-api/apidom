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

export { default as mediaTypes, JSONSchemaDraft4MediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element';

export {
  isJSONReferenceElement,
  isJSONSchemaElement,
  isLinkDescriptionElement,
  isMediaElement,
} from './predicates';

export { isJSONReferenceLikeElement } from './refractor/predicates';

export { keyMap, getNodeType } from './traversal/visitor';

/**
 * JSON Schema Draft 4 specification elements.
 */
export { default as JSONSchemaElement } from './elements/JSONSchema';
export { default as JSONReferenceElement } from './elements/JSONReference';
export { default as LinkDescriptionElement } from './elements/LinkDescription';
export { default as MediaElement } from './elements/Media';
