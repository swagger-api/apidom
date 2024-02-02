import { startsWith } from 'ramda';
import {
  MemberElement,
  isStringElement,
  isObjectElement,
  Element,
  toValue,
} from '@swagger-api/apidom-core';
import { ObjectElement } from 'minim';

export const isAsyncApi2LikeElement = <T extends Element>(element: T): boolean => {
  return (
    isObjectElement(element) &&
    // @ts-ignore
    element.hasKey('asyncapi') &&
    // @ts-ignore
    element.hasKey('info') &&
    // @ts-ignore
    element.hasKey('channels')
  );
};

export const isParameterLikeElement = (element: unknown): boolean => {
  return isObjectElement(element);
};

export interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};

export const isSchemaLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element);
};

export const isSecurityRequirementLikeElement = <T extends Element>(element: T): boolean => {
  return isObjectElement(element);
};

export const isServerLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('url') && element.hasKey('protocol');
};

export const isAsyncApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};
