import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as jsonSchemaDraft7Predicates from '../predicates';
import jsonSchemaDraft7Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(jsonSchemaDraft7Namespace);
  const predicates = { ...jsonSchemaDraft7Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
