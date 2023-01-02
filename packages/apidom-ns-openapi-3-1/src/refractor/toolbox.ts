import {
  createNamespace,
  isStringElement,
  isArrayElement,
  isObjectElement,
  includesClasses,
} from '@swagger-api/apidom-core';

import * as openApi3_1Predicates from '../predicates';
import openApi3_1Namespace from '../namespace';

export type Predicates = typeof openApi3_1Predicates & {
  isStringElement: typeof isStringElement;
  isArrayElement: typeof isArrayElement;
  isObjectElement: typeof isObjectElement;
  includesClasses: typeof includesClasses;
};

const createToolbox = () => {
  const namespace = createNamespace(openApi3_1Namespace);
  const predicates: Predicates = {
    ...openApi3_1Predicates,
    isStringElement,
    isArrayElement,
    isObjectElement,
    includesClasses,
  };

  return { predicates, namespace };
};

export default createToolbox;
