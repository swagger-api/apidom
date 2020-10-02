import StreamVisitor from './visitors/StreamVisitor';
import DocumentVisitor from './visitors/DocumentVisitor';

import ErrorVisitor from './visitors/ErrorVisitor';

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
    error: ErrorVisitor,
    stream: {
      $visitor: StreamVisitor,
    },
    document: {
      $visitor: DocumentVisitor,
    },
  },
};

export default specification;
