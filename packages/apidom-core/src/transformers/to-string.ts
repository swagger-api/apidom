import { Element, Namespace as INamespace } from 'minim';

import defaultNamespaceInstance from '../namespace';
import dehydrate from './dehydrate';

/**
 * Create a refracted string representation of an Element.
 */
const toString = (element: Element, namespace: INamespace = defaultNamespaceInstance): string => {
  const refractStructure = dehydrate(element, namespace);
  return JSON.stringify(refractStructure);
};

export default toString;
