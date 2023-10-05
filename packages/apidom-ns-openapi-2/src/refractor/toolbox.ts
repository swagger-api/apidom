import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as openApi2Predicates from '../predicates';
import * as refractorPredicates from './predicates';
import openApi2Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(openApi2Namespace);
  const predicates = { ...refractorPredicates, ...openApi2Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
