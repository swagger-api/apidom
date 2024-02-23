import { ObjectElement, ArrayElement, MemberElement, Element } from 'minim';

import { isObjectElement, isArrayElement } from '../predicates';
import { cloneDeep, cloneShallow } from '../clone';
import toValue from '../transformers/serializers/value';

/* eslint-disable @typescript-eslint/no-use-before-define */

export type ObjectOrArrayElement = ObjectElement | ArrayElement;
type AnyElement = ObjectElement | ArrayElement | Element;
type DeepMerge = (
  targetElement: ObjectOrArrayElement,
  sourceElement: ObjectOrArrayElement,
  options?: DeepMergeOptions,
) => AnyElement;
type CustomMerge = (keyElement: Element, options: DeepMergeOptions) => DeepMerge;
type CustomMetaMerge = (
  targetElementMeta: ObjectElement,
  sourceElementMeta: ObjectElement,
) => ObjectElement;
type CustomAttributesMerge = (
  targetElementAttributes: ObjectElement,
  sourceElementAttributes: ObjectElement,
) => ObjectElement;
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
  customMetaMerge?: CustomMetaMerge;
  customAttributesMerge?: CustomAttributesMerge;
};

type DeepMergeOptions = DeepMergeUserOptions & {
  clone: boolean;
  isMergeableElement: (element: Element) => boolean;
  arrayElementMerge: ArrayElementMerge;
  objectElementMerge: ObjectElementMerge;
  customMerge: CustomMerge | undefined;
  customMetaMerge: CustomMetaMerge | undefined;
  customAttributesMerge: CustomAttributesMerge | undefined;
};

export const emptyElement = (element: ObjectElement | ArrayElement) => {
  const meta = element.meta.length > 0 ? cloneDeep(element.meta) : undefined;
  const attributes = element.attributes.length > 0 ? cloneDeep(element.attributes) : undefined;

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

const getMetaMergeFunction = (options: DeepMergeOptions): CustomMetaMerge => {
  if (typeof options.customMetaMerge !== 'function') {
    return (targetMeta) => cloneDeep(targetMeta);
  }
  return options.customMetaMerge;
};

const getAttributesMergeFunction = (options: DeepMergeOptions): CustomAttributesMerge => {
  if (typeof options.customAttributesMerge !== 'function') {
    return (targetAttributes) => cloneDeep(targetAttributes);
  }
  return options.customAttributesMerge;
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
  customMetaMerge: undefined,
  customAttributesMerge: undefined,
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

  // merging two elements
  const mergedElement =
    sourceIsArrayElement && typeof mergedOptions.arrayElementMerge === 'function'
      ? mergedOptions.arrayElementMerge(
          targetElement as ArrayElement,
          sourceElement as ArrayElement,
          mergedOptions,
        )
      : mergedOptions.objectElementMerge(
          targetElement as ObjectElement,
          sourceElement as ObjectElement,
          mergedOptions,
        );

  // merging meta & attributes
  mergedElement.meta = getMetaMergeFunction(mergedOptions)(targetElement.meta, sourceElement.meta);
  mergedElement.attributes = getAttributesMergeFunction(mergedOptions)(
    targetElement.attributes,
    sourceElement.attributes,
  );

  return mergedElement;
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
