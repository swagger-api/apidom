import { Element, Namespace as INamespace } from 'minim';

import defaultNamespaceInstance from '../namespace.ts';
import dehydrate from './dehydrate.ts';

/**
 * Create a refracted string representation of an Element.
 * @public
 */
const toString = (element: Element, namespace: INamespace = defaultNamespaceInstance): string => {
  const refractStructure = dehydrate(element, namespace);
  return JSON.stringify(refractStructure);
};

export default toString;
