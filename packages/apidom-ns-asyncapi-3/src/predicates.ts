import { createPredicate, isElement } from '@swagger-api/apidom-core';

import AsyncApiVersionElement from './elements/AsyncApiVersion.ts';
import MultiFormatSchemaElement from './elements/MultiFormatSchema.ts';
import ReferenceElement from './elements/Reference.ts';

export const isAsyncApi3Element = (node: unknown) =>
  isElement(node) && node.element === 'asyncApi3';
export const isInfoElement = (node: unknown) => isElement(node) && node.element === 'info';
export const isChannelsElement = (node: unknown) => isElement(node) && node.element === 'channels';
export const isComponentsElement = (node: unknown) =>
  isElement(node) && node.element === 'components';
export const isMessageElement = (node: unknown) => isElement(node) && node.element === 'message';
export const isMultiFormatSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is MultiFormatSchemaElement =>
      element instanceof MultiFormatSchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('multiFormatSchema', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ReferenceElement =>
      element instanceof ReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('reference', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isAsyncApiVersionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is AsyncApiVersionElement =>
      element instanceof AsyncApiVersionElement ||
      (hasBasicElementProps(element) &&
        isElementType('asyncApiVersion', element) &&
        primitiveEq('string', element));
  },
);
