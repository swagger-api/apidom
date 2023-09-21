import { has } from 'ramda';
import { isPlainObject, isString } from 'ramda-adjunct';
import { Element, Namespace as INamespace } from 'minim';

import defaultNamespaceInstance from '../namespace';

/**
 * Transforms data to an Element from a particular namespace.
 */
const from = (data: any, namespace: INamespace = defaultNamespaceInstance): Element => {
  if (isString(data)) {
    // JSON serialized refract
    try {
      return namespace.fromRefract(JSON.parse(data));
    } catch {
      // noop
    }
  }
  if (isPlainObject(data) && has('element', data)) {
    // refract javascript structure
    return namespace.fromRefract(data);
  }

  return namespace.toElement(data);
};

export default from;
