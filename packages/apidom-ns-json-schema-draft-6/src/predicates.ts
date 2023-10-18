import { createPredicate } from '@swagger-api/apidom-core';

import JSONSchemaElement from './elements/JSONSchema';
import LinkDescriptionElement from './elements/LinkDescription';

export { isJSONReferenceElement, isMediaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';

export const isJSONSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is JSONSchemaElement =>
      element instanceof JSONSchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('JSONSchemaDraft6', element) &&
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
