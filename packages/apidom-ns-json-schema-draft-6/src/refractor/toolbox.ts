import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as jsonSchemaDraft6Predicates from '../predicates.ts';
import jsonSchemaDraft6Namespace from '../namespace.ts';

const createToolbox = () => {
  const namespace = createNamespace(jsonSchemaDraft6Namespace);
  const predicates = { ...jsonSchemaDraft6Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
