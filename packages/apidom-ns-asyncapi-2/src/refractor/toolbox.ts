import { createNamespace, isStringElement } from 'apidom';

import * as asyncApi2Predicates from '../predicates';
import asyncApi2Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(asyncApi2Namespace);
  const predicates = { ...asyncApi2Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
