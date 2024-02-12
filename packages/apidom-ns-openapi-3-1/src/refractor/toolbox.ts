import {
  isElement,
  isStringElement,
  isArrayElement,
  isObjectElement,
  isMemberElement,
  createNamespace,
  includesClasses,
  hasElementSourceMap,
} from '@swagger-api/apidom-core';
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

const createToolbox = () => {
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

  return { predicates, namespace };
};

export default createToolbox;
