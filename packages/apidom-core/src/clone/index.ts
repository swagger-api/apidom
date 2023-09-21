import { ArraySlice, ObjectSlice, KeyValuePair, Element } from 'minim';

import { isElement } from '../predicates';
import DeepCloneError from './errors/DeepCloneError';
import ShallowCloneError from './errors/ShallowCloneError';

type FinalCloneTypes = KeyValuePair | ArraySlice | ObjectSlice;

const invokeClone = <T extends Element | FinalCloneTypes>(value: T): T => {
  if (typeof value?.clone === 'function') {
    return value.clone() as T;
  }
  return value;
};

export const cloneDeep = <T extends Element | FinalCloneTypes>(value: T): T => {
  if (value instanceof ObjectSlice) {
    const items = [...(value as ObjectSlice)].map(invokeClone) as T[];
    return new ObjectSlice(items) as T;
  }

  if (value instanceof ArraySlice) {
    const items = [...(value as ArraySlice)].map(invokeClone) as T[];
    return new ArraySlice(items) as T;
  }

  if (typeof value?.clone === 'function') {
    return value.clone() as T;
  }

  throw new DeepCloneError("Value provided to cloneDeep function couldn't be cloned", {
    value,
  });
};
cloneDeep.safe = <T>(value: T): T => {
  try {
    return cloneDeep(value as any) as T;
  } catch {
    return value;
  }
};

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
    copy._meta = cloneDeep(element.meta);
  }

  if (element.attributes.length > 0) {
    copy._attributes = cloneDeep(element.attributes);
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

  throw new ShallowCloneError("Value provided to cloneShallow function couldn't be cloned", {
    value,
  });
};
cloneShallow.safe = <T>(value: T): T => {
  try {
    return cloneShallow(value as any) as T;
  } catch {
    return value;
  }
};
