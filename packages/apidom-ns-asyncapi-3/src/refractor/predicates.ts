import { startsWith } from 'ramda';
import {
  MemberElement,
  isStringElement,
  toValue,
  ObjectElement,
  isObjectElement,
} from '@swagger-api/apidom-core';

export const isReferenceObject = (node: any) => {
  if (!node || typeof node !== 'object') return false;
  // ApiDOM value may expose $ref directly
  return typeof node.$ref === 'string' || (typeof node.get === 'function' && node.get('$ref'));
};

/**
 * @public
 */
export const isAsyncApiExtension = (element: MemberElement): boolean => {
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};

/**
 * @public
 */
export interface MultiFormatSchemaLikeElement extends ObjectElement {
  hasKey: (value: 'schemaFormat') => true;
}

/**
 * @public
 */
export const isMultiFormatSchemaLikeElement = (
  element: unknown,
): element is MultiFormatSchemaLikeElement => {
  return isObjectElement(element) && element.hasKey('schemaFormat');
};

export default {
  isReferenceObject,
};
