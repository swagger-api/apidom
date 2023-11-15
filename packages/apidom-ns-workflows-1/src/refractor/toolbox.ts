import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as workflowsPredicates from '../predicates';
import * as refractorPredicates from './predicates';
import workflowsNamespace from '../namespace';

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
