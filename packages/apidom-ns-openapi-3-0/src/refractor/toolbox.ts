import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as openApi3_0Predicates from '../predicates';
import * as refractorPredicates from './predicates';
import openApi3_0Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(openApi3_0Namespace);
  const predicates = { ...refractorPredicates, ...openApi3_0Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
