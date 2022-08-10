import stampit from 'stampit';
import { T as stubTrue } from 'ramda';

import { isJSONReferenceLikeElement } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';
import ParentSchemaAwareVisitor from '../ParentSchemaAwareVisitor';

const SchemaVisitor = stampit(AlternatingVisitor, ParentSchemaAwareVisitor, {
  props: {
    alternator: [
      { predicate: isJSONReferenceLikeElement, specPath: ['document', 'objects', 'JSONReference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'JSONSchema'] },
    ],
  },
});

export default SchemaVisitor;
