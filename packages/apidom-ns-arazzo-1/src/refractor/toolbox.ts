import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as workflowsPredicates from '../predicates.ts';
import * as refractorPredicates from './predicates.ts';
import workflowsNamespace from '../namespace.ts';

const createToolbox = () => {
  const namespace = createNamespace(workflowsNamespace);
  const predicates = {
    ...refractorPredicates,
    ...workflowsPredicates,
    isStringElement,
  };

  return { predicates, namespace };
};

export default createToolbox;
