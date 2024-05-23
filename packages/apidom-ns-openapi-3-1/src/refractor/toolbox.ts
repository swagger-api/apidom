import {
  Element,
  Namespace,
  ArrayElement,
  isElement,
  isStringElement,
  isArrayElement,
  isObjectElement,
  isMemberElement,
  toValue,
  createNamespace,
  includesClasses,
  hasElementSourceMap,
} from '@swagger-api/apidom-core';
import { compile as compileJSONPointerTokens } from '@swagger-api/apidom-json-pointer';
import { isServersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import * as openApi3_1Predicates from '../predicates';
import openApi3_1Namespace from '../namespace';

export type Predicates = typeof openApi3_1Predicates & {
  isElement: typeof isElement;
  isStringElement: typeof isStringElement;
  isArrayElement: typeof isArrayElement;
  isObjectElement: typeof isObjectElement;
  isMemberElement: typeof isMemberElement;
  isServersElement: typeof isServersElement;
  includesClasses: typeof includesClasses;
  hasElementSourceMap: typeof hasElementSourceMap;
};

export interface Toolbox {
  predicates: Predicates;
  compileJSONPointerTokens: typeof compileJSONPointerTokens;
  ancestorLineageToJSONPointer: typeof ancestorLineageToJSONPointer;
  namespace: Namespace;
}

/**
 * Translates visitor ancestor lineage to a JSON Pointer tokens.
 * Ancestor lineage is constructed of following visitor method arguments:
 *
 *  - ancestors
 *  - parent
 *  - element
 */
const ancestorLineageToJSONPointer = <T extends (Element | Element[])[]>(elementPath: T) => {
  const jsonPointerTokens = elementPath.reduce((path, element, index) => {
    if (isMemberElement(element)) {
      const token = String(toValue(element.key));
      path.push(token);
    } else if (isArrayElement(elementPath[index - 2])) {
      const token = String((elementPath[index - 2] as ArrayElement).content.indexOf(element));
      path.push(token);
    }

    return path;
  }, [] as string[]);

  return compileJSONPointerTokens(jsonPointerTokens);
};

const createToolbox = (): Toolbox => {
  const namespace = createNamespace(openApi3_1Namespace);
  const predicates: Predicates = {
    ...openApi3_1Predicates,
    isElement,
    isStringElement,
    isArrayElement,
    isObjectElement,
    isMemberElement,
    isServersElement,
    includesClasses,
    hasElementSourceMap,
  };

  return { predicates, ancestorLineageToJSONPointer, compileJSONPointerTokens, namespace };
};

export default createToolbox;
