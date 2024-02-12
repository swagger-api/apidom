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

import * as openApi3_0Predicates from '../predicates';
import openApi3_0Namespace from '../namespace';

export type Predicates = typeof openApi3_0Predicates & {
  isElement: typeof isElement;
  isStringElement: typeof isStringElement;
  isArrayElement: typeof isArrayElement;
  isObjectElement: typeof isObjectElement;
  isMemberElement: typeof isMemberElement;
  includesClasses: typeof includesClasses;
  hasElementSourceMap: typeof hasElementSourceMap;
};

const createToolbox = () => {
  const namespace = createNamespace(openApi3_0Namespace);
  const predicates: Predicates = {
    ...openApi3_0Predicates,
    isElement,
    isStringElement,
    isArrayElement,
    isObjectElement,
    isMemberElement,
    includesClasses,
    hasElementSourceMap,
  };

  return { predicates, namespace };
};

export default createToolbox;
