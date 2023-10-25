import { ArraySlice, ObjectSlice, KeyValuePair, Element } from 'minim';

import { isElement } from '../predicates';
import DeepCloneError from './errors/DeepCloneError';
import ShallowCloneError from './errors/ShallowCloneError';

type FinalCloneTypes = KeyValuePair | ArraySlice | ObjectSlice;

type DeepCloneOptions<T extends Element | FinalCloneTypes> = {
  visited?: WeakMap<T, T>;
};

export const cloneDeep = <T extends Element | FinalCloneTypes>(
  value: T,
  options: DeepCloneOptions<T> = {},
): T => {
  const { visited = new WeakMap<T, T>() } = options;
  const passThroughOptions = { ...options, visited };

  // detect cycle and return memoized value
  if (visited.has(value)) {
    return visited.get(value) as T;
  }

  if (value instanceof KeyValuePair) {
    const { key, value: val } = value;
    const keyCopy = isElement(key)
      ? cloneDeep(key, passThroughOptions as DeepCloneOptions<Element>)
      : key;
    const valueCopy = isElement(val)
      ? cloneDeep(val, passThroughOptions as DeepCloneOptions<Element>)
      : val;
    const copy = new KeyValuePair(keyCopy, valueCopy) as T;
    visited.set(value, copy);
    return copy;
  }

  if (value instanceof ObjectSlice) {
    const mapper = (element: T) => cloneDeep(element, passThroughOptions);
    const items = [...(value as ObjectSlice)].map(mapper) as T[];
    const copy = new ObjectSlice(items) as T;
    visited.set(value, copy);
    return copy;
  }

  if (value instanceof ArraySlice) {
    const mapper = (element: T) => cloneDeep(element, passThroughOptions);
    const items = [...(value as ArraySlice)].map(mapper) as T[];
    const copy = new ArraySlice(items) as T;
    visited.set(value, copy);
    return copy;
  }

  if (isElement(value)) {
    const copy = cloneShallow(value); // eslint-disable-line @typescript-eslint/no-use-before-define

    visited.set(value, copy);

    if (value.content) {
      if (isElement(value.content)) {
        copy.content = cloneDeep(
          value.content,
          passThroughOptions as DeepCloneOptions<Element>,
        ) as any;
      } else if ((value.content as unknown) instanceof KeyValuePair) {
        copy.content = cloneDeep(
          value.content as unknown as KeyValuePair,
          passThroughOptions as DeepCloneOptions<KeyValuePair>,
        ) as any;
      } else if (Array.isArray(value.content)) {
        const mapper = (element: unknown) => cloneDeep(element as T, passThroughOptions);
        copy.content = value.content.map(mapper);
      } else {
        copy.content = value.content;
      }
    } else {
      copy.content = value.content;
    }

    return copy;
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
