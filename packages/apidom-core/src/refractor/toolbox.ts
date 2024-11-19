import * as basePredicates from '../predicates/index.ts';
import defaultNamespaceInstance from '../namespace.ts';

/**
 * @public
 */
export type { basePredicates };

/**
 * @public
 */
export interface Toolbox {
  predicates: typeof basePredicates;
  namespace: typeof defaultNamespaceInstance;
}

/**
 * @public
 */
const createToolbox = (): Toolbox => {
  const predicates = { ...basePredicates };

  return { predicates, namespace: defaultNamespaceInstance };
};

export default createToolbox;
