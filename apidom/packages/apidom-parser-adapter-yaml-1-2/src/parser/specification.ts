import { defaultTo, has, mapObjIndexed, path, propSatisfies } from 'ramda';
import { isPlainObject, isString, trimCharsStart } from 'ramda-adjunct';

import StreamVisitor from './visitors/StreamVisitor';
import DocumentVisitor from './visitors/DocumentVisitor';
import ErrorVisitor from './visitors/ErrorVisitor';
import CommentVisitor from './visitors/CommentVisitor';
import { ScalarVisitor, MappingVisitor, SequenceVisitor, KindVisitor } from './visitors/generics';

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
    scalar: ScalarVisitor,
    mapping: MappingVisitor,
    sequence: SequenceVisitor,
    kind: KindVisitor,
    error: ErrorVisitor,
    comment: CommentVisitor,
    stream: {
      $visitor: StreamVisitor,
    },
    document: {
      $visitor: DocumentVisitor,
      extension: KindVisitor,
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
