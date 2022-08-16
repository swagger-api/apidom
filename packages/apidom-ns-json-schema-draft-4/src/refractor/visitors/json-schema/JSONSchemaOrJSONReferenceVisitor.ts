import stampit from 'stampit';
import { T as stubTrue } from 'ramda';

import { isJSONReferenceLikeElement } from '../../predicates';
import AlternatingVisitor from '../generics/AlternatingVisitor';

const SchemaOrReferenceVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isJSONReferenceLikeElement, specPath: ['document', 'objects', 'JSONReference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'JSONSchema'] },
    ],
  },
});

export default SchemaOrReferenceVisitor;
