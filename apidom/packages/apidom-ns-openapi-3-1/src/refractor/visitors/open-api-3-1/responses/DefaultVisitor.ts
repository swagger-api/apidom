import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from 'apidom';

import { isReferenceLikeElement, isResponseLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const DefaultVisitor = stampit(AlternatingVisitor, FallbackVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: isResponseLikeElement, specPath: ['document', 'objects', 'Response'] },
      { predicate: stubTrue, specPath: ['value'] },
    ],
  },
  methods: {
    object(objectElement: ObjectElement) {
      // @ts-ignore
      const result = AlternatingVisitor.compose.methods.object.call(this, objectElement);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'response');
      }

      return result;
    },
  },
});

export default DefaultVisitor;
