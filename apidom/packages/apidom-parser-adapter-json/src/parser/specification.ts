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

export default specification;
