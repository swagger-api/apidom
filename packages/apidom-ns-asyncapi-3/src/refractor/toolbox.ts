import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as asyncApi3Predicates from '../predicates.ts';
import asyncApi3Namespace from '../namespace.ts';

const createToolbox = () => {
  const namespace = createNamespace(asyncApi3Namespace);
  const predicates = { ...asyncApi3Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
