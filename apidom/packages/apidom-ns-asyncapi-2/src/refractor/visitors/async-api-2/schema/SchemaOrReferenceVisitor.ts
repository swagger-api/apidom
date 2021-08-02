import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from 'apidom';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const SchemaOrReferenceVisitor = stampit(AlternatingVisitor, FallbackVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'Schema'] },
    ],
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = AlternatingVisitor.compose.methods.ObjectElement.call(this, objectElement);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
  },
});

export default SchemaOrReferenceVisitor;
