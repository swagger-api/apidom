import { createNamespace, isStringElement } from 'apidom';

import * as openApi3_1Predicates from '../predicates';
import openApi3_1Namespace from '../namespace';

const createToolbox = () => {
  const namespace = createNamespace(openApi3_1Namespace);
  const predicates = { ...openApi3_1Predicates, isStringElement };

  return { predicates, namespace };
};

export default createToolbox;
