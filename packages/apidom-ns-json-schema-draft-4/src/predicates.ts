import { createPredicate } from '@swagger-api/apidom-core';

import JSONSchemaElement from './elements/JSONSchema';
import JSONReferenceElement from './elements/JSONReference';
import MediaElement from './elements/Media';
import LinkDescriptionElement from './elements/LinkDescription';

export const isJSONSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is JSONSchemaElement =>
      element instanceof JSONSchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('JSONSchemaDraft4', element) &&
        primitiveEq('object', element));
  },
);

export const isJSONReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is JSONReferenceElement =>
      element instanceof JSONReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('JSONReference', element) &&
        primitiveEq('object', element));
  },
);

export const isMediaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is MediaElement =>
      element instanceof MediaElement ||
      (hasBasicElementProps(element) &&
        isElementType('media', element) &&
        primitiveEq('object', element));
  },
);

export const isLinkDescriptionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LinkDescriptionElement =>
      element instanceof LinkDescriptionElement ||
      (hasBasicElementProps(element) &&
        isElementType('linkDescription', element) &&
        primitiveEq('object', element));
  },
);
