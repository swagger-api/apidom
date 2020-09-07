import stampit from 'stampit';

import { isRequestBodyObject, isReferenceObject } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const RequestBodyVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isRequestBodyObject({}), specPath: ['document', 'objects', 'RequestBody'] },
      { predicate: isReferenceObject({}), specPath: ['document', 'objects', 'Reference'] },
    ],
  },
});

export default RequestBodyVisitor;
