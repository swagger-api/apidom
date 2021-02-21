import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from 'apidom';

import { isReferenceElement } from '../../../../predicates';
import { isRequestBodyLikeElement, isReferenceLikeElement } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const RequestBodyVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isRequestBodyLikeElement, specPath: ['document', 'objects', 'RequestBody'] },
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['value'] },
    ],
  },
  methods: {
    Object(objectElement: ObjectElement) {
      // @ts-ignore
      const result = AlternatingVisitor.compose.methods.Object.call(this, objectElement);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'requestBody');
      }

      return result;
    },
  },
});

export default RequestBodyVisitor;
