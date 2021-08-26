import * as basePredicates from '../predicates';
import defaultNamespaceInstance from '../namespace';

const createToolbox = () => {
  const predicates = { ...basePredicates };

  return { predicates, namespace: defaultNamespaceInstance };
};

export default createToolbox;
