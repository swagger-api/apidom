import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as workflowsSpecificationPredicates from '../predicates';
import * as refractorPredicates from './predicates';
import workflowsSpecificationNamespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(workflowsSpecificationNamespace);
  const predicates = {
    ...refractorPredicates,
    ...workflowsSpecificationPredicates,
    isStringElement,
  };

  return { predicates, namespace };
};

export default createToolbox;
