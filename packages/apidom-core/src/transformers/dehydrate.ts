import { Element, Namespace as INamespace } from 'minim';

import defaultNamespaceInstance from '../namespace';

/**
 * Creates a refract representation of an Element.
 * https://github.com/refractproject/refract-spec
 */
const dehydrate = (element: Element, namespace: INamespace = defaultNamespaceInstance): any => {
  return namespace.toRefract(element);
};

export default dehydrate;
