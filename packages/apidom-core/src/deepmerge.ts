import { ObjectElement, ArrayElement, MemberElement, Element } from 'minim';

import { isObjectElement, isArrayElement } from './predicates';
import { cloneDeep, cloneShallow } from './clone';
import toValue from './transformers/serializers/value';

/* eslint-disable @typescript-eslint/no-use-before-define */

export type ObjectOrArrayElement = ObjectElement | ArrayElement;
type AnyElement = ObjectElement | ArrayElement | Element;
type DeepMerge = (
  targetElement: ObjectOrArrayElement,
  sourceElement: ObjectOrArrayElement,
  options?: DeepMergeOptions,
) => AnyElement;
type CustomMerge = (keyElement: Element, options: DeepMergeOptions) => DeepMerge;
type ArrayElementMerge = (
  targetElement: ArrayElement,
  sourceElement: ArrayElement,
  options: DeepMergeOptions,
) => ArrayElement;
type ObjectElementMerge = (
  targetElement: ObjectElement,
  source: ObjectElement,
  options: DeepMergeOptions,
) => ObjectElement;
export type DeepMergeUserOptions = {
  clone?: boolean;
  isMergeableElement?: (element: Element) => boolean;
  arrayElementMerge?: ArrayElementMerge;
  objectElementMerge?: ObjectElementMerge;
  customMerge?: CustomMerge;
};

type DeepMergeOptions = DeepMergeUserOptions & {
  clone: boolean;
  isMergeableElement: (element: Element) => boolean;
  arrayElementMerge: ArrayElementMerge;
  objectElementMerge: ObjectElementMerge;
  customMerge: CustomMerge | undefined;
};

export const emptyElement = (element: ObjectElement | ArrayElement) => {
  const meta = cloneDeep(element.meta);
  const attributes = cloneDeep(element.attributes);

  // @ts-ignore
  return new element.constructor(undefined, meta, attributes);
};

const cloneUnlessOtherwiseSpecified = (
  element: AnyElement,
  options: DeepMergeOptions,
): AnyElement =>
  options.clone && options.isMergeableElement(element)
    ? deepmerge(
        emptyElement(element as ObjectOrArrayElement),
        element as ObjectOrArrayElement,
        options,
      )
    : element;

const getMergeFunction = (keyElement: Element, options: DeepMergeOptions): DeepMerge => {
  if (typeof options.customMerge !== 'function') {
    return deepmerge;
  }
  const customMerge = options.customMerge(keyElement, options);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
};

const mergeArrayElement: ArrayElementMerge = (targetElement, sourceElement, options) =>
  targetElement
    .concat(sourceElement)
    ['fantasy-land/map']((item: Element) => cloneUnlessOtherwiseSpecified(item, options));

const mergeObjectElement: ObjectElementMerge = (targetElement, sourceElement, options) => {
  const destination = isObjectElement(targetElement)
    ? emptyElement(targetElement)
    : emptyElement(sourceElement);

  if (isObjectElement(targetElement)) {
    targetElement.forEach((value, key, member) => {
      const clonedMember = cloneShallow(member as MemberElement);
      clonedMember.value = cloneUnlessOtherwiseSpecified(value, options);
      destination.content.push(clonedMember);
    });
  }

  sourceElement.forEach((value, key, member) => {
    const keyValue = toValue(key);
    let clonedMember;

    if (
      isObjectElement(targetElement) &&
      targetElement.hasKey(keyValue) &&
      options.isMergeableElement(value)
    ) {
      const targetValue = targetElement.get(keyValue);
      clonedMember = cloneShallow(member as MemberElement);
      clonedMember.value = getMergeFunction(key, options)(
        targetValue,
        value as ObjectOrArrayElement,
      );
    } else {
      clonedMember = cloneShallow(member as MemberElement);
      clonedMember.value = cloneUnlessOtherwiseSpecified(value as AnyElement, options);
    }

    destination.remove(keyValue);
    destination.content.push(clonedMember);
  });

  return destination;
};

export const defaultOptions: DeepMergeOptions = {
  clone: true,
  isMergeableElement: (element) => isObjectElement(element) || isArrayElement(element),
  arrayElementMerge: mergeArrayElement,
  objectElementMerge: mergeObjectElement,
  customMerge: undefined,
};

export default function deepmerge(
  targetElement: ObjectOrArrayElement,
  sourceElement: ObjectOrArrayElement,
  options?: DeepMergeUserOptions,
): AnyElement {
  const mergedOptions: DeepMergeOptions = { ...defaultOptions, ...options };
  mergedOptions.isMergeableElement =
    mergedOptions.isMergeableElement ?? defaultOptions.isMergeableElement;
  mergedOptions.arrayElementMerge =
    mergedOptions.arrayElementMerge ?? defaultOptions.arrayElementMerge;
  mergedOptions.objectElementMerge =
    mergedOptions.objectElementMerge ?? defaultOptions.objectElementMerge;

  const sourceIsArrayElement = isArrayElement(sourceElement);
  const targetIsArrayElement = isArrayElement(targetElement);
  const sourceAndTargetTypesMatch = sourceIsArrayElement === targetIsArrayElement;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(sourceElement, mergedOptions);
  }

  if (sourceIsArrayElement && typeof mergedOptions.arrayElementMerge === 'function') {
    return mergedOptions.arrayElementMerge(
      targetElement as ArrayElement,
      sourceElement as ArrayElement,
      mergedOptions,
    );
  }

  return mergedOptions.objectElementMerge(
    targetElement as ObjectElement,
    sourceElement as ObjectElement,
    mergedOptions,
  );
}

deepmerge.all = (list: ObjectOrArrayElement[], options?: DeepMergeUserOptions) => {
  if (!Array.isArray(list)) {
    throw new TypeError('First argument of deepmerge should be an array.');
  }
  if (list.length === 0) {
    return new ObjectElement();
  }

  return list.reduce((target, source) => {
    return deepmerge(target, source, options);
  }, emptyElement(list[0]));
};
/* eslint-enable @typescript-eslint/no-use-before-define */
