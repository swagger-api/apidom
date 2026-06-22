import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as a2aPredicates from '../predicates.ts';
import * as refractorPredicates from './predicates.ts';
import a2aNamespace from '../namespace.ts';

const createToolbox = () => {
  const namespace = createNamespace(a2aNamespace);
  const predicates = {
    ...refractorPredicates,
    ...a2aPredicates,
    isStringElement,
  };

  return { predicates, namespace };
};

export default createToolbox;
