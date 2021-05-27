import { createNamespace, isStringElement } from 'apidom';

import * as asyncApi2_0Predicates from '../predicates';
import asyncApi2_0Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(asyncApi2_0Namespace);
  const predicates = { ...asyncApi2_0Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
