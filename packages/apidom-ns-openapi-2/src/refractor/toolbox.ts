import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as openApi2Predicates from '../predicates.ts';
import * as refractorPredicates from './predicates.ts';
import openApi2Namespace from '../namespace.ts';

const createToolbox = () => {
  const namespace = createNamespace(openApi2Namespace);
  const predicates = { ...refractorPredicates, ...openApi2Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
