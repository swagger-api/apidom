import { startsWith } from 'ramda';
import {
  MemberElement,
  ObjectElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';

export const isReferenceObject = (node: any) => {
  if (!node || typeof node !== 'object') return false;
  // ApiDOM value may expose $ref directly
  return typeof node.$ref === 'string' || (typeof node.get === 'function' && node.get('$ref'));
};

export interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

/**
 * @public
 */
export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
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
