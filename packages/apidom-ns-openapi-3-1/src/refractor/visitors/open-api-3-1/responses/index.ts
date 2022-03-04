import stampit from 'stampit';
import { test, always } from 'ramda';
import { Element, ObjectElement, StringElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponsesElement from '../../../../elements/Responses';
import MixedFieldsVisitor from '../../generics/MixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isResponseElement } from '../../../../predicates';

const ResponsesVisitor = stampit(MixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPathFixedFields: always(['document', 'objects', 'Responses']),
    specPathPatternedFields: (element: Element) => {
      /* eslint-disable no-nested-ternary */
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
      /* eslint-enable */
    },
    fieldPatternPredicate: test(/^\d{3}$/),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ResponsesElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'response');
      });

      // decorate every ResponseElement with metadata about their status code
      this.element.filter(isResponseElement).forEach((value: Element, key: StringElement) => {
        const httpStatusCode = key.clone();
        if (!this.fieldPatternPredicate(httpStatusCode.toValue())) return;
        value.setMetaProperty('http-status-code', httpStatusCode);
      });

      return result;
    },
  },
});

export default ResponsesVisitor;
