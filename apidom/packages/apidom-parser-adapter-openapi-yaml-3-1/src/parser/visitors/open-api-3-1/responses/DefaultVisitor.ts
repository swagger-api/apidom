import stampit from 'stampit';
import { T as stubTrue } from 'ramda';

import { isReferenceObject, isResponseObject } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const DefaultVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceObject({}), specPath: ['document', 'objects', 'Reference'] },
      { predicate: isResponseObject({}), specPath: ['document', 'objects', 'Response'] },
      { predicate: stubTrue, specPath: ['kind'] },
    ],
  },
});

export default DefaultVisitor;
