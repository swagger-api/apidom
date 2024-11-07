import * as basePredicates from '../predicates/index.ts';
import defaultNamespaceInstance from '../namespace.ts';

const createToolbox = () => {
  const predicates = { ...basePredicates };

  return { predicates, namespace: defaultNamespaceInstance };
};

export default createToolbox;
