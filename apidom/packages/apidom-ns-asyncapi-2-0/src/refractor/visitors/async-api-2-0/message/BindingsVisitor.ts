import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from 'apidom';

import ReferenceElement from '../../../../elements/Reference';
import AlternatingVisitor from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const BindingsVisitor = stampit(AlternatingVisitor, FallbackVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'MessageBindings'] },
    ],
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = AlternatingVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'messageBindings');
      });

      return result;
    },
  },
});

export default BindingsVisitor;
