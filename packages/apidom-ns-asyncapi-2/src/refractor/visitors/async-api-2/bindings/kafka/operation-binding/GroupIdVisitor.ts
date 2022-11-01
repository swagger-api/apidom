import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import AlternatingVisitor from '../../../../generics/AlternatingVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../../../predicates';
import { isReferenceElement } from '../../../../../../predicates';

const GroupIdVisitor = stampit(AlternatingVisitor, FallbackVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'Schema'] },
    ],
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = AlternatingVisitor.compose.methods.enter.call(this, objectElement);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
  },
});

export default GroupIdVisitor;
