import { BooleanElement, createPredicate, isBooleanElement } from '@swagger-api/apidom-core';
import type { ElementPredicate } from '@swagger-api/apidom-core';

import JSONSchemaElement from './elements/JSONSchema.ts';
import LinkDescriptionElement from './elements/LinkDescription.ts';

/**
 * @public
 */
export const isJSONSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is JSONSchemaElement =>
      element instanceof JSONSchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('JSONSchema202012', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isLinkDescriptionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LinkDescriptionElement =>
      element instanceof LinkDescriptionElement ||
      (hasBasicElementProps(element) &&
        isElementType('linkDescription', element) &&
        primitiveEq('object', element));
  },
);

/**
 * Boolean JSON Schema (`true` or `false` in place of a schema).
 *
 * @public
 */
export const isBooleanJsonSchemaElement: ElementPredicate<BooleanElement> = (
  element: unknown,
): element is BooleanElement => {
  return isBooleanElement(element) && element.classes.includes('boolean-json-schema');
};
