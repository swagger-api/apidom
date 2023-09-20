import { ArraySlice, ObjectSlice, KeyValuePair, Element } from 'minim';
import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import { isElement } from './predicates';

type FinalCloneTypes = KeyValuePair | ArraySlice | ObjectSlice;

const cloneShallowKeyValuePair = (keyValuePair: KeyValuePair) => {
  const { key, value } = keyValuePair;
  return new KeyValuePair(key, value);
};

const cloneShallowArraySlice = (arraySlice: ArraySlice) => {
  const items = [...arraySlice];
  return new ArraySlice(items);
};

const cloneShallowObjectSlice = (objectSlice: ObjectSlice) => {
  const items = [...objectSlice];
  return new ObjectSlice(items);
};

/* eslint-disable no-underscore-dangle */
const cloneShallowElement = <T extends Element>(element: T): T => {
  // @ts-ignore
  const copy = new element.constructor();

  copy.element = element.element;

  if (element.meta.length > 0) {
    copy._meta = cloneShallowElement(element.meta);
  }

  if (element.attributes.length > 0) {
    copy._attributes = cloneShallowElement(element.attributes);
  }

  if (isElement(element.content)) {
    const content = element.content as unknown as Element;
    copy.content = cloneShallowElement(content);
  } else if (Array.isArray(element.content)) {
    copy.content = [...element.content];
  } else if ((element.content as unknown) instanceof KeyValuePair) {
    copy.content = cloneShallowKeyValuePair(element.content);
  } else {
    copy.content = element.content;
  }

  return copy;
};
/* eslint-enable */

export const cloneShallow = <T extends Element | FinalCloneTypes>(value: T): T => {
  if (value instanceof KeyValuePair) {
    return cloneShallowKeyValuePair(value) as T;
  }

  if (value instanceof ObjectSlice) {
    return cloneShallowObjectSlice(value) as T;
  }

  if (value instanceof ArraySlice) {
    return cloneShallowArraySlice(value) as T;
  }

  if (isElement(value)) {
    return cloneShallowElement(value) as T;
  }

  throw new ApiDOMStructuredError("Value provided to cloneShallow function couldn't be cloned", {
    value,
  });
};

const invokeClone = <T extends Element | FinalCloneTypes>(value: T): T => {
  if (typeof value?.clone === 'function') {
    return value.clone() as T;
  }
  return value;
};

export const cloneDeep = <T extends Element | FinalCloneTypes>(value: T): T => {
  if (value instanceof ObjectSlice) {
    const items = [...value].map(invokeClone) as T[];
    return new ObjectSlice(items) as T;
  }

  if (value instanceof ArraySlice) {
    const items = [...value].map(invokeClone) as T[];
    return new ArraySlice(items) as T;
  }

  if (typeof value?.clone === 'function') {
    return value.clone() as T;
  }

  throw new ApiDOMStructuredError("Value provided to cloneDeep function couldn't be cloned", {
    value,
  });
};
