import { createPredicate, isElement } from '@swagger-api/apidom-core';
import MultiFormatSchemaElement from './elements/MultiFormatSchema.ts';

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