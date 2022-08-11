import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { isObjectElement } from '@swagger-api/apidom-core';

import AlternatingVisitor from '../generics/AlternatingVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

const AdditionalPropertiesVisitor = stampit(
  AlternatingVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
  {
    props: {
      alternator: [
        {
          predicate: isJSONReferenceLikeElement,
          specPath: ['document', 'objects', 'JSONReference'],
        },
        { predicate: isObjectElement, specPath: ['document', 'objects', 'JSONSchema'] },
        { predicate: stubTrue, specPath: ['value'] },
      ],
    },
  },
);

export default AdditionalPropertiesVisitor;
