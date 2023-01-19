import { ObjectElement, ArrayElement, MemberElement, Element } from 'minim';

import { isObjectElement, isArrayElement } from './predicates';

/* eslint-disable @typescript-eslint/no-use-before-define */

type ObjectOrArrayElement = ObjectElement | ArrayElement;
type AnyElement = ObjectElement | ArrayElement | Element;

const emptyElement = (element: ObjectElement | ArrayElement) => {
  const meta = element.meta.clone();
  const attributes = element.attributes.clone();

  // @ts-ignore
  return new element.constructor(undefined, meta, attributes);
};

const cloneMemberElement = (memberElement: MemberElement) =>
  new MemberElement(
    memberElement.key,
    memberElement.value,
    memberElement.meta.clone(),
    memberElement.attributes.clone(),
  );

const cloneUnlessOtherwiseSpecified = (element: AnyElement): AnyElement =>
  isObjectElement(element) || isArrayElement(element)
    ? deepmerge(emptyElement(element as ObjectOrArrayElement), element as ObjectOrArrayElement)
    : element;

const mergeArrayElement = (
  targetElement: ArrayElement,
  sourceElement: ArrayElement,
): ArrayElement =>
  targetElement.concat(sourceElement)['fantasy-land/map'](cloneUnlessOtherwiseSpecified);

const mergeObjectElement = (
  targetElement: ObjectElement,
  sourceElement: ObjectElement,
): ObjectElement => {
  const destination = isObjectElement(targetElement)
    ? emptyElement(targetElement)
    : emptyElement(sourceElement);

  if (isObjectElement(targetElement)) {
    targetElement.forEach((value, key, member) => {
      const clonedMember = cloneMemberElement(member as MemberElement);
      clonedMember.value = cloneUnlessOtherwiseSpecified(value);
      destination.content.push(clonedMember);
    });
  }

  sourceElement.forEach((value, key, member) => {
    const keyValue = key.toValue();
    let clonedMember;

    if (
      isObjectElement(targetElement) &&
      targetElement.hasKey(keyValue) &&
      (isObjectElement(value) || isArrayElement(value))
    ) {
      const targetValue = targetElement.get(keyValue);
      clonedMember = cloneMemberElement(member as MemberElement);
      clonedMember.value = deepmerge(targetValue, value as ObjectOrArrayElement);
    } else {
      clonedMember = cloneMemberElement(member as MemberElement);
      clonedMember.value = cloneUnlessOtherwiseSpecified(value as AnyElement);
    }

    destination.remove(keyValue);
    destination.content.push(clonedMember);
  });

  return destination;
};

export default function deepmerge(
  targetElement: ObjectOrArrayElement,
  sourceElement: ObjectOrArrayElement,
) {
  const sourceIsArrayElement = isArrayElement(sourceElement) && !isObjectElement(sourceElement);
  const targetIsArrayElement = isArrayElement(targetElement) && !isObjectElement(targetElement);
  const sourceAndTargetTypesMatch = sourceIsArrayElement === targetIsArrayElement;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(sourceElement);
  }

  if (sourceIsArrayElement) {
    return mergeArrayElement(targetElement as ArrayElement, sourceElement as ArrayElement);
  }

  return mergeObjectElement(targetElement as ObjectElement, sourceElement as ObjectElement);
}
/* eslint-enable @typescript-eslint/no-use-before-define */
