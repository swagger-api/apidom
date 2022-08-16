import stampit from 'stampit';
import { T as stubTrue } from 'ramda';

import AlternatingVisitor from '../generics/AlternatingVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

const AdditionalPropertiesVisitor = stampit(AlternatingVisitor, ParentSchemaAwareVisitor, {
  props: {
    alternator: [
      {
        predicate: isJSONReferenceLikeElement,
        specPath: ['document', 'objects', 'JSONReference'],
      },
      { predicate: stubTrue, specPath: ['document', 'objects', 'JSONSchema'] },
    ],
  },
});

export default AdditionalPropertiesVisitor;
