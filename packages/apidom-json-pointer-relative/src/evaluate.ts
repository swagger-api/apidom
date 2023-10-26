import {
  Element,
  visit,
  cloneDeep,
  BREAK,
  isElement,
  isMemberElement,
  isArrayElement,
  MemberElement,
  ArrayElement,
  NumberElement,
} from '@swagger-api/apidom-core';
import {
  compile as compileJsonPointer,
  evaluate as evaluateJsonPointer,
} from '@swagger-api/apidom-json-pointer';
import { last } from 'ramda';

import EvaluationRelativeJsonPointerError from './errors/EvaluationRelativeJsonPointerError';
import parse from './parse';
import { RelativeJsonPointer } from './types';

// evaluates Relative JSON Pointer against ApiDOM fragment
const evaluate = <T extends Element, U extends Element>(
  relativePointer: string,
  currentElement: T,
  rootElement: U,
): Element => {
  let ancestorLineage: Element[] = [];
  let cursor: Element | undefined = currentElement;

  visit(rootElement, {
    enter(element: Element, key: any, parent: any, path: any, ancestors: any) {
      if (element === currentElement) {
        ancestorLineage = [...ancestors, parent].filter(isElement);
        return BREAK;
      }
      return undefined;
    },
  });

  if (ancestorLineage.length === 0) {
    throw new EvaluationRelativeJsonPointerError(
      'Relative JSON Pointer evaluation failed. Current element not found inside the root element',
      {
        relativePointer,
        currentElement: cloneDeep(currentElement),
        rootElement: cloneDeep(rootElement),
        cursorElement: cloneDeep.safe(cursor),
      },
    );
  }

  if (last(ancestorLineage) === rootElement) {
    throw new EvaluationRelativeJsonPointerError(
      'Relative JSON Pointer evaluation failed. Current element cannot be the root element',
      {
        relativePointer,
        currentElement,
        rootElement,
        cursorElement: cursor,
      },
    );
  }

  let relativeJsonPointer: RelativeJsonPointer;
  try {
    relativeJsonPointer = parse(relativePointer);
  } catch (error: unknown) {
    throw new EvaluationRelativeJsonPointerError(
      'Relative JSON Pointer evaluation failed while parsing the pointer.',
      {
        relativePointer,
        currentElement: cloneDeep(currentElement),
        rootElement: cloneDeep(currentElement),
        cursorElement: cloneDeep.safe(cursor),
        cause: error,
      },
    );
  }

  // non-negative-integer
  if (relativeJsonPointer.nonNegativeIntegerPrefix > 0) {
    const ancestorLineageCopy = [...ancestorLineage];

    for (
      let { nonNegativeIntegerPrefix } = relativeJsonPointer;
      nonNegativeIntegerPrefix > 0;
      nonNegativeIntegerPrefix -= 1
    ) {
      cursor = ancestorLineageCopy.pop();
      if (isMemberElement(cursor)) {
        cursor = ancestorLineageCopy.pop();
      }
    }

    if (typeof cursor === 'undefined') {
      throw new EvaluationRelativeJsonPointerError(
        `Relative JSON Pointer evaluation failed on non-negative-integer prefix of "${relativeJsonPointer.nonNegativeIntegerPrefix}"`,
        {
          relativePointer,
          currentElement: cloneDeep(currentElement),
          rootElement: cloneDeep(rootElement),
          cursorElement: cloneDeep.safe(cursor),
        },
      );
    }

    ancestorLineage = ancestorLineageCopy;
  }

  // index-manipulation
  if (typeof relativeJsonPointer.indexManipulation === 'number') {
    const containedArray = last(ancestorLineage);

    if (typeof containedArray === 'undefined' || !isArrayElement(containedArray)) {
      throw new EvaluationRelativeJsonPointerError(
        `Relative JSON Pointer evaluation failed failed on index-manipulation "${relativeJsonPointer.indexManipulation}"`,
        {
          relativePointer,
          currentElement: cloneDeep(currentElement),
          rootElement: cloneDeep(rootElement),
          cursorElement: cloneDeep.safe(cursor),
        },
      );
    }

    const currentCursorIndex = containedArray.content.indexOf(cursor);
    const newCursorIndex = currentCursorIndex + relativeJsonPointer.indexManipulation;
    cursor = containedArray.content[newCursorIndex] as Element | undefined;

    if (typeof cursor === 'undefined') {
      throw new EvaluationRelativeJsonPointerError(
        `Relative JSON Pointer evaluation failed on index-manipulation "${relativeJsonPointer.indexManipulation}"`,
        {
          relativePointer,
          currentElement: cloneDeep(currentElement),
          rootElement: cloneDeep(rootElement),
          cursorElement: cloneDeep.safe(cursor),
        },
      );
    }
  }

  if (Array.isArray(relativeJsonPointer.jsonPointerTokens)) {
    // <json-pointer>
    const jsonPointer = compileJsonPointer(relativeJsonPointer.jsonPointerTokens);
    cursor = evaluateJsonPointer(jsonPointer, cursor);
  } else if (relativeJsonPointer.hashCharacter) {
    // "#"
    if (cursor === rootElement) {
      throw new EvaluationRelativeJsonPointerError(
        'Relative JSON Pointer evaluation failed. Current element cannot be the root element to apply "#"',
        {
          relativePointer,
          currentElement: cloneDeep(currentElement),
          rootElement: cloneDeep(rootElement),
          cursorElement: cloneDeep.safe(cursor),
        },
      );
    }

    const parentElement = last(ancestorLineage) as ArrayElement | MemberElement | undefined;
    if (typeof parentElement !== 'undefined') {
      if (isMemberElement(parentElement)) {
        cursor = (parentElement as MemberElement).key as Element;
      } else if (isArrayElement(parentElement)) {
        cursor = new NumberElement(parentElement.content.indexOf(cursor));
      }
    }
  }

  return cursor;
};

export default evaluate;
