import { defaultTo, has, mapObjIndexed, path, propSatisfies } from 'ramda';
import { isPlainObject, isString, trimCharsStart } from 'ramda-adjunct';

import DocumentVisitor from './visitors/DocumentVisitor';
import ErrorVisitor from './visitors/ErrorVisitor';
import { ValueVisitor, ObjectVisitor, ArrayVisitor } from './visitors/generics';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the AST.
 * Specification also allows us to create new parser adapters from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use relative JSON pointers.
 */
const specification = {
  visitors: {
    value: ValueVisitor,
    object: ObjectVisitor,
    array: ArrayVisitor,
    error: ErrorVisitor,
    document: {
      $visitor: DocumentVisitor,
      extension: ValueVisitor,
    },
  },
};

export const dereference = (
  object: Record<string, any>,
  root?: Record<string, any>,
): Record<string, any> => {
  const rootObject = defaultTo(object, root);

  return mapObjIndexed((val) => {
    if (isPlainObject(val) && has('$ref', val) && propSatisfies(isString, '$ref', val)) {
      const $ref = path(['$ref'], val);
      // @ts-ignore
      const pointer = trimCharsStart('#/', $ref);
      return path(pointer.split('/'), rootObject);
    }
    if (isPlainObject(val)) {
      return dereference(val, rootObject);
    }
    return val;
  }, object);
};

export default specification;
