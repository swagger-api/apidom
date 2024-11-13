import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as asyncApi2Predicates from '../predicates.ts';
import asyncApi2Namespace from '../namespace.ts';

const createToolbox = () => {
  const namespace = createNamespace(asyncApi2Namespace);
  const predicates = { ...asyncApi2Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
