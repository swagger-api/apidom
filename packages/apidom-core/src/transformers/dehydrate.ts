import { Element, Namespace as INamespace } from 'minim';

import defaultNamespaceInstance from '../namespace.ts';

/**
 * Creates a refract representation of an Element.
 * https://github.com/refractproject/refract-spec
 * @public
 */
const dehydrate = (element: Element, namespace: INamespace = defaultNamespaceInstance): any => {
  return namespace.toRefract(element);
};

export default dehydrate;
