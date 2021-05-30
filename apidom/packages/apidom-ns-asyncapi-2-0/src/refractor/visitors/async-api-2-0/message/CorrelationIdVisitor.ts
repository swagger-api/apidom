import stampit from 'stampit';
import { T as stubTrue } from 'ramda';

import AlternatingVisitor from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

const CorrelationIdVisitor = stampit(AlternatingVisitor, FallbackVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'CorrelationId'] },
    ],
  },
});

export default CorrelationIdVisitor;
