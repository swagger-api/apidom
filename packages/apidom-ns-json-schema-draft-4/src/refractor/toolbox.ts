import { createNamespace, isStringElement } from '@swagger-api/apidom-core';

import * as jsonSchemaDraft4Predicates from '../predicates';
import jsonSchemaDraft4Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(jsonSchemaDraft4Namespace);
  const predicates = { ...jsonSchemaDraft4Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
