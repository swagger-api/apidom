import stampit from 'stampit';
import { test, always } from 'ramda';
import { Element, ObjectElement } from 'apidom';

import ReferenceElement from '../../../../elements/Reference';
import ResponsesElement from '../../../../elements/Responses';
import MixedFieldsVisitor from '../../generics/MixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement, isResponseLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const ResponsesVisitor = stampit(MixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPathFixedFields: always(['document', 'objects', 'Responses']),
    specPathPatternedFields: (element: Element) => {
      /* eslint-disable no-nested-ternary */
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isResponseLikeElement(element)
        ? ['document', 'objects', 'Response']
        : ['value'];
      /* eslint-enable */
    },
    fieldPatternPredicate: test(/^\d{3}$/),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ResponsesElement();
  },
  methods: {
    object(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MixedFieldsVisitor.compose.methods.object.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'response');
      });

      return result;
    },
  },
});

export default ResponsesVisitor;
