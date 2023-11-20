import {
  isElement,
  isStringElement,
  isArrayElement,
  isObjectElement,
  isMemberElement,
  createNamespace,
  includesClasses,
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
  };

  return { predicates, namespace };
};

export default createToolbox;
