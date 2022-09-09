import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-openapi-3-0';

import { isReferenceElement, isResponseElement } from '../../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const DefaultVisitor = stampit(AlternatingVisitor, FallbackVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'Response'] },
    ],
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = AlternatingVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate ReferenceElement with type of referencing element
      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'response');
      } else if (isResponseElement(this.element)) {
        this.element.setMetaProperty('http-status-code', 'default');
      }

      return result;
    },
  },
});

export default DefaultVisitor;
