import { ArraySlice, ObjectSlice, KeyValuePair, Element } from 'minim';
import { ApiDOMError } from '@swagger-api/apidom-error';

import { isElement } from './predicates';

/* eslint-disable no-underscore-dangle */

export const cloneShallow = <T extends Element>(element: T): T => {
  if (!isElement(element)) {
    throw new ApiDOMError('cloneShallow was provided a value that is not an ApiDOM element.');
  }

  // @ts-ignore
  const clone = new element.constructor();
  clone.element = element.element;

  if (element.meta.length > 0) {
    clone._meta = cloneShallow(element.meta);
  }

  if (element.attributes.length > 0) {
    clone._attributes = cloneShallow(element.attributes);
  }

  if (element.content) {
    if (isElement(element.content)) {
      clone.content = cloneShallow(element.content as unknown as Element);
    } else if (Array.isArray(element.content)) {
      clone.content = [...element.content];
    } else if ((element.content as unknown) instanceof ObjectSlice) {
      clone.content = new ObjectSlice([...element.content]);
    } else if ((element.content as unknown) instanceof ArraySlice) {
      clone.content = new ArraySlice([...element.content]);
    } else if ((element.content as unknown) instanceof KeyValuePair) {
      clone.content = new KeyValuePair(
        (element.content as KeyValuePair).key,
        (element.content as KeyValuePair).value,
      );
    } else {
      clone.content = element.content;
    }
  } else {
    clone.content = element.content;
  }

  return clone;
};

export const cloneDeep = <T extends Element | KeyValuePair | ArraySlice>(element: T): T => {
  if (
    !isElement(element) &&
    !((element as unknown) instanceof KeyValuePair) &&
    !((element as unknown) instanceof ArraySlice)
  ) {
    throw new ApiDOMError('cloneShallow was provided a value that is not an ApiDOM element.');
  }

  return element.clone() as T;
};

/* eslint-enable */
